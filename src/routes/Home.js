import { dbService } from "../firebase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
const Home = ({userOb})=> {
    const [nweet , setNweet] = useState("");
    const [nweets , setNweets] = useState([]);

    useEffect(()=>{
        dbService.collection('nweets').onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id ,
                ...doc.data()}));
                setNweets(nweetArray);
        });
    },[])
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("nweets").add({ 
            text:nweet , 
            createAt : Date.now(),
            createrId : userOb.uid,});
        setNweet("");
    }
    const onChange = (e) => {
        const{target : {value}} = e;
        setNweet(value);
    }
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="qwe" maxLength={120}/>
            <input type='submit' value='Nweet'/>
        </form>
        <div>
            {nweets.map((nweet) => <Nweet key = {nweet.id} nweetObj = {nweet} isOwner ={nweet.createrId === userOb.uid}/>)}
        </div>
    </div>
    );
};
export default Home;