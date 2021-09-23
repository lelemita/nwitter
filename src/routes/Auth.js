import React, { useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { authService } from "fbase";
import App from "components/App";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
      const {target: {name, value}} = event;
      if(name === "email") {
        setEmail(value);
      }else if(name === "pw"){
        setPw(value);
      }
  }
  const onSubmit = async(event) => {
      event.preventDefault();
      try {
        let data;
        if(newAccount) {
          data = await createUserWithEmailAndPassword(authService, email, pw);
        } else {
          data = await signInWithEmailAndPassword(authService, email, pw);
        }
     } catch(err) {
         setError(err.message);
     }
  };
  const onClick = async(event) => {
    const {target: {name}, } = event;
    let provider;
    if(name === "github") {
      provider = new GithubAuthProvider();
    } else if(name === "google") {
      provider = new GoogleAuthProvider();
    }
   await signInWithPopup(authService, provider);
  }
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <span onClick={toggleAccount}>{newAccount? "Sign in" : "Create Account"}</span>
      <form onSubmit={onSubmit}> 
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="pw"
          type="password"
          placeholder="Password"
          required
          value={pw}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <div>
        <button onClick={onClick} name="github">Continue with Github</button>
        <button onClick={onClick} name="google">Continue with Google</button>
      </div>
    </div>
  );
};
export default Auth;
