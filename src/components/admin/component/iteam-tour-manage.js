import React from "react";
import { formCurencyVN } from "../../../common/funcCommon";
import { Link } from "react-router-dom";
import callApi from "../../../common/callAPI";
import { NotificationManager } from "react-notifications";

const IteamTourManage = (props) => {
  const { id, price, city, country, index } = props.data;
  const handerClickDelete = (e) => {
    if (window.confirm("Xác Nhận Xóa")) {
      callApi(
        `bookings_tour?tourID=${e.target.dataset.idtour}&&status=paid`,
        "Get",
        null
      ).then((res) => {
        if (res && res.status === 200 && res.data) {
          let timeToday = Date.now();
          for (const item of res.data) {
            if (item.timeChose >= timeToday)
              return NotificationManager.error(
                "Không Thể Xóa  Vì Đã Có Người Đặt Tour Này"
              );
          }
          handerDeleteTour(id);
        }
      });
    }
  };

  const handerDeleteTour = (id) => {
    callApi(`tours/${id}`, "Delete", null).then((res) => {
      if (res && res.status === 200 && res.data) {
        getIdDetail(id);
      } else return NotificationManager.error("Xảy Ra Lỗi Trong Quá Trình Xóa");
    });
  };

  const getIdDetail = (idTour) => {
    callApi(`Detail?idTour=${idTour}`, "Get", null).then((res) => {
      if (res && res.status === 200 && res.data[0]) {
        handerDeleteDetail(res.data[0].id, idTour);
      } else return NotificationManager.error("Xảy Ra Lỗi Trong Quá Trình Xóa");
    });
  };

  const handerDeleteDetail = (id, idTour) => {
    callApi(`Detail/${id}`, "Delete", null).then((res) => {
      if (res && res.status === 200 && res.data) {
        console.log("res  Delete Dtail :>> ", res);
        NotificationManager.success("Xóa Thành Công");
        props.sendIdTourDeleted(idTour);
      } else return NotificationManager.error("Xảy Ra Lỗi Trong Quá Trình Xóa");
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{id}</td>
      <td>{formCurencyVN(price)}</td>
      <td>{city + " - " + country} </td>
      <td style={{ width: "250px" }}>
        <Link
          className="btn btn-primary"
          to={`/admin/tour-management/edit-tour/${id}`}
        >
          <i className="fa fa-edit "></i> Sửa
        </Link>{" "}
        <Link
          data-idtour={id}
          onClick={handerClickDelete}
          className="btn btn-danger"
          to="#"
        >
          <i className="fa fa-trash-alt"></i> Xóa
        </Link>
      </td>
    </tr>
  );
};

export default IteamTourManage;
