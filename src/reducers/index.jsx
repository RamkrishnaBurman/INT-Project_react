import register from './register';
import createUserToken from './userLogin';
import logOutUser from './userLogin';
import addClientSite from './addClinetSite';
import deleteClientSite from './addClinetSite';

import {combineReducers} from "redux";
const rootReducer= combineReducers({
    // addToCart,
    createUserToken,
    register,
    addClientSite ,
    logOutUser,
    deleteClientSite 
})
export default rootReducer;