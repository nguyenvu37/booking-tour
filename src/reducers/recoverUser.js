const initialState = '';

let recover = (state = initialState, action) => {
    let new_state = { ...state };
    switch (action.type) {
      case "RECOVER":
        console.log('action.recover', action);
        new_state = action.id;
        return new_state;
      default:
        return new_state;
    }
  };
  export default recover;