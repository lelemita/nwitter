import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  // component가 mount 될 때 실행
  // firebase loading 시간이 모자라서 로그인 처리가 안되는 것 방지.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      setUserObj(user);
    })
  }, [])
  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initalizing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
