import React from "react";
import FormSearch from "./formSearch";
import { connect } from "react-redux";
import { setDataSearch } from "../../../action/search";
import { withRouter } from "react-router-dom";
import dulich1 from "./../../../image/dulich1.png";
import dulich2 from "./../../../image/dulich2.jpg";
import dulich3 from "./../../../image/dulich3.png";
import ShowTour from "./showTour";

const dataSearchBoxs = [
  {
    img: dulich1,
    title: "Tour Hot",
    textColor: "text-danger",
  },
  {
    img: dulich2,
    title: "Giảm Giá",
    textColor: "text-success",
  },
  {
    img: dulich3,
    title: "Nước Ngoài",
    textColor: "text-info",
  },
];

class BgSearchBox extends React.Component {
  getDataAndDispatch = () => {
    let data = {
      q: "",
      typeTour: this.props.styleTour,
      dateStart: "",
    };
    this.props.getDataSearch(data);

    return this.props.history.push("/tour");
  };

  render() {
    const dataSearch = dataSearchBoxs.map((item, index) => {
      return <ShowTour key={index} dataShow={item} />;
    });
    return (
      <div className="container-fulid bg-light search-box p-0 ">
        <div className="w-100 black-warp warp-box mx-0">
          <div className="image-bg"></div>

          <h1
            style={{
              transform: "translate(0px, -423px)",
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: "600",
              color: "white",
            }}
            className="mx-auto text-center"
          >
            Du Lịch Cùng Chúng Tôi
          </h1>
          <div className="n3-form-search">
            <div className="row">
              <div className="frame-search">{dataSearch}</div>
            </div>
          </div>
          <div className="m-auto box-search">
            {/* box-search  */}
            <FormSearch {...this.props} />
            {/* end box-search  */}
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

export default connect(null, mapDispatchToProps)(withRouter(BgSearchBox));
