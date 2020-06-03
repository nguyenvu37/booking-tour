import React from "react";
import PostTour from "../../component/editor/post-tour ";
import { Link } from "react-router-dom";

const AddnewTour = () => {
  return (
    <div
      style={{
        borderRadius: "1rem",
        marginBottom: "1rem",
        // transform: "translate(0, -70px)",
      }}
      className="p-3 bg-white shadow"
    >
      <Link style={{ float: "right" }} to="/admin/tour-management">
        <i class="fa fa-chevron-left" aria-hidden="true"></i> Quay Lại
      </Link>
      <h5
        style={{
          fontWeight: "900",
          color: "rgb(78, 115, 223)",
          fontSize: "33px",
          textAlign: "center",
        }}
      >
        New Tour{" "}
      </h5>
      <PostTour />
    </div>
  );
};

export default AddnewTour;
