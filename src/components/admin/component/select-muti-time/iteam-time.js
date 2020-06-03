import React from "react";

const StyeItemTime = {
  padding: "0.3rem",
  margin: "0.3rem",
  display: "inline-block",
  whiteSpace: "nowrap",

  overflow: "hidden",
  transition: "all 0.8s",
  width: "110px",
};

const IteamTime = (props) => {
  const { time, index } = props;
  return (
    <span
      className="rounded my-2"
      style={
        time <= Date.now()
          ? { border: "1px solid red", ...StyeItemTime }
          : {
              border: "1px solid rgba(0, 123, 255, 0.64)",
              ...StyeItemTime,
            }
      }
    >
      {new Date(time).toLocaleDateString("en-GB")}{" "}
      <i
        onClick={(e) => {
          props.getIndexTime(e);
        }}
        style={{ cursor: "pointer" }}
        data-index={index}
        className="fa fa fa-times icon-torate-hover"
      ></i>
    </span>
  );
};

export default IteamTime;
