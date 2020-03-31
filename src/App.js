import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch} from "react-router-dom";
import history from "./components/History";
import Login from "./components/Login/Login"
import Register from './components/Register/Register';
import Admin from './components/Admin/Admin'

function App() {

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
