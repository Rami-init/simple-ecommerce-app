
import React from 'react'
import { Route,  Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import PrivateAdmin from './Routes/privateAdmin.js'
import CreateProductAdmin from './admin/CreateProductAdmin.js'
import CategoriesAdmin from './admin/CategoriesAdmin.js'
import ProductsAdmin from './admin/ProductsAdmin.js'
import DashBoard from './admin/DashBoard.js'
import {useGlobalContext} from './Context.js'
const App = () => {
  const {showNavBar} = useGlobalContext()

  return (
    <div className='app'>
      {showNavBar ? <NavBar />: null}
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register ></Register>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product/:id' element={<Product></Product>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/admin/createproduct' element={<PrivateAdmin><CreateProductAdmin /></PrivateAdmin>} />
        <Route path='/admin/categories' element={<PrivateAdmin><CategoriesAdmin /></PrivateAdmin>} />
        <Route path='/admin/productadmin' element={<PrivateAdmin><ProductsAdmin /></PrivateAdmin>} />
        <Route path='/admin/dashboard' element={<PrivateAdmin><DashBoard /></PrivateAdmin>} />
      </Routes>
    </div>
  )
}

export default App