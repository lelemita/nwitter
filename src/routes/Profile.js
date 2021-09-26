import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ? userObj.displayName : ""
  );
  const history = useHistory();
  const onLogOutClick = (event) => {
    authService.signOut();
    refreshUser(true);
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      {!userObj.fakeLogIn && (
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type="text"
            value={newDisplayName}
            onChange={onChange}
            placeholder="Display Name"
            autoFocus
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
      )}
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Sign Out
      </span>
    </div>
  );
};
export default Profile;
