import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as funcCommon from "../../../common/funcCommon";
import './listTour.css';
class FormBoxTour extends Component {
  renderTimeStart(array) {
    for (let i = 0; i < array.length; i++) {
      // console.log("Date.now() - array[i]", Date.now(), "-", array[i]);
      if (Date.now() < array[i]) {
        return funcCommon.formatDate(array[i]);
      }
    }
    return this.props.data.calendar;
  }
  render() {
    let {
      id,
      image,
      city,
      country,
      timeJoin,
      price,
      calendar,
      transit,
      timeStart,
    } = this.props.data;
    // console.log("this.props.data :", this.props.data);
    return (
      <div
        style={
          this.props.lenght >= 6
            ? {
                transform: `translate3d(  ${
                  this.props.isToLeft
                    ? this.props.currentMove
                    : this.props.currentMove
                }px, 0,0) `,
                transition: "all 1.5s",
                padding: "3%",
              }
            : {}
        }
        // lenght
        className={this.props.lenght >= 6 ? "" : " box-list-tour-warp"}
      >
        <div className="box-element-tour ">
          <div className="image-list-e-w">
            <img
              className="image-list-e rounded"
              //   src={require("../../../image/lodging.png")}
              src={image}
              alt="of-tour"
            />
          </div>

          <div className="list-tour-e-warp"></div>

          <div className="list-e-content rounded">
            <div className="content-infor-warp">
              <div className="content-infor text-center my-0 text-uppercase">
                <h2>{city}</h2>
                <i className="fas fa-globe-africa"></i>
                <h5 className="text-danger">{country}</h5>
              </div>
              <div className="content-infor">
                <i className="far fa-clock"></i> {timeJoin}
              </div>
              <div className="content-infor">
                <i className="fa fa-dollar-sign" aria-hidden="true"></i>
                {" " +
                  Number(price).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </div>
              <div className="content-infor">
                <i className="far fa-calendar-alt"></i>{" "}
                {timeStart ? this.renderTimeStart(timeStart) : calendar}
              </div>
              <div className="content-infor">
                <i className="fas fa-plane"></i> {transit.join(", ")}
              </div>
              <div className=" content-infor text-right">
                <Link tabIndex="-1" to={`/detail/${id}`} className="btn btn-outline-info">
                  Chi Tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="content-price">
          <a tabIndex="-1" href={`/detail/${id}`} className="link-price">
            <div className="price-tour text-danger">
              {' ' +
                Number(price).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default FormBoxTour;
