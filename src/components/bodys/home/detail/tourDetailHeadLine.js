import React, { Component, memo } from "react";
import callApi from "../../../../common/callAPI";

class TourDetailHeadLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentData: "",
    };
  }

  componentDidMount() {
    callApi(`Detail?idTour=${this.props.match.params.id}`, "Get", null).then(
      (res) => {
        if (res.data[0]) {
          this.setState({
            contentData: res.data[0].conten,
          });
        } else {
          console.error("error :", "ko data  404");
        }
      }
    );
  }
  render() {
    return (
      <div className="col-12">
        <div className="T">
          <div dangerouslySetInnerHTML={{ __html: this.state.contentData }} />
        </div>

        <div className="tourDetailheadLine">
          <h3 className="text-primary mt-4">Chính sách phụ thu</h3>
          <div className="tourSchedule">
            <p>
              - Trẻ em dưới 4 tuổi miễn phí 100%, ngồi chung ghế với bố mẹ, chi
              phí phát sinh tại điểm du lịch- bố mẹ tự chi trả ( 2 người lớn chỉ
              được kèm 1 trẻ em dưới 4 tuổi).
            </p>
            <p>- Trẻ em từ 4 tuổi đến 7 tuổi tính 75% giá tour người lớn</p>
            <p>- Trẻ em từ 8 tuổi trở lên tính bằng người lớn.</p>
            <p>
              Hai người lớn được kèm 1 trẻ em, trẻ em thứ 2 tính giá người lớn.
            </p>
          </div>
        </div>

        {/* <div className="tourDetailheadLine">
          <h3 className="text-primary mt-4">Tư vấn ngay</h3>
          <div className="tourSchedule">
            <p>
              Để được tư vấn kỹ hơn, Quý Khách vui lòng để lại thông tin liên
              lạc.
            </p>
            <div className="row p-3">
              <div className="col-md-6 form-advisory">
                <div className="form-group">
                  <label htmlFor="name">Họ Tên</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone-number">Điện Thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone-number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Nội dung tư vấn</label>
                  <textarea type="text" className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Yêu cầu tư vấn
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default memo(TourDetailHeadLine);
