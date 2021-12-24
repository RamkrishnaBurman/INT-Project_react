const initialState = {
    client:[],
};
const addClientSite = (state=initialState, action) =>{
   
    switch(action.type){
        
        case "ADD_CLIENT_SITE":
            const oldUser=[];
            let vOldData=[];
            oldUser.push(...state.client);
            oldUser && oldUser.map(item =>{
                item.clientID!==action.payload.clientID && vOldData.push(item)
            })
            action.payload ? vOldData.unshift(action.payload):vOldData.unshift(oldUser)
            
            return {
                ...state,
                client:vOldData
            }
            case "DELETE_CLIENT_SITE":
                console.log(action.payload)
                return {
                    client:action.payload
                }
        default : return state;
    }
}
export default addClientSite;