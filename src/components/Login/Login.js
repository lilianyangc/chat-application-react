import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import './Login.css';
import axios from 'axios';
import jwt from 'jwt-decode';
import history from "../History";

const defaultProps = {
  // bgcolor: 'background.paper',
  borderColor: 'mediumaquamarine',
  m: 1,
  border: 2,
  padding: 5,
  // style: { width: '5rem', height: '5rem' },
};

class Login extends React.Component {
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
      <>
      <div className="log-form">
      </div>  
      <Container id="Login">
        <Paper elevation={3}>
          <Box {...defaultProps}>
          <span className="error">{this.state.loginErrors}</span>
          <h2>Admin Login</h2>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required/>
              <Form.Text className="text-muted">
                Don't forget to logout after admin user.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            </Form.Group>

            <div id="wrapLoginBtn">
            <Fab variant="primary" type="submit" className="btn" id="loginBtn">
              Login
            </Fab>
            </div>

          </Form>
          </Box>
        </Paper>
      </Container>
      </>
    );
  }
}

export default Login;