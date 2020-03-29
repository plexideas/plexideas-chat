import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col xs={12} md={12}>
            <h1 className="header">Plexideas Chat</h1>
            <Link to="/login">
              <Button variant="danger">Login</Button>
            </Link>
            {' '}
            <Link to="/signup">
              <Button variant="danger">Sign up</Button>
            </Link>
            {' '}
          </Col>
        </Row>
      </Container>
    )
  }
}
