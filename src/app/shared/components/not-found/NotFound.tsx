import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";

export const NotFound: React.FC = () => {
  return (
    <div className="mainbox">
      <div className="err">4</div>
      <i className="far fa-question-circle fa-spin"></i>
      <div className="err2">4</div>
      <div className="msg">
        Ooops! Page Not Found
        <p>
          Let's go <Link to="/home">home</Link> and try from there.
        </p>
      </div>
    </div>
  );
};
