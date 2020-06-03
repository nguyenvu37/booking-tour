import React, { useEffect, useRef } from "react";
import WriteComment from "./write-comment";
import ShowOtherComment from "./show-orther-comment";
import { useState } from "react";
import callApi from "../callAPI";
import { v4 as uuidv4 } from "uuid";
import Waiting from "../waiting";
import { withRouter } from "react-router-dom";
import "./comment.css";
import ChartRating from "./Chart-rating";
import MyPagination from "../my-pagination";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

const BgComment = (props) => {
  const _limit = 6;
  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop - 300);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [indexDataRender, setIndexDataRender] = useState(0);

  const [currentPoni, setCurrentPoni] = useState(0);
  const [statusSendComment, setStatusSendComment] = useState("nomal");

  const [isShowComment, setIsShowComment] = useState(false);

  const [dataComment, setDataComent] = useState("begin");

  const myRef = useRef(null);

  useEffect(() => {
    let isUnmounting = false;
    callApi(
      `Comments/?idTour=${props.match.params.id}&_sort=time&_order=desc`,
      "Get"
    ).then((res) => {
      setStatusSendComment("nomal");
      if (res && res.status === 200 && res.data.length > 0 && !isUnmounting) {
        setDataComent(res.data);
      }
    });
    return () => (isUnmounting = true);
  }, [props.match.params.id]);

  const getDataForChar = () => {
    if (dataComment === "begin" || dataComment.length <= 0)
      return {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        sumComment: 0,
        mediumOfStar: 0,
      };

    let array = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dataComment.length; i++) {
      array[dataComment[i].starPoin]++;
    }

    let arrayMap = array.map((e, i) => e * i);
    let sumOfStar = arrayMap.reduce((a, c) => {
      return a + c;
    }, 0);

    let mediumOfStar = sumOfStar / dataComment.length;

    return {
      a: (array[1] / dataComment.length) * 100,
      b: (array[2] / dataComment.length) * 100,
      c: (array[3] / dataComment.length) * 100,
      d: (array[4] / dataComment.length) * 100,
      e: (array[5] / dataComment.length) * 100,
      sumComment: dataComment.length,
      mediumOfStar: mediumOfStar,
    };
  };

  const submitComment = (context) => {
    if (
      context.contexTitle.trim() === "" ||
      context.context.trim() === "" ||
      currentPoni === 0
    )
      return;
    setStatusSendComment("pending");
    const currentUser = JSON.parse(localStorage.getItem("Token"));
    if (!currentUser) {
      props.history.push("/login");
      return;
    }
    const comment = {
      id: uuidv4(),
      idUser: currentUser.id,
      userPost: `${currentUser.firtName} ${currentUser.lastName}`,
      starPoin: Number(currentPoni),
      ...context,
      idTour: props.match.params.id,
      time: Date.now(),
    };
    callApi(`Comments`, "Post", comment).then((res) => {
      setStatusSendComment("nomal");
      if (res && res.status === 201) {
        NotificationManager.success(
          "Comment Thành Công"
        );
        let newDataComentt =
          dataComment === "begin"
            ? [{ ...res.data }]
            : [{ ...res.data }, ...dataComment];
        setDataComent("begin");
        setDataComent(newDataComentt);
        setIsShowComment(false);
        setCurrentPage(1);
        setIndexDataRender(0);
      } else NotificationManager.error("Comment Thất Bại");
    });
  };

  const getStartPoin = (poin) => {
    if (currentPoni !== poin) setCurrentPoni(poin);
  };

  const toggerWriteAndRedComment = () => {
    if (
      !props.islogin.users.loggedIn &&
      localStorage.getItem("Token") === null
    ) {
      setIsShowComment(false);
      props.history.push("/login");
    } else return setIsShowComment(!isShowComment);
  };

  const nextPage = (number) => {
    setIndexDataRender(number * _limit);
    setCurrentPage(currentPage + 1);
    scrollToRef(myRef);
  };
  const prePage = (number) => {
    setIndexDataRender((number - 2) * _limit);
    setCurrentPage(currentPage - 1);
    scrollToRef(myRef);
  };

  const pagination = () => {
    // const [indexDataRender, setindexDataRender] = useState(0);
    // const [data, setData] = useState(0);
    let datanew = [];
    if (dataComment.length <= 0) return;
    let end =
      indexDataRender + _limit >= dataComment.length
        ? dataComment.length
        : indexDataRender + _limit;

    if (dataComment.length === 1) return dataComment;
    for (let i = indexDataRender; i < end; i++) {
      datanew.push(dataComment[i]);
    }
    return datanew;
  };

  return (
    <div>
      {dataComment === "begin" || dataComment.length <= 0 ? (
        <>
          <ChartRating washadcomment={false} data={getDataForChar()} />
          <h5 className="w-100 text-center text-danger">
            Tour Chưa Được Đánh Giá
          </h5>
        </>
      ) : (
        <ChartRating washadcomment={true} data={getDataForChar()} />
      )}
      {dataComment !== "begin" || dataComment.length > 0 ? (
        <>
          <div className="border-top w-50 mx-auto"></div>
          <h5 className="mx-2 my-3">KHÁCH HÀNG NHẬN XÉT</h5>
        </>
      ) : (
        ""
      )}
      <div className="mb-3">
        {/* <button
          onClick={toggerWriteAndRedComment}
          className={`mx-2 btn ${
            isShowComment ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Viết Comment
        </button>
        <button
          onClick={toggerWriteAndRedComment}
          disabled={
            dataComment.length <= 0 || dataComment === "begin" ? true : false
          }
          className={`mx-2 btn  ${
            !isShowComment ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Đọc Comment
        </button> */}

        <button
          style={{ minHeight: "31px", minWidth: "123px" }}
          onClick={toggerWriteAndRedComment}
          className={`mx-2 btn ${
            isShowComment ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          {`${isShowComment ? "Đóng" : " Viết Nhận Xét"}`}
        </button>
      </div>
      {statusSendComment !== "pending" ? (
        isShowComment ? (
          <WriteComment
            submitComment={submitComment}
            getStartPoin={getStartPoin}
          />
        ) : (
          ""
        )
      ) : (
        <Waiting custome={{ minHeight: "299px" }} />
      )}
      <div className="m-0 p-0" ref={myRef}></div>
      {dataComment !== "begin" && dataComment.length > 0 ? (
        <>
          {pagination().map((e, i) => {
            return <ShowOtherComment key={"dataComment" + i} dataComment={e} />;
          })}
          <MyPagination
            nextPage={nextPage}
            prePage={prePage}
            data={dataComment}
            _limit={_limit}
            currentPage={currentPage}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    islogin: state,
  };
};

export default connect(mapStateToProps, null)(withRouter(BgComment));
