import React from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderAssistantFaculty.module.css";
import { useNavigate } from "react-router-dom";

const HeaderAssistantFaculty = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2
          onClick={() =>
            navigate("/facultydashboard/facultyassistantdashboard")
          }
        >
          UIU Academic Assistant
        </h2>
        <div>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyassistantdashboard/facultymyapplication"
              )
            }
          >
            My Applications
          </h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyassistantdashboard/facultyassistantassociation"
              )
            }
          >
            Task Management
          </h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyassistantdashboard/facultyassistantrecommendation"
              )
            }
          >
            Recommendation
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderAssistantFaculty;
