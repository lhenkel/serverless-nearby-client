import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Prospect from "./containers/Prospect";
import Some from "./containers/Some";
import Junk from "./containers/Junk";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

/*
            <AuthenticatedRoute path="/prospect">
                <Prospect />
            </AuthenticatedRoute>
*/

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/junk" component={Junk} />
            <UnauthenticatedRoute exact path="/some">
                <Some />
            </UnauthenticatedRoute>

            <UnauthenticatedRoute exact path="/prospect">
                <Prospect />
            </UnauthenticatedRoute>

            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}