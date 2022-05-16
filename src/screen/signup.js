import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppStatusBar from "./statusbar";
import Loading from "./loading";

function signup({ navigation }) {

    const [email, setEmail] = useState("");
    const [displayname, setDisplayname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (email.length === 0 || password.length === 0 || username.length === 0 || phone.length === 0 || displayname.length === 0) {
            setError("All fileds are Required");
            return;
        }
        setError("");
        try {
            await auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    setLoading(true);
                    firestore().collection("users").doc(user.user.uid)
                        .set({
                            Email: email,
                            password: password,
                            Displayname: displayname,
                            PhoneNumber: phone,
                            Username: username,
                            id: user.user.uid,
                            AvatarURL: "https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png"
                        }).then(() => {
                            setLoading(false);
                            alert("User Created Successfully");
                            alert("Welcome to TextZZ");

                        }).catch((err) => {
                            setError(err.message);
                        })

                }).catch(err => {
                    console.log(err)
                    alert("User already exists")
                    navigation.goBack();
                });
        } catch (e) {
            console.log(e);
        }
    }
    function inputcheck() {
        var name = email.substring(0, email.lastIndexOf("@"));
        setUsername(name);
        console.log(name);
    }

    return (
        <View style={styles.container}>
            <AppStatusBar backgroundColor={"#eaeaea"} barStyle={'dark-content'} />
            <Loading loading={loading} />
            <View style={styles.container1}>
                <Text style={styles.headertext}>WELCOME !</Text>
                <View style={styles.container3}>
                    <View style={styles.container4}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Email-id"
                            keyboardType="email-address"
                            onChangeText={userEmail => {
                                setEmail(userEmail)
                                setError("")
                            }}
                            style={styles.inputbox}
                        ></TextInput>
                        <Text style={styles.label}>
                            Displayname
                        </Text>
                        <TextInput
                            placeholder="DisplayName"
                            keyboardType="default"
                            onKeyPress={() => inputcheck()}
                            onChangeText={userdisplayname => {
                                setDisplayname(userdisplayname)
                                setError("")
                            }}
                            style={styles.inputbox}
                        ></TextInput>
                        <Text style={styles.label}>
                            PhoneNumber
                        </Text>
                        <TextInput
                            placeholder="PhoneNumber"
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={userphone => {
                                setPhone(userphone)
                                setError("")
                            }}
                            style={styles.inputbox}
                        ></TextInput>
                        <Text style={styles.label}>
                            Password
                        </Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={userpass => {
                                setPassword(userpass)
                                setError("")
                            }}
                            style={styles.inputbox}
                        ></TextInput>
                        <View>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={{
                                    backgroundColor: "red", alignItems: "center",
                                    padding: 10,
                                    borderRadius: 10,
                                    marginTop: 20
                                }}
                            ><Text style={{ color: "white" }}>Sign Up</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.error,
                        error && styles.error1
                        ]}>
                            <Text style={{ textAlign: "center", color: "red", fontSize: 18 }}>{error}</Text>
                        </View>
                        <View style={{ marginBottom: 30, marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            ><Text>Already have an account ? <Text style={{ color: "red" }}>Sign In</Text></Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea",
        justifyContent: "center"
    },
    container1: {
        backgroundColor: "#fff",
        alignItems: "center",
        marginBottom: 50,
        borderRadius: 20
    },
    headertext: {
        fontWeight: "bold",
        fontSize: 30,
        paddingTop: 30,
        color: "black",
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10

    },
    container3: {
        flexDirection: "column"
    },
    container4: {
        marginBottom: 5,
    },
    label: {
        marginRight: 24,
        marginBottom: 2,
        color: "black",
        paddingTop: 10
    },
    inputbox: {
        marginTop: 7,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        paddingLeft: 15,
        height: 40
    },
    error: {
        width: 200,
    },
    error1: {
        width: 200,
        margin: 10,
        paddingTop: 10
    }
});

export default signup;