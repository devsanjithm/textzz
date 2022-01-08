import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStatusBar from "./statusbar";

import SplashScreen from 'react-native-splash-screen';
function Login({ navigation }) {

    const [emailcheck, setEmailcheck] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const [error, setError] = useState("");
    const [passwordvisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {

            } else {
                Alert.alert("Network Disconnected")
            }
        });
        SplashScreen.hide();
        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };
    }, []);

    const handleSubmit = () => {
        if (emailcheck.length != 0 && passwordcheck.length != 0) {
            setError("");
            auth().signInWithEmailAndPassword(emailcheck, passwordcheck)
                .then(user => {
                    console.log("Login Successfully !")
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code === ("auth/user-not-found")) {
                        setError("Email not found. Create new account");
                    } else {
                        setError("Invalid Credentials");
                    }
                });
        } else {
            setError("All fileds are Required");
        }

    }

    return (
        <View style={styles.container}>
            <AppStatusBar backgroundColor={"#fff"} barStyle={'dark-content'} />
            <View style={styles.img}>
                <Image style={styles.img1} source={require('../assets/message.png')} resizeMode="center" />
            </View>
            <View style={styles.container1}>
                <View style={styles.container3}>
                    <View style={styles.container4}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Email Address*"
                            onChangeText={userEmail => setEmailcheck(userEmail)}
                            style={styles.inputbox}
                        ></TextInput>
                        <Text style={styles.label}>
                            Password
                        </Text>
                        <View style={styles.passbox}>
                            <TextInput
                                placeholder="Password*"
                                secureTextEntry={!passwordvisible}
                                onChangeText={userPass => setPasswordcheck(userPass)}
                            ></TextInput>
                            <View style={{
                                position: "absolute",
                                right: 15,
                                bottom: 10
                            }}>
                                {passwordvisible ? <Icon name="visibility" onPress={() => setPasswordVisible(!passwordvisible)} size={20} /> : <Icon onPress={() => setPasswordVisible(!passwordvisible)} name="visibility-off" size={20} />}
                            </View>
                        </View>
                    </View>
                    <View style={styles.forpass}>
                        <Text style={styles.forpass1}>Forgot Your Passoword ?</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={{
                                backgroundColor: "#ff3f3f", alignItems: "center",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        ><Text style={{ color: "white" }}>Login</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.error,
                    error && styles.error1
                    ]}>
                        <Text style={{ textAlign: "center", color: "red", fontSize: 18 }}>{error}</Text>
                    </View>
                    <View style={{ marginBottom: 30, marginTop: 10, alignItems: "flex-end" }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                        ><Text>You don't have an account ? <Text style={{ color: "red" }}>Sign Up</Text></Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    img: {
        borderWidth: 2,
        width: 190,
        alignSelf: "center",
        borderRadius: 100,
        borderColor: "#6d465b",
        marginBottom: 50
    },
    img1: {
        width: 190,
        height: 190,
        alignSelf: "center"
    },
    container1: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
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
        marginBottom: 10,
        color: "black",
        fontSize: 18,
        paddingTop: 10,
        alignSelf: "center",
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    inputbox: {
        marginTop: 7,
        marginLeft: 5,
        borderRadius: 20,
        paddingLeft: 20,
        height: 40,
        backgroundColor: "#e8e8e8",
        marginBottom: 10
    },
    passbox: {
        marginTop: 7,
        marginLeft: 5,
        borderRadius: 20,
        paddingLeft: 20,
        height: 40,
        backgroundColor: "#e8e8e8",
        marginBottom: 10,
        flexDirection: "row"
    },
    forpass: {
        marginBottom: 15,
        marginLeft: "auto",
        marginRight: 9,
        paddingTop: 10
    },
    forpass1: {
        color: "red",
        fontSize: 12,
        marginBottom: 10
    },
    error: {
        width: 200,
    },
    error1: {
        width: 200,
        margin: 10,
        paddingTop: 10,
        marginLeft: 70
    }
});


export default Login;