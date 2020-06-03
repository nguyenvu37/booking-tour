import React, {Component} from 'react';
import MyPagination from '../../../../common/my-pagination';
import callApi from '../../../../common/callAPI';
import ItemBookingManagement from './itemBookingManagement';

class BookingManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingTours: [],
      indexDataRender: 0,
      currentPage: 1,
    };
    this._limit = 10;
    this.inputSearch = React.createRef();
  }

  componentDidMount() {
    callApi(`bookings_tour?_sort=time&_order=desc`, 'get', null).then((res) => {
      if (res.status === 200) {
        this.setState({
          bookingTours: res.data,
        });
      }
    });
  }

  removeAccents = (str) => {
    let AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
      let re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      let char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  handleSearch = () => {
    const keyword = this.inputSearch.current.value;
    let arrFilter = [];
    if (keyword !== '') {
      console.log('this.state.bookingTours :>> ', this.state.bookingTours);
      callApi(`bookings_tour`, 'get', null).then(res => {
        if (res && res.data.length > 0) {
          res.data.filter((item) => {
            let arrCharId = item.id
              .toUpperCase()
              .split(' ')
              .filter((x) => x !== '')
              .join('');
            let arrCharKeyword = this.removeAccents(keyword)
              .toUpperCase()
              .split(' ')
              .filter((x) => x !== '')
              .join('');
            let arrCharUserName = this.removeAccents(item.userName)
              .toUpperCase()
              .split(' ')
              .filter((x) => x !== '')
              .join('');
            let arrCharStatus = item.status
              .toUpperCase()
              .split(' ')
              .filter((x) => x !== '')
              .join('');
            if (arrCharId.includes(arrCharKeyword)) {
              arrFilter.push(item);
              return [...arrFilter];
            }
            if (arrCharUserName.includes(arrCharKeyword)) {
              arrFilter.push(item);
              return [...arrFilter];
            }
            if (arrCharStatus.includes(arrCharKeyword)) {
              arrFilter.push(item);
              return [...arrFilter];
            }
            return [...arrFilter];
          });
          this.setState({
            bookingTours: arrFilter,
            currentPage: 1,
            indexDataRender: 0,
          });
        }
      });
    } else {
      callApi(`bookings_tour`, 'get', null).then((res) => {
        if (res && res.status === 200) {
          this.setState({
            bookingTours: res.data
          });
        }
      });
      return;
    }
  };

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
    if (this.state.bookingTours.length <= 0) return;
    let end =
      this.state.indexDataRender + this._limit >= this.state.bookingTours.length
        ? this.state.bookingTours.length
        : this.state.indexDataRender + this._limit;

    if (this.state.bookingTours.length === 1) return this.state.bookingTours;
    for (let i = this.state.indexDataRender; i < end; i++) {
      datanew.push(this.state.bookingTours[i]);
    }
    return datanew;
  };

  render() {
    let itemBookingManager =
      this.pagination() &&
      this.pagination().map((item, index) => {
        return (
          <ItemBookingManagement key={index} dataBooking={item} index={index} />
        );
      });
    return (
      <div className="card text-center">
        <h5 className="card-header bg-info text-light">
          <i className="far fa-calendar-alt"></i> QUẢN LÝ BOOKING
        </h5>
        <div className="card-body">
          <div className="form-inline my-2 float-right">
            <span className="btn" style={{transform: 'translate(39px, 0)'}}>
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              ref={this.inputSearch}
              className="form-control pl-5"
              placeholder="Search..."
              onKeyUp={this.handleSearch}
            />
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="bg-secondary text-light">
                <th>STT</th>
                <th>
                  <i className="fas fa-id-badge"></i> Mã Đặt Chỗ
                </th>
                <th>
                  <i className="far fa-user"></i> Tên Người Dùng
                </th>
                <th><i className="fas fa-plane-departure"></i> Tên Tour</th>
                <th><i className="fas fa-money-bill-wave"></i> Giá</th>
                <th><i className="fas fa-shopping-cart"></i> Trạng Thái</th>
                <th>Chi Tiết</th>
              </tr>
            </thead>
            <tbody>{itemBookingManager}</tbody>
          </table>
          <MyPagination
            nextPage={this.nextPage}
            prePage={this.prePage}
            data={this.state.bookingTours}
            _limit={this._limit}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default BookingManagement;
