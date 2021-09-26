import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = ({ withOutLogIn }) => {
  const onClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "github") {
      provider = new GithubAuthProvider();
    } else if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div className="authBackground">
      <div className="authContainer">
        <AuthForm withOutLogIn={withOutLogIn} />
        <div className="authBtns">
          <button onClick={onClick} name="github" className="authBtn">
            Continue with <FontAwesomeIcon icon={faGithub} />
          </button>
          <button onClick={onClick} name="google" className="authBtn">
            Continue with <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
