import React from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderResearch.module.css";
import { useNavigate } from "react-router-dom";

const StudentHeaderResearch = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2>UIU Research</h2>
        <div>
          <h3 className={style.navitem}>Explore Ideas</h3>
          <h3
            className={style.navitem}
            onClick={() =>
              navigate(
                "/studentdashboard/studentresearchdashboard/studentresearchmyresearch"
              )
            }
          >
            My Research
          </h3>
          <h3 className={style.navitem}>Research Grant</h3>
        </div>
      </div>
    </div>
  );
};

export default StudentHeaderResearch;
