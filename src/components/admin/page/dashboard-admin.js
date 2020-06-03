import React, { useEffect, useState } from "react";
import BgTag from "../component/tag-admin/bg-tag";
import ChartFlMonth from "../component/chart/chart-fl-month";
import callApi from "../../../common/callAPI";
import { formCurencyVN } from "../../../common/funcCommon";
import Waiting from "../../../common/waiting";

const DashboardAdmin = (props) => {
  const [data, setData] = useState();
  const [startGetData, setStartGetData] = useState("pending");

  useEffect(() => {
    let isUnmounting = false;
    // setStartGetData("pending");
    callApi(`bookings_tour?status=paid`, "Get", null).then((res) => {
      if (!isUnmounting && res && res.status === 200 && res.data.length > 0) {
        setData(res.data);
        setStartGetData("finish");
      }
    });

    return () => (isUnmounting = true);
  }, []);

  let dateNow = new Date();

  let getDateNow = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate()
  ).getTime();

  let getMonthNow = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    1
  ).getTime();

  const getBookingIndate = () => {
    if (!data || data.length === 0) return 0;
    let rs = data.filter((ele) => ele.time >= getDateNow);
    return rs.length;
  };

  const getRevenueflDay = () => {
    if (!data || data.length === 0) return 0;
    let rs = data
      .filter((ele) => ele.time >= getDateNow)
      .reduce((ac, cur) => ac + cur.sumPrice, 0);
    return formCurencyVN(rs);
  };

  const getRevenueAll = () => {
    if (!data || data.length === 0) return 0;
    let rs = data.reduce((ac, cur) => ac + cur.sumPrice, 0);
    return formCurencyVN(rs);
  };

  const getRevenueMonth = () => {
    if (!data || data.length === 0) return 0;
    let rs = data
      .filter((ele) => ele.time >= getMonthNow)
      .reduce((ac, cur) => ac + cur.sumPrice, 0);
    return formCurencyVN(rs);
  };

  const datatg = [
    {
      color: "#4e73df",
      title: "Số booking trong ngày",
      value: getBookingIndate(),
      // icon: "fa-ticket-alt",
    },
    {
      color: "#4e73df",
      title: "Doanh Thu Ngày",
      value: getRevenueflDay(),
      // icon: "fa-dollar-sign",
    },

    {
      color: "#4e73df",
      title: "Danh Thu Tháng",
      value: getRevenueMonth(),
      // icon: "fa-dollar-sign",
    },
    {
      color: "#4e73df",
      title: "Tổng Doanh Thu",
      value: getRevenueAll(),
      // icon: "fa-dollar-sign",
    },
  ];

  return startGetData === "finish" ? (
    <>
      <h1 style={{ color: "#5a5c69" }}>Dashboard</h1>
      <div className="d-flex mx-0 mt-0 mb-5 flex-wrap  justify-content-around">
        {datatg.map((e, i) => {
          return <BgTag key={"dataTag" + i} data={e} />;
        })}
      </div>
      <div
        style={{ borderRadius: "1rem" }}
        className="p-3 shadow bg-white mb-5"
      >
        <ChartFlMonth data={data !== undefined ? data : []} />
      </div>
    </>
  ) : (
    <Waiting />
  );
};

export default DashboardAdmin;
