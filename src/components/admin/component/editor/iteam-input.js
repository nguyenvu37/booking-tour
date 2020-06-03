import React from "react";
import { NotificationManager } from "react-notifications";

const IteamInput = (props) => {
  const { label, name, placeholder, id, value } = props.data;
  const arrayMessError = props.messError;
  const messError = arrayMessError[name];

  const handerValidate = (e) => {
    let message = props.validateInput(e.target.name, e.target.value);
    props.getMessErrorFormChild({ ...arrayMessError, [name]: message });
  };

  return (
    <div className="form-group col-md-6">
      <label htmlFor={id}>{label}</label>{" "}
      <label style={{ display: "inline" }} className="invalid-feedback">
        {messError}
      </label>
      <input
        type="text"
        name={name}
        className="form-control "
        id={id}
        value={value}
        placeholder={placeholder}
        // onBlur={handerValidate}
        onChange={(e) => {
          handerValidate(e);
          if (name !== "image") {
            if (e.target.value.length >= 15) {
              NotificationManager.warning("Bạn Không Thể Nhập Quá 15 ký tự");
              return;
            }
          }
          props.handerOnChangeDataTour(e);
        }}
      />
    </div>
  );
};

export default IteamInput;
