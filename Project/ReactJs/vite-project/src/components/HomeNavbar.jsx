import React from "react";
import style from "./../assets/css/HomeNavbar.module.css";
import uiulogo from "./../assets/media/images/uiulogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.heading1}>
        <img className={style.heading1img} src={uiulogo} alt="" />
        <div className={style.heading2}>
          <h1 className={style.heading2title}>
            United International University
          </h1>
          <h1 className={style.heading2title1}>QUEST FOR EXCELLENCE</h1>
        </div>
      </div>
      <div className={style.heading3}></div>
      <div>
        <ul>
          <li>
            <span onClick={() => navigate("/")}>Home</span>
          </li>
          <li>
            <span onClick={() => navigate("/facultymembers")}>
              FACULTY MEMBERS
            </span>
          </li>
          <li>
            <span>LOGIN</span>
            <ul className={style.dropdown}>
              <li>
                <span onClick={() => navigate("/adminlogin")}>ADMIN</span>
              </li>
              <li>
                <span onClick={() => navigate("/facultylogin")}>FACULTY</span>
              </li>
              <li>
                <span onClick={() => navigate("/studentlogin")}>STUDENT</span>
              </li>
            </ul>
          </li>
          <li>
            <span>SIGNUP</span>
            <ul className={style.dropdown}>
              <li>
                <span onClick={() => navigate("/studentsignup")}>STUDENT</span>
              </li>
              <li>
                <span onClick={() => navigate("/facultysignup")}>FACULTY</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeNavbar;
