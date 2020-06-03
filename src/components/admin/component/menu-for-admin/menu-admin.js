import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import BtnClickShowMenu from "./btn-click-show-menu";
import ShowInformationAdmin from "./show-information-admin";
import ItemMenuAdmin from "./item-menu-admin";
import LogoutAdmin from "../logout-admin";

const timeMove = 0.8;
const divBackend = {
  width: "300px",
  height: "100%",

  transition: `${timeMove}s all`,
};

const divBackendMenuHiden = {
  width: "0",
  height: "0%",

  transition: `${timeMove}s all`,
};

const divWarpMenu = {
  position: "fixed",
  let: 0,
  top: 0,

  height: "100%",
  width: "250px",

  backgroundColor: "#4e73df",
  // backgroundImage: "linear-gradient(180deg,#4e73df 10%,#224abe 100%)",

  transition: `${timeMove}s all`,
  transform: `translate(0, 0)`,
  zIndex: 3,
};
const divWarpMenuHiden = {
  position: "fixed",
  let: 0,
  top: 0,

  height: "100%",
  width: "300px",

  backgroundColor: " #495057",

  transition: `${timeMove}s all`,
  transform: `translate(-300px, 0)`,
};

let dataItemMenu = [
  {
    to: "/admin/dashboard",
    text: "Dashboard",
    icon: "fa-fw fa-tachometer-alt",
  },
  { to: "/admin/user-management", text: " quản lý users", icon: "fa-users" },
  {
    to: "/admin/tour-management",
    text: "quản lý tour",
    icon: "fa-globe-africa",
  },
  {
    to: "/admin/booking-management",
    text: "quản lý booking",
    icon: "fa-calendar-check",
  },
];

const MenuAdmin = (props) => {
  const [isShowMenu, setIsShowMenu] = useState(true);

  const handerClickShowOffMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const adminUser = JSON.parse(localStorage.getItem("TokenAdmin"));

  return props.location.pathname === "/admin/login-admin" || !adminUser ? (
    ""
  ) : (
    <>
      <BtnClickShowMenu
        isShowMenu={isShowMenu}
        handerClickShowOffMenu={handerClickShowOffMenu}
      />
      <div style={isShowMenu ? divBackend : divBackendMenuHiden}></div>
      <div style={isShowMenu ? divWarpMenu : divWarpMenuHiden}>
        <div className="w-100 height-100 m-0 p-3 ">
          <div className="w-100 text-center">
            <ShowInformationAdmin adminUser={adminUser} />
            <hr
              style={{ height: "5px", borderRadius: "3px" }}
              className="bg-white"
            />
          </div>
          {dataItemMenu.map((e, i) => (
            <ItemMenuAdmin
              id={"dataItemMenu" + i}
              key={"dataItemMenu" + i}
              data={e}
            />
          ))}
        </div>
        <LogoutAdmin />
      </div>
    </>
  );
};

export default withRouter(MenuAdmin);
