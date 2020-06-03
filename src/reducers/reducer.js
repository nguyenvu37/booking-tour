// import callApi from "../common/callAPI";
import users from "./users";
import search from "./search";
import recoverUser from './recoverUser';
import adminItems from './admin';
import editingItem from './editItemAdmin';
import searchUser from './searchUsers';
import { combineReducers } from "redux";

const reducer = combineReducers({
  users,
  search,
  recoverUser,
  adminItems,
  editingItem,
  searchUser
});

export default reducer;
