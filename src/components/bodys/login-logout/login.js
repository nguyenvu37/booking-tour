import React, { Component } from "react";
import "./login.css";
import callApi from "../../../common/callAPI";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../action/users";
import FormError from "./FormError";
import { NotificationManager } from "react-notifications";
// import { createHashHistory } from "history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        errorMessage: "",
      },

      password: {
        errorMessage: "",
      },
    };
    this.inputUsersName = React.createRef();
    this.inputPassWord = React.createRef();
  }

  validateInput = (type, checkingText) => {
    // let dataUser = JSON.parse(localStorage.getItem(checkingText));
    if (checkingText === "") {
      return { errorMessage: "must enter information" };
    }

    if (type === "username") {
      const regexp = /^[a-zA-Z0-9. ]+$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage: "Tên người dùng chỉ sử dụng chữ cái, số và không có ký tự đặc biệt",
        };
      }
    }

    if (type === "password") {
      const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        return { errorMessage: "" };
      } else {
        return {
          errorMessage:
            "Mật khẩu ít nhất 6 ký tự, phải có ký tự số và không chứa ký tự đặc biệt",
        };
      }
    }
  };

  getValueInput = (name) => {
    switch (name) {
      case "username":
        return this.inputUsersName.current.value;
      case "password":
        return this.inputPassWord.current.value;
      default:
        break;
    }
  };

  handleInputValidation = (e) => {
    const { name } = e.target;
    const { errorMessage } = this.validateInput(name, this.getValueInput(name));
    const newState = { ...this.state[name] };
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  handleInputValidationSubmit = (name) => {
    const { errorMessage } = this.validateInput(name, this.getValueInput(name));
    const newState = { ...this.state[name] };
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  handleValidationSubmit = () => {
    this.handleInputValidationSubmit("username");
    this.handleInputValidationSubmit("password");

    if (
      this.state.password.errorMessage !== "" ||
      this.state.username.errorMessage !== "" ||
      this.inputPassWord.current.value === "" ||
      this.inputUsersName.current.value === ""
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (await !this.handleValidationSubmit()) {
      return NotificationManager.warning(
        "Warning message",
        "Không Đúng Định Dạng"
      );
    } else {
      callApi(
        `users?usersName=${this.inputUsersName.current.value}`,
        "Get",
        null
      ).then((res) => {
        if (
          res.data[0] &&
          res.data[0].password === this.inputPassWord.current.value &&
          res.data[0].role === "menber"
        ) {
          localStorage.setItem(
            "Token",
            JSON.stringify({ ...res.data[0], password: "****" })
          );
          // this.setState({
          //   isLogin: true
          // });
          NotificationManager.success(
            "Success message",
            "Đăng Nhập Thành Công"
          );
          this.props.dispatchLogin();
        } else {
          this.inputPassWord.current.value = "";
          this.inputUsersName.current.value = "";
          NotificationManager.error("Error message", "Đăng Nhập Thất Bại");
        }
      });
    }
  };

  render() {
    if (
      this.props.dataLogin.users.loggedIn ||
      localStorage.getItem("Token") !== null
    ) {
      console.log("this.props.history :>> ", this.props.history);
      this.props.history.length <= 2
        ? this.props.history.push("/home")
        : this.props.history.goBack();
      return null;
    }

    return (
      <div className="container ">
        <div className="border p-3 w-75 mx-auto rounded-lg bg-white login-bg ">
          <form onSubmit={this.handleSubmit}>
            <h3 className="text-center">Đăng Nhập</h3>

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

            <button type="submit" className="btn btn-primary btn-block">
              Đăng Nhập
            </button>
            <p className="forgot-password text-right mt-3">
              Chưa Có Tài khoản <Link to="/register">Tạo Tài Khoản</Link>
            </p>
            <p className="forgot-password text-right mt-3">
              <Link to="/recover">Quên mật khẩu?</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: () => dispatch(login()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
