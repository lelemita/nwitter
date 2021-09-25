import React, { useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { authService } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const toggleAccount = () => setNewAccount((prev) => !prev);

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
          if(newAccount) {
            await createUserWithEmailAndPassword(authService, email, pw);
          } else {
            await signInWithEmailAndPassword(authService, email, pw);
          }
       } catch(err) {
           setError(err.message);
       }
    };
    return (
        <>
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
        </>
    );
};

export default AuthForm;