import React from 'react';
import Nav from './components/Nav';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Product from "./components/product/addProduct"
import ProductList from './components/product/productList';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Nav />

          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<ProductList />} />
              <Route path='/add' element={<Product />} />
              <Route path='/update/:id' element={<Product />} />
              <Route path='/logout' element={<h1>logout</h1>} />
              <Route path='/profile' element={<h1>profile</h1>} />
            </Route>

            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
