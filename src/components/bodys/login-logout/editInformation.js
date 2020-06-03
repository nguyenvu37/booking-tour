import React, {Component} from 'react';
import FormError from './FormError';
import {Link} from 'react-router-dom';
import callApi from '../../../common/callAPI';
import {connect} from 'react-redux';
import { NotificationManager } from "react-notifications";

class EditInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        errorMessage: '',
      },
      firstname: {
        errorMessage: '',
      },
      lastname: {
        errorMessage: '',
      },
      password: {
        errorMessage: '',
      },
      confirmPassword: {
        errorMessage: '',
      },
      id: '',
    };
    this.inputUsersName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputPassWord = React.createRef();
    this.inputPassWordAgain = React.createRef();
    this.inputFirtName = React.createRef();
    this.inputLastName = React.createRef();
  }

  validateInput = (type, checkingText) => {
    if (checkingText === '') {
      return {errorMessage: 'Phải nhập thông tin'};
    }

    if (type === 'username') {
      const regexp = /^[a-zA-Z0-9. ]+$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return {errorMessage: ''};
      } else {
        return {
          errorMessage: 'Tên người dùng chỉ sử dụng chữ cái, số và không có ký tự đặc biệt',
        };
      }
    }

    if (type === 'firstname') {
      const regexp = /^[a-zA-Z ]+$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return {errorMessage: ''};
      } else {
        return {
          errorMessage: 'Họ chỉ gồm chữ cái và không có ký tự đặc biệt',
        };
      }
    }

    if (type === 'lastname') {
      const regexp = /^[a-zA-Z ]+$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return {errorMessage: ''};
      } else {
        return {
          errorMessage: 'Tên chỉ gồm chữ cái và không có ký tự đặc biệt',
        };
      }
    }

    if (type === 'password') {
      const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return {errorMessage: ''};
      } else {
        return {
          errorMessage:
            'Mật khẩu ít nhất 6 ký tự, phải có ký tự số và không chứa ký tự đặc biệt',
        };
      }
    }

    if (type === 'confirmPassword') {
      const regexPass = this.inputPassWord.current.value;
      if (checkingText === regexPass) {
        return {errorMessage: ''};
      } else {
        return {
          errorMessage: 'Nhập lại mật khẩu chưa khớp',
        };
      }
    }
  };

  componentDidMount() {
    if (this.props.loggedIn !== false) {
      const data = JSON.parse(localStorage.getItem('Token'));
      console.log('dataToken', data);
      this.inputUsersName.current.value = data.usersName;
      this.inputEmail.current.value = data.gmail;
      this.inputFirtName.current.value = data.firtName;
      this.inputLastName.current.value = data.lastName;
      this.setState({id: data.id});
    }
  }
  getValueInput = (name) => {
    switch (name) {
      case 'username':
        return this.inputUsersName.current.value;
      case 'firstname':
        return this.inputFirtName.current.value;
      case 'lastname':
        return this.inputLastName.current.value;
      case 'password':
        return this.inputPassWord.current.value;
      case 'confirmPassword':
        return this.inputPassWordAgain.current.value;
      default:
        break;
    }
  };

  handleInputValidation = (e) => {
    const {name} = e.target;
    const {errorMessage} = this.validateInput(name, this.getValueInput(name));
    const newState = {...this.state[name]};
    newState.errorMessage = errorMessage;
    this.setState({[name]: newState});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const password = this.inputPassWord.current.value;
    const confirmPassword = this.inputPassWordAgain.current.value;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        NotificationManager.warning(
          "Warning message",
          "Nhập Lại Mật Khẩu Chưa Đúng"
        );
        return false;
      }
      this.handleLogin();
    } else NotificationManager.warning(
      "Warning message",
      "Nhập Thông Tin Mật Khẩu Cần Thay Đổi"
    );
  };

  handleLogin = () => {
    const user = {
      id: this.state.id,
      firtName: this.inputFirtName.current.value,
      lastName: this.inputLastName.current.value,
      usersName: this.inputUsersName.current.value,
      password: this.inputPassWord.current.value,
      role: 'menber',
      gmail: this.inputEmail.current.value,
    };

    callApi(`users/${this.state.id}`, 'Put', user).then((res) => {
      if (res && res.status === 200) {
        localStorage.setItem(
          "Token",
          JSON.stringify({ ...res.data, password: "****" })
        );
        NotificationManager.success(
          "Success message",
          "Chỉnh Sửa Thông Tin Thành Công"
        );
        this.props.history.push('/home');
      } else NotificationManager.error("Error message", "Chỉnh Sửa Thông Tin Thất Bại");
    });
  };
  render() {
    return (
      <div className="container">
        <div className="border p-3 w-50 mx-auto rounded-lg bg-white login-bg ">
          <form onSubmit={this.handleSubmit}>
            <h3 className="text-center">Chỉnh Sửa Trang Cá Nhân</h3>

            <div className="form-group">
              <label>Tên Người Dùng: </label>
              <input
                ref={this.inputUsersName}
                type="text"
                className="form-control"
                placeholder="Nhập Tên Người Dùng"
                name="username"
                onKeyUp={this.handleInputValidation}
              />
              <FormError errorMessage={this.state.username.errorMessage} />
            </div>

            <div className="form-group">
              <label>Email: </label>
              <input
                ref={this.inputEmail}
                type="text"
                className="form-control"
                placeholder="Nhập Email"
                name="email"
                disabled
              />
            </div>

            <div className="form-group">
              <label>Họ: </label>
              <input
                ref={this.inputFirtName}
                type="text"
                className="form-control"
                placeholder="Nhập Họ Người Dùng"
                name="firstname"
                onKeyUp={this.handleInputValidation}
              />
              <FormError errorMessage={this.state.firstname.errorMessage} />
            </div>

            <div className="form-group">
              <label>Tên: </label>
              <input
                ref={this.inputLastName}
                type="text"
                className="form-control"
                placeholder="Nhập Tên Người Dùng"
                name="lastname"
                onKeyUp={this.handleInputValidation}
              />
              <FormError errorMessage={this.state.lastname.errorMessage} />
            </div>

            <div className="form-group">
              <label>Mật Khẩu: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập Mật Khẩu"
                ref={this.inputPassWord}
                name="password"
                onKeyUp={this.handleInputValidation}
              />
              <FormError errorMessage={this.state.password.errorMessage} />
            </div>

            <div className="form-group">
              <label>Lấy Lại Mật Khẩu: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập Lại Mật Khẩu"
                ref={this.inputPassWordAgain}
                name="confirmPassword"
                onKeyUp={this.handleInputValidation}
              />
              <FormError
                errorMessage={this.state.confirmPassword.errorMessage}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Lưu Lại
            </button>
            <p className="forgot-password text-right mt-3">
              <Link to="/home">Quay lại Trang Chủ</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('stateEditInfo', state);
  return {
    loggedIn: state.users.loggedIn,
  };
};

export default connect(mapStateToProps, null)(EditInformation);
