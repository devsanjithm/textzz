import React,{useState,useContext,useEffect} from "react";
import { View,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../navigator/Authprovider";
import Loading from "./loading";
import AsyncStorage from '@react-native-async-storage/async-storage';

function chatscreen({route}){
    const {id} = route.params;
    const {userinfo,setUserinfo} = useContext(AuthContext);
    const {searchkey,setSearchkey} = useContext(AuthContext);
    const {latsm,setLatsm} = useContext(AuthContext);
    const [inputValue,setInputValue] = useState("");
    const [listMessage,setListMessage] = useState([]);
    const [loading,setLoading] = useState(true);
    const [val, setval] = useState(0);
    const [groupchatid,setGroupchatid] = useState("");
    var chatid="";
    var cupp = id;
    var removeListener = "";
    const [mme,setMee] = useState();
    const imgurl = "https://backgroundcheckall.com/wp-content/uploads/2017/12/whatsapp-default-background-wallpaper-8.jpg";


    const currentUser = userinfo.id

    useEffect(() => {
        setSearchkey(0);
        setLoading(true)
        if (val === 0) {
            setval(1);
            nnew();
            
          }else{
            cupp = id;
            nnew();
          }
          return () => {
            if (removeListener) {
              removeListener();
              console.log("loged")
            }
        }
      }, [])


      

   function nnew (){
            if (removeListener) {
                removeListener();
            }
            if (
                hashString(currentUser) <=
                hashString(cupp)
            ) {
                setGroupchatid(`${currentUser}-${cupp}`)
                chatid=`${currentUser}-${cupp}`;
            } else {
                setGroupchatid(`${cupp}-${currentUser}`)
                chatid=`${cupp}-${currentUser}`;
            }
            setListMessage([])
            //const nstub =collection(firestore(),"messages", chatid,chatid)
             removeListener = firestore().collection("messages").doc(chatid).collection(chatid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((doc) => {
                    var data = doc.doc.data();
                    if(doc.type === "added"){
                        setListMessage(listMessage=>listMessage.concat(data));
                    }
                });
            });
           setLoading(false)
    }

   

    function hashString (str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
          hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
          hash = hash & hash // Convert to 32bit integer
      }
      return hash
    }
    
    function renderListMessage () {
       
      
      if (listMessage.length > 0) {
    
         var viewListMessage=[]

          listMessage.forEach((item, index) => {
              if (item.idFrom === currentUser) {
                  // Item right (my message)
                 
                  if (item.type === 0) {
                      viewListMessage.push(
                        <View style={styles.messageme}>
                            <Text style={styles.message2}>{item.content}</Text>
                        </View>
                
                    
                      )
                      }
                  
              } else {
                  // Item left (peer message)
                  if (item.type === 0) {
                      viewListMessage.push(
                    
                        <View style={styles.messagefrom}>
                            <Text style={styles.message1}>{item.content}</Text>
                        </View>
                    
                      )
                  
                  } 
              }
          })
          return viewListMessage
      }
    }
    
    
   
    
    const onSendMessage = (content, type) => {
        
      if (content.trim() === '') {
          return
      }
    
      const timestamp = moment()
          .valueOf()
          .toString()
    
      const itemMessage = {
          idFrom: currentUser,
          idTo: cupp,
          timestamp: timestamp,
          content: content.trim(),
          type: type
      }
      setInputValue("");
      firestore()
          .collection("messages")
          .doc(groupchatid)
          .collection(groupchatid)
          .doc(timestamp)
          .set(itemMessage)
          .then(() => {
             setInputValue("");
             
          })
          .catch(err => {
              console.log(err.message);
              setInputValue(content)
          })
    }
    
    function onKeyboardPress(event) {
       
        if (event.key === 'Enter') {
            onSendMessage(inputValue, 0)
        }
        
      }


return(
    <View style={styles.container}>
        <Loading loading = {loading}/>
         <ImageBackground resizeMode="cover" style={styles.image}
        source={{uri:imgurl}}
        >
       <ScrollView ref={el => setMee(el)}
      onContentSizeChange={(contentWidth, contentHeight) => {
        mme.scrollToEnd({ animated: false });
      }}
       >
          
           {renderListMessage()}
           
       </ScrollView>
      
       <View  style={styles.textbtn}>
            <View style={styles.textbox}>
                <TextInput
                keyboardType="default"
                value={inputValue}
                placeholder="Type your message..."
                onChangeText={text=>setInputValue(text)}
                style={styles.inputbox}
                onKeyPress={()=>onKeyboardPress}
                >
                </TextInput>
            </View>
            <View style={styles.btn}>
            <Icon name="send"
            onPress={()=>onSendMessage(inputValue,0)}
            size={30} color="#fff" />
            </View>
        </View>
        </ImageBackground>
    </View>
);
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    messageme:{
        backgroundColor:"#e3f2fd",
        margin:10,
        alignSelf:"flex-end",
        borderTopStartRadius:12,
        borderBottomLeftRadius:12,
        borderTopRightRadius:12,
        elevation:2
    },
    image: {
        flex: 1,
        justifyContent: "center",
      },
    messagefrom:{
        flex:1,
        elevation:2,
        margin:10,
        backgroundColor:"#fff",
        alignSelf:"flex-start",
        borderTopStartRadius:12,
        borderBottomRightRadius:12,
        borderTopRightRadius:12
    },
    message1:{
        marginRight:3,
        padding:7,
        color:"#263238",
        fontSize:16,
    },
    message2:{
        marginRight:3,
        padding:7,
        color:"#263238",
        fontSize:16,
    },
    textbtn:{
        flexDirection:"row",
        marginBottom:5,
        padding:10,
        alignItems:"center"
    },
    btn:{
        justifyContent:"center",
        alignItems:"center",
        width:50,
        height:50,
        borderRadius:35,
        backgroundColor:"#1e88e5",
        elevation:2
    },
    textbox:{
        flex:1,
        borderColor:"#fff",
        borderWidth:1,
        borderRadius:35,
        backgroundColor:"#fff",
        marginRight:10,
        elevation:2
    },
    inputbox:{
        paddingLeft:25,
    }
});
export default chatscreen;