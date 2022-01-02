import React from "react";
import { HashRouter as Router ,  Route , Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "components/Navigation";

const AppRouter =({refreshUser,isLoggedIn , userOb}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userOb= {userOb}/>}
            <Switch>

                {isLoggedIn ? 
                  (  
                  <>
                        <Route exact path="/">
                            <Home userOb = {userOb}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userOb = {userOb} refreshUser={refreshUser}/>
                            
                        </Route>
                    </> 
                    ): 
                   (
                    <>
                     <Route exact path="/">
                        <Auth/>
                    </Route>
                    </>
                    )};
            </Switch>
    </Router>
    )
}
export default AppRouter;
