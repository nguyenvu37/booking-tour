import React, { useState, useEffect } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const ChartFlMonth = (props) => {
  const { data } = props;
  let yearDefault = 2020;

  const getRevenueFlMonth = (month, year = yearDefault) => {
    if (!data || data.length === 0) return 0;

    const monthAfterHander = month === 1 ? 12 : month - 1;
    const yearAfterHander = month === 1 ? year - 1 : year;

    const timeStartMonth = new Date(
      yearAfterHander,
      monthAfterHander
    ).getTime();

    const timeEndMonth =
      monthAfterHander === 12
        ? new Date(yearAfterHander + 1, 1, 1).getTime()
        : new Date(yearAfterHander, monthAfterHander + 1, 1).getTime();
   

    let rs = data
      .filter((ele) => ele.time >= timeStartMonth && ele.time <= timeEndMonth)
      .reduce((ac, cur) => ac + cur.sumPrice, 0);
    return rs;
  };

  const color = "#4e73df";
  const [widthChart, setwidthChart] = useState(window.innerWidth * 0.6);

  const dataDb = [
    {
      name: "Tháng 1",
      Revenue: getRevenueFlMonth(1),
    },
    {
      name: "Tháng 2",
      Revenue: getRevenueFlMonth(2),
    },
    {
      name: "Tháng 3",
      Revenue: getRevenueFlMonth(3),
    },
    {
      name: "Tháng 4",
      Revenue: getRevenueFlMonth(4),
    },
    {
      name: "Tháng 5",
      Revenue: getRevenueFlMonth(5),
    },
    {
      name: "Tháng 6",
      Revenue: getRevenueFlMonth(6),
    },
    {
      name: "Tháng 7",
      Revenue: getRevenueFlMonth(7),
    },
    {
      name: "Tháng 8",
      Revenue: getRevenueFlMonth(8),
    },
    {
      name: "Tháng 9",
      Revenue: getRevenueFlMonth(9),
    },
    {
      name: "Tháng 10",
      Revenue: getRevenueFlMonth(10),
    },
    {
      name: "Tháng 11",
      Revenue: getRevenueFlMonth(11),
    },
    {
      name: "Tháng 12",
      Revenue: getRevenueFlMonth(12),
    },
  ];

  useEffect(() => {
    const handlerResize = () => {
      setwidthChart(window.innerWidth * 0.7);
    };

    window.addEventListener("resize", handlerResize);
    getRevenueFlMonth(1, 2020);
    return () => window.removeEventListener("resize", handlerResize);
  });

  return (
    <div className="p-2">
      <h6 style={{ color: "#4e73df", fontWeight: 700 }}>
        Doanh Thu Theo Tháng
      </h6>
      <AreaChart
        className="mx-auto"
        width={widthChart}
        height={500}
        data={dataDb}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 80,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="12 12" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(e) => {
            return e.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            });
          }}
          // unit="vnd"
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Revenue"
          name="Doanh Thu"
          stroke={color}
          fill={color}
          // unit="vnD"
          formatter={(e) => {
            return e.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            });
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Revenue"
          name="Doanh Thu"
          stroke={color}
        />
      </AreaChart>
    </div>
  );
};

export default ChartFlMonth;
