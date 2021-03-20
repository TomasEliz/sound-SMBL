import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import ProfilePage from './ProfilePage'
import InfoPage from "./InfoPage";
import DiscographyPage from "./DiscographyPage";
import EventsPage from "./EventsPage";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import "../css/base.css";

const Routes = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <ProtectedRoute  path="/" exact component={ProfilePage} />
            <ProtectedRoute path="/infopage" component={InfoPage} />
            <ProtectedRoute path="/discography" component={DiscographyPage} />
            <ProtectedRoute path="/eventspage" component={EventsPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};

export default Routes;
