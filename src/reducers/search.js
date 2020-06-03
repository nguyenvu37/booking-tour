const initialStateUser = {
  q: "",
  typeTour: "",
  dateStart: "",
};

let reducer = (state = initialStateUser, action) => {
  let new_state = { ...state };
  switch (action.type) {
    case "SETDATASEARCH":
      console.log("action", action);
      let new_data = { ...action.data };
      return new_data;
    default:
      return new_state;
  }
};
export default reducer;
