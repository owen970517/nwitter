import { authService, firebaseInstance } from "../firebase";
import React, { useEffect, useState } from "react";

const Auth = () => {
        const [email , setEmail] = useState("");
        const [password , setPassword] = useState("");
        const [newAccount , setNewAccount] = useState(true);
        const [error , setError] = useState("");
        const onChange = (e) => {
            const {target : {name , value}} = e;
            if(name === "email") {
                setEmail(value);
            }else if(name === "password") {
                setPassword(value);
            }
        }
        const onSubmit = async (e)=> {
            e.preventDefault();
            try{   
                let data;
                 if(newAccount) {
                    data = await authService.createUserWithEmailAndPassword(email , password);
            } else {
                data = await authService.signInWithEmailAndPassword(email , password);
            } 
            console.log(data);
        }
        catch(error) {
                setError(error.message);
            }
        }
    const toggleAccount = () => setNewAccount(prev => !prev);
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
    <div>
        <form onSubmit={onSubmit}>
            <input name = "email" type="email" placeholder="email" required value={email} onChange={onChange}></input>
            <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange}></input>
            <input type="submit" value={newAccount ? "Create Account" : "Sign in "}></input>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name= "google">Google</button>
            <button onClick={onSocialClick} name = "github">GitHub</button>
        </div>
    </div>);
}
export default Auth;