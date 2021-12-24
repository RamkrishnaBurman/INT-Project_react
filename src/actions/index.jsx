
export const createUserToken = (values) =>{
    return {
        type:"CREATE_USER_TOKEN",
        payload:values
    }
}
export const register = (value) =>{
    return {
        type:"REGISTER",
        payload:value
    }
}
export const addClientSite = (value) =>{
    return {
        type:"ADD_CLIENT_SITE",
        payload:value
    }
}
export const logOutUser = () =>{
    return {
        type:"LOGOUT_USER",
    }
}
export const deleteClientSite = (value) =>{
    return {
        type:"DELETE_CLIENT_SITE",
        payload:value
    }
}

