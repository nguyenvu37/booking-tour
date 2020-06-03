import React, { Component } from "react";
import ItemHistory from "./ItemHistory";
import callApi from "../../../common/callAPI";
import { connect } from "react-redux";
import MyPagination from "../../../common/my-pagination";
import Waiting from "../../../common/waiting";

class HistoryBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingTour: [],
      isExchanged: "",
      userName: "",
      isUnmounting: false,
      indexDataRender: 0,
      currentPage: 1,
    };
    this._limit = 10;
  }

  componentDidMount() {
    this.setState({ pageStatus: "pending" });
    const userID = JSON.parse(localStorage.getItem("Token")).id;
    callApi(`Users/${userID}`, "GET", null).then((res) => {
      if (res && res.status === 200) {
        this.setState({
          userName: res.data.firtName + " " + res.data.lastName,
        });
      } else this.setState({});
    });

    callApi(`bookings_tour?userID=${userID}&_sort=time&_order=desc`, "GET", null).then((res) => {
      if (res && res.status === 200 && !this.state.isUnmounting) {
        this.setState({
          bookingTour: res.data,
          isExchanged: res.data.length === 0 ? "" : res.data[0].id,
          pageStatus: "finish",
        });
        console.log("stateHistory", this.state);
      } else {
        this.setState({ isExchanged: "" });
      }
    });
  }
  componentDidUpdate() {
    if (this.props.loggedIn === false) {
      return this.props.history.push("/home");
    }
  }

  nextPage = (number) => {
    this.setState({
      indexDataRender: number * this._limit,
      currentPage: this.state.currentPage + 1,
    });
  };
  prePage = (number) => {
    this.setState({
      indexDataRender: (number - 2) * this._limit,
      currentPage: this.state.currentPage - 1,
    });
  };

  pagination = () => {
    let datanew = [];
    if (this.state.bookingTour.length <= 0) return;
    let end =
      this.state.indexDataRender + this._limit >= this.state.bookingTour.length
        ? this.state.bookingTour.length
        : this.state.indexDataRender + this._limit;

    if (this.state.bookingTour.length === 1) return this.state.bookingTour;
    for (let i = this.state.indexDataRender; i < end; i++) {
      datanew.push(this.state.bookingTour[i]);
    }
    return datanew;
  };

  render() {
    return this.state.pageStatus === "finish" ? (
      <div className="container">
        <div className="card card-primary mt-3 text-center">
          <div className="card-header bg-info">
            <h3 className="card-title text-white text-uppercase mt-3">
            <i className="fas fa-history"></i> Lịch Sử Giao Dịch
            </h3>
            <div className="row">
              <div className="col-6 text-left text-white">
                Booking By :{" "}
                <strong className="text-uppercase">
                  {this.state.userName}
                </strong>
              </div>
              <div className="col-6 text-right text-warning">
                <strong className="text-uppercase">
                  {this.state.isExchanged !== ""
                    ? ""
                    : "Chưa có lịch sử giao dịch"}
                </strong>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="bg-light">
                  <th>STT</th>
                  <th><i className="fas fa-plane-departure"></i> Tên Tour</th>
                  <th><i className="fas fa-money-bill-wave"></i> Giá</th>
                  <th><i className="fas fa-calendar-times"></i> Thời Gian Giao Dịch</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              <tbody>
                {this.pagination() &&
                  this.pagination().map((item, index) => {
                    return (
                      <ItemHistory key={index} data={item} index={index} />
                    );
                  })}
              </tbody>
            </table>
            {
              console.log('his.state.bookingTour :>> ', this.state.bookingTour)
            }
            <div className="container">
              <MyPagination
                nextPage={this.nextPage}
                prePage={this.prePage}
                data={this.state.bookingTour}
                _limit={this._limit}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Waiting />
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateHistoryBooking", state);
  let loggedIn = state.users.loggedIn;
  return { loggedIn };
};

export default connect(mapStateToProps, null)(HistoryBooking);
