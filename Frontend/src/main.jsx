import './style/style.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './components/Auth/AuthProvider'
import AuthRoute from './components/Auth/AuthRoute'
import NotFoundRedirect from './components/NotFoundRedirect/NotFoundRedirect'
import Login from './pages/Login'
import carRoutes from './routes/car'
import customerRoutes from './routes/customer'
import reservationRoutes from './routes/reservation'
import saleRoutes from './routes/sale'
import userRoutes from './routes/user'
import strings from './utils/strings'
import CarDealership from './CarDealership'

// Convierte los objetos de las rutas a formato "JSX"
const renderRoutes = (routes) =>
  routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))

document.title = strings.PAGE_TITLE
document.querySelector('meta[name="author"]').content = strings.AUTHOR_FULLNAME

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path='/' element={<CarDealership />}>
              <Route index element={<Login />} />
              {renderRoutes(carRoutes)}
              {renderRoutes(customerRoutes)}
              {renderRoutes(reservationRoutes)}
              {renderRoutes(saleRoutes)}
              {renderRoutes(userRoutes)}
              <Route path='*' element={<NotFoundRedirect />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
