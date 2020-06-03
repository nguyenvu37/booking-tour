const currentUser = localStorage.getItem("token");

export function reducer(state = currentUser, action) {
  switch (action.type) {
    case "PLUS_PRODUCT":
      return state;
    default:
      return state;
  }
}
