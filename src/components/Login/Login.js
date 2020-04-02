import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import jwt from 'jwt-decode';
import history from "../History";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const {email, password} = this.state

    axios
      .post("https://chat-masters.herokuapp.com/api/user/login",
        {
          "email": email,
          "password": password
        }
      )
      .then(response => {
        const decoded = jwt(response.data)
        console.log(decoded)
        localStorage.setItem('token',response.data)
        history.push("/admin")
      })
      .catch(error => {
        this.setState({loginErrors: "Incorrect email or password!"})
        console.log("login error", error)
      })
    event.preventDefault();
  }

  render() {
    return (
      <div className="log-form">
        <h2>Login</h2>
        <span className="error">{this.state.loginErrors}</span>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required /><br />
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required /><br />
          <button type="submit" className="btn">Login</button><br />
        </form>
      </div>
    );
  }
}

export default Login;