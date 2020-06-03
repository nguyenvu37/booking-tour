import React from "react";
import EditTour from "../../component/editor/edit-tour";
import { Link } from "react-router-dom";

const stypeId = {
  fontWeight: "900",
  color: "rgb(78, 115, 223)",
  float: "left",
};
const EditAdminTour = (props) => {
  return (
    <div
      style={{
        borderRadius: "1rem",
        marginBottom: "1rem",
        // transform: "translate(0, -70px)",
      }}
      className="p-3 bg-white shadow"
    >
      <p style={stypeId} className="m-0 p-0">
        ID: {props.match.params.id}
      </p>
      <Link style={{ float: "right" }} to="/admin/tour-management">
        <i className="fa fa-chevron-left" aria-hidden="true"></i> Quay Lại
      </Link>
      <h5
        style={{
          fontWeight: "900",
          color: "rgb(78, 115, 223)",
          fontSize: "33px",
          textAlign: "center",
        }}
      >
        Edit Tour{" "}
      </h5>
      <EditTour />
    </div>
  );
};

export default EditAdminTour;
