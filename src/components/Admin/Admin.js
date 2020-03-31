import React, { Component } from 'react';
import './Admin.css';
import history from "../History";

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
      </>
    );
  }
}

export default Admin;