export function login() {
  return {
    type: "LOGIN"
  };
}
export function logOut() {
  return {
    type: "LOGOUT"
  };
}
export function recover(id) {
  return {
    type: "RECOVER",
    id
  }
}
