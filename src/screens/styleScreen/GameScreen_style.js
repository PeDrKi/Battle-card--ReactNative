import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const cardWidth = width / 3 - 20;
const cardHeight = cardWidth * 1.75;

const styles = StyleSheet.create({
    container: 
    { 
      flex: 1, 
      alignItems: "center", 
      //backgroundColor: "#ccc", 
      padding: 10, 
      marginTop: 40 
    },
    healthContainer: { flexDirection: "row", justifyContent: "space-between", width: "80%", marginBottom: 20 },
    healthText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    title: 
    { 
      fontSize: 19, 
      fontWeight: "bold", 
      color: "#fff", 
      marginVertical: 10 
    },
    cardBOT:
    {
      padding: 15, 
      marginHorizontal: 5, 
      
      alignItems: "center", 
      width: cardWidth , 
      height: cardHeight, 
      alignContent: "center",
      justifyContent: "flex-start",
    },
    card: 
    { 
      paddingTop: 5,  
      marginHorizontal: 5, 
      
      alignItems: "center", 
      width: cardWidth , 
      height: cardHeight, 
      alignContent: "center",
      justifyContent: "flex-start",
    },
    hiddenCard: { backgroundColor: "#999999" },
    playerCard: 
    { 
      // backgroundColor: "#656565" 
    },
    exitButton: { marginTop: 20, backgroundColor: "#ff4757", padding: 10, borderRadius: 8 },
    exitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    cardname:
    {
      //backgroundColor: "#fff",
      width: cardWidth * 0.75,
      height: cardHeight * 0.15, 
      justifyContent: "center",
      alignItems: "center" ,
      
    },
    cardnametxt:
    {
      color: "#fff",
      fontSize: 10,
    },
    chara:
    {
      //backgroundColor: "#fff",
      width: cardWidth * 0.9,
      height: cardHeight * 0.5,
      marginTop: cardHeight * 0.01,
      justifyContent: "center",
      alignItems: "center" ,
      marginTop: 10,
    },
    charepic:
    {
      width: cardWidth * 0.8,
      height: cardHeight * 0.41,
    },
    
    statusitem:
    {
      marginTop: cardHeight * 0.06,
      flexDirection: "row",
    },
    atkInfo:
    {
      //backgroundColor: "crimson",
      height : cardHeight * 0.15,
      width : cardWidth * 0.35,
      marginHorizontal: cardWidth * 0.02,
      justifyContent: "center",
      alignItems: "center",
    },
    defInfo:
    {
      //backgroundColor: "#0070c7",
      height : cardHeight * 0.15,
      width : cardWidth * 0.35,
      marginHorizontal: cardWidth * 0.02,
      justifyContent: "center",
      alignItems: "center",
    },
    textItemInfo:
    {
      fontSize: 15,
      color: "#fff",
    },
   
  
  });
  
  export default styles;
