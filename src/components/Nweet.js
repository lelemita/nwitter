import React, {useState} from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject} from "firebase/storage";
import { dbService, storageService } from 'fbase';

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
            text: newNweet,
        });
        setEditing(false);
    };
    const toogleEditing = () => setEditing((prev) => !prev);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            if(nweetObj.attachmentUrl) {
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            }
        }
    };
    return (
        <div>
            {editing? (
                <>
                    {isOwner && (<>
                        <form onSubmit={onSubmit}>
                            <input type="text" value={newNweet} onChange={onChange}
                                placeholder="Edit your nweet" required/>
                            <input type="submit" value="Update Nweet"/>
                        </form>
                        <button onClick={toogleEditing}>Cancle</button>
                    </>)}
                </>
            ):(
                <div>
                    <h4>
                        {nweetObj.text}
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt="attachment" width="50px" height="50px" />}
                    </h4>
                    {isOwner && <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toogleEditing}>Edit Nweet</button>
                    </>}
                </div>
            )}
        </div>
    )};
export default Nweet;