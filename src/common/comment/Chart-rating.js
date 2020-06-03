import React from "react";

import "./chart-rating.css";

const ChartRating = (props) => {
  const { a, b, c, d, e, sumComment, mediumOfStar } = props.data;
  const checkInterger = (number) => {
    return parseInt(number) === number ? number : number.toFixed(2);
  };

  return (
    <div className="container my-5">
      <h6 className="w-100 text-center show-sum-poin">
        {props.washadcomment ? checkInterger(mediumOfStar) + "/5" : ""}

        <span
          style={
            props.washadcomment
              ? {
                  fontSize: "30px",
                  display: "inline-block",
                  transform: "translate(10px, -6px)",
                }
              : {
                  fontSize: "30px",
                  display: "inline-block",
                  transform: "translate(0px, 0px)",
                }
          }
          className="fa fa-star start-was-checked"
        ></span>
      </h6>
      <p className="w-100 text-center">({sumComment} nhận xét)</p>
      <div className="row">
        <div className="col-3 w-100 text-center">1 star</div>
        <div className="col-6  p-0 warp-full-rating-parent">
          <div
            style={{ width: a + "%" }}
            className=" bg-success m-0 warp-full-rating-childrent "
          ></div>
        </div>
        <div className="col-2 w-100 midiumStar">
          <i>{checkInterger(a)}%</i>
        </div>
      </div>
      <div className="row">
        <div className="col-3 w-100 text-center">2 star</div>
        <div className="col-6  p-0 warp-full-rating-parent">
          <div
            style={{ width: b + "%" }}
            className=" bg-success m-0 warp-full-rating-childrent "
          ></div>
        </div>
        <div className="col-2 w-100 midiumStar">{checkInterger(b)}%</div>
      </div>
      <div className="row">
        <div className="col-3 w-100 text-center">3 star</div>
        <div className="col-6  p-0 warp-full-rating-parent">
          <div
            style={{ width: c + "%" }}
            className=" bg-success m-0 warp-full-rating-childrent "
          ></div>
        </div>
        <div className="col-2 w-100 midiumStar">{checkInterger(c)}%</div>
      </div>
      <div className="row">
        <div className="col-3 w-100 text-center">4 star</div>
        <div className="col-6  p-0 warp-full-rating-parent">
          <div
            style={{ width: d + "%" }}
            className=" bg-success m-0 warp-full-rating-childrent "
          ></div>
        </div>
        <div className="col-2 w-100 midiumStar">{checkInterger(d)}%</div>
      </div>
      <div className="row">
        <div className="col-3 w-100 text-center">5 star</div>
        <div className="col-6  p-0 warp-full-rating-parent">
          <div
            style={{ width: e + "%" }}
            className=" bg-success m-0 warp-full-rating-childrent "
          ></div>
        </div>
        <div className="col-2 w-100 midiumStar">{checkInterger(e)}%</div>
      </div>
    </div>
  );
};

export default ChartRating;
