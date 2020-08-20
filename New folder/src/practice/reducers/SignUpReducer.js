const defaultSignUpState = [];
  
  export default (state = defaultSignUpState, action) => {
    switch (action.type) {
      case "SIGN_UP":
        return state.concat(action.payload);
  
      default:
        return state;
    }
  };
  