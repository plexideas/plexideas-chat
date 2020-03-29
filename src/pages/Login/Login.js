import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, signInWithGoogle } from '../../helpers/auth';
import { Container, Button, Form } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    this.setState({error: ''});
    try {
      await login(email, password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <Container>
        <Form
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to 
            {' '} 
            <Link to="/">Plexideas Chat</Link>
          </h1>
          <p>
            Fill in the form below to login to your account.
          </p>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Passowrd</Form.Label>
            <Form.Control
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            />
          </Form.Group>
          { error && <p>{this.state.error}</p> }
          <Button type="submit">Login</Button>
          <p/>
          <p>
            or
            {' '}
            <Link onClick={this.googleSignIn} type="button">
              Sign up with Google
            </Link>
          </p>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Form>
      </Container>
    )
  }
}
