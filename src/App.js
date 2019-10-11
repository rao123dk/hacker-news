import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter} from 'react-router-dom'
import Main from './components/index'

import './App.css';

function App() {
  return (
    <div className="container">
      <h3> {"Welcome to POC project"} </h3>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
    </div>
  );
}

export default App;
