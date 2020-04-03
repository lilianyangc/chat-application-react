import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row,Col, Container } from 'react-bootstrap';
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
      <>
      <div className="log-form">
      </div>
      <Container id="Login">
      <Row className="justify-content-md-center">
        <Col xs={6} md="auto" lg="auto" xl="auto">1 of 3</Col>
        <Col xs={12} md="auto" lg="auto" xl="auto">
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
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" className="btn">
          Submit
        </Button>
      </Form>
        </Col>
        <Col xs={6}md="auto" lg="auto">3 of 3</Col>
      </Row>
      </Container>
      </>
    );
  }
}

export default Login;