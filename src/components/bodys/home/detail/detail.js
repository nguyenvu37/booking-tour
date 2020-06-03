import React, { Component, memo } from "react";
import ImageCap from "./img";
import "./product-detail.css";
import BookingForm from "./bookingForm";
import TourDetailHeadLine from "./tourDetailHeadLine";
import callApi from "../../../../common/callAPI";
import Waiting from "../../../../common/waiting";
import CheckConnect from "../../../../common/checkConnect";
import BgComment from "../../../../common/comment/bg-comment";
import NotFound from "../notFound/404NotFound";
import Payment from "../../../payment/payment";
import {NotificationManager} from 'react-notifications';
import { v4 as uuidv4 } from "uuid";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTour: "",
      spaceTop: 175,
      showModal: false,
      off: false,
      dataFromBooking: null,
    };
  }

  setCurrenSumPrice = async (obj) => {
    this.setState({
      dataFromBooking: obj,
    });
  };

  handlerCkickShowModal = () => {
    if (this.state.showModal === true)
      this.setState({
        off: true,
      });
    setTimeout(() => {
      this.setState({
        showModal: !this.state.showModal,
        off: false,
      });
    }, 300);
  };

  handlerPaymet = async () => {
    const currentUser = JSON.parse(localStorage.getItem("Token"));
    if (!currentUser) return;
    const booking = {
      id: uuidv4(),
      userID: currentUser.id,
      userName: currentUser.firtName + " " + currentUser.lastName,
      tourID: this.props.match.params.id,
      nameTour: `${this.state.dataTour[0].city} - ${this.state.dataTour[0].country} - ${this.state.dataTour[0].timeJoin}`,
      numberOfTickerNormal: this.state.dataFromBooking.numberOfTicker,
      numberOfChildrenTicker: this.state.dataFromBooking.numberOfChildrenTicker,
      priceNormalTicker: this.state.dataFromBooking.currentPriceTicker,
      priceNormalChildrenTicker: this.state.dataFromBooking
        .currentPriceChildrenTicker,
      sumPrice: this.state.dataFromBooking.curentSumPrice,
      time: Date.now(),
      timeChose: this.state.dataFromBooking.timeChose,
      status: "paid",
    };

    await callApi(`bookings_tour`, "Post", { ...booking }).then((res) => {
      if (res && res.status === 201) {
        NotificationManager.success(
          "Success message",
          "Booking Thành Công"
        );
        this.props.history.push(`/booking/${res.data.id}`);
      } else NotificationManager.error("Error message", "Booking Thất Bại");
    });
  };

  async componentDidMount() {
    await callApi(`tours/?id=${this.props.match.params.id}`, "Get", null).then(
      (res) => {
        if (res && res.data)
          this.setState({
            dataTour: res.data,
          });
        else
          this.setState({
            dataTour: "0",
          });
      }
    );
    window.addEventListener("scroll", this.handerScrollAtBooking);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }

  handerScrollAtBooking = () => {
    const isTop = window.scrollY >= 0 && window.scrollY < 106;
    const top = document.querySelector(".offSetTopFromBooking").offsetTop;
    isTop
      ? this.setState({ spaceTop: top - window.scrollY + 3 })
      : this.setState({ spaceTop: 78 });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handerScrollAtBooking);
  }

  render() {
    return this.state.dataTour.length === 0 &&
      this.state.dataTour !== "" &&
      this.state.dataTour !== "0" ? (
      <NotFound />
    ) : this.state.dataTour &&
      this.state.dataTour !== "0" &&
      this.state.dataTour !== "" ? (
      <>
        <div className="container">
          <div className="row">
            <div className="title-tour col-12 mt-3">
              <h2 className="page-title col-lg-8 text-center">
                <b>
                  {this.state.dataTour[0] &&
                    `${this.state.dataTour[0].city} - ${this.state.dataTour[0].country} - ${this.state.dataTour[0].timeJoin}`}
                </b>
              </h2>
            </div>
          </div>
          <div className="row  offSetTopFromBooking">
            <div className="col-12">
              <div className="row">
                <div className="detail-tour col-lg-7 col-xl-8 col-12 pb-3 mb-2 border">
                  <div className="row img-overview">
                    <ImageCap
                      dataTour={
                        this.state.dataTour[0] && this.state.dataTour[0]
                      }
                      {...this.props}
                    />
                    <BookingForm
                      dataTour={
                        this.state.dataTour[0] && this.state.dataTour[0]
                      }
                      spaceTop={this.state.spaceTop}
                      {...this.props}
                      handlerCkickShowModal={this.handlerCkickShowModal}
                      setCurrenSumPrice={this.setCurrenSumPrice}
                    />
                    <TourDetailHeadLine {...this.props} />
                  </div>
                  <BgComment />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showModal ? (
          <Payment
            off={this.state.off}
            data={
              this.state.dataTour[0]
                ? {
                    ...this.state.dataFromBooking,
                    nameTour: `${this.state.dataTour[0].city} - ${this.state.dataTour[0].country} - ${this.state.dataTour[0].timeJoin}`,
                  }
                : { ...this.state.dataFromBooking }
            }
            handlerPaymet={this.handlerPaymet}
            handlerCkickShowModal={this.handlerCkickShowModal}
          />
        ) : (
          ""
        )}
      </>
    ) : this.state.dataTour === "" ? (
      <div className="container">
        <Waiting />
      </div>
    ) : (
      <div className="container">
        <CheckConnect />
      </div>
    );
  }
}

export default memo(Detail);
