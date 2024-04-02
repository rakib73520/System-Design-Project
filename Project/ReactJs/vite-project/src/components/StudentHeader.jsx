import React from "react";
import { useEffect, useState } from "react";
import style from "./../assets/css/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHeader = ({
  bellClick,
  setBellClick,
  setLogoutClick,
}) => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  const handleBellClick = () => {
    if (bellClick == 0) {
      setBellClick(1);
    } else if (bellClick == 1) {
      setBellClick(0);
    }
  };

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get(`${domain}/api/notification/${studentdata.id}/${"student"}/`);
        setNotification(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getNotification();
  }, [setBellClick]);

  return (
    <div>
      <div className={style.headertop}>
        <img src={`${domain}/${studentdata.image}`} alt="" />
        <div className={style.namerange}>
          {studentdata.report == 1 ? (
            <p>{studentdata.fullname}</p>
          ) : (
            <p onClick={() => navigate("/studentdashboard/studentprofile")}>
              {studentdata.fullname}
            </p>
          )}
        </div>

        <h4 onClick={() => setLogoutClick(true)}>Logout</h4>
        <FontAwesomeIcon
          onClick={handleBellClick}
          className={style.bell}
          icon={faBell}
        />
        <div className={style.headertop1}>
          <h1>{notification.length}</h1>
        </div>
        <FontAwesomeIcon
          className={style.home}
          icon={faHome}
          style={studentdata.report == 1 ? { visibility: "hidden" } : {}}
        />
        <h3
          onClick={() => navigate("/studentdashboard")}
          style={studentdata.report == 1 ? { visibility: "hidden" } : {}}
        >
          Home
        </h3>
      </div>
    </div>
  );
};

export default StudentHeader;
