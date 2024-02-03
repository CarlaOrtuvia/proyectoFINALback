import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import NewProductsForm from './components/NewProductsForm/NewProductsForm';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login'element={<LoginForm />}/>
      <Route path='/NewProducts'element={<NewProductsForm />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

