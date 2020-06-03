import React from "react";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const LogoutAdmin = (props) => {
  const handerAdminLogout = () => {
    if (window.confirm("Xác Nhân Logout")) {
      localStorage.removeItem("TokenAdmin");
      NotificationManager.success("Success message", "Logout Thành Công");
      props.history.push("/admin");
    }
  };

  return (
    <div className="text-center link-iteam-menu p-3">
      <hr />
      <button
        onClick={handerAdminLogout}
        className="btn link-iteam-menu"
        id="btnLogout"
      >
        <i className="fas fa-sign-out-alt"></i>
        <label style={{ marginLeft: "0.5rem",cursor: "inherit" }} htmlFor="btnLogout">
          Logout
        </label>
      </button>
    </div>
  );
};

export default withRouter(LogoutAdmin);
