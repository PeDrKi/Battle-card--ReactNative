import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 - 20;
const cardHeight = cardWidth * 1.75;

const styles = StyleSheet.create({
    container: 
    { 
      flex: 1, 
      alignItems: "center", 
      padding: 5
    },
    title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginVertical: 10,marginTop: 20 },
    card: 
    { 
      padding: 10, 
      margin: 5, 
      borderRadius: 10, 
      alignItems: "center", 
      width: cardWidth * 0.9999,
      height: cardHeight,
      overflow: "hidden", // Cắt mép ảnh
    },
    charaTitle:
    {
      height: cardHeight * 0.1,
      width: cardWidth * 0.75,
      marginBottom: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    charaTitleText:
    {
      fontWeight: "900",
      color: "#fff",
    },
    chara:
    {
      //backgroundColor: "#fff",
      height: cardHeight * 0.55,
      width: cardWidth * 0.75,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    charepic:
    {
      width: cardWidth * 0.7,
      height: cardHeight * 0.5,
      borderRadius: 5,
    },
    statusInfo:
    {
      flexDirection: "row",
      alignItems: "center",
      marginTop: cardHeight * 0.08,
      justifyContent: "center",
      alignItems: "center",
    },
    atkInfo:
    {
      //backgroundColor: "crimson",
      height: cardHeight * 0.15,
      width: cardWidth * 0.36,
      marginHorizontal: cardWidth * 0.01,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    defInfo:
    {
      //backgroundColor: "#0070c7",
      height: cardHeight * 0.15,
      width: cardWidth * 0.36,
      marginHorizontal: cardWidth * 0.01,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    statusText:
    {
      fontSize: 21,
      color: "white",
    },
    backButton: { marginTop: 10, backgroundColor: "#ff4757", padding: 10, borderRadius: 8, marginBottom: 10 },
    backButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    mysticOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Lớp phủ xám trong suốt
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    
    unlockText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
      textTransform: "uppercase",
      backgroundColor: "rgba(255, 255, 255, 0.3)", // Nền chữ mờ
      padding: 8,
      borderRadius: 5,
    },
    cardWrapper: {
      borderRadius: 20,
      overflow: "hidden",
      margin: 2,
    },
    cardout:
    {
      width: cardWidth * 0.9999,
      height: cardHeight,
      margin: -1,
    },
  });
  
  export default styles;
