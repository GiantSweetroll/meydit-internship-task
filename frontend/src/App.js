import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import PostJob from './pages/PostJob';
import { Maker } from './pages/Maker';
import { MakerDetails } from './pages/MakerDetails'
import { Sidebar } from './components/Sidebar';
import { useStateContext } from './contexts/ContextProvider';
import { getClothingTypes, getStatusTypes } from './controllers/backendController';

const App = () => {

  const { setClothingTypes, setStatusTypes } = useStateContext()

  // get all possible clothings and status types
  useEffect(() => {
    getClothingTypes()
      .then((data) => {
          const options = []
          data.forEach((clothing) => {
              options.push({
                  label: clothing.type,
                  clothingId: clothing.id
              })
          })

          setClothingTypes(options)
      })

    getStatusTypes()
      .then((data) => {
          setStatusTypes(data)
      })
  }, [setClothingTypes, setStatusTypes])

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