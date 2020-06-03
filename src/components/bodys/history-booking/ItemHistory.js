import React, {Component} from 'react';
import { formCurencyVN } from "../../../common/funcCommon";
import { Link } from 'react-router-dom';

class ItemHistory extends Component {
  render() {
    const {data, index} = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data.nameTour}</td>
        <td>{formCurencyVN(data.sumPrice)}</td>
        <td>{new Date(data.time).toLocaleDateString("en-GB")}</td>
        <td>
          <Link to={`/booking/${data.id}`} className="btn btn-info ml-2" style={{width: '80px'}}>
            Chi tiết
          </Link>
        </td>
      </tr>
    );
  }
}

export default ItemHistory;
