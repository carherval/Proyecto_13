import './style.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DragonBall, { ERROR_MSG, PAGE_TITLE } from './DragonBall.jsx'
import Character from './pages/Character.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import Saga from './pages/Saga.jsx'

document.title = PAGE_TITLE

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DragonBall />}>
          <Route index element={<Home />} />
          <Route path=':sagaId' element={<Saga />} />
          <Route path=':sagaId/:characterId' element={<Character />} />
          <Route path='*' element={<Error errorMsg={ERROR_MSG.page} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
