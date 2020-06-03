import React, { useRef } from "react";
import pane from "../../../image/dulichvn1.png";
import { connect } from "react-redux";
import { setDataSearch } from "../../../action/search";

const TourSearch = (props) => {
  const dateSearchDefaul = props.dateStart
    ? new Date(props.dateStart).toISOString().substr(0, 10)
    : "";

  const inputSearch = useRef("");
  const selectType = useRef("");
  const dateStart = useRef("");
  const dataOptional = [
    {
      title: "Chọn type tour",
      value: "",
    },
    {
      title: "Tour Hot",
      value: "hot",
    },
    {
      title: "Giảm Giá",
      value: "discount",
    },
    {
      title: "Tour Nước Ngoài",
      value: "foreign",
    },
  ];

  const handleForcus = (e) => {
    e.target.type = "date";
  };

  const handleUnforcus = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
    } else {
      e.target.type = "date";
    }
  };

  const getDataAndDispatch = () => {
    if (props.statusGetData === "connectError") props.wasGetDataFail();
    let date =
      dateStart.current.value === ""
        ? ""
        : new Date(dateStart.current.value).getTime();
    let data = {
      q: inputSearch.current.value,
      typeTour: selectType.current.value,
      dateStart: date,
    };
    props.getDataSearch(data);
  };

  return (
    <div>
      <div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={pane} className="" alt="..." />
          </div>
        </div>
      </div>
      <div className="search-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                  <input
                    ref={inputSearch}
                    type="text"
                    className="form-control search-slt"
                    name="q"
                    placeholder="Bạn Muốn Đi Đâu"
                    defaultValue={props.q}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                  <input
                    ref={dateStart}
                    type={dateSearchDefaul === "" ? "text" : "date"}
                    className="form-control search-slt"
                    placeholder="Thời Gian Đi"
                    name="dateStart"
                    onFocus={handleForcus}
                    onBlur={handleUnforcus}
                    defaultValue={dateSearchDefaul}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                  <select
                    ref={selectType}
                    name="typeTour"
                    className="form-control search-slt"
                    id="exampleFormControlSelect1"
                    defaultValue={props.typeTour}
                  >
                    {dataOptional.map((e, i) => (
                      <option key={dataOptional + i} value={e.value}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                  {props.statusGetData !== "pending" ? (
                    <button
                      onClick={getDataAndDispatch}
                      type="button"
                      className="btn btn-primary wrn-btn "
                    >
                      Search
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      onClick={getDataAndDispatch}
                      type="button"
                      className="btn btn-primary wrn-btn "
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      -<span>Loading...</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataSearch: (data) => dispatch(setDataSearch(data)),
  };
};

export default connect(null, mapDispatchToProps)(TourSearch);
