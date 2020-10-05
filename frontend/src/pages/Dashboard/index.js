import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'reactstrap';

import api from '../../services/api';

import './dashboard.css';

export default function Dashboard({ history }) {
  const [todos, setTodos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const getTodos = async () => {
    const response = await api.get('/todos', { headers: { user_id: userId } });
    setTodos(response.data);
  };

  useEffect(() => {
    if (!userId) {
      history.push('/');
    } else {
      getTodos();
    }
  }, []);

  const deleteHandler = async (todoId) => {
    console.log(todoId);
    try {
      await api.delete(`/todos/delete/${todoId}`, {
        headers: { user_id: userId },
      });
      getTodos();
      setSuccess(true);
      setSuccessMessage('Todo deleted successfully');
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 2500);
    } catch (error) {
      setError(true);
      setErrorMessage('Cannot delete todo');
      setTimeout(() => {
        setError(false);
        setErrorMessage('');
      }, 3500);
    }
  };

  return (
    <div className="content-box">
      <Button onClick={() => history.push('/create')}>New</Button>
      {todos.length === 0 ? <h3>You have nothing to do</h3> : ''}
      <ul>
        {todos.map((todo) => {
          const time = Math.floor(
            (todo.targetDate - Date.now()) / (1000 * 3600 * 24)
          );
          return (
            <li key={todo._id}>
              <div className="card">
                <section className="title">
                  <h3>{todo.title}</h3>
                </section>
                <hr />
                <section className="description">{todo.description}</section>
                <section className={time < 7 ? 'time--warn' : 'time--normal'}>
                  {time} days remaining
                </section>
                <details>
                  <summary>Options</summary>
                  <Button
                    color="danger"
                    onClick={() => deleteHandler(todo._id)}
                  >
                    Delete
                  </Button>
                </details>
              </div>
            </li>
          );
        })}
      </ul>
      {success ? <Alert color="success">{successMessage}</Alert> : ''}
      {error ? <Alert color="danger">{errorMessage}</Alert> : ''}
    </div>
  );
}
