import React,{useContext, useState} from "react";
import { View,Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import AppStatusBar from "./statusbar";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../navigator/Authprovider";

export default function phoneedit({navigation}){
    const {userinfo,setUserinfo} = useContext(AuthContext);
    const [text, onChangeText] = useState(userinfo.PhoneNumber);
    


    function handleclick(){
        if(text != userinfo.PhoneNumber){
            firestore().collection("users").doc(userinfo.id).update({PhoneNumber:text})
            .then(()=>{
                console.log("PhoneNumber Updated..")
                userinfo.PhoneNumber = text;
                setUserinfo({...userinfo});
                console.log(userinfo)
                navigation.goBack();
            })
        }else{
            navigation.goBack();
        }
    }


    return(
        <View style={styles.container}>
            <AppStatusBar backgroundColor={"#fff"} barStyle={'dark-content'} />
            <View style={styles.main}>
                <Text style={styles.label}>
                    Enter Your PhoneNumber
                    {'\n'}to Update
                </Text>
                <View style={{width:350,marginLeft:20}}>
                <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10} 
                onChangeText={onChangeText}
                placeholder="to Update"
                value={text}/></View>
                <View style={styles.bbtn}>
                    <TouchableOpacity
                    style = {styles.submitButton1}
                    onPress={()=>{navigation.goBack()}}
                    >
                    <Text style = {styles.submitButtonText}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {styles.submitButton}
                    onPress={()=>{handleclick()}}
                    >
                    <Text style = {styles.submitButtonText}> Update </Text>
                    </TouchableOpacity>
                </View>
            </View>
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