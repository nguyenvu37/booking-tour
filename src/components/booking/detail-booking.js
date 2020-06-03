import React, { useEffect } from "react";
import callApi from "../../common/callAPI";
import { useState } from "react";
import { formCurencyVN } from "../../common/funcCommon";
import NotFound from "../bodys/home/notFound/404NotFound";
import Waiting from "../../common/waiting";
import { Link } from "react-router-dom";

const DetailBooking = (props) => {
  const [getData, setGetData] = useState();
  const [statusGetData, setStatusGetData] = useState("pending");

  useEffect(() => {
    setStatusGetData("pending");
    let isUnmounting = false;
    callApi(`bookings_tour?id=${props.match.params.id}`, "Get", null).then(
      (res) => {
        if (
          res &&
          res.data[0] &&
          !isUnmounting &&
          res.status === 200 &&
          res.data
        ) {
          setGetData(res.data[0]);
          setStatusGetData("finish");
        } else setStatusGetData("error");
      }
    );
    return () => {
      isUnmounting = true;
    };
  }, [props.match.params.id]);

  return statusGetData === "finish" ? (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Invoice:
          <strong> {new Date(getData.time).toLocaleString("en-GB")}</strong>
          <span className="float-right">
            {" "}
            <strong>Status:</strong>{" "}
            <span
              style={{ textTransform: "uppercase" }}
              className={
                getData.status === "paid" ? "text-success" : "text-danger"
              }
            >
              {" "}
              {getData.status}
            </span>
          </span>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-6 ">
              ID Booking : <strong>{props.match.params.id}</strong>
            </div>
            <div className="col-sm-6 ">
              Đi Đến Tour :{" "}
              <strong>
                <Link to={`/detail/${getData.tourID}`}>Đi Đến Tour </Link>
              </strong>
            </div>
            <div className="ml-auto col-sm-6 text-left ">
              ID Tour : <strong>{getData.tourID}</strong>
            </div>
            <div className="col-sm-6 ">
              Booking By : <strong>{getData.userName}</strong>
            </div>
            <div className="col-sm-6 text-left">
              Tour : <strong>{getData.nameTour}</strong>
            </div>
            <div className="ml-auto col-sm-6 text-left ">
              Start Day :{" "}
              <strong>
                {new Date(getData.timeChose).toLocaleDateString("en-GB")}
              </strong>
            </div>
          </div>

          <div className="table-responsive-sm">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Ticket Type </th>

                  <th className="right">Unit Cost</th>
                  <th className="center">Qty</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="center">1</td>
                  <td className="left strong">Normal</td>

                  <td className="right">
                    {getData.numberOfTickerNormal === 0
                      ? formCurencyVN(0)
                      : formCurencyVN(
                          getData.priceNormalTicker /
                            getData.numberOfTickerNormal
                        )}
                  </td>
                  <td className="center">{getData.numberOfTickerNormal}</td>
                  <td className="right">
                    {formCurencyVN(getData.priceNormalTicker)}
                  </td>
                </tr>
                <tr>
                  <td className="center">2</td>
                  <td className="left strong">Child Tickets</td>

                  <td className="right">
                    {getData.numberOfChildrenTicker === 0
                      ? formCurencyVN(0)
                      : formCurencyVN(
                          getData.priceNormalChildrenTicker /
                            getData.numberOfChildrenTicker
                        )}
                  </td>
                  <td className="center">{getData.numberOfChildrenTicker}</td>
                  <td className="right">
                    {formCurencyVN(getData.priceNormalChildrenTicker)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-5"></div>

            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Discount (0%)</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>VAT (0%)</strong>
                    </td>
                    <td className="right">0</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>{formCurencyVN(getData.sumPrice)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : statusGetData === "error" ? (
    <NotFound />
  ) : (
    <Waiting />
  );
};

export default DetailBooking;
