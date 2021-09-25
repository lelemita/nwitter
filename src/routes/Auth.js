import React from "react";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { authService } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {


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

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onClick} name="github">Continue with Github</button>
        <button onClick={onClick} name="google">Continue with Google</button>
      </div>
    </div>
  );
};
export default Auth;
