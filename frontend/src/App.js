import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Auth from './pages/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <Auth/>
    </BrowserRouter>
  )
}

export default App