import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "../firebase";

function App() {
  const [init , setInit] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [userOb , setuserOb] = useState();
  useEffect(()=> {
    authService.onAuthStateChanged((user)=> 
    {
      if(user) {
        setIsLoggedIn(true);
        setuserOb(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userOb = {userOb}/> : "Loggining..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;
