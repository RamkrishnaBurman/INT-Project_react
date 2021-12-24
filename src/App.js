
import './App.css';
import React from 'react';

import {  Routes, Route } from "react-router-dom"
//import ProductList from './components/ProductList/productList';
// import About from './components/AboutUs/aboutUs';
// import ContactUs from './components/ContactUs/contactUs';
 import Home from './Pages/home/Home';
// import PubNav from './components/Nav/publicNav/PubNav';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ClientList from './Pages/ClientList/ClientList';
// import Shop from './components/Shop/Shop';
// import Cart from './components/Cart/cart'



function App() {
  return (
    <React.Fragment>
      
        
        <Routes> 
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/clientlist" exact element={<ClientList/>}/>
          {/* <Route path="/productList" exact element={<ProductList/>}/> 
          <Route path="/about" exact element={<About/>}/>
          <Route path="/contact" exact element={<ContactUs/>}/>
          
          <Route path="/logout" exact element={<Logout/>}/>
          <Route path="/shop" exact element={<Shop/>}/>
          <Route path="/cart" exact element={<Cart/>}/> */}
          {/* <Route path="/PubNav" exact element={<PubNav/>}/> */}
       </Routes>
      
    </React.Fragment>
  );
}

export default App;
