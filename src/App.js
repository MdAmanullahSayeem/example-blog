import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nabvar from "./Component/navbar";
import PostAll from "./Component/postAll";
import PostDetails from "./Component/postDetail";
import LoginForm from "./Component/login";
import RegisterForm from "./Component/register";
import PostComments from "./Component/comments";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <div>
        <Nabvar />
        <main style={{ marginTop: "70" }} className="container">
          <Switch>
            <Route path="/posts/:id/comments/" component={PostComments} />
            <Route path="/posts/:id/" component={PostDetails} />
            <Route path="/posts/" component={PostAll} />
            <Route path="/register/" component={RegisterForm} />
            <Route path="/home/" />
            <Route path="" component={LoginForm} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
