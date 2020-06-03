import React, { Component } from "react";

class ImageCap extends Component {
  render() {
    return this.props.dataTour ? (
      <>
        <div className="w-100">
          <div className="img-capital">
            <img alt="" src={" " + this.props.dataTour.image} />
          </div>
          <div className="col-12 info-journeys">
            <span className="time-join">
              <i className="far fa-clock"></i>
              {" " + this.props.dataTour.timeJoin}
            </span>
            <span className="transit">
              <i className="fas fa-plane"></i>
              {" " + this.props.dataTour.transit.join(", ")}
            </span>
          </div>
        </div>
        <div className="w-100 text-right p-2">
          <span className="tour-code">
            Mã Tour:
            <b className="text-primary">{" " + this.props.dataTour.id}</b>
          </span>
        </div>
      </>
    ) : null;
  }
}

export default ImageCap;
