
const initialState = {
   user:[]
};
const registerUser = (state=initialState, action) =>{
    
    switch(action.type){
        case "REGISTER":
            const oldUser=[...state.user];
            if(action.payload){oldUser.push(action.payload && action.payload);}
            return {
                ...state,
                user:oldUser
            }
        default : return state;
    }
}
export default registerUser;