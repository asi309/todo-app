import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post('/login', { email, password });
    const userId = response.data._id || false;

    try {
      if (userId) {
        localStorage.setItem('userId', userId);
        history.push('/dashboard');
      } else {
        const { message } = response.data;
        console.log(message);
        setError(true);
        setMessage(message);
        setTimeout(() => {
          setError(false);
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setMessage('ERROR: Server cannot process the request');
    }
  };

  return (
    <Container>
      <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="email"
            id="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="password"
            id="examplePassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 btn-container">
          <Button onClick={(e) => handleSubmit(e)} className="submit-btn">
            Submit
          </Button>
          <Link to="/register" className="secondary-btn">Register instead?</Link>
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
