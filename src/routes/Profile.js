import { authService, dbService } from "fbase";
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOutClick = (event) => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(newDisplayName !== userObj.displayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    };
    
    const getMyNweets = async () => {
        const qry = query(
            collection(dbService, "nweets"), 
            where("creatorId", "==", userObj.uid), 
            orderBy("createdAt", "desc")
        );
        const snaps = await getDocs(qry);
        console.log(snaps.docs.map(doc => doc.data()));
    };
    useEffect(() => {
        getMyNweets();
    }, []);

    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display Name" />
            <input type="submit" />
        </form>
        <button onClick={onLogOutClick}>Sign Out</button>
    </>);
    };
export default Profile;