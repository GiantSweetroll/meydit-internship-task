import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import PostJob from './pages/PostJob';
import { Maker } from './pages/Maker';
import { MakerDetails } from './pages/MakerDetails'
import { Sidebar } from './components/Sidebar';

const App = () => {

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' Component={PostJob}/>
          <Route path='/maker' Component={Maker}/>
          <Route path='/job-deets' Component={MakerDetails}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App