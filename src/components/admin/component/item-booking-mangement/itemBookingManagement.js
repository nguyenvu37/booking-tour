import React, {Component} from 'react';
import {formCurencyVN} from '../../../../common/funcCommon';
import {Link} from 'react-router-dom';

class ItemBookingManagement extends Component {
  render() {
    const {dataBooking, index} = this.props;
    let classStatus =
      dataBooking.status === 'paid' ? 'text-warning' : 'text-danger';
    return (
      <tr>
        <td>{index + 1}</td>
        <td className="card w-80 mx-auto mt-1 text-white bg-success">
          {dataBooking.id.slice(0, 8)}
        </td>
        <td>{dataBooking.userName}</td>
        <td style={{fontSize: '0.9rem'}}>{dataBooking.nameTour}</td>
        <td style={{color: '#ff6084eb'}}>
          {formCurencyVN(dataBooking.sumPrice)}
        </td>
        <td
          className={`text-uppercase ${classStatus}`}
          style={{fontWeight: '600'}}
        >
          {dataBooking.status}
        </td>
        <td>
          <Link
            to={`/admin/booking-management/detail/${dataBooking.id}`}
            className="btn btn-info ml-2"
            style={{width: '80px'}}
          >
            Chi tiết
          </Link>
        </td>
      </tr>
    );
  }
}

export default ItemBookingManagement;
