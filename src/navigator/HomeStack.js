import React,{useContext,useState} from "react";
import { Image,Pressable, View,Text,Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screen/home";
import auth from '@react-native-firebase/auth';
import chatscreen from "../screen/chatscreen";
import Settingpage from "../screen/settings"
import Profile from "../screen/profile";
import Nameedit from "../screen/nameedit";
import Phoneedit from "../screen/phoneedit";
import { AuthContext } from "../navigator/Authprovider";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const homeStack = createNativeStackNavigator();

function homestack(){
  const {userinfo,setUserinfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const {searchkey,setSearchkey} = useContext(AuthContext);


  const hideMenu = () =>{ setVisible(false);
  };

  const logout=()=>{
    setVisible(false);
    handleclick();
  }

  const search=()=>{
    if(searchkey){
      setSearchkey(0);
    }else{
      setSearchkey(1)
    }
  }

  const handleclick = () => {
    Alert.alert(
      'Logout',
      'Do You Want to Logout ?',
      [
        {text: 'NO', onPress: () => setVisible(false)},
        {text: 'YES', onPress: () => alertcheck()},
      ]
    );
  }

  const alertcheck =()=>{
        auth().signOut().then(() => {
          console.log("logout successfully");
        }).catch((error) => {
            console.log(error.message);
        });
  }


  return(
    <homeStack.Navigator initialRouteName="Home" >
        <homeStack.Screen name="Home" component={Home}  options={({navigation,route})=>({
          title: 'TextZZ',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1e81b0',
          },
          headerLeft:()=>(
            <Pressable 
            onPress={()=>{navigation.navigate('Profile')}}
            >
            <Image
            style={{width:37,height:37,borderRadius:25,marginRight:15}}
            source={{uri:userinfo.AvatarURL}}
            ></Image></Pressable>
          ),
          headerRight:()=>(
            <View style={{flexDirection:"row"}}> 
              <Icons name="search" 
              onPress={()=>search()}
              style={{marginRight:10}} size={25} color="#fff"/>
              
              <Menu
                visible={visible}
                anchor={<Icon name="dots-vertical" onPress={()=>setVisible(true)}  style={{marginLeft:10}} size={25} color="#fff"/>}
                onRequestClose={hideMenu}
              >
                <MenuItem>
                <Text style={{color:"black"}}>
                  New Group
                  </Text>
                </MenuItem>
                <MenuItem onPress={()=>{navigation.navigate("Settingpage")}}>
                <Text style={{color:"black"}}>
                  Settings
                  </Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={()=>logout()}>
                <Icon name="logout" size={15} color="black"/><Text style={{color:"red"}}> Logout</Text>
                </MenuItem>
              </Menu>
            </View>
          ),
          headerShadowVisible:false,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize:24,
          },
          
        })}/>
        <homeStack.Screen name="Chatscreen" component={chatscreen}
          options={({ route }) => ({ title: route.params.disname,
          headerTitleStyle:{
            fontSize:19,
            color:'white'
          },
          headerStyle: {
            backgroundColor: '#1e81b0',
          },
          headerShadowVisible:false,
          headerTintColor:"#fff",
          headerTitleAlign:"center"
          })}
        />
        <homeStack.Screen name="Profile" component={Profile}
          options={{
            title:'Profile',
            headerShadowVisible:false,
          headerTitleStyle:{
            fontSize:19,
            color:"white"
          },
          headerStyle: {
            backgroundColor: '#1e81b0',
          },
          headerTintColor:"#fff",
          headerTitleAlign:"center"
          }}
        />
        <homeStack.Screen name="Nameedit" component={Nameedit}
          options={{
            headerShown:false
          }}
        />
        <homeStack.Screen name="Phoneedit" component={Phoneedit}
          options={{
            headerShown:false
          }}
        />
        <homeStack.Screen name="Settingpage" component={Settingpage}
          options={{
            title:'Settings',
            headerShadowVisible:false,
            headerTitleStyle:{
              fontSize:19,
              color:"white"
            },
            headerStyle: {
              backgroundColor: '#1e81b0',
            },
            headerTintColor:"#fff",
            headerTitleAlign:"center"
          }}
        />
        
    </homeStack.Navigator>

  );
}
export default homestack;