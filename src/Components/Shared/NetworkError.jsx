import React from "react";
import networkError from "../../Assets/Gifs/connection-lost-tribunnews-apps.gif";

const NetworkError = () => {
  return (
    <div className="container parentbanner">
      <img alt="timer" src={networkError}/>
    </div>
  );
};

export default NetworkError;
