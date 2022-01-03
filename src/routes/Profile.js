import { authService, dbService } from "../firebase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import styles from "style.css";

export default ({userOb , refreshUser})=> {
    const history = useHistory();
    const [newDisplayName , setDisplayName] = useState(userOb.displayName);
    const onLogOutClick =()=>{
         authService.signOut();
         history.push("/")
        };
    const getMyNweets =async () => {
        const nweets = await dbService.collection('nweets').where("createrId" , "==" , userOb.uid).orderBy("createAt" , "asc").get();
        console.log(nweets.docs.map((doc)=>doc.data()));
    }
    useEffect(()=> {
        getMyNweets();
    },[])
    const onChange = (e) => {
        const {target : {value}} = e;
        setDisplayName(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(userOb.displayName != newDisplayName) {
            await userOb.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser();
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} className="ProfileForm">
                <input className="ProfileName" type="text" placeholder = "name" onChange={onChange} value={newDisplayName}></input>
                <input className = "ModifyProfile" type="submit" value="수정"/>
                <hr/>
                <button className="LogOutBtn" onClick={onLogOutClick}>Log Out</button>
            </form>
        
        </>
    )
};