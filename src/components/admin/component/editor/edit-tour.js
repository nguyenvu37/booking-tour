import React, { useState, useEffect } from "react";
import callApi from "../../../../common/callAPI";
import { NotificationManager } from "react-notifications";
import FormTour from "./form-tour";
import EditorForm from "./editor-form";
import { convertStrToTag } from "../../../../common/funcCommon";
import { withRouter } from "react-router-dom";
import Waiting from "../../../../common/waiting";

const EditTour = (props) => {
  const innitTourData = {
    image: "",
    city: "",
    country: "",
    timeJoin: "",
    price: "",
    calendar: "",
    transit: [],
    timeStart: [],
  };

  const innitErrorMess = {
    image: "",
    city: "",
    country: "",
    timeJoin: "",
    price: "",
    calendar: "",
    timeStart: "",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [tourData, setTourData] = useState(innitTourData);
  const [selected, setSelected] = useState([]);
  const [selectedTransit, setSelectedTransit] = useState([]);
  const [messError, setMessError] = useState(innitErrorMess);
  const [messContexErr, setMessContexErr] = useState("");
  const [idDetail, setIdDetail] = useState("");

  useEffect(() => {
    let isMounting = true;
    setIsLoading(true);
    // console.log("object :>> ", object);
    callApi(`tours?id=${props.match.params.id}`, "Get", null).then((res) => {
      if (res && isMounting && res.status === 200 && res.data[0]) {
        const data = res.data[0];
        let objTransit = [];
        let objStye = [];

        data.transit.forEach((e) => {
          objTransit.push({ label: e, value: e });
        });

        let arraytag = data.tag.filter(
          (e) => e === "discount" || e === "foreign" || e === "hot"
        );

        arraytag.forEach((e) => {
          switch (e) {
            case "discount":
              objStye.push({ label: "Giảm Giá", value: "discount" });
              break;
            case "foreign":
              objStye.push({ label: "Nước Ngoài", value: "foreign" });
              break;
            case "hot":
              objStye.push({ label: "Tour Hot", value: "hot" });
              break;
            default:
          }
        });

        setIsLoading(false);
        setTourData({
          image: data.image,
          city: data.city,
          country: data.country,
          timeJoin: data.timeJoin,
          price: `${data.price}`,
          calendar: data.calendar,
          transit: data.transit,
          timeStart: data.timeStart,
        });
        setSelected(objStye);
        setSelectedTransit(objTransit);
        console.log("res.data[0] :>> ", res.data[0]);
      }
    });
    callApi(`Detail?idTour=${props.match.params.id}`, "Get", null).then(
      (res) => {
        if (res && isMounting && res.status === 200 && res.data[0]) {
          // console.log("conten :>> ", );
          setIdDetail(res.data[0].id);
          setContent(res.data[0].conten);
        }
      }
    );
    return () => (isMounting = false);
  }, [props.match.params.id]);

  const validateInput = (type, checkingText) => {
    if (checkingText.length <= 0) return "Không Để Trống Trường Này";
    switch (type) {
      case "image":
        const linkImage = checkingText.split("?")[0];
        const isLink = linkImage.match(/\.(jpeg|jpg|gif|png)$/) !== null;
        if (!isLink) return "Link Không Đúng Định Dạng";
        return;
      case "price":
      default:
    }
  };

  const getMessErrorFormChild = (objMessError) => {
    let newMess = { ...messError, ...objMessError };
    setMessError(newMess);
  };

  const getSelected = () => {
    if (selected.length <= 0) return [];
    return selected.map((e) => e.value);
  };

  const getSelectedSelectedTransit = () => {
    if (selectedTransit.length <= 0) return [];
    return selectedTransit.map((e) => e.value);
  };

  const handerOnChangeDataTour = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handerUpdateNewTimeStart = (array) => {
    console.log("array :>> ", array);
    const mess = validateInput("timeStart", array);
    setMessError({ ...messError, timeStart: mess });
    if (array.length <= 0) {
      setTourData({ ...tourData, timeStart: [] });
    } else {
      setTourData({ ...tourData, timeStart: [...array] });
    }
  };

  // const checkBeforeSubmitPosst = () => {};

  const handerPost = () => {
    let validate = true;
    let newErrorMess = {};

    const newTour = {
      image: tourData.image,
      city: tourData.city,
      country: tourData.country,
      timeJoin: tourData.timeJoin,
      price: Number(tourData.price),
      calendar: tourData.calendar,
      transit: [...getSelectedSelectedTransit()],
      timeStart: tourData.timeStart,
      tag: [
        ...getSelected(),
        convertStrToTag(tourData.city),
        convertStrToTag(tourData.country),
      ],
    };

    const arrayNewTour = Object.entries(newTour);

    for (let i = 0; i < arrayNewTour.length - 1; i++) {
      const converchar = arrayNewTour[i][1] === 0 ? "" : arrayNewTour[i][1];
      const mess = validateInput(arrayNewTour[i][0], converchar);
      if (messError[arrayNewTour[i][0]] !== mess)
        newErrorMess[arrayNewTour[i][0]] = mess;
      if (mess !== "" && mess !== undefined) validate = false;
      console.log("mess :>> ", mess);
    }
    if (content === "") {
      const mess = validateInput(content, "");
      validate = false;
      setMessContexErr(mess);
    }
    setMessError({ ...messError, ...newErrorMess });

    console.log("validate :>> ", validate);
    if (validate) {
      callApi(`tours/${props.match.params.id}`, "Put", { ...newTour }).then(
        (res) => {
          if (res && res.status === 200) {
            postDetail(props.match.params.id);
            return true;
          } else {
            NotificationManager.error("Cập Nhật Thất Bại");
            return false;
          }
        }
      );
    } else {
      window.scrollTo(0, 0);
    }
  };

  const postDetail = (idTour) => {
    // idDetail
    let post = {
      idTour: idTour,
      conten: content,
    };
    console.log("idTour :>> ", idTour);
    callApi(`Detail/${idDetail}`, "Put", {
      ...post,
    }).then((response) => {
      if (response.status === 200) {
        NotificationManager.success("Cập Nhật  Thành Công");
        setTourData(innitTourData);
        setSelected([]);
        setSelectedTransit([]);
        setContent("");
        setMessContexErr("");
        props.history.push("/admin/tour-management");
        return true;
      } else {
        NotificationManager.error("Cập Nhật Thất Bại");
      }
    });
  };

  // const handerSetContenEditorForm = (newContent) => {
  //   const mess = validateInput("content", newContent);
  //   setMessContexErr(mess);
  //   setContent(newContent);
  // };

  return !isLoading ? (
    <div>
      <FormTour
        handerOnChangeDataTour={handerOnChangeDataTour}
        setTourData={setTourData}
        tourData={tourData}
        selected={selected}
        setSelected={setSelected}
        selectedTransit={selectedTransit}
        setSelectedTransit={setSelectedTransit}
        handerUpdateNewTimeStart={handerUpdateNewTimeStart}
        validateInput={validateInput}
        getMessErrorFormChild={getMessErrorFormChild}
        messError={messError}
      />

      <div className="form-group">
        <label htmlFor="editor">Nhập Mô Tả</label>{" "}
        <label style={{ display: "inline" }} className="invalid-feedback">
          {messContexErr}
        </label>
        <EditorForm
          content={content}
          setContent={setContent}
          setMessContexErr={setMessContexErr}
        />
      </div>
      <div className="w-100 text-right my-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handerPost();
          }}
        >
          Lưu
        </button>
      </div>
    </div>
  ) : (
    <Waiting />
  );
};

export default withRouter(EditTour);
