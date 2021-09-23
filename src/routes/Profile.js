import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = (event) => {
        authService.signOut();
        history.push("/");
    }    
    return (<>
        <span>Profile</span>
        <button onClick={onLogOutClick}>Sign Out</button>
    </>);
    };
export default Profile;