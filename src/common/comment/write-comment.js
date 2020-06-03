import React, { useState } from "react";
import BgRating from "../rating/bg-rating";
import { withRouter } from "react-router-dom";

const WriteComment = (props) => {
  const [context, setContext] = useState("");
  const [contexTitle, SetContexTitle] = useState("");
  const submitHandler = () => {
    props.submitComment({
      context: context,
      contexTitle: contexTitle,
    });
  };

  return (
    <>
      <div
        style={{
          transition: " all 0.5s ease 0s",
        }}
        className="pt-5 pb-2 px-2 mb-3"
      >
        <span>1. Đánh giá về tour:</span>
        <BgRating
          custome={{ display: "inline" }}
          canChangePoin={true}
          getStartPoin={props.getStartPoin}
        />

        <div className="form-group">
          <label>2. Tiêu đề của nhận xét:</label>
          <input
            onChange={(e) => {
              SetContexTitle(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Tiêu đề..."
          />
        </div>

        <div className="form-group">
          <label>3. Viết nhận xét của bạn vào bên dưới:</label>
          <textarea
            onChange={(e) => {
              setContext(e.target.value);
            }}
            className="form-control"
            rows="3"
            placeholder=" Enter text here..."
          ></textarea>
        </div>
        <div className="w-100 text-right">
          <button
            onClick={submitHandler}
            type="button"
            className="btn btn-primary"
          >
            Gửi Nhận xét
          </button>
        </div>
      </div>
    
    </>
  );
};

export default withRouter(WriteComment);
