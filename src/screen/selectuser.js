import React,{useState,useContext,useEffect} from "react";
import { View,Text,TextInput,Alert,Image,TouchableOpacity,FlatList,Pressable,Button,SafeAreaView,StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppStatusBar from "./statusbar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../navigator/Authprovider";
import Loading from "./loading";
import AsyncStorage from '@react-native-async-storage/async-storage';

function selectuser({navigation}){
    
    const [info, setInfo] = useState([]);
    const {user,setUser} = useContext(AuthContext);
    const [info1, setInfo1] = useState([]);
    const {userinfo,setUserinfo} = useContext(AuthContext);
    const {searchkey,setSearchkey} = useContext(AuthContext);
    const [inputValue,setInputValue] = useState("");
    const [loading,setLoading] = useState(true);
    let data=[];
    var d = 1;

    function search(text){   
      const newData =info1.filter(item => {  
           
        const itemData = `${item.Displayname.toUpperCase()}`;
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      
       setInfo(newData)
    }
    
      function getdata(){
        setInfo([])
        firestore().collection("users").get().then((doc)=>{
          doc.forEach(element => {

            var data = element.data();
            if (data.id !== user.uid) {
              setInfo(arr => [
                  ...arr,
                  data
              ]);
              setInfo1(arr => [
                ...arr,
                data
            ]);
          }
        });
      });
        setLoading(false)
      }

      useEffect(() => {
        setSearchkey(0)
        getdata();
        
      }, [])

      function Item({ title, dp}) {
        return (
          <View style={styles.item}>
            <View style={styles.imgwrap}>
            <Image
            style={{width:50,height:50,borderRadius:25}}
            source={{uri:dp}}
            /></View>
            <View style={styles.textsection}>
              <View style={styles.userinfo}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <Text style={{fontSize:14,color:"#333333"}}></Text>
            </View>
          </View>
        );
      }
    
      function searchfinder(){
        if(searchkey){
          return(
            <View style={styles.searchbox}>
            <TextInput
                keyboardType="default"
                placeholder="Search..."
                onChangeText={text=>search(text)}
            >
            </TextInput>
            </View>
          );
        }else{
          return null;
        }
      }

 return(
     <View style={{flex:1}}>
       <AppStatusBar backgroundColor={"#1e81b0"} barStyle={'light-content'} />
       <View style={styles.topbox}>
       </View>
       
       <SafeAreaView style={styles.container}>
       
       <Loading loading = {loading}/>
        <FlatList
         data={info}
         showsVerticalScrollIndicator={false}
         renderItem={({item})=>(
                <TouchableOpacity
                onPress={()=>{
                  setInfo(info1);
                  navigation.navigate('Chatscreen',{id:item.id, disname :item.Displayname})}}
                 > 
                <Item title={item.Displayname} dp = {item.AvatarURL}  />
                </TouchableOpacity>
        )}
         keyExtractor={item => item.id}
         ListHeaderComponent={searchfinder()}
         />

        </SafeAreaView>
     </View>
 );
}

const styles=StyleSheet.create({
    container:{
      flex:1,
        paddingHorizontal:20,
        backgroundColor:"#ffffff"
    },
      item:{
        flexDirection:"row",
        justifyContent:"space-between"
      },
      imgwrap:{
        paddingVertical:15
      },
      title: {
        fontSize: 19,
        fontWeight:"500",
        color:"black"
      },
    textsection:{
      flexDirection:"column",
      justifyContent:"center",
      padding:15,
      paddingLeft:5,
      marginLeft:15,
      width:"100%",
      borderBottomWidth:1,
      borderBottomColor:"#cccccc"
    },
    userinfo:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:5
    },
    topbox:{
      width:'100%',
      height:5,
      paddingBottom:10,
      backgroundColor:"#fff"
    },
    searchbox:{
      borderWidth:1,
      borderRadius:25,
      borderColor:"#1e81b0",
      width:350,
      paddingLeft:20,
      
    },
    messageplus:{
      alignSelf:"center",
      marginTop:10
    },
    mesplus:{
      position:"absolute",
      bottom:25,
      right:25
    },
    outercircle:{
      width:55,
      height:55,
      borderRadius:35,
      backgroundColor:"#1e81b0"
    }
});
export default selectuser;