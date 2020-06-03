import React from "react";
import CartAtm from "../../common/cart-atm";
import Modal from "../../common/modal";

// const typeCardPayment = {
//   position: "absolute",
//   display: "block",
//   top: "150px",
//   right: "25%",
//   left: "25%",
//   zIndex: 1050,

// };
const Payment = (props) => {
  return (
    <>
      <Modal handlerCkickShowModal={props.handlerCkickShowModal} />
      <CartAtm
        handlerPaymet={props.handlerPaymet}
        valueMoney={props.data.curentSumPrice}
        off={props.off}
      />
    </>
  );
};
export default Payment;
