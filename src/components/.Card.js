import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function CardItem() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={{fontSize: width * 0.05, fontWeight: "900"}}>Warrior</Text>
        </View>
        <View style={styles.chara}>
          <Image
          style={styles.img}
          source={require('../../assets/character/Warrior.png')}
          />
        </View>
        <View style={styles.stat}>
          <View style={styles.atk}>
          <Text style={styles.txt}>10</Text>
            <Image
            source={require("../../assets/sword.png")}
            style={{height: height * 0.05, width: height * 0.05}}
            />
          </View>
          <View style={styles.def}>
          <Text style={styles.txt}>10</Text>
          <Image
            source={require("../../assets/shield.png")}
            style={{height: height * 0.05, width: height * 0.05}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:
  {
    height: height * 0.55,
    width: width * 0.6,
    backgroundColor: "#ccc",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
  },
  title:
  {
    marginBottom: height * 0.01,
    backgroundColor: '#fff',
    height: height * 0.07,
    width: width * 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chara:
  {
    backgroundColor: "#fff",
    height: height * 0.4,
    width: width * 0.5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat:
  {
    flexDirection: "row",
    marginTop: height * 0.01,
  },
  atk:
  {
    backgroundColor: "crimson",
    height: height * 0.08,
    width: width * 0.3,
    marginHorizontal: width * 0.01,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  def:
  {
    backgroundColor: "#0070c7",
    height: height * 0.08,
    width: width * 0.3,
    marginHorizontal: width * 0.01,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  img:
  {
    height: height * 0.25, 
    width : height * 0.25,
  },
  txt:
  {
    color: "#fff",
    fontSize: width * 0.05,
  }
});
