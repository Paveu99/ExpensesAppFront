import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ExpenseEntity} from 'types'
function App() {

  const cosiek: ExpenseEntity = {
    category: 'ja',
    name: 'sad',
    cost: 1123.4,
    month: 'sad'
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
