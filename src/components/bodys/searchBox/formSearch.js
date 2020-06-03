import React from "react";
import { connect } from "react-redux";
import { setDataSearch } from "../../../action/search";
import { withRouter } from "react-router-dom";

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.inputSearch = React.createRef();
    this.selectType = React.createRef();
    this.dateStart = React.createRef();
  }
  handleForcus = (e) => {
    e.target.type = "date";
  };

  handleUnforcus = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
    } else {
      e.target.type = "date";
    }
  };

  handerKeyUpFormSearch = (e) => {
    console.log("props :", this.props.match.path);
    // let currentPath = this.props.match.path;
    // if (e.keyCode === 9 && (currentPath === "/" || currentPath === "/home"))
    //   e.preventDefault();
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handerKeyUpFormSearch);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handerKeyUpFormSearch);
  }

  getDataAndDispatch = () => {
    let date =
      this.dateStart.current.value === ""
        ? ""
        : new Date(this.dateStart.current.value).getTime();
    let data = {
      q: this.inputSearch.current.value,
      typeTour: this.selectType.current.value,
      dateStart: date,
    };
    this.props.getDataSearch(data);

    return this.props.history.push("/tour");
  };

  render() {
    return (
      <div className="">
        <div
          style={{ maxWidth: "1100px" }}
          className="row border-search mx-auto w-75 rounded"
        >
          <div className="col-12">
            <input
              type="text"
              ref={this.inputSearch}
              className="form-control w-100 my-2"
              id="placeWantToGo"
              placeholder="Bạn Muốn Đi Đâu?"
              name="placeWantToGo"
            />
          </div>
          <div className="col-md-4 my-1">
            <input
              ref={this.dateStart}
              type="text"
              className="form-control"
              id="dateStart"
              placeholder="Thời Gian Đi?"
              name="dateStart"
              onFocus={this.handleForcus}
              onBlur={this.handleUnforcus}
            />
          </div>
          <div className="col-md-4 my-1">
            <select
              ref={this.selectType}
              className="form-control"
              id="dateReturn"
              name="dateReturn"
            >
              <option value="">Chọn type tour</option>
              <option className="my-options" value="hot">
                Tour Hot
              </option>
              <option className="my-options" value="discount">
                Giảm Giá
              </option>
              <option className="my-options" value="foreign">
                Tour Nước Ngoài
              </option>
            </select>
          </div>
          <div className="col-md-4 text-right  my-1">
            <button
              className="btn btn-outline-primary w-100 mr-auto"
              onClick={this.getDataAndDispatch}
            >
              Tìm Kiếm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getDataSearch: (data) => dispatch(setDataSearch(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(FormSearch));
