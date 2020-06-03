import React from "react";

const BgTag = (props) => {
  const { color, title, value } = props.data;

  const divWarpTag = {
    height: "100px",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    borderLeft: `0.2rem solid ${color}`,
  };

  const tagName = {
    fontSize: ".7rem",
    color: color,
    fontWeight: 700,
    textTransform: " uppercase",
  };
  const layoutDiv = {
    width: "360px",
  };

  const rowCus = {
    alignItems: "center",
  };

  return (
    <div style={layoutDiv} className="pb-2 m-0">
      <div style={divWarpTag} className="m-0 p-3 shadow height-100">
        <div style={rowCus} className="row">
          <div className="m-0 col text-center">
            <div style={tagName}>{title}</div>
            <div
              style={{
                fontSize: "2.25rem",
                fontWeight: 600,
                color: "#5a5c69",
              }}
            >
              {value}
            </div>
          </div>
          {/* <div className="col-auto">
            <i style={{ color: "#dddfeb" }} className={`fa ${icon} fa-2x`}></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BgTag;
