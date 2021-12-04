import React,{useContext, useState} from "react";
import { View,Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import AppStatusBar from "./statusbar";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../navigator/Authprovider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function settings({navigation}){
    const {userinfo,setUserinfo} = useContext(AuthContext);
    const [text, onChangeText] = useState(userinfo.PhoneNumber);

    const getlocaldata = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('homeuserlist')
           const value = (jsonValue != null ? JSON.parse(jsonValue) : null);
           console.log(value);
        } catch(e) {
          // error reading value
          console.log(e)
        }
      }


    return(
        <View style={styles.container}>
            <AppStatusBar backgroundColor={"#1e81b0"} barStyle={'light-content'} />
            <TouchableOpacity
            onPress={()=>{getlocaldata()}}
            >
                <Text>welcome</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    },
    input: {
        height: 50,
        marginVertical:20,
        borderWidth: 1,
        padding: 10,
        paddingLeft:20,
        marginHorizontal:10,
        borderRadius:20,
      },
      label:{
        marginBottom:20,
        color:"black",
        paddingTop:10,
        fontSize:25,
        marginLeft:40
    },
    main:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        marginBottom:150
      },
      submitButton: {
        backgroundColor: '#1e88e5',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius:10
     },
      submitButton1: {
        backgroundColor: '#969696',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius:10
     },
     submitButtonText:{
        color: 'white'
     },
     bbtn:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:35
     }
});