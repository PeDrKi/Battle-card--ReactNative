import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;
const MIN_NODES = 100;
const SPAWN_INTERVAL_MS = 2000;

const getRandomEdgePosition = () => {
  const positions = [
    { x: 0, y: 0 }, { x: width, y: 0 },
    { x: 0, y: height }, { x: width, y: height },
    { x: 0, y: centerY }, { x: width, y: centerY },
    { x: centerX, y: 0 }, { x: centerX, y: height },
  ];

  const start = positions[Math.floor(Math.random() * positions.length)];
  const target = { x: centerX, y: centerY };

  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 2;

  return {
    x: start.x,
    y: start.y,
    dx: (dx / distance) * speed,
    dy: (dy / distance) * speed,
    target,
  };
};

const getRandomColor = () => {
  const colors = ['yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const createNode = (world, id) => {
  const { x, y, dx, dy, target } = getRandomEdgePosition();
  const body = Matter.Bodies.circle(x, y, 25, {
    label: id,
    isSensor: true,
    frictionAir: 0,
  });
  Matter.Body.setVelocity(body, { x: dx, y: dy });
  Matter.World.add(world, body);
  return { id, body, dx, dy, target, color: getRandomColor() };
};

const NodebusterGame = () => {
  const engine = useRef(Matter.Engine.create()).current;
  const world = engine.world;

  const [nodes, setNodes] = useState([]);
  const [resources, setResources] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const nodeCountRef = useRef(0);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Spawn node
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (isGameOver) return;
      setNodes((prev) => {
        if (prev.length < MIN_NODES) {
          const id = `node-${Date.now()}-${nodeCountRef.current++}`;
          const newNode = createNode(world, id);
          return [...prev, newNode];
        }
        return prev;
      });
    }, SPAWN_INTERVAL_MS);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  // Update node movement
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (isGameOver) return;
      Matter.Engine.update(engine, 1000 / 60);

      setNodes((prev) =>
        prev
          .map((node) => {
            const { x, y } = node.body.position;
            const distance = Math.hypot(node.target.x - x, node.target.y - y);

            if (distance < 10) {
              Matter.World.remove(world, node.body);
              return null;
            }

            return node;
          })
          .filter(Boolean)
      );
    }, 1000 / 30);

    return () => clearInterval(updateInterval);
  }, [isGameOver]);

  const handleClickNode = (node) => {
    if (isGameOver) return;
    setResources((r) => r + 1);
    Matter.World.remove(world, node.body);
    setNodes((prev) => prev.filter((n) => n.id !== node.id));
  };

  const addTimePowerUp = () => {
    const cost = 10;
    if (resources >= cost && !isGameOver) {
      setResources((r) => r - cost);
      setTimeLeft((t) => t + 10);
    }
  };

  return (
    <GameEngine systems={[]} entities={{}} style={styles.container}>
      <View style={styles.uiContainer}>
        <Text style={styles.text}>Resources: {resources}</Text>

        {nodes.map((node) => (
          <TouchableOpacity
            key={node.id}
            style={[
              styles.node,
              {
                left: node.body.position.x - 25,
                top: node.body.position.y - 25,
                backgroundColor: node.color,
              },
            ]}
            onPress={() => handleClickNode(node)}
          />
        ))}

        <TouchableOpacity
          onPress={addTimePowerUp}
          disabled={resources < 10 || isGameOver}
          style={[
            styles.upgradeButton,
            (resources < 10 || isGameOver) && styles.disabledButton,
          ]}
        >
          <Text style={styles.upgradeText}>+10s Time – 10</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {isGameOver ? 'Game Over' : `Time Left: ${timeLeft}s`}
        </Text>
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  uiContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  node: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
  upgradeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0af',
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  timerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default NodebusterGame;
