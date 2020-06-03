import React, { memo } from "react";

const ElementStart = (props) => {
  const poin = [1, 2, 3, 4, 5];
  return (
    <>
      {poin.map((e, i) => {
        return (
          <span key={i + "poin"}>
            <span
              style={{ transition: "all 0.5s" }}
              data-poin={e}
              className={` fa fa-star ${
                props.poinCurrent > i ? "start-was-checked px-1" : "px-1"
              } `}
              onMouseOver={props.handlerHover}
              onMouseOut={props.handlerOut}
              onClick={props.handlerClick}
            ></span>
          </span>
        );
      })}
    </>
  );
};

export default memo(ElementStart);
