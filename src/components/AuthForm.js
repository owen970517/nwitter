import React from "react";
import { authService} from "../firebase";
import { useState } from "react";
import styles from "style.css";

const AuthForm = () => {
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
    return (
        <>
        <form className="LoginForm" onSubmit={onSubmit}>
            <input className="IdForm" name = "email" type="email" placeholder="E-mail" required value={email} onChange={onChange}></input>
            <input className="PasswordForm" name = "password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
            <input className="SubmitForm" type="submit" value={newAccount ? "Create Account" : "Sign in "}></input>
            {error}
            <span className="toggleForm" onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
        </form>
        </>
    )
}
export default AuthForm;