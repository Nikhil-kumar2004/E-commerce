import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer} from 'react-toastify';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 lg:px-[3vw]'>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
