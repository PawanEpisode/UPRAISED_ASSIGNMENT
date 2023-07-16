import React from "react";
import "./Loading.scss";

// (... Loading) component
const Loading = () => {
  return (
    <div className="loading">
      <div class="ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loadingText">Loading</div>
    </div>
  );
};

export default Loading;
