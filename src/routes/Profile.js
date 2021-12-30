import { authService } from "../firebase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default ()=> {
    const history = useHistory();
    const onLogOutClick =()=>{
         authService.signOut();
         history.push("/")
        };
    return (
        <>
            <h3>Hi Here is Your Profile</h3>
            <button onClick={onLogOutClick}>Log Out</button>
        
        </>
    )
};