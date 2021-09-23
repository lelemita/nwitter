import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {/* 로그인 되었을 때 Nav표시 */}
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ? ( 
                <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </> 
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};
export default AppRouter;