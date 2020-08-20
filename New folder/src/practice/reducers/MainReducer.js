const defaultState=[];

export default(state=defaultState,action)=>{
    switch (action.type) {
        case "FETCH_BEEGIN":
        return{
            ...state,loading:true,
        }
        case "DATA_COMPLETE":
        return{
            ...state,FetchData:action.payload,loading:false
        }
        default:
           return state;
    }

}