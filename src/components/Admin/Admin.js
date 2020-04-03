import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar} from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';

import './Admin.css';
import history from "../History";

import Navigation from '../Navigation';

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
        <Navbar id="navColor" bg="light" expand="lg">
          <h1 className="m-4 d-flex justify-content">Administrator Site</h1>
          <Navbar.Collapse className="m-3 d-flex justify-content-end">
            <Navbar.Text>
              {/* <Button onClick={this.logout}>
              <span class="material-icons">power_settings_new</span>Logout
              </Button> */}
              <Fab onClick={this.logout} aria-label="add">
              <span class="material-icons">power_settings_new</span>              
              </Fab>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Navigation />
        <br />
      </>
    );
  }
}

export default Admin;