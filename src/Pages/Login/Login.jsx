import React, {useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Login.css";
import Logo from './../../logo.svg';

import { useSelector, useDispatch} from "react-redux";
import {createUserToken} from "../../actions/index";
import {register} from "../../actions/index";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
let validUser=0
var CryptoJS = require("crypto-js");

const existingUser=[];

const validationSchema= Yup.object({
    uID:Yup.string().required("Please Entar a valid User ID"),
    password:Yup.string().required("Entar valid password")
})

const initialValues={
    uID:"",
    password:''
}
 


const Login= () =>{
    const userList= useSelector(uList => uList.register);  
    const userToken= useSelector(uToken => uToken.createUserToken)
    const myDispatch=useDispatch();
    const navigate = useNavigate();
    
    
    useEffect( () => {
      let decryptedData=null
      let bytes  = CryptoJS.AES.decrypt(userToken, 'Ram');
      if(bytes.words.length>0 ){
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
     
      if(decryptedData && decryptedData.uID.length>0 && decryptedData.password.length>0){
      if(validUser==0)toast.success("You are already Loged In", {position: toast.POSITION.TOP_CENTER})
        setTimeout(() =>{
            navigate('/clientlist')
        },6000) 
        
       }
   },[userToken])
   const VarifySubmit= (values, userList) =>  {
       
       var precessData =JSON.stringify(values)
       var encrypted=CryptoJS.AES.encrypt(precessData, "Ram").toString()
       userList.user.map(e => {
            let bytes  = CryptoJS.AES.decrypt(e, 'Ram');
            existingUser.push(JSON.parse(bytes.toString(CryptoJS.enc.Utf8))) ;
        }) 
       existingUser && existingUser.find(e =>{
           if(values.uID===e.uID && values.password===e.password){
           validUser=1
          }
        });
     if(validUser===1){  
        toast.success("Welcome "+ values.uID , {position: toast.POSITION.TOP_CENTER})
        return(encrypted);
      }else{
        toast.error("Invalid User !..... Please Register", {position: toast.POSITION.TOP_CENTER})
        validUser=0;
      }
 }  
    return(
        <div className="formBody">
            <Formik 
                initialValues={initialValues}  
                validationSchema={validationSchema} 
                onSubmit={(value) => {
                    myDispatch(createUserToken(VarifySubmit(value,userList)))}
                }
            >
            
                <Form >
                    <div className="LogoCon">
                        <img src={Logo} alt="Logo" /> <p>Prashadhani</p>
                    </div>
                   
                    <div className="fieldContainer">
                        <label htmlFor="uID">Entar User ID</label>
                        <Field type="text" id="uID" name="uID" />
                        <div className="error"><ErrorMessage name='uID'/></div>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="password">Entar Password</label>
                        <Field type="password" id="password" name="password" />
                        <div className="error"><ErrorMessage name='password'/></div>
                    </div>
                    <Field type="submit" value="Submit"/>
                    <Link to="/register">New User...?</Link>
                </Form> 
            </Formik>
        </div>
    )
}
export default Login;