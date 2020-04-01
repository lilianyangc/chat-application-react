import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import history from "../History";
import {Container} from 'react-bootstrap';
import ChatHistory from '../ChatHistory';
import EventHistory from '../EventHistory';
import Rooms from '../Rooms';
import { RoutedTabs, NavTab } from "react-router-tabs";


class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if(!localStorage.getItem('token')) {
      history.push('/')
    }
  }

  logout(){
    localStorage.clear();
    history.push("/")
  }

  render() {
    return (
      <>
        <div>Admin Home</div>
        <div><button onClick={this.logout}>Logout</button></div>
        <Container>
        <BrowserRouter>
        {/* <Nav variant="tabs" defaultActiveKey="/admin">
          <Nav.Item>
            <Nav.Link eventKey="link-0"><Link to="/admin">Event History</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1"><Link to="/chathistory">Chat History</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="/rooms" eventKey="link-2"><Link to="/rooms">Rooms</Link></Nav.Link>
          </Nav.Item>
        </Nav>
        <ul>
          <li><Link to="/admin">Home</Link></li>
          <li><Link to="/chathistory">About</Link></li>
          <li><Link to="/rooms">Contact</Link></li>
        </ul> */}
        <NavTab to="/admin">Event History</NavTab> &nbsp;
        <NavTab to="/chathistory">Chat History</NavTab>&nbsp;
        <NavTab to="/rooms">Rooms</NavTab>
        <br />

        <Container>
            <Switch>
              <Route path="/admin" component={EventHistory} exact/>
              <Route path="/chathistory" component={ChatHistory} />
              <Route path="/rooms" component={Rooms} />
            </Switch>
        </Container>       
        </BrowserRouter>
     
      </Container>
      </>
    );
  }
}

export default Admin;