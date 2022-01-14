import { dbService, storageService } from "../firebase";
import  { useState } from "react";
import { v4 as uuidv4} from "uuid";
import React from "react";

const NweetFactory = ({userOb}) => {
    const [nweet , setNweet] = useState("");
    const [attachment ,setAttachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        // 사진을 올리지 않는 사람도 있기 때문에 초기값을 null 로 설정 
        let attachmentURL = "";
        if (attachment != "") { 
            const attachmentRef = storageService.ref().child(`${userOb.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet , 
            createAt : Date.now(),
            createrId : userOb.uid,
            attachmentURL,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet(""); 
        setAttachment("");
    }
    const onChange = (e) => {
        const{target : {value}} = e;
        setNweet(value);
    };
    const onFileChange = (e) => {
        const {target : {files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishEvent) => {
            const {currentTarget : { result }, } = finishEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);


    }
    const DeletePhoto = () => {
        setAttachment("");
        
    }
    return (
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
            <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="내용을 적으시오" maxLength={120}/>
            <input className="factoryInput__arrow" type='submit' value='&rarr;' />
        </div>
        <label className ="input-file-button" for ="file-input">사진 추가</label>
        <input id = "file-input" type="file" accept="image/*" onChange={onFileChange} style={{display :"none"}} />
        {attachment && <div>
            <img src={attachment} className="previewImg" width="100px" height="100px"/>
            <button onClick={DeletePhoto} >지우기</button>
        </div> }
    </form>
    )
}
export default NweetFactory;