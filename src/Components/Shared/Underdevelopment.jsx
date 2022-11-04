import React from "react";
import Undercontruction from "../../Assets/Gifs/page-website-under-construction.gif";

const UnderContruction = () => {
  return (
    <div className="container parentbanner">
      <div className="row py-5">
        <div style={{ fontFamily: "Poetsen One" }} className="fs-4 fw-bold">
          <p>
            Hello 👋, The blog is currently offline, Currently working on
            a new interface.
          </p>
        </div>
      </div>
      <img alt="timer" src={Undercontruction} />
    </div>
  );
};

export default UnderContruction;
