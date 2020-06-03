import React, { useState } from "react";
import "./rating.css";
import ElementStart from "./element-start";

const BgRating = (props) => {
  const [poinCurrent, setPoinCurrent] = useState(0);
  const [poinCurrentHover, setPoinCurrentHover] = useState(
    props.poinDefaul ? props.poinDefaul : 0
  );
  const canChangePoin = props.canChangePoin || false;

  const handlerHover = (e) => {
    if (e.target.dataset.poin === poinCurrentHover || !canChangePoin)
      return false;
    setPoinCurrentHover(e.target.dataset.poin);
    return true;
  };

  const handlerOut = () => {
    if (poinCurrent === poinCurrentHover || !canChangePoin) return false;
    setPoinCurrentHover(poinCurrent);
    return true;
  };
  const handlerClick = (e) => {
    if (e.target.dataset.poin === poinCurrent || !canChangePoin) return false;
    setPoinCurrent(e.target.dataset.poin);
    if (props.getStartPoin) {
      props.getStartPoin(e.target.dataset.poin);
    }
    return true;
  };

  return (
    <div style={{ ...props.custome }} className="mx-2">
      <ElementStart
        poinCurrent={poinCurrentHover}
        handlerHover={handlerHover}
        handlerOut={handlerOut}
        handlerClick={handlerClick}
      />
    </div>
  );
};

export default BgRating;
