import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/health')
      .then(response => {
        setMessage('バックエンドと接続成功!');
      })
      .catch(error => {
        setMessage('バックエンドとの接続に失敗...');
      });
  }, []);

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
        <h1>疎通確認</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
