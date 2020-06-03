import React from "react";

const typeModalPaymet = {
  position: "fixed",
  display: "block",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  // backgroundColor: "#6c757d73",
  backgroundColor: "#000000b8",
  zIndex: 1050,
  transition: "all 0.5s ease 0.3s",
};

const Modal = (props) => {
  return (
    <div onClick={props.handlerCkickShowModal} style={typeModalPaymet}></div>
  );
};

export default Modal;
