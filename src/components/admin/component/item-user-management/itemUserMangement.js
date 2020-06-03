import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAdminItem} from '../../../../action/adminManager';
import {editAdminItem} from '../../../../action/adminManager';
import callApi from '../../../../common/callAPI';

class ItemUserMangement extends Component {
    onDelete = (id) => {
        callApi(`Users/${id}`, 'DELETE', null).then(res => {
            this.props.handleDelete(id);
        });
    };

    onEdit = id => {
        this.props.handleEdit(id);
    };
  render() {
    const {dataUser} = this.props;
    return (
      <tr>
        <td>{dataUser.usersName}</td>
        <td>{dataUser.gmail}</td>
        <td>{dataUser.firtName}</td>
        <td>{dataUser.lastName}</td>
        <td>
          <button 
            type="button" 
            className="btn btn-primary ml-2"
            style={{width: '80px'}}
            onClick={() => this.onEdit(dataUser.id)}
            >
            <i className="fas fa-edit"></i> Sửa
          </button>
          <button 
            type="button" 
            className="btn btn-danger ml-2"
            style={{width: '80px'}}
            onClick={() => this.onDelete(dataUser.id)}
            >
            <i className="fas fa-trash-alt"></i> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => dispatch(deleteAdminItem(id)),
    handleEdit: (id) => dispatch(editAdminItem(id)),
  };
};

export default connect(null, mapDispatchToProps)(ItemUserMangement);
