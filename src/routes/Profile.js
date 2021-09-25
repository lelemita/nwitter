import { authService} from "fbase";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName? userObj.displayName : "");
    const history = useHistory();
    const onLogOutClick = (event) => {
        authService.signOut();
        refreshUser(true);
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

    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display Name" />
            <input type="submit" />
        </form>
        <button onClick={onLogOutClick}>Sign Out</button>
    </>);
    };
export default Profile;