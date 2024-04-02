import React from "react";
import { useRef, useEffect, useState } from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderAssistant.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderAssistant = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  // new code here
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2
          onClick={() =>
            navigate("/studentdashboard/studentassistantdashboard")
          }
          style={studentdata.report == 1 ? { visibility: "hidden" } : {}}
        >
          UIU Academic Assistant
        </h2>
        <div>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/studentdashboard/studentassistantdashboard/studentassistantmyapplication"
              )
            }
            style={studentdata.report == 1 ? { visibility: "hidden" } : {}}
          >
            My Applications
          </h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/studentdashboard/studentassistantdashboard/studentassistantassociation"
              )
            }
          >
            Task Management
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderAssistant;
