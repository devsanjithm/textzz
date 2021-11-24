import React,{useState,useContext,useEffect} from "react";
import { View,Text,Pressable,TextInput,Alert,Image,SafeAreaView,StyleSheet,ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { AuthContext } from "../navigator/Authprovider";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Loading from "./loading";
import AppStatusBar from "./statusbar";


function profile({navigation}){

  

  const {userinfo,setUserinfo} = useContext(AuthContext);
  const [url,setUrl] = useState(userinfo.AvatarURL);
  const [loading,setLoading] = useState(false);
   
    
     const imageupload = async (imgurl) => {
      await storage().ref().child("useravatar/"+userinfo.id).putFile(imgurl)
      const imageurl = await  storage().ref().child("useravatar/"+userinfo.id).getDownloadURL();
      userinfo.AvatarURL = imageurl;
      setUserinfo({...userinfo});
         firestore().collection("users").doc(userinfo.id).set({AvatarURL:imageurl},{merge:true})
         .then((snap1)=>{
               alert("image uploaded successfully");
               setLoading(false);
         })
         .catch((e)=>{
                console.log(e);
                setLoading(false);
         })
       console.log(`${userinfo.id} has been successfully uploaded.`);

     // let imageRef = storage().ref().child("useravatar/"+userinfo.id);

     // imageRef.getDownloadURL()
     // .then((imageurl) => {

        //from url you can fetched the uploaded image easily
            //  firestore().collection("users").doc(userinfo.id).set({AvatarURL:imageurl},{merge:true}).then(() => {
              //      alert("image uploaded");
                    
                    
              //  }).catch((err) => {
               //     setError(err.message);
               // })
     // })
     // .catch((e) => console.log('getting downloadURL of image error => ', e));
      
    
     }

    const imgfile=()=>{
      ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        const imgurl = image.path;
        setUrl(imgurl);
        const img1url = setUrl(url=>imgurl);
        setLoading(true);
        imageupload(imgurl);
      }).catch((e)=>{
        console.log(e);
      });
     
  }

    return(
        <ScrollView style={styles.container}>
          <AppStatusBar backgroundColor={"#1e81b0"} barStyle={'light-content'} />
          <Loading loading = {loading}/>
        <View style={styles.main}>
          <View >
              <Image
              style={styles.img}
              source={{uri:url}}
              />
              <View style={styles.camera}>
                    <Pressable onPress={()=>imgfile()}>
                        <Icons name="camera" style={styles.innercamera}
                        size={25} color="#fff" />
                    </Pressable>
              </View>
          </View>
          <View style={styles.mainname}>
            <Text style={styles.text}><Icons name="person"
              size={20} color="#8c8c8c" />    <Text style={{color:"#494949"}}>Name:</Text>                   <Icon name="edit" onPress={()=>navigation.navigate('Nameedit')} size={25} color="#1e88e5" />{"\n"}        {userinfo.Displayname}     </Text>
            <Text style={styles.text}><Icons name="at-circle"
              size={20} color="#8c8c8c" />    <Text style={{color:"#494949"}}>UserName:</Text>{"\n"}        @{userinfo.Username}</Text>
            <Text style={styles.text}><Icon name="email"
              size={20} color="#8c8c8c" />    <Text style={{color:"#494949"}}>Email:</Text>{"\n"}        {userinfo.Email}</Text>
            <Text style={styles.text}><Icon name="phone"
              size={20} color="#8c8c8c" />    <Text style={{color:"#494949"}}>PhoneNumber:</Text>        <Icon name="edit" onPress={()=>navigation.navigate('Phoneedit')} size={25} color="#1e88e5" />{"\n"}        +91 {userinfo.PhoneNumber}   
              </Text>
          </View>
          
        </View>
    
        
     </ScrollView>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    },bottombbox:{
        flexDirection:"row",
        height:70,
        paddingTop:15,
        justifyContent:"space-around",
      },
      boxbottom:{
          justifyContent:"flex-end",
          width:'100%'
      },
      img:{
        width: 150,
        height: 150,
        borderRadius:150/2,
        margin:15,
        marginTop:50
      },
      main:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
      },
      inputbox:{
        marginTop:50,
        width:'70%',
      },
      box:{
        borderWidth:1,
        borderRadius:30,
        paddingLeft:20
      },
      bbutton:{
        flexDirection:"row",
        width:'80%',
        justifyContent:"space-around",
        marginTop:"auto",
        marginBottom:100
      },
      mainname:{
        marginTop:50,
        marginRight:"auto",
        marginLeft:80
      },
      text:{
        fontSize:19,
        color:"#1e88e5",
        marginVertical:20
      },
      camera:{
        position:"absolute",
        height:45,
        width:45,
        backgroundColor:"#1e88e5",
        borderRadius:35,
        marginTop:150,
        marginLeft:120
      },
      innercamera:{
        marginTop:9,
        marginLeft:10
      },
      
});
export default profile;