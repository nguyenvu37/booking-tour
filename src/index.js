import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore } from "redux";
import reducer from "./reducers/reducer.js";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "react-notifications/lib/notifications.css";

const store = createStore(
  reducer,
  composeWithDevTools()
  // applyMiddleware(...middleware),
  // other store enhancers if any
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
