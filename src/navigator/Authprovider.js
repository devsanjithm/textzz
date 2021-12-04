import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';


 const AuthContext = createContext({});

 const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userinfo,setUserinfo] = useState([]);
  const [searchkey,setSearchkey] = useState(0);
  const [ onlinecheck,setonlinecheck] = useState(0);
    return (
      <AuthContext.Provider
        value={{user,setUser,userinfo,setUserinfo,searchkey,setSearchkey,onlinecheck,setonlinecheck}}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export {AuthContext,AuthProvider};