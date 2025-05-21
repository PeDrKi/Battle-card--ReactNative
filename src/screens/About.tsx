import { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Image, Linking, TextInput, ScrollView } from "react-native";
import { BlurView } from "expo-blur";

export default function AboutScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [donateModalVisible, setDonateModalVisible] = useState(false);
    const [amount, setAmount] = useState("");

    const generateQRUrl = (amount) => {
        const encodedAmount = encodeURIComponent(amount);
        return `https://img.vietqr.io/image/BIDV-2153432573-compact.jpg?amount=${encodedAmount}&addInfo=Donate%20for%20PDK&accountName=Ph%E1%BA%A1m%20%C4%90%C4%83ng%20Khu%C3%AA`;
    };

    return (
        <>
            {/* Main ABOUT MODAL */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <Image source={require("../../assets/Developer_/PDK.jpg")} style={styles.backgroundImage} />
                    <BlurView intensity={150} style={styles.overlay} />
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                        <View style={styles.modalView}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>ABOUT US</Text>
                            </View>

                            {/* Dev 1 */}
                            <View style={styles.body}>
                                <Image source={require("../../assets/Developer_/PDK.jpg")} style={styles.image} />
                                <Text style={styles.name}>Phạm Đăng Khuê</Text>
                                <Text style={{ fontWeight: "bold" }}>Game Developer</Text>
                                <Text style={styles.intro}>Hi!, I'm a Unity Game Developer.</Text>
                                <Text style={styles.intro}>Welcome to My World!!!</Text>
                                <Text>-----------------------</Text>
                                <Text>CONTACT</Text>
                                <View style={styles.contactbox}>
                                    <Pressable onPress={() => Linking.openURL("tel:0867758620")}>
                                        <Image source={require("../../assets/logo/zalo_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL("https://web.facebook.com/pe.dr.ki1")}>
                                        <Image source={require("../../assets/logo/facebook_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL("https://github.com/PeDrKi/")}>
                                        <Image source={require("../../assets/logo/github_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL("https://www.youtube.com/")}>
                                        <Image source={require("../../assets/logo/youtube_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                </View>
                            </View>

                            <Text>---------------------------------</Text>

                            {/* Dev 2 */}
                            <View style={styles.body}>
                                <Image source={require("../../assets/Developer_/VNB.jpg")} style={styles.image} />
                                <Text style={styles.name}>Võ Nguyên Bách</Text>
                                <Text style={{ fontWeight: "bold" }}>Business Analyst</Text>
                                <Text style={styles.intro}>Hi!, I'm a beginner BA.</Text>
                                <Text style={styles.intro}>Nice to meet you!</Text>
                                <Text>-----------------------</Text>
                                <Text>CONTACT</Text>
                                <View style={styles.contactbox}>
                                    <Pressable onPress={() => Linking.openURL("tel:0818589766")}>
                                        <Image source={require("../../assets/logo/zalo_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL("https://web.facebook.com/pe.dr.ki1")}>
                                        <Image source={require("../../assets/logo/facebook_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL("https://github.com/PeDrKi/")}>
                                        <Image source={require("../../assets/logo/github_logo.png")} style={styles.contact_logo} />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Donate Button */}
                            <Pressable
                                style={[styles.button, { backgroundColor: "green", marginTop: 10 }]}
                                onPress={() => setDonateModalVisible(true)}
                            >
                                <Text style={{ color: "white" }}>Donate for PDK</Text>
                            </Pressable>

                            {/* Close Button */}
                            <Pressable
                                style={[styles.button, styles.buttonClose, { marginTop: 10 }]}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={{ color: "white" }}>Close</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            {/* Donate Modal */}
            <Modal animationType="fade" transparent={true} visible={donateModalVisible}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { width: 300 }]}>
                        <Text style={styles.headerText}>Donate</Text>
                        <Text style={{ marginBottom: 10 }}>Nhập số tiền bạn muốn donate:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ví dụ: 50000"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Image
                            source={{ uri: generateQRUrl(amount) }}
                            style={{ width: 250, height: 250, marginTop: 10, resizeMode: "contain" }}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
                            onPress={() => setDonateModalVisible(false)}
                        >
                            <Text style={{ color: "white" }}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    header: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
    },
    body: {
        alignItems: "center",
        marginBottom: 0,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 30,
    },
    contact_logo: {
        width: 40,
        height: 40,
        margin: 5,
    },
    contactbox: {
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-around",
        width: "100%",
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
    },
    intro: {
        fontStyle: "italic",
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 200,
        alignItems: "center",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width: 200,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
});
