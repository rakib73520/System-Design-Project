import React from "react";
import { useRef, useEffect, useState } from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderAlumni.module.css";
import { useNavigate } from "react-router-dom";

const FacultyHeaderAlumni = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2 onClick={() => navigate("/facultydashboard/facultyalumnihome")}>
          UIU Alumni
        </h2>
        <div>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyalumnihome/facultyalumnievents"
              )
            }
          >
            Alumni Events
          </h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyalumnihome/facultyalumnimyinteraction"
              )
            }
          >
            My Interaction
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeaderAlumni;
