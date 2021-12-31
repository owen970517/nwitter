import { dbService } from "../firebase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Nweet = ({nweetObj , isOwner}) => {
    const [editing , setEditing] = useState(false);
    const [newtext , setNewText] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const permission = window.confirm("정말 삭제하시겠습니까?");

        if(permission) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
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
        <div>
            {editing ? (
                <>
                    {isOwner && ( <>
                    <form onSubmit={onSubmit}>
                        <input value={newtext} placeholder="Modify" required onChange={onModify} />
                        <input type="submit" value="수정"/>
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                    </>)}
                </>
                ) : (                <>
                <h4>{nweetObj.text}</h4>
                {isOwner && ( <>
                    <button onClick={onDeleteClick}>삭제</button>
                    <button onClick={toggleEditing}>수정</button>
                </>) }
                </>)
            }
            
        </div>
    );
}

export default Nweet;