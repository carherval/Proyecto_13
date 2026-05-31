import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'

const CarDealership = () => (
  <>
    <Header isLogin={useLocation().pathname === '/'} />

    <main className='content'>
      <Outlet />
    </main>
  </>
)

export default CarDealership
