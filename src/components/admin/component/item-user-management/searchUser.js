import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchData} from '../../../../action/adminManager';
import callApi from '../../../../common/callAPI';

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.inputSearch = React.createRef();
  }

  handleSearch = () => {
    let keyWord = this.inputSearch.current.value;
    callApi(`Users`, 'GET', null).then((res) => {
      if (res.data.length > 0) {
        this.props.handleSearch(keyWord, res.data);
      }
    });
  };

  render() {
    return (
      <div className="d-flex">
        <span className="btn" style={{ transform: "translate(39px, 0)" }}>
        <i className="fas fa-search"></i>
        </span>
        <input
          className="form-control pl-5"
          type="search"
          placeholder="Search..."
          ref={this.inputSearch}
          onKeyUp={this.handleSearch}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('keyword', state.searchUser);
  return {
    keyword: state.searchUser.keyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (keyword, data) => dispatch(searchData(keyword, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
