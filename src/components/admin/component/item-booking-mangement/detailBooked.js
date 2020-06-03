import React, {useEffect} from 'react';
import {useState} from 'react';
import NotFound from '../../../bodys/home/notFound/404NotFound';
import Waiting from '../../../../common/waiting';
import {formCurencyVN} from '../../../../common/funcCommon';
import callApi from '../../../../common/callAPI';
import {withRouter} from 'react-router';

const DetailBooked = (props) => {
  const [getData, setGetData] = useState();
  const [status, setStatus] = useState();
  const [statusGetData, setStatusGetData] = useState('pending');

  useEffect(() => {
    setStatusGetData('pending');
    let isUnmounting = false;
    callApi(`bookings_tour?id=${props.match.params.id}`, 'Get', null).then(
      (res) => {
        if (
          res &&
          res.data[0] &&
          !isUnmounting &&
          res.status === 200 &&
          res.data
        ) {
          setGetData(res.data[0]);
          setStatusGetData('finish');
          setStatus(res.data[0].status);
        } else setStatusGetData('error');
      }
    );
    return () => {
      isUnmounting = true;
    };
  }, [props.match.params.id]);

  function handleCancelBill(id) {
    console.log('id :>> ', id);
    let dataEdit = {
      id: getData.id,
      userID: getData.userID,
      userName: getData.userName,
      tourID: getData.tourID,
      nameTour: getData.nameTour,
      numberOfTickerNormal: getData.numberOfTickerNormal,
      numberOfChildrenTicker: getData.numberOfChildrenTicker,
      priceNormalTicker: getData.priceNormalTicker,
      priceNormalChildrenTicker: getData.priceNormalChildrenTicker,
      sumPrice: getData.sumPrice,
      time: getData.time,
      timeChose: getData.timeChose,
      status: 'cancelled',
    };
    if (window.confirm('Bạn có chắc chắn hủy bỏ hóa đơn này?')) {
      callApi(`bookings_tour/${id}`, 'Put', {...dataEdit}).then((res) => {});
      setStatus(dataEdit.status);
    }
  }

  function handleRepair(id) {
    let dataEdit = {
      id: getData.id,
      userID: getData.userID,
      userName: getData.userName,
      tourID: getData.tourID,
      nameTour: getData.nameTour,
      numberOfTickerNormal: getData.numberOfTickerNormal,
      numberOfChildrenTicker: getData.numberOfChildrenTicker,
      priceNormalTicker: getData.priceNormalTicker,
      priceNormalChildrenTicker: getData.priceNormalChildrenTicker,
      sumPrice: getData.sumPrice,
      time: getData.time,
      timeChose: getData.timeChose,
      status: 'paid',
    };
    if (window.confirm('Bạn muốn lấy lại hóa đơn này?')) {
      callApi(`bookings_tour/${id}`, 'Put', {...dataEdit}).then((res) => {});
      setStatus(dataEdit.status);
    }
  }

  return statusGetData === 'finish' ? (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Invoice:
          <strong> {new Date(getData.time).toLocaleString('en-GB')}</strong>
          <span className="float-right">
            {' '}
            <strong>Status:</strong>{' '}
            <span
              style={{textTransform: 'uppercase'}}
              className={status === 'paid' ? 'text-success' : 'text-danger'}
            >
              {' '}
              {status}
            </span>
          </span>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-6 ">
              Booking By : <strong>{getData.userName}</strong>
            </div>
            <div className="col-sm-6 text-left">
              Tour : <strong>{getData.nameTour}</strong>
            </div>
            <div className="col-sm-6">
              ID Booking: <strong>{getData.id}</strong>
            </div>
            <div className="ml-auto col-sm-6 text-left ">
              Start Day :{' '}
              <strong>
                {new Date(getData.timeChose).toLocaleDateString('en-GB')}
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
              <div className="text-right">
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleRepair(getData.id)}
                >
                  Sửa lại
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleCancelBill(getData.id)}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : statusGetData === 'error' ? (
    <NotFound />
  ) : (
    <Waiting />
  );
};

export default withRouter(DetailBooked);
