import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './layouts/LayoutAdmin'
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import ProductAdd from './components/ProductAdd';
import Register from './components/Register';
import Login from './components/Login';
const App = () => {
  return (
    <div>
      <Routes>
        
      <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<ProductList />} />
          <Route path='products' element = {<ProductList/>} />
          <Route path='register' element = {<Register/>} />
          <Route path='login' element = {<Login/>} />
          <Route path='products/add' element = {<ProductAdd/>} />
          <Route path='products/:id/update' element = {<ProductEdit/>} />
          
        </Route>
      </Routes>
    </div>
  )
}

export default App