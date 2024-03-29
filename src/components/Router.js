import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser, withOutLogIn }) => {
  return (
    <Router>
      {/* 로그인 되었을 때 Nav표시 */}
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div className="RouterDiv">
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </div>
          ) : (
            <Route exact path="/">
              <Auth withOutLogIn={withOutLogIn} />
            </Route>
          )}
        </>
      </Switch>
    </Router>
  );
};
export default AppRouter;
