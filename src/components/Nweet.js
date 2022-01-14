import { dbService, storageService } from "../firebase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Nweet = ({nweetObj , isOwner}) => {
    const [editing , setEditing] = useState(false);
    const [newtext , setNewText] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const permission = window.confirm("정말 삭제하시겠습니까?");

        if(permission) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentURL).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text : newtext
        });
        setEditing(false);
    }
    const onModify =(e) => {
        const {target :{value} } = e;
        setNewText(value);
    }
    return (
        <div className="nweets">
            {editing ? (
                <>
                    {isOwner && ( <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input value={newtext} placeholder="Modify" required onChange={onModify} className="formInput" />
                        <input type="submit" value="수정" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                    </>)}
                </>
                ) : ( <>
                
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width="50px" height = "50px"/>}
                    {isOwner && ( <>
                        <div class="nweet__actions">
                        <span onClick={onDeleteClick}>삭제</span>
                        <span onClick={toggleEditing}>수정</span>
                        </div>
                    
                    </>) }
               
                </>)
            }
            
        </div>
    );
}

export default Nweet;