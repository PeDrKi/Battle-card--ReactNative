import React, { useState } from "react";
import { 
    View, Text, StyleSheet, Modal, Pressable, TextInput, Image 
} from "react-native";
import { BlurView } from "expo-blur";

export default function AuthScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
                <Image source={require("../../assets/Components/Home_background.png")} style={styles.backgroundImage} />
                <BlurView intensity={150} style={styles.overlay} />

                <View style={styles.modalView}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                        </Text>
                    </View>

                    {/* FORM */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập email của bạn" 
                            keyboardType="email-address" 
                            value={email} 
                            onChangeText={setEmail} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nhập mật khẩu" 
                            secureTextEntry 
                            value={password} 
                            onChangeText={setPassword} 
                        />
                    </View>

                    {!isLogin && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nhập lại mật khẩu</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Nhập lại mật khẩu" 
                                secureTextEntry 
                                value={confirmPassword} 
                                onChangeText={setConfirmPassword} 
                            />
                        </View>
                    )}

                    {/* BUTTON */}
                    <Pressable 
                        style={[styles.button, styles.buttonAction]} 
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate("Home");
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                        </Text>
                    </Pressable>

                    {/* SWITCH MODE */}
                    <Pressable onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.switchText}>
                            {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

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
        width: 320,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    header: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: "100%",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonAction: {
        backgroundColor: "#1e90ff",
    },
    buttonClose: {
        backgroundColor: "#d9534f",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    switchText: {
        color: "#1e90ff",
        marginTop: 10,
        textAlign: "center",
    },
});

