import { dbService } from "fbase";
import React, {useState, useEffect} from "react";
import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore"; 
import Nweet from "components/Nweet";


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snap) => {
            const nweetArr = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArr);
        });
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }; 
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;