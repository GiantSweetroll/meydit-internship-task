import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import PostJob from './pages/PostJob';
import { Maker } from './pages/Maker';
import { Sidebar } from './components/Sidebar';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' Component={PostJob}/>
          <Route path='/maker' Component={Maker}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App