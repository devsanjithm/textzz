import React from "react";
import { AuthProvider } from "./src/navigator/Authprovider";
import Route from "./src/route"


export default function App() {
  return (
    <AuthProvider>
        <Route />
    </AuthProvider>
  );
}