import React, { Suspense, lazy } from "react";
import Waiting from "../../common/waiting";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import routes from "./router-admin";
import { checkTokenLoginAdmin } from "../../common/funcCommon";
import MenuAdmin from "./component/menu-for-admin/menu-admin";
import EndPage from "./page/end-page";
import "./css/adminStype.css";

const IsProtected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return checkTokenLoginAdmin() ? (
        (document.title = rest.title) && <Component {...props} />
      ) : (
        <Redirect to="/admin/login-admin" />
      );
    }}
  />
);

const NoIsProtected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return !checkTokenLoginAdmin() ? (
        (document.title = rest.title) && <Component {...props} />
      ) : (
        <Redirect to="/admin/dashboard" />
      );
    }}
  />
);

const ConfiRouterAdmin = () => {
  return (
    <Suspense
      fallback={<Waiting custome={{ position: "relative", top: "300px" }} />}
    >
      <Router>
        <div className="my-body">
          <div className="content">
            <div className="d-flex">
              <MenuAdmin />
              <div className="container-fluid px-5">
                <Switch>
                  {routes.map((e, i) => {
                    const component = lazy(() => import(`${e.component}`));
                    return e.isProtected ? (
                      <IsProtected
                        key={"routes-admin" + i}
                        exact
                        title={e.title}
                        path={e.path}
                        component={component}
                      />
                    ) : (
                      <NoIsProtected
                        key={"routes-admin" + i}
                        exact
                        title={e.title}
                        path={e.path}
                        component={component}
                      />
                    );
                  })}
                </Switch>
              </div>
            </div>
          </div>
          <EndPage />
        </div>
      </Router>
    </Suspense>
  );
};

export default ConfiRouterAdmin;
