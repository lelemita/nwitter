import React, {useState} from 'react';
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const resp = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(resp.ref);
        }
        const nweetObj = {
            attachmentUrl,
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
        document.querySelector("#attachImg").value = "";
    }; 
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };

    const onChangeFile = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {target: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = (event) => {
        setAttachment("");
        document.querySelector("#attachImg").value = "";
    }

    return (
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
            <input id="attachImg" onChange={onChangeFile} type="file" accept="image/*" />
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img src={attachment} alt="attachment" width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;