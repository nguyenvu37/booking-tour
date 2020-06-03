import React from "react";

const NotFindData = (props) => {
  return (
    <div style={{ ...props.custome }} className="w-100 text-center" role="status">
      <div className="alert alert-info" role="alert">
        Không tìm thấy dữ liệu cần tìm
      </div>
    </div>
  );
};

export default NotFindData;
