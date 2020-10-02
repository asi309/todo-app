import React from 'react';
import { Container } from 'reactstrap';

import Routes from './routes';

import './App.css';

function App() {
  return (
    <Container>
      <h1>Todo App</h1>
      <div className="content-box">
        <Routes />
      </div>
    </Container>
  );
}

export default App;
