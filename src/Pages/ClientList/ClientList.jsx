import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import "./ClientList.css";


import { useSelector, useDispatch } from "react-redux";
import { createUserToken, register, addClientSite, logOutUser, deleteClientSite } from "../../actions/index";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

var CryptoJS = require("crypto-js");


let idEdit = false;


const validationSchema = Yup.object({
   
    siteName: Yup.string().required("Please Entar a valid site name"),
    siteURl: Yup.string().required("Entar valid url").matches(/^((https):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-&.\?+=_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, "Invalid URL, Please Enter Valid URL"),
    owner: Yup.string().required("Entar owner name"),
    siteDescription: Yup.string().required("Type description allist 20 charector").min(20, "Type description allist 20 charector"),
    dateOfCreation: Yup.date().required('Date is required').max(new Date().toJSON().slice(0,10).replace(/-/g,'/'),"Creation date can't more then today"),
    lastUpdated: Yup.date().required('Date is required').max(new Date().toJSON().slice(0,10).replace(/-/g,'/'),"Last Update date can't more then today").min(Yup.ref('dateOfCreation'), "Last update date can't less then creation date"),
})



const initialValues = {
    parentID: "",
    clientID: "",
    siteName: "",
    siteURl: "",
    owner: "",
    siteDescription: "",
    dateOfCreation: new Date("dd-mm-yyyy"),
    lastUpdated: new Date("dd-mm-yyyy"),
    
}
const ClientList = () => {

   



    const formikRef = useRef();
    const Dispatch = useDispatch();
    const userList = useSelector(uList => uList.addClientSite)
    let parent=[];
    const parentEncodes = useSelector(parentData => parentData.createUserToken)
    let bytes  = CryptoJS.AES.decrypt(parentEncodes && parentEncodes, 'Ram');
    if(bytes.words.length>0){
        parent = JSON.parse(bytes?.toString(CryptoJS.enc.Utf8));
    }
    const VarifySubmit = (values, userList, parent) => {
        let clientOldID = "";
        if (!idEdit) {
            let returnData = false
            let oldData = [userList && userList.client];
            oldData && oldData.find(arrVal => {
                arrVal.find(e => {
                    if (e.siteURl === values.siteURl || e.siteName === values.siteName) {
                        returnData = true;
                    }
                })
            });
            if (!returnData) {
                const clID = (7 * Math.random(new Date().valueOf() * userList.length)).toString()
                values.parentID = parent.uID;
                values.clientID = clID;
                toast.success('Client Site enter successfully')
                document.getElementById("clientRegistrationForm").reset()
                return values
            }else{
                toast.error('Site name or Site URL already exist')
            }
        } else {
            bText("Add New Site")
            let returnData = false
            let oldData = [userList && userList.client];
            oldData && oldData.map(arrVal => {
                arrVal.map(e => {
                    if (e.siteURl === values.siteURl || e.siteName === values.siteName) {
                        returnData = true;
                        clientOldID = e.clientID
                    }
                })
            });
            if (returnData) {
                toast.success('Site Updated Successfully')
                values.parentID = parent.uID;
                values.clientID = clientOldID;
                document.getElementById("clientRegistrationForm").reset()
                idEdit = false;
                return values
            }
    
    
        }
    
    } 
    

   
    const [newClientList, cList] = useState([]);
    const [btnText, bText]=useState("Add New Site")
   
    useEffect(() => {
        
        cList(userList);
    }, [userList])


    const Logout = () => {
        Dispatch(logOutUser())
    }


    const deleteData = (id) => {
        let deleteData = [];
        newClientList.client.map(item => {
            if (item.clientID !== id) {
                
                deleteData.push(item)
            }
        })
        toast.success('Site deleted successfully')
        Dispatch(deleteClientSite(deleteData));
        document.getElementById("clientRegistrationForm").reset()

    }

    const editData = (id) => {
        const editmyData = userList.client.find(item => item.clientID === id ? item : null)

        formikRef.current.setFieldValue("siteName", editmyData.siteName)
        formikRef.current.setFieldValue("siteURl", editmyData.siteURl)
        formikRef.current.setFieldValue("owner", editmyData.owner)
        formikRef.current.setFieldValue("siteDescription", editmyData.siteDescription)
        formikRef.current.setFieldValue("dateOfCreation", editmyData.dateOfCreation)
        formikRef.current.setFieldValue("lastUpdated", editmyData.lastUpdated)
        bText("Update")
        idEdit = true;

    }
   // console.log(parent)
    if (!parent.hasOwnProperty("uID")) {
        return (
            <div className="blankMessage">
                <h1>Please Login before view the client list</h1>
                <Link className="btn" to="/login">Login</Link>
            </div>
        )
    }



    return (
        <div className="ListBody">
            <div className="titleSection">
                <h2>{parent.uID}'s Dashboare</h2>
                <div className='rigitCon'>
                    <Link className='gotoHome' to="/">Home</Link>
                    <button type="button" onClick={Logout}>Logout</button>
                </div>
                
               
            </div>
            <div className="clientForm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    innerRef={formikRef}
                    onSubmit={(value) => {
                        Dispatch(addClientSite(VarifySubmit(value, userList, parent)))
                    }
                    }
                >

                    <Form id="clientRegistrationForm">
                        <div className="fieldContainer">
                            <label htmlFor="siteName">Entar site name</label>
                            <Field type="text" id="siteName" name="siteName" />
                            <div className="error"><ErrorMessage name='siteName' /></div>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="siteURl">Entar site URL</label>
                            <Field type="text" id="siteURl" name="siteURl" />
                            <div className="error"><ErrorMessage name='siteURl' /></div>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="owner">Entar site owner</label>
                            <Field type="text" id="owner" name="owner" />
                            <div className="error"><ErrorMessage name='owner' /></div>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="siteDescription">Entar site description</label>
                            <Field type="text" id="siteDescription" name="siteDescription" />
                            <div className="error"><ErrorMessage name='siteDescription' /></div>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="dateOfCreation">Site created on</label>
                            <Field type="date" id="dateOfCreation" name="dateOfCreation" />
                            <div className="error"><ErrorMessage name='dateOfCreation' /></div>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lastUpdated">Site last updated on</label>
                            <Field type="date" id="lastUpdated" name="lastUpdated" />
                            <div className="error"><ErrorMessage name='lastUpdated' /></div>
                        </div>

                        <div className="fieldContainer">
                            <button type="submit" id="submitData" name="submitData">
                            {btnText}
                            </button>
                        </div>
                       


                    </Form>
                </Formik>
            </div>
            <div className="clientListTable">

                <ul> <li>
                    <span>Client ID</span>
                    <span>Site Name</span>
                    <span>Site USL</span>
                    <span>Site Description</span>
                    <span>Site Owner</span>
                    <span>Date of Creation</span>
                    <span>Last Modify on</span>
                    <span>Action</span>
                </li>
                    {newClientList.client && newClientList.client.map((item) =>
                        item?.parentID == parent.uID &&
                        <li key={item.clientID}>
                            <p>{item.clientID}</p>
                            <p>{item.siteName}</p>
                            <p>{item.siteURl}</p>
                            <p>{item.siteDescription}</p>
                            <p>{item.owner}</p>
                            <p>{item.dateOfCreation}</p>
                            <p>{item.lastUpdated}</p>
                            <p><button type="button" onClick={() => editData(item.clientID)}>Edit</button>
                             <button type="button" onClick={() => deleteData(item.clientID)}>Delete</button> </p>

                        </li>
                    )}


                </ul>
            </div>
        </div>

    )
}
export default ClientList;