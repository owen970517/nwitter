import { authService, firebaseInstance } from "../firebase";
import React, { useEffect, useState } from "react";
import AuthForm from "components/AuthForm";
import styles from "style.css";

const Auth = () => {

    const onSocialClick = async (e) => {
        const {target : {name },
        } = e;
        let provider;
        if(name ==="google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name==="github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
    <div className="container">
        <AuthForm/>
        <div className="SocialLogin">
            <button onClick={onSocialClick} name= "google">Google</button>
            <button onClick={onSocialClick} name = "github">GitHub</button>
        </div>
    </div>);
}
export default Auth;