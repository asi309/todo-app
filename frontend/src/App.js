import React from 'react';
import { Container } from 'reactstrap';

import LoginComponent from './components/LoginComponent';
import Routes from './routes';

import './App.css';

function App() {
  return (
    <Container>
      <h1>Todo App</h1>
      <Routes />
    </Container>
  );
}

export default App;
