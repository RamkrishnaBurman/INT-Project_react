import React from 'react';
import { Link} from 'react-router-dom';
import Logo from './../../logo.svg';
import './Home.css'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import img1 from "./../../Images/1.jpg";
import img2 from "./../../Images/2.jpg";
import img3 from "./../../Images/3.jpg";


 const Home = () =>{
  
    return(
        <div className="bodyCon">
            <div className='navBar'>
                    <div className='logo'>
                        <img src={Logo} alt="Logo" /> <p>Prashadhani</p>
                    </div>
                    <div className='PageLinks'>
                        <ul>
                            <li><Link to="/clientlist">Clint List</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            
                        </ul>
                    </div>
            </div>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={img1}
      alt="First slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={img2}
      alt="Second slide"
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={img3}
      alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>
        </div>
    )
        
    
 }
export default Home;