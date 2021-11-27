import React,{useContext,useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import Homestack from "./navigator/HomeStack";
import AuthStack from "./navigator/AuthStack";
import auth from '@react-native-firebase/auth';
import { AuthContext } from "./navigator/Authprovider";
import firestore from '@react-native-firebase/firestore';


function route(){
    const [initializing, setInitializing] = useState(true);
    const {user,setUser} = useContext(AuthContext)
    const {userinfo,setUserinfo} = useContext(AuthContext);

    const getuserdata =async(uid)=>{
        const data = await firestore().collection("users").doc(uid).get();
        setUserinfo(data._data);
    }

    // Handle user state changes
    async function onAuthStateChanged(user) {
      setUser(user);
      if(user){
       await getuserdata(user.uid);
      }
      
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return(
        <NavigationContainer>
            {user?<Homestack />:<AuthStack />}
        </NavigationContainer>
    );
}
export default route;