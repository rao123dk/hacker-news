import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter} from 'react-router-dom'
import Main from './components/index'

import './App.css';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
    </div>
  );
}

export default App;
