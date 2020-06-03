import React from "react";
import IteamInput from "./iteam-input";
import MultiSelect from "react-multi-select-component";
import StoreForTime from "../select-muti-time/store-for-time";

const FormTour = (props) => {
  const options = [
    { label: "Giảm Giá", value: "discount" },
    { label: "Nước Ngoài", value: "foreign" },
    { label: "Tour Hot", value: "hot" },
  ];

  const optionsTransit = [
    { label: "Xe Hơi", value: "Xe Hơi" },
    { label: "Máy Bay", value: "Máy Bay" },
    { label: "Tàu Hỏa", value: "Tàu Lữa" },
    { label: "Xe Khách", value: "Xe Khách" },
  ];

  const datas = [
    {
      label: "Image",
      name: "image",
      placeholder: "Nhập Url Image",
      id: "image",
      value: props.tourData.image,
    },
    {
      label: "Tại Thành Phố",
      name: "city",
      placeholder: "Nhập Tên Thành Phố",
      id: "city",
      value: props.tourData.city,
    },
    {
      label: "Tại Đất Nước",
      name: "country",
      placeholder: "Nhập Tên Đất Nước",
      id: "country",
      value: props.tourData.country,
    },
    {
      label: "Số Ngày Của Tour",
      name: "timeJoin",
      placeholder: "ex: 2ngày 1 đêm",
      id: "timeJoin",
      value: props.tourData.timeJoin,
    },
    {
      label: "Tháng Thường Có Nhiều  Tour Nhất ",
      name: "calendar",
      placeholder: "ex: Tháng 3",
      id: "calendar",
      value: props.tourData.calendar,
    },
  ];

  const formatCurency = (text) => {
    return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const validateMuilSelect = (data) => {
    // gán data
    props.setSelected(data);
  };

  const validateMuilSelectTransit = (data) => {
    // gán data
    props.setSelectedTransit(data);
    console.log("data :>> ", data);
    const message = props.validateInput("transit", data);
    props.getMessErrorFormChild({
      ...props.messError,
      transit: message,
    });
  };
  const handerValidate = (e) => {
    console.log("e.target.name :>> ", e.target.name);
    let textChecking =
      e.target.name === "price"
        ? e.target.value
            .split(" ")
            .filter((e) => e !== "")
            .join("")
            .replace(/[^0-9]/g, "")
        : e.target.value;

    let message = props.validateInput(e.target.name, textChecking);
    props.getMessErrorFormChild({
      ...props.messError,
      [e.target.name]: message,
    });
  };

  return (
    <form>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="price">Kiểu tour</label>
          <MultiSelect
            options={options}
            value={props.selected}
            onChange={validateMuilSelect}
            labelledBy={"Select"}
            overrideStrings={{
              selectSomeItems: "Chọn...",
              allItemsAreSelected: "Chọn Tất Cả",
              selectAll: "Chọn Tất Cả ",
              search: "Tìm Kiếm",
            }}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="price">Phương Tiện Di Chuyển</label>{" "}
          <label style={{ display: "inline" }} className="invalid-feedback">
            {props.messError.transit}
          </label>
          <MultiSelect
            options={optionsTransit}
            value={props.selectedTransit}
            onChange={validateMuilSelectTransit}
            labelledBy={"Select"}
            overrideStrings={{
              selectSomeItems: "Chọn...",
              allItemsAreSelected: "Chọn Tất Cả",
              selectAll: "Chọn Tất Cả ",
              search: "Tìm Kiếm",
            }}
          />
        </div>

        {datas.map((data, index) => {
          return (
            <IteamInput
              key={index + "IteamInputt"}
              data={data}
              handerOnChangeDataTour={props.handerOnChangeDataTour}
              validateInput={props.validateInput}
              getMessErrorFormChild={props.getMessErrorFormChild}
              messError={props.messError}
            />
          );
        })}

        <div className="form-group col-md-6">
          <label htmlFor="price">Giá </label>{" "}
          <label style={{ display: "inline" }} className="invalid-feedback">
            {props.messError.price}
          </label>
          <input
            onChange={(e) => {
              if (e.target.value.length > 19) return;
              props.setTourData({
                ...props.tourData,
                [e.target.name]: e.target.value
                  .split(" ")
                  .filter((e) => e !== "")
                  .join("")
                  .replace(/[^0-9]/g, ""),
              });
              handerValidate(e);
            }}
            // onBlur={handerValidate}
            type="text"
            name="price"
            className="form-control"
            id="price"
            placeholder="Nhập Giá Tiền"
            //   onBlur={props.handerOnChangeDataTour}
            value={formatCurency(props.tourData.price).trim()}
          />
        </div>
        <StoreForTime
          messError={props.messError}
          handerUpdateNewTimeStart={props.handerUpdateNewTimeStart}
          dataArrayTime={props.tourData.timeStart}
        />
      </div>
    </form>
  );
};

export default FormTour;
