import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import api from '../../services/api';

export default function RegisterUser({ history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/register', {
        firstName,
        lastName,
        email,
        password,
      });
      const user = response.data.user || false;
      if (user) {
        localStorage.setItem('userId', user._id);
        history.push('/dashboard');
      } else {
        setError(true);
        setMessage(response.data.message);
        setTimeout(() => {
          setError(false);
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setMessage('ERROR: The server cannot process the request');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            id="firstName"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            id="lastName"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 btn-container">
          <Button>Signup</Button>
          <Link to='/' className="secondary-btn">Login</Link>
        </FormGroup>
        {error ? (
          <Alert color="danger" className="mb-2 mr-sm-2 mb-sm-0">
            {message}
          </Alert>
        ) : (
          ''
        )}
      </Form>
    </Container>
  );
}
