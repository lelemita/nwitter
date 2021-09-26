import { dbService } from "fbase";
import React, {useState, useEffect} from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    const getAllNweets = async () => {
        const qry = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        const snap = await getDocs(qry);
        const nweetArr = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        setNweets(nweetArr)
    };
    useEffect(() => {
        getAllNweets();
    }, [])

    return(
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;