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
        setuserOb({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        })
      } else {
        setIsLoggedIn(false);
        setuserOb(null);
      }
      setInit(true);
    });
  },[])
  const refreshUser = () => {
    const user = authService.currentUser;
    setuserOb({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    })
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userOb = {userOb}/> : "Loggining..."}
    
    </>
  )
}

export default App;
