import React, { Component } from "react";
import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { logout } from "../../helpers/auth";
import { Container, Form, InputGroup, Button, Alert } from 'react-bootstrap';


export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message })
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { content, user } = this.state;

    this.setState({ writeError: null });

    try {
      await db.ref("chats").push({
        content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  onLogout(event) {
    event.preventDefault();
    logout();
  }

  render() {
    const { user, chats, content, writeError } = this.state;

    return (
      <Container>
        <h1>Chat</h1>
        <div className="chats">
          {
            chats.map((chat) => 
              <Alert 
                key={chat.timestamp}
                variant="secondary"
              >
                {chat.content}
              </Alert>)
          }
        </div>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={this.handleChange}
              value={content}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
           </InputGroup>
           { writeError && <p>{ writeError }</p> }
        </Form>
        <hr />
        <div>
          Login in as:
          {' '}
          <strong>{user.email}</strong> 
          <br />
          <br />
          <Button onClick={this.onLogout}>Logout</Button>
        </div>
      </Container>
    );
  }
}
