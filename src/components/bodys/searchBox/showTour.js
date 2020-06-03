import React, { Component } from "react";
import { connect } from "react-redux";
import { setDataSearch } from "../../../action/search";
import { withRouter } from "react-router-dom";

class ShowTour extends Component {
  getDataStyleTour = (name) => {
    switch (name) {
      case "Tour Hot":
        return "hot";
      case "Giảm Giá":
        return "discount";
      case "Nước Ngoài":
        return "foreign";
      default:
        break;
    }
  };

  getDataAndDispatch = () => {
    let data = {
      q: "",
      typeTour: this.getDataStyleTour(this.props.dataShow.title),
      dateStart: "",
    };
    this.props.getDataSearch(data);
    return this.props.history.push("/tour");
  };
  render() {
    const { dataShow } = this.props;
    return (
      <div className="o-dl dltn" onClick={this.getDataAndDispatch}>
        <img src={dataShow.img} alt="a" className="iconT-i-c1" />
        <p className="text1">Tìm tour</p>
        <p className={`text2 text-dltn ${dataShow.textColor}`}>
          {dataShow.title}
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataSearch: (data) => dispatch(setDataSearch(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(ShowTour));
