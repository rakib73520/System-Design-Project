import React from "react";
import style from "./../assets/css/AdminHeader.module.css";
import uiu from "./../assets/media/images/uiu.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminStudentApplicationHeader = ({ setLogoutClick }) => {
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);
  return (
    <div>
      <div className={style.adminheader}>
        <img src={uiu} alt="" />
        <div className={style.headerdiv}>
          <h1>United International University</h1>
          <h3>{admindata.department}</h3>
        </div>
        <div className={style.headerlink}>
          <FontAwesomeIcon className={style.headericon} icon={faHome} />
          <h3
            className={style.headertitle}
            onClick={() => navigate("/admindashboard")}
          >
            Home
          </h3>
          <h3
            className={style.headertitle}
            onClick={() => navigate("/admindashboard/adminstudentapplication")}
          >
            / Student Application
          </h3>
          <h3
            className={style.headerlogout}
            onClick={() => setLogoutClick(true)}
          >
            Logout
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentApplicationHeader;
