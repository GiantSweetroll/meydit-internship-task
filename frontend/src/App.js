import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import PostJob from './pages/PostJob';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

const App = () => {
  return (
    <BrowserRouter>
      <PostJob/>
    </BrowserRouter>
  )
}

export default App