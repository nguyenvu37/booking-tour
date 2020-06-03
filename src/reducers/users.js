let user = JSON.parse(localStorage.getItem("user"));
const initialStateUser = user ? { loggedIn: true } : {};

let reducer = (state = initialStateUser, action) => {
  let new_state = { ...state };
  switch (action.type) {
    case "LOGIN":
      return { loggedIn: true };
    case "LOGOUT":
      localStorage.clear();
      return { loggedIn: false };
    default:
      return new_state;
  }
};
export default reducer;
