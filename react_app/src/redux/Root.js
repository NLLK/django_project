import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";

import rootReducer from "./Reducer";
import { setCurrentUser, setToken } from "../pages/Login/LoginActions";
import { isEmpty } from "../utils/Utils";

const Root = ({ children, initialState = {} }) => {
  //const history = createBrowserHistory();
  //const middleware = [thunk];

  const store = createStore(
    rootReducer(),
    initialState,
    //applyMiddleware(...middleware)
  );

  // if (!isEmpty(localStorage.getItem("token"))) {
  //   store.dispatch(setToken(localStorage.getItem("token")));
  // }
  // if (!isEmpty(localStorage.getItem("user"))) {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   store.dispatch(setCurrentUser(user, ""));
  // }

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Root;
