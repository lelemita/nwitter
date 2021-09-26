import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import axios from "axios";

function App() {
  const [fakeLogIn, setFakeLogIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [ip, setIP] = useState("");
  
  const withOutLogIn = (fakeLogIn = true) => {
    setFakeLogIn(fakeLogIn);
  };
  const getIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  const refreshUser = (isLogOut = false) => {
    if (isLogOut) {
      setUserObj(null);
      setFakeLogIn(false);
    } else if (fakeLogIn) {
      setUserObj({
        fakeLogIn: true,
        displayName: ip,
        phtotoURL: "",
        uid: ip.split(".").join(""),
      });
    } else {
      const u = authService.currentUser;
      setUserObj({
        fakeLogIn: false,
        displayName: u.displayName,
        photoURL: u.photoURL,
        uid: u.uid,
      });
    }
  };
  // component가 mount 될 때 실행
  // firebase loading 시간이 모자라서 로그인 처리가 안되는 것 방지.
  useEffect(() => {
    // console.log(fakeLogIn);
    if (fakeLogIn) {
      getIP();
      setUserObj({
        fakeLogIn: true,
        displayName: ip,
        phtotoURL: "",
        uid: ip.split(".").join(""),
      });
      setInit(true);
    } else {
      authService.onAuthStateChanged((user) => {
        if (user != null) {
          setUserObj({
            fakeLogIn: false,
            displayName: user.displayName,
            phtotoURL: user.photoURL,
            uid: user.uid,
          });
        } else {
          setUserObj(null);
        }
        setInit(true);
      });
    }
  }, [fakeLogIn, ip]);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj) || fakeLogIn}
          userObj={userObj}
          refreshUser={refreshUser}
          withOutLogIn={withOutLogIn}
        />
      ) : (
        "Initalizing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
