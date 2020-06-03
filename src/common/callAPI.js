import * as Congig from "../config/configuration";
import axios from "axios";

export default function callApi(endPoin, method = "GET", data) {
  console.clear();
  console.log("url", `${Congig.host}/${endPoin}`);
  return axios({
    method: method,
    url: `${Congig.host}/${endPoin}`,
    data: data,
  }).catch((err) => {
    console.error("err :", err);
  });
}
