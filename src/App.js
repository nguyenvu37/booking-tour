import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import "./listTour.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NotificationContainer } from "react-notifications";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Waiting from "./common/waiting";

const arrayRoute = [
  {
    title: "Admin |Booking",
    component: "./components/admin/confi-router-admin",
    path: "/admin/*",
    isProtected: false,
  },
  {
    title: "Admin |Booking",
    component: "./components/admin/confi-router-admin",
    path: "/admin",
    isProtected: false,
  },
  {
    title: "user |Booking",
    component: "./components/booking-tour",
    path: "*",
    isProtected: false,
  },
];

class App extends Component {
  render() {
    return (
      <Suspense
        fallback={<Waiting custome={{ position: "relative", top: "300px" }} />}
      >
        <Router>
          <Switch>
            {arrayRoute.map((config, i) => {
              const component = lazy(() => import(`${config.component}`));
              return (
                <Route
                  key={"routes" + i}
                  exact
                  title={config.title}
                  path={config.path}
                  component={component}
                />
              );
            })}
          </Switch>
        </Router>
        <NotificationContainer />
      </Suspense>
    );
  }
}

export default App;
