import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import history from "../History";

// import { NavTab } from "react-router-tabs";
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
        <h3 className="m-3 d-flex justify-content">Admin Home</h3>
        <div><button onClick={this.logout}>Logout</button></div>
        
      
        <Navigation />
      
      </>
    );
  }
}

export default Admin;