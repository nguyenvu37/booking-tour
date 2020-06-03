import React, { useState, useEffect } from "react";
import TourSearch from "./tourSearch";
import BosxRsSearch from "./boxRsSearch";
import "./tourSearch.css";
import callApi from "../../../common/callAPI";
import { connect } from "react-redux";
import { removeAccents } from "../../../common/funcCommon";
import Waiting from "../../../common/waiting";
import NotFindData from "../../../common/notFindata";
import CheckConnect from "../../../common/checkConnect";
import MyPagination from "../../../common/my-pagination";

const BgTour = (props) => {
  const _limit = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const q = props.data.search.q;
  const typeTour = props.data.search.typeTour;
  const dateStart = props.data.search.dateStart;

  const [countFail, setCountFail] = useState(0);

  const [indexDataRender, setIndexDataRender] = useState(0);
  const [data, setData] = useState(0);

  const [rsGetData, setRsGetData] = useState("pending");

  useEffect(() => {
    let isUnmounting = false;

    const checkDateStart = (tours) => {
      return tours.filter((tour) => {
        for (let i = 0; i < tour.timeStart.length; i++) {
          if (tour.timeStart[i] >= dateStart) return true;
        }
        return false;
      });
    };

    const pullData = async () => {
      setRsGetData("pending");
      setData(0);
      await callApi(
        `tours?${q === "" ? "" : "q=" + handerDatataSearch(q)}${
          typeTour === "" ? "" : "&tag_like=" + typeTour
        }`,
        "Get",
        null
      ).then((res) => {
        if (res) {
          if (res.data.length > 0) {
            if (!isUnmounting) {
              const filterData =
                dateStart !== "" ? checkDateStart(res.data) : res.data;
              if (filterData && filterData.length > 0) {
                setData(filterData);
                setRsGetData("getFinish");
                setIndexDataRender(0);
                setCurrentPage(1);
              } else setRsGetData("null");
            }
          } else setRsGetData("null");
        } else {
          setRsGetData("connectError");
        }
      });
    };

    pullData();

    return () => {
      isUnmounting = true;
    };
  }, [q, typeTour, dateStart, countFail]);

  const wasGetDataFail = () => {
    setCountFail(countFail + 1);
  };

  const handerDatataSearch = (q) => {
    let char = q
      .toLowerCase()
      .trim()
      .split(" ")
      .filter((x) => x !== "")
      .join("");

    return removeAccents(char);
  };

  const nextPage = (number) => {
    setIndexDataRender(number * _limit);
    setCurrentPage(currentPage + 1);
  };
  const prePage = (number) => {
    setIndexDataRender((number - 2) * _limit);
    setCurrentPage(currentPage - 1);
  };

  const pagination = () => {
    // const [indexDataRender, setindexDataRender] = useState(0);
    // const [data, setData] = useState(0);
    let datanew = [];
    if (data.length <= 0) return;
    let end =
      indexDataRender + _limit >= data.length
        ? data.length
        : indexDataRender + _limit;

    if (data.length === 1) return data;
    for (let i = indexDataRender; i < end; i++) {
      datanew.push(data[i]);
    }
    return datanew;
  };

  return (
    <div className="container-fuild">
      <TourSearch
        statusGetData={rsGetData}
        wasGetDataFail={wasGetDataFail}
        q={q}
        typeTour={typeTour}
        dateStart={dateStart}
      />
      {rsGetData === "pending" && (
        <Waiting custome={{ position: "relative", top: "-90px" }} />
      )}
      {rsGetData === "getFinish" && (
        <>
          <div
            style={{
              position: "relative",
              top: "-113px",
            }}
            className={`container mover-list bg-light flex-wrap flex-grow p-3 rounded d-flex list-all-e-tour resize-flex ${
              data.length % 3 === 0
                ? "justify-content-md-between"
                : (data.length + 1) % 3 === 0
                ? "justify-content-md-center"
                : ""
            }`}
          >
            {/* {console.log("pagination() :", )} */}
            <BosxRsSearch data={pagination()} />
          </div>
          <div className="container">
            <MyPagination
              nextPage={nextPage}
              prePage={prePage}
              data={data}
              _limit={_limit}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
      {rsGetData === "null" && (
        <NotFindData custome={{ position: "relative", top: "-90px" }} />
      )}
      {rsGetData === "connectError" && (
        <CheckConnect custome={{ position: "relative", top: "-90px" }} />
      )}
    </div>
  );
};

const mapStateToProps = (data) => {
  return {
    data,
  };
};

export default connect(mapStateToProps)(BgTour);
