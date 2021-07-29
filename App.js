import React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Test from "./Pages/Test";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Welcome from "./Pages/Welcome";
import { useLocation } from "react-router-dom";
import { or } from "react-native-reanimated";
const pathname = window.location.pathname;
export default function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/test" exact component={Test} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Welcome} />
        </Switch>
      </Router>
    </>
  );
}
