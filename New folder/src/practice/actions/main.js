
export function Fetchingstart() {
  return (dispatch) => {
    dispatch({type:"FETCH_BEEGIN"});
    return fetch("https://reqres.in/api/users?page=1")
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: "DATA_COMPLETE", payload: data });
      });
  };
}

export function deleteaction(data) {
  return (dispatch) => {
    dispatch({type:"FETCH_BEEGIN"});
      return fetch("https://reqres.in/api/users/"+data,{
        method: "DELETE"
      })
      
  };
}