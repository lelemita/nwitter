import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const refreshUser = (isLogOut=false) => {
    if(isLogOut) {
      setUserObj(null);
    } else {
      const u = authService.currentUser;
      setUserObj({
        displayName: u.displayName,
        photoURL: u.photoURL,
        uid: u.uid,
      });
    }
  };
  // component가 mount 될 때 실행
  // firebase loading 시간이 모자라서 로그인 처리가 안되는 것 방지.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user != null) {
        setUserObj({
          displayName: user.displayName,
          phtotoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  return (
  <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "Initalizing..."}
    {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
  </>
  );
}

export default App;
