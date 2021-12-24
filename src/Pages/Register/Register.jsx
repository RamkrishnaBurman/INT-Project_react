import React,{useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Register.css";
import Logo from './../../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import {register} from "../../actions/index";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

var CryptoJS = require("crypto-js");



let exisi=0;
let reDirectFlag=0;
const existingUser=[];
const validationSchema= Yup.object({
    uName:Yup.string().required("Please Entar a valid User Name"),
    uID:Yup.string().required("Please Entar a valid User ID"),
    password:Yup.string().required("Entar valid password"),
    cPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    uEmail:Yup.string().required("Entar valid password").email("Not a Valid Email ID")
})

const initialValues={
    uID:"",
    uName:"",
    password:'',
    cPassword:"",
    uEmail:""
}


const Register= () =>{
   
    const userList= useSelector((uList) => uList.register);
    const myDispatch=useDispatch();
    const navigate = useNavigate();


   
    useEffect(()=>{
        userList.user.map(e => {
            let bytes  = CryptoJS.AES.decrypt(e, 'Ram');
            existingUser.push(JSON.parse(bytes.toString(CryptoJS.enc.Utf8))) ;
        })
        if(exisi===0 && reDirectFlag===1) {
                reDirectFlag=0;  
               
                toast.success("User successfully registered",{position: toast.POSITION.TOP_CENTER})
                setTimeout(() => {
                    navigate("/login")
                }, 6000);
            }
           
           
        },[reDirectFlag])

    const VarifySubmit= (values) =>  {
        var precessData =JSON.stringify(values)
        var encrypted=CryptoJS.AES.encrypt(precessData, "Ram").toString()
        existingUser.find( data =>{
            if(data.uID===values.uID){
                toast.error("User ID already exist",{position: toast.POSITION.TOP_CENTER})
                exisi=1;
            }else if(data.uEmail== values.uEmail){
                toast.error("Email ID already exist",{position: toast.POSITION.TOP_CENTER})
                exisi=1
            }
        })
        if(exisi===0){
            reDirectFlag=1;
            return(encrypted);        
        }else{
            return null
        }
            
    } 

    return(

        <div className="formBody">
           
            <Formik 
                initialValues={initialValues}  
                validationSchema={validationSchema} 
                onSubmit={(value) => {
                    myDispatch(register(VarifySubmit(value)))}
                }
            >
            
                <Form id="registrationForm">
                    <div className="LogoCon">
                        <img src={Logo} alt="Logo" /> <p>Prashadhani</p>
                    </div>
                  
                    {/* <p>{Formik.values}</p> */}
                    <div className="fieldContainer">
                        <label htmlFor="uName">Entar User Namr</label>
                        <Field type="text" id="uName" name="uName" />
                        <div className="error"><ErrorMessage name='uName'/></div>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="uEmail">Entar User Email ID</label>
                        <Field type="text" id="uEmail" name="uEmail" />
                        <div className="error"><ErrorMessage name='uEmail'/></div>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="uID">Create User ID</label>
                        <Field type="text" id="uID" name="uID" />
                        <div className="error"><ErrorMessage name='uID'/></div>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="password">Entar Password</label>
                        <Field type="password" id="password" name="password" />
                        <div className="error"><ErrorMessage name='password'/></div>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="cPassword">Confirm Password</label>
                        <Field type="password" id="cPassword" name="cPassword" />
                        <div className="error"><ErrorMessage name='cPassword'/></div>
                    </div>
                    <Field type="submit" value="Submit"/>
                    
                </Form> 
            </Formik>
        </div>
    )
}
export default Register;