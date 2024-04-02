import React from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderPrev.module.css";
import { useNavigate } from "react-router-dom";

const FacultyHeaderPrev = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2>United International University</h2>
        <div>
          <h3
            className={style.navitem}
            onClick={() => navigate("/facultydashboard/facultyalumnihome")}
          >
            Alumni
          </h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate("/facultydashboard/facultyassistantdashboard")
            }
          >
            Academic Assistant
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeaderPrev;
