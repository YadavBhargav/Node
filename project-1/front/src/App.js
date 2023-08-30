import React from 'react';
import Nav from './Nav';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Nav />

          <Routes>
            <Route path='/' element={<h1>Product List</h1>} />
            <Route path='/add' element={<h1>Add Product</h1>} />
            <Route path='/update' element={<h1>Update Product</h1>} />
            <Route path='/logout' element={<h1>logout</h1>} />
            <Route path='/profile' element={<h1>profile</h1>} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
