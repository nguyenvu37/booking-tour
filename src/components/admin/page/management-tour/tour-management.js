import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../../common/callAPI";
import Waiting from "../../../../common/waiting";
import IteamTourManage from "../../component/iteam-tour-manage";
import MyPagination from "../../../../common/my-pagination";
import { convertStrToTag } from "../../../../common/funcCommon";
// import PostTour from "../../component/editor/post-tour ";

const bgMaTour = {
  backgroundColor: "rgb(78, 115, 223)",
};

const TourManagement = () => {
  const [pageStatus, setPageStatus] = useState("pending");
  const [dataTour, setDataTour] = useState([]);
  const [indexDataRender, setIndexDataRender] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataAfterSearch, setDataAfterSearch] = useState([]);
  const _limit = 10;
  let clearTimeOut = null;

  useEffect(() => {
    let mounting = true;

    callApi(`tours?_sort=time&_order=desc`, "Get", null).then((res) => {
      console.log("res :>> ", res);
      if (mounting && res && res.status === 200 && res.data) {
        setPageStatus("finish");
        setDataTour(res.data);
        setDataAfterSearch(res.data);
      }
    });

    return () => (mounting = false);
  }, []);

  const nextPage = (number) => {
    setIndexDataRender(number * _limit);
    setCurrentPage(currentPage + 1);
  };

  const prePage = (number) => {
    setIndexDataRender((number - 2) * _limit);
    setCurrentPage(currentPage - 1);
  };

  const getDataAfterSearch = (str) => {
    const text = convertStrToTag(str);
    console.log("text :>> ", text);
    if (dataTour.length <= 0) return setDataAfterSearch([]);

    if (text === "") return setDataAfterSearch([...dataTour]);

    const dataAfterSearch = dataTour.filter((e) => {
      const idElement = `${e.id}`;

      if (idElement.indexOf(text) !== -1) return true;

      for (const element of e.tag) {
        if (element.indexOf(text) !== -1) return true;
      }
      
      return false;
    });
    setIndexDataRender(0);
    setCurrentPage(1);
    setDataAfterSearch(dataAfterSearch);
  };

  const pagination = () => {
    console.log("run pagination");
    console.log("dataAfterSearch :>> ", dataAfterSearch);
    let datanew = [];
    if (dataAfterSearch.length <= 0) return;
    let end =
      indexDataRender + _limit >= dataAfterSearch.length
        ? dataAfterSearch.length
        : indexDataRender + _limit;

    if (dataAfterSearch.length === 1) return dataAfterSearch;
    for (let i = indexDataRender; i < end; i++) {
      datanew.push(dataAfterSearch[i]);
    }
    console.log('indexDataRender :>> ', indexDataRender);
    return datanew;
  };

  const getIdAfterDeleted = (id) => {
    console.log("id Dlete  :>> ", id);
    let indexDelte = dataTour.findIndex((e) => e.id === id);
    console.log("indexDelte :>> ", indexDelte);
    if (indexDelte === -1) return;
    const newDataTour = [...dataTour];
    newDataTour.splice(indexDelte, 1);
    console.log("newDataTour :>> ", newDataTour);

    setIndexDataRender(0);
    setCurrentPage(1);

    setDataTour(newDataTour);
    setDataAfterSearch(newDataTour);
  };

  const curentDataRender = pagination();
  return (
    <div
      style={{
        borderRadius: "1rem",
        marginBottom: "1rem",
      }}
      className="p-3 bg-white shadow"
    >
      <div className="w-100 d-flex all-iteam-inline-center  justify-content-between">
        <Link to="/admin/tour-management/new-tour" className="d-block">
          <i className="fa fa-plus" aria-hidden="true"></i> Thêm Tour
        </Link>
        <div className="d-flex all-iteam-inline-center ">
          <span className="btn">
            <i
              style={{ transform: "translate(39px, 0)" }}
              className="fa fa-search d-block"
            ></i>
          </span>
          <input
            className="form-control pl-5"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              if (clearTimeOut) clearTimeOut(clearTimeOut);
              const data = e.target.value;
              setTimeout(() => {
                getDataAfterSearch(data);
              }, 300);
            }}
          />
        </div>
      </div>
      <div className="card card-primary mt-3 text-center">
        <div style={bgMaTour} className="card-header">
          <h3 className="card-title text-white text-uppercase mt-3">
            <i className={`fa fa-globe-africa`}></i> Quản Lý Tour
          </h3>
          <div className="row">
            <div className="col-6 text-left text-white">
              {/* Booking By : <strong className="text-uppercase"></strong> */}
            </div>
            <div className="col-6 text-right text-warning">
              <strong className="text-uppercase">
                {/* {this.state.isExchanged !== ""
                    ? ""
                    : "Chưa có lịch sử giao dịch"} */}
              </strong>
            </div>
          </div>
        </div>
        {pageStatus === "finish" ? (
          <>
            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="bg-light">
                    <th style={{ width: "100px" }}>STT</th>
                    <th style={{ width: "300px" }}><i className="far fa-id-card"></i> ID Tour</th>
                    <th><i className="fas fa-money-bill-wave"></i> Giá</th>
                    <th><i className="fas fa-map-marker"></i> Thành Phố - Đất Nước</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {curentDataRender && curentDataRender.length > 0 ? (
                    curentDataRender.map((e, i) => (
                      <IteamTourManage
                        sendIdTourDeleted={getIdAfterDeleted}
                        key={"dataTour" + i}
                        data={{ ...e, index: i + _limit * (currentPage - 1) }}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <h1>Không Tìm Thấy Dữ Liệu</h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="container-fulid">
                <MyPagination
                  nextPage={nextPage}
                  prePage={prePage}
                  data={dataAfterSearch}
                  _limit={_limit}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </>
        ) : (
          <Waiting custome={{ marginTop: "50px", marginBottom: "50px" }} />
        )}
      </div>
    </div>
  );
};

export default TourManagement;
