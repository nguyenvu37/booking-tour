import React from "react";
import BgRating from "../rating/bg-rating";

const ShowOtherComment = (props) => {
  let { contexTitle, context, starPoin, userPost, time } = props.dataComment;

  return (
    <div className="container ">
      <div
        style={{
          height: "5px",
          backgroundColor: "#eae9e9",
          borderRadius: "10px",
        }}
        className="w-100 mx-auto"
      ></div>
      {/* <div className="w-100 border-top mx-auto"></div> */}
      <div className="card border-0">
        <div className="custome-card-body" style={{ marginBottom: "1rem" }}>
          <div>
            <BgRating
              custome={{ position: " absolute", top: "10px", right: "15px" }}
              poinDefaul={starPoin}
            />
          </div>
          <div className="row">
            <div className=" custome-image-height col-md-2 text-center">
              <img
                src="https://image.ibb.co/jw55Ex/def_face.jpg"
                className="rbs-image-425 img img-rounded comment-img mb-2"
                alt="avata"
              />

              <p className="text-center rbs-comment-425">
                <strong style={{ fontSize: "14px" }}>{userPost}</strong>
                <br />
                <i
                  style={{ position: "relative", top: "-9px" }}
                  className="comment-date text-secondary"
                >
                  {new Date(time).toLocaleDateString("en-GB")}
                </i>
              </p>
            </div>
            <div className="col-md-10">
              <div
                // FONTWEIGHT
                style={{ textTransform: "capitalize", fontWeight: 900 }}
                className="m-0 p-0"
              >
                - {contexTitle} -
              </div>
              {/* <div className="clearfix"></div> */}
              <span
                style={{
                  padding: "7px",
                  borderRadius: "11px",
                  margin: 0,
                }}
              >
                {context}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOtherComment;
