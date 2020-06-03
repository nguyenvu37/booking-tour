import React, { useState } from "react";
import callApi from "../../../../common/callAPI";
import { v4 as uuidv4 } from "uuid";
import { NotificationManager } from "react-notifications";
import FormTour from "./form-tour";
import EditorForm from "./editor-form";
import { convertStrToTag } from "../../../../common/funcCommon";

const PostTour = () => {
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

  const [content, setContent] = useState("");
  const [tourData, setTourData] = useState(innitTourData);
  const [selected, setSelected] = useState([]);
  const [selectedTransit, setSelectedTransit] = useState([]);
  const [messError, setMessError] = useState(innitErrorMess);
  const [messContexErr, setMessContexErr] = useState("");

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
      id: convertStrToTag(tourData.city) + Date.now(),
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

    console.log("newTour :>> ", newTour);

    const arrayNewTour = Object.entries(newTour);

    for (let i = 1; i < arrayNewTour.length - 1; i++) {
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
      const now = Date.now();
      callApi(`tours`, "Post", { ...newTour, time: now }).then((res) => {
        if (res.status === 201) {
          postDetail(res.data.id);
          return true;
        } else {
          NotificationManager.success("Đăng Bài Thất Bại");
          return false;
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const deleteTour = (idTour) => {
    callApi(`tours/${idTour}`, "Delete", null).then((res) => {});
  };

  const postDetail = (idTour) => {
    let post = {
      id: uuidv4(),
      idTour: idTour,
      conten: content,
    };
    callApi("Detail", "Post", {
      ...post,
    }).then((response) => {
      if (response.status === 201) {
        NotificationManager.success("Đăng Bài Thành Công");
        setTourData(innitTourData);
        setSelected([]);
        setSelectedTransit([]);
        setContent("");
        setMessContexErr("");
        return true;
      } else {
        deleteTour(idTour);
        NotificationManager.success("Đăng Bài Thất Bại");
        return false;
      }
    });
  };

  // const handerSetContenEditorForm = (newContent) => {
  //   const mess = validateInput("content", newContent);
  //   setMessContexErr(mess);
  //   setContent(newContent);
  // };

  return (
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
  );
};
export default PostTour;
