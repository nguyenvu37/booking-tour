import React, {Component} from 'react';
import ItemUserMangement from './itemUserMangement';
import callApi from '../../../../common/callAPI';
import AddItemUser from './addItemUser';
import {connect} from 'react-redux';
import {actFetchData} from '../../../../action/adminManager';
import MyPagination from '../../../../common/my-pagination';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: [],
      indexDataRender: 0,
      currentPage: 1,
    };
    this._limit = 8;
  }

  componentDidMount() {
    callApi(`Users`, 'GET', null).then((res) => {
      if (res.data.length > 0) {
        this.props.fetchAllData(res.data);
      } else this.props.fetchAllData();
    });
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
    if (this.props.dataUsers.length <= 0) return;
    let end =
      this.state.indexDataRender + this._limit >= this.props.dataUsers.length
        ? this.props.dataUsers.length
        : this.state.indexDataRender + this._limit;

    if (this.props.dataUsers.length === 1)
      return this.props.dataUsers;

    for (let i = this.state.indexDataRender; i < end; i++) {
      datanew.push(this.props.dataUsers[i]);
    }
    return datanew;
  };
  render() {
    return (
      <div className="card text-center">
        <h5 className="card-header bg-secondary text-light">
          <i className="fas fa-users"></i> QUẢN LÝ USERS
        </h5>
        <div className="card-body">
          <AddItemUser />
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="bg-light">
                <th>Tên Người Dùng</th>
                <th>Email</th>
                <th>Họ</th>
                <th>Tên</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {this.pagination()&&this.pagination().map((item, index) => {
                return <ItemUserMangement key={index} dataUser={item}/>;
              })}
            </tbody>
          </table>
          <MyPagination
                nextPage={this.nextPage}
                prePage={this.prePage}
                data={this.props.dataUsers}
                _limit={this._limit}
                currentPage={this.state.currentPage}
              />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dataUsers: state.adminItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllData: (data) => dispatch(actFetchData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
