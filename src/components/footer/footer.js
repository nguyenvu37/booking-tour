import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="w-100 mt-3 color-footer">
        <div className="container px-0">
          <div className="text-center w-100 py-2">
            <div className="row m-0">
              <div className="col-md-6 p-0 m-0">
                <nav className="navbar navbar-expand-lg p-0 m-0">
                  <ul className="navbar-nav mr-auto " id="fooderUl">
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/home"
                      >
                        <i className="fab fa-facebook-square"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/home"
                      >
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/home"
                      >
                        <i className="fab fa-twitter-square"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-6 p-0 m-0">
                <nav className="navbar navbar-expand-lg p-0 m-0">
                  <ul className="navbar-nav ml-auto " id="fooderUl" >
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/contact"
                      >
                        Giúp Đỡ
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/Payment"
                      >
                        Thanh Toán
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-center text-light"
                        to="/home"
                      >
                        Trang Chủ
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-12 border-top">
                <div className="my-2">
                  <small className="text-center mt-3 text-light">
                    © Copyright 2020 - Anh & Vũ. All rights reserved.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
