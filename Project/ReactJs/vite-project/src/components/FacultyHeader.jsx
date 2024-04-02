import React from "react";
import { useEffect, useState } from "react";
import style from "./../assets/css/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyHeader = ({
  bellClick,
  setBellClick,
  setLogoutClick,
}) => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);

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
        const response = await axios.get(`${domain}/api/notificationfaculty/${facultydata.email}/${"faculty"}/`);
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
        <img src={`${domain}/${facultydata.image}`} alt="" />
        <div className={style.namerange}>
          <p onClick={() => navigate("/facultydashboard/facultyprofile")}>
            {facultydata.fullname}
          </p>
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
        <FontAwesomeIcon className={style.home} icon={faHome} />
        <h3 onClick={() => navigate("/facultydashboard")}>Home</h3>
      </div>
    </div>
  );
};

export default FacultyHeader;
