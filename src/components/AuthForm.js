import React from "react";
import { authService} from "../firebase";
import { useState } from "react";

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
        <form onSubmit={onSubmit}>
            <input name = "email" type="email" placeholder="email" required value={email} onChange={onChange}></input>
            <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange}></input>
            <input type="submit" value={newAccount ? "Create Account" : "Sign in "}></input>
            {error}
            <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
        </form>
        </>
    )
}
export default AuthForm;