import React, { useEffect } from "react";
import { AuthProvider } from "./src/navigator/Authprovider";
import Route from "./src/route"
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, [])

  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
}