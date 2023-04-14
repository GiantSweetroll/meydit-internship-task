import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import './App.css';
import PostJob from './pages/PostJob';

const App = () => {
  return (
    <BrowserRouter>
      <PostJob/>
    </BrowserRouter>
  )
}

export default App