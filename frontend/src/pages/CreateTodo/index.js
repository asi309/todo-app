import React, { useState, useEffect } from 'react';
import { Alert, Button, Container, Form, FormGroup, Input } from 'reactstrap';

import api from '../../services/api';

import './createTodo.css';

export default function CreateTodo({ history, match }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userId = localStorage.getItem('userId');
  let todo;

  useEffect(() => {
    if (!userId) {
      history.push('/');
    } else {
      findTodo();
    }
  }, [userId]);

  const findTodo = async () => {
    if (match.params.todoId) {
      try {
        todo = await api.get(`/todos/${match.params.todoId}`, {
          headers: { user_id: userId },
        });
        setTitle(todo.data.title);
        setDescription(todo.data.description);
        const todoTargetDate = new Date(+todo.data.targetDate);
        const targetDateString = todoTargetDate.toISOString().substr(0, 10);
        setTargetDate(targetDateString);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTitle('');
      setDescription('');
      setTargetDate('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = Date.now();
    const endDate = Date.parse(targetDate);

    try {
      let response;
      if (title !== '' && description !== '' && targetDate !== '') {
        if (match.params.todoId) {
          response = await api.patch(
            `/todos/${match.params.todoId}`,
            {
              title,
              description,
              startDate,
              targetDate: endDate,
            },
            { headers: { user_id: userId } }
          );
        } else {
          response = await api.post(
            '/todos/add',
            { title, description, startDate, targetDate: endDate },
            {
              headers: { user_id: userId },
            }
          );
        }
        setSuccess(true);
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage('');
          history.push('/dashboard');
        }, 2500);
      } else {
        setError(true);
        setErrorMessage('Missing required information');
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 3500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-box">
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              id="title"
              value={title}
              placeholder="Title for Todo"
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              id="description"
              value={description}
              placeholder="Description of your todo"
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none' }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              id="targetDate"
              defaultValue={targetDate}
              placeholder="Enter a deadline"
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button>{match.params.todoId ? 'Update' : 'Add'}</Button>
          </FormGroup>
        </Form>
        {success ? (
          <Alert className="event-validation" color="success">
            {successMessage}
          </Alert>
        ) : (
          ''
        )}
        {error ? (
          <Alert className="event-validation" color="danger">
            {errorMessage}
          </Alert>
        ) : (
          ''
        )}
      </Container>
    </div>
  );
}
