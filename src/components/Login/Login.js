import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row,Col, Container } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
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
      <>
      <div className="log-form">
      </div>  
      <Container id="Login">
        <Row className="justify-content-md-center">
          <Col xs={6} md="auto" lg="auto" xl="auto"></Col>

          <Col xs={12} md="auto" lg="auto" xl="auto">
            <Box {...defaultProps}>
            <h2>Admin Login</h2>
            <span className="error">{this.state.loginErrors}</span>
            <Form onSubmit={this.handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
              </Form.Group>

              <Fab variant="primary" type="submit" className="btn" id="loginBtn">
                Submit
              </Fab>
              
            </Form>
            </Box>
          </Col>
          <Col xs={6}md="auto" lg="auto"></Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Login;