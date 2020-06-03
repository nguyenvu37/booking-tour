import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import callApi from "../../../common/callAPI";

const containerDiv = {
  position: "absolute",
  top: "20%",
  left: "5%",
  right: "5%",
};

const warpDivLogin = {
  width: "400px",
  padding: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#fff",
  border: 0,
  borderRadius: "1rem",
  boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)",
};

const inputGroupStype = {
  borderRadius: "1rem",
  fontSize: "17px",
  padding: "20px",
};

const LoginAdmin = (props) => {
  const [valueUserName, setValueUserName] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const handerOnsubmit = (e) => {
    e.preventDefault();

    callApi(`users?usersName=${valueUserName}`, "Get", null).then((res) => {
      if (res && res.status === 200) {
        if (
          res.data[0] &&
          res.data[0].password === valuePassword &&
          res.data[0].role === "admin"
        ) {
          localStorage.setItem("TokenAdmin", JSON.stringify({...res.data[0],password:"****"}));
          NotificationManager.success(
            "Success message",
            "Đăng Nhập Thành Công"
          );
          props.history.push("/admin/dashboard");
        } else
          NotificationManager.error("Error message", "Đăng Nhập Bị Từ Chôi");
      }
    });
  };

  return (
    <div className="w-100 h-100">
      <div style={containerDiv}>
        <form onSubmit={handerOnsubmit}>
          <div style={warpDivLogin}>
            <div className="w-100 text-center">
              <h1 className="mb-3">Login</h1>
            </div>
            <div className="form-group mb-2">
              <label>User Name: </label>
              <input
                onChange={(e) => {
                  setValueUserName(e.target.value);
                }}
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter user name"
                style={inputGroupStype}
                value={valueUserName}
              />
            </div>
            <div className="form-group mb-2">
              <label>Password: </label>
              <input
                onChange={(e) => {
                  setValuePassword(e.target.value);
                }}
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                style={inputGroupStype}
                value={valuePassword}
              />
            </div>
            <div className="w-100 my-3 text-center">
              <button
                style={{ borderRadius: ".8rem" }}
                className="btn btn-primary"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
