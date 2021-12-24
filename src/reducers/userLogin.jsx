const initialState = {};
const userLogin = (state=initialState, action) =>{
   
    switch(action.type){
        case "CREATE_USER_TOKEN":
          
        return action.payload
        
        case "LOGOUT_USER":
            return {
                state:initialState,
            }
        default : return state;
    }
}
export default userLogin;