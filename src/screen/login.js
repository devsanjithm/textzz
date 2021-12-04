import React,{useContext,useEffect, useState} from "react";
import { View,Text,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from "@react-native-community/netinfo";
function Login({navigation}){

    const [emailcheck, setEmailcheck] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
         if(state.isConnected){
             
         }else{
             Alert.alert("offline, please make sure u online"+"\n"+"And try Again")
         }
        });
    
        return () => {
          // Unsubscribe to network state updates
          unsubscribe();
        };
      }, []);
  
    const handleSubmit = () => {
        auth().signInWithEmailAndPassword(emailcheck, passwordcheck)
            .then(user => {
                    console.log("Login Successfully !")
            })
            .catch((error) => {
                console.log(error)
                if(error.code===("auth/user-not-found")){
                    setError("Email not found. Create new account");
                }else{
                    setError("Invalid Credentials");
                }
            });

    }

    return(
        <View style={styles.container}>
            <View style={styles.container1}><Text style={styles.headertext}>Hello Again</Text>
            <View style={styles.container3}>
                <View style={styles.container4}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput 
                    placeholder="Email-id" 
                    onChangeText={userEmail=>setEmailcheck(userEmail)}
                    style={styles.inputbox} 
                    ></TextInput>
                    <Text style={styles.label}> 
                        Password
                    </Text>
                    <TextInput 
                    placeholder="password" 
                    secureTextEntry={true}
                    onChangeText={userPass=>setPasswordcheck(userPass)} 
                    style={styles.inputbox}
                    ></TextInput>
                </View>
                <View style={styles.forpass}>
                    <Text style={styles.forpass1}>Forgot Your Passoword ?</Text>
                </View>
                <View>
                    <TouchableOpacity  
                    onPress={handleSubmit}
                    style={{
                        backgroundColor:"red", alignItems: "center",
                        padding: 10,
                        borderRadius:10,
                    }}
                    ><Text style={{color:"white"}}>Login</Text></TouchableOpacity>
                </View>
                <View style={[styles.error,
                error && styles.error1
                ]}>
                    <Text style={{textAlign:"center"}}>{error}</Text>
                </View>
                <View style={{marginBottom:30,marginTop:10}}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('Signup')}
                    ><Text>You don't have an account ? <Text style={{color:"red"}}>Sign Up</Text></Text></TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        backgroundColor:"#eaeaea",
        justifyContent:"center"
    },
    container1:{
        backgroundColor:"#fff",
        alignItems:"center",
        marginBottom:50,
        borderRadius:20
    },
    headertext:{
        fontWeight:"bold",
        fontSize:30,
        paddingTop:30,
        color:"black",
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom:10

    },
    container3:{
        flexDirection:"column"
    },
    container4:{
        marginBottom:5,
    },
    label:{
        marginRight:24,
        marginBottom:2,
        color:"black",
        paddingTop:10
    },
    inputbox:{
        marginTop:7,
        marginLeft:5,
        borderWidth:1,
        borderColor: "gray",
        borderRadius: 20,
        paddingLeft:15,
        height:40,
    },
    forpass:{
        marginBottom:15,
        marginLeft:"auto",
        marginRight:9,
        paddingTop:10
    },
    forpass1:{
        color:"red",
        fontSize:12,
        marginBottom:10
    },
    error:{
        width:200,
    },
    error1:{
        width:200,
        margin:10,
        paddingTop:10
    }
});


export default Login;