import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import {v4 as uuidv4} from 'uuid';
import callApi from '../../../../common/callAPI';
import {connect} from 'react-redux';
import {showForm} from '../../../../action/adminManager';
import {closeForm} from '../../../../action/adminManager';
import {actAddData} from '../../../../action/adminManager';
import {updateData} from '../../../../action/adminManager';
import {editAdminItem} from '../../../../action/adminManager';
import SearchUser from './searchUser';

class AddItemUser extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      usersName: '',
      text: '',
      gmail: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    };

    this.id = '';
    this.inputUsersName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputPassWord = React.createRef();
    this.inputPassWordAgain = React.createRef();
    this.inputFirtName = React.createRef();
    this.inputLastName = React.createRef();
  }

  handleClose = () => {
    this.props.handleClose();
  };

  handleShow = () => {
    this.props.handleShow();
  };

  componentDidUpdate() {
    if (this.props.idEdit) {
      console.log('componentDisupdate idEdit');
      callApi(`Users/${this.props.idEdit}`, 'GET', null).then((res) => {
        console.log('dataEdit', res);
        if (res.status === 200 && res.data) {
          this.id = this.props.idEdit;
          this.inputUsersName.current.value = res.data.usersName;
          this.inputEmail.current.value = res.data.gmail;
          this.inputFirtName.current.value = res.data.firtName;
          this.inputLastName.current.value = res.data.lastName;
          this.inputPassWord.current.value = res.data.password;
          this.inputPassWordAgain.current.value = res.data.password;
        }
      });
    }
  }
  checkUsersNameDuplicate = () => {
    callApi(
      `Users?usersName=${this.inputUsersName.current.value}`,
      'Get',
      null
    ).then((res) => {
      if (res.data.length === 0) {
        const regexp = /^[a-zA-Z0-9. ]+$/;
        const checkingResult = regexp.exec(this.inputUsersName.current.value);
        if (checkingResult === null) {
          NotificationManager.warning(
            'Warning message',
            'User Name chỉ gồm ký tự chữ và số không gồm ký tự đặt biệt'
          );
          return false;
        }
        this.checkPassword();
        return false;
      } else {
        NotificationManager.warning('Warning message', 'User Đã Tồn Tại');
        return true;
      }
    });
  };
  checkUsersNameUpdate = () => {
    callApi(
      `Users?usersName=${this.inputUsersName.current.value}`,
      'Get',
      null
    ).then((res) => {
      console.log('res.data checkkuser update', res.data);
      if (res.data.length === 0) {
        const regexp = /^[a-zA-Z0-9. ]+$/;
        const checkingResult = regexp.exec(this.inputUsersName.current.value);
        if (checkingResult === null) {
          NotificationManager.warning(
            'Warning message',
            'User Name chỉ gồm ký tự chữ và số không gồm ký tự đặt biệt'
          );
          return false;
        }
        this.checkPassword();
        return false;
      } else if (
        res.data[0].usersName === this.inputUsersName.current.value &&
        this.props.idEdit === res.data[0].id
      ) {
        this.checkPassword();
        return false;
      } else {
        NotificationManager.warning('Warning message', 'User Đã Tồn Tại');
        return true;
      }
    });
  };

  checkEmaillicate = () => {
    callApi(`Users?gmail=${this.inputEmail.current.value}`, 'Get', null).then(
      (res) => {
        if (res.data.length === 0) {
          const regexp = /\S+@\S+\.\S+/;
          const checkingResult = regexp.exec(this.inputEmail.current.value);
          if (checkingResult === null) {
            NotificationManager.warning(
              'Warning message',
              'Email phải có dạng Ex:abc@abc.com'
            );
            return false;
          }
          this.checkUsersNameDuplicate();
          return false;
        } else {
          NotificationManager.warning('Warning message', 'Email Đã Tồn Tại');
          return true;
        }
      }
    );
  };

  checkPassword = () => {
    const password = this.inputPassWord.current.value;
    const confirmPassword = this.inputPassWordAgain.current.value;
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const checkingResult = regexp.exec(this.inputPassWord.current.value);
    if (checkingResult === null) {
      NotificationManager.warning(
        'Warning message',
        'Mật Khẩu phải có 6 ký tự chữ và số và bắt đầu bằng ký tự chữ'
      );
      return false;
    } else if (password !== confirmPassword) {
      NotificationManager.warning(
        'Warning message',
        'Nhập Lại Mật Khẩu Chưa Đúng'
      );
      return false;
    } else return this.handleLogin();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.inputUsersName.current.value;
    const email = this.inputEmail.current.value;
    const password = this.inputPassWord.current.value;
    const confirmPassword = this.inputPassWordAgain.current.value;

    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      if (this.id) {
        this.checkUsersNameUpdate();
      } else this.checkEmaillicate();
    } else {
      NotificationManager.warning(
        'Warning message',
        'Phải Nhập Đầy Đủ Thông Tin'
      );
    }
  };

  handleLogin = () => {
    if (this.props.idEdit) {
      const data = {
        id: this.id,
        firtName: this.inputFirtName.current.value,
        lastName: this.inputLastName.current.value,
        usersName: this.inputUsersName.current.value,
        password: this.inputPassWord.current.value,
        role: 'menber',
        gmail: this.inputEmail.current.value,
      };
      this.props.handleUpdate(data);
      callApi(`Users/${this.id}`, 'PUT', data).then((res) => {
        if (res && res.status === 200) {
          NotificationManager.success(
            'Success message',
            'Thay Đổi Thông Tin Thành Công'
          );
        } else
          NotificationManager.error(
            'Error message',
            'Thay Đổi Thông Tin Thất Bại'
          );
      });
      this.id = '';
    } else {
      const user = {
        id: uuidv4(),
        firtName: this.inputFirtName.current.value,
        lastName: this.inputLastName.current.value,
        usersName: this.inputUsersName.current.value,
        password: this.inputPassWord.current.value,
        role: 'menber',
        gmail: this.inputEmail.current.value,
      };

      callApi(`Users`, 'Post', user).then((res) => {
        if (res && res.status === 201) {
          NotificationManager.success(
            'Success message',
            'Tạo Tài Khoản Thành Công'
          );
          this.props.onAddData(user);
          this.handleClose();
        } else
          NotificationManager.error('Error message', 'Tạo Tài Khoản Thất Bại');
      });
    }
  };

  render() {
    let titleModal = this.props.idEdit ? 'CHỈNH SỬA USER' : 'THÊM USER';
    const disabled = this.props.idEdit ? 'disabled' : '';
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <span className="btn btn-outline-secondary" onClick={() => this.handleShow()}>
            <i className="fas fa-user-plus"></i> Thêm USER
          </span>
          <SearchUser />
        </div>

        <Modal show={this.props.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{titleModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Tên Người Dùng: </label>
                <input
                  ref={this.inputUsersName}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên người dùng"
                />
              </div>

              <div className="form-group">
                <label>Email: </label>
                <input
                  ref={this.inputEmail}
                  type="text"
                  className="form-control"
                  placeholder="Nhập email"
                  disabled={disabled}
                />
              </div>

              <div className="form-group">
                <label>Họ : </label>
                <input
                  ref={this.inputFirtName}
                  type="text"
                  className="form-control"
                  placeholder="Nhập Họ"
                />
              </div>

              <div className="form-group">
                <label>Tên: </label>
                <input
                  ref={this.inputLastName}
                  type="text"
                  className="form-control"
                  placeholder="Nhập Tên"
                />
              </div>

              <div className="form-group">
                <label>Mật Khẩu: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  ref={this.inputPassWord}
                  name="password"
                />
              </div>

              <div className="form-group">
                <label>Nhập Lại Mật Khẩu: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập lại mật khẩu"
                  ref={this.inputPassWordAgain}
                  name="confirmPassword"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmit}
              type="submit"
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    idEdit: state.editingItem.id,
    show: state.editingItem.show,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddData: (data) => dispatch(actAddData(data)),
    handleShow: () => dispatch(showForm()),
    handleClose: () => dispatch(closeForm()),
    handleUpdate: (data) => dispatch(updateData(data)),
    handleEdit: (id) => dispatch(editAdminItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemUser);
