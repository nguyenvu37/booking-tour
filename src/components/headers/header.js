import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, login } from "../../action/users";
import ICON from "../../image/ICON.png";
import { NotificationManager } from "react-notifications";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpne: false,
      scrolled: false,
    };
  }
  handlerClickShowMenu = () => {
    this.setState({
      isOpne: !this.state.isOpne,
    });
  };

  handerlerLogOut = (e) => {
    if (window.confirm("Bạn Muốn Đăng Xuất")) {
      this.props.dispatchLogOut();
      this.props.history.push("/");
      NotificationManager.success("Success message", "Đăng Xuất Thành Công");
    }
    e.preventDefault();
  };

  handerScrollAtHeader = () => {
    const isTop = window.scrollY > 80;
    isTop
      ? this.setState({ scrolled: true })
      : this.setState({ scrolled: false });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handerScrollAtHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handerScrollAtHeader);
  }

  render() {
    return (
      <header
        style={{ maxHeight: "100%" }}
        className={`main-header bg-light z-2 ${
          this.state.scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container p-0 ">
          <nav className="navbar navbar-expand-lg navbar-light p-2 ">
            <Link className="navbar-brand py-3" to="/home">
              <img
                style={{ maxWidth: "31px" }}
                className="m-0 p-0"
                src={ICON}
                alt="iconas"
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.handlerClickShowMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              data-menu="menu"
              className={`collapse navbar-collapse  bg-light${
                this.state.isOpne ? " show" : ""
              }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto ">
                <li className="nav-item py-2">
                  <Link
                    className="nav-link text-center text-dark bg-light"
                    to="/home"
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li className="nav-item py-2">
                  <Link
                    className="nav-link text-center text-dark bg-light"
                    to="/tour"
                  >
                    Tour
                  </Link>
                </li>
                {this.props.dataLogin.users.loggedIn ||
                localStorage.getItem("Token") !== null ? (
                  <li className="nav-item py-2 dropdown">
                    {/* {this.props.dispatchLogin()} */}
                    <Link
                      className="nav-link text-center border-left border-right px-3  bg-light dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      to="/home"
                      // href="#"
                    >
                      <i className="far fa-user"></i>
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link to="/editInformation" className="dropdown-item">
                        Chỉnh sửa trang cá nhân
                      </Link>
                      <Link to="/history-booking" className="dropdown-item">
                        Lịch sử giao dịch
                      </Link>
                      <a
                        onClick={this.handerlerLogOut}
                        className="dropdown-item"
                        href="#LogOut"
                      >
                        Đăng xuất
                      </a>
                      <span
                        href="#"
                        style={{
                          whiteSpace: "pre-wrap",
                        }}
                        className="dropdown-item"
                      >
                        <i className="fas fa-user"></i>
                        {"  "}
                        {JSON.parse(localStorage.getItem("Token")).usersName}
                      </span>
                    </div>
                  </li>
                ) : (
                  <>
                    <li className="nav-item py-2">
                      <Link
                        className="nav-link text-center text-dark bg-light"
                        to="/register"
                      >
                        Đăng Ký
                      </Link>
                    </li>
                    <li className="nav-item py-2">
                      <Link
                        className="nav-link text-center text-dark bg-light"
                        to="/login"
                      >
                        Đăng Nhập
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
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
    dispatchLogOut: () => dispatch(logOut()),
    dispatchLogin: () => dispatch(login()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
