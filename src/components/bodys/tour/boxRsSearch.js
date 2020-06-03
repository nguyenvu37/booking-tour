import React, { useEffect } from "react";
import FormBoxTour from "../listTour/formBoxTour";

const BoxRsSearch = (props) => {
  useEffect(() => {
    window.scrollTo(0, 359);
  });
  const datas = props.data;
  return (
    <>
      <h1 className="w-100 text-center"> Kết Quả Tìm được </h1>
      {datas !== 0 &&
        datas.map((data, i) => {
          return <FormBoxTour key={"FormBoxTour" + i} data={data} />;
        })}
    </>
  );
};

export default BoxRsSearch;
