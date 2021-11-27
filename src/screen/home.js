import React,{useState,useContext,useEffect} from "react";
import { View,Text,TextInput,Alert,Image,TouchableOpacity,FlatList,Pressable,Button,SafeAreaView,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppStatusBar from "./statusbar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../navigator/Authprovider";
import Loading from "./loading";
import moment from 'moment';


function home({navigation}){
    
    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState([]);
    const {userinfo,setUserinfo} = useContext(AuthContext);
    const {user,setUser} = useContext(AuthContext)
    const {searchkey,setSearchkey} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    let data=[];
    var d = 1;
    const currentUser = user.uid;


    function search(text){   
      const newData =info1.filter(item => {  
          console.log(item.Displayname)    
        const itemData = `${item.Displayname.toUpperCase()}`;
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      
       setInfo(newData);
    }
    
      useEffect(() => {
        setSearchkey(0)
        const unsubscribe  = firestore()
        .collection('home').doc(currentUser).collection("userlist")
        .orderBy('latestmessage.createdAt', 'desc')
        .onSnapshot((querySnapshot) => {

            const threads = querySnapshot.docs.map(element => {
              return{
                id:element.id,
                name:"",
                
                latestmessage:{
                  content:""
                },
                ...element.data()
              };
          });
          
          setInfo(threads);
          setInfo1(threads);
          if (loading) {
            setLoading(false);
          }
        });
        return ()=>{
            unsubscribe();
            console.log("return")
        }
      }, [])

      function Item({ title, dp,lm,lmtime}) {
        function timedate(){
            const date = moment(Number(lmtime)).format('L');
            const time = moment(Number(lmtime)).format('LT');
            const now1 = moment(Number(lmtime)).fromNow();
            return now1
      }
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
                <View style={{position:"absolute",right:55,top:5}}>
                <Text style={{fontSize:10,color:"black"}}>{timedate()}</Text>
                </View>
              </View>
              <Text numberOfLines={1} style={{fontSize:10,color:"#333333"}}>{lm}</Text>
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
                  setInfo(info1)
                  navigation.navigate('Chatscreen',{id:item.id, disname :item.Displayname})}}
                 > 
                <Item title={item.Displayname} dp = {item.AvartarURL}  lm = {item.latestmessage.content}
                lmtime={item.latestmessage.createdAt}
                />
                </TouchableOpacity>
        )}
         keyExtractor={item => item.id}
         ListHeaderComponent={searchfinder()}
         />
         <View style={styles.mesplus}>
           <Pressable onPress={()=>navigation.navigate("Selectuser")}>
           <View style={styles.outercircle}>
              <Icon name="message-plus" size={33} color="#fff" style={styles.messageplus}/>
            </View>
            </Pressable>
         </View>
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
export default home;