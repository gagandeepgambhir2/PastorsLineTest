import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./src/Home";
import ModalA from "./components/ModalA";
import ModalB from "./components/ModalB";

import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/modala" component={ModalA} />
      <Route exact path="/modalb" component={ModalB} />
      <Route>{"404"}</Route>
    </Switch>
  );
};

export default App;
