import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminAlumniRequest.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import AdminAlumniRequestHeader from "../components/AdminAlumniRequestHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAlumniRequest = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);

  useEffect(() => {
    if (admindata.access == "no") {
      navigate("/");
    }
  }, []);

  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      admindata.access = "no";
      const updatedadmindata = JSON.stringify(admindata);
      localStorage.setItem("admin", updatedadmindata);
      navigate("/");
    }
  }, [logoutClick]);

  const [alumniList, setAlumniList] = useState([]);
  const [alumniRequest, setAlumniRequest] = useState([]);
  const [action, setAction] = useState(0);

  useEffect(() => {
    const getAlumni = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/alumnirequest/${admindata.department}/`
        );
        const response1 = await axios.get(
          `${domain}/api/alumni/${admindata.department}/`
        );
        setAlumniRequest(response.data);
        setAlumniList(response1.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getAlumni();
  }, [action]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.get(`${domain}/api/alumniapprove/${id}/`);
      alert(response.data);
      setAction(action + 1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  const handleIgnore = async (id) => {
    try {
      const response = await axios.get(`${domain}/api/alumniignore/${id}/`);
      alert(response.data);
      setAction(action + 1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminAlumniRequestHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "white" }}
            className={style.studenticon}
            icon={faGraduationCap}
          />
          <h2>Alumni Request</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div className={style.infoheader}>
            <h3>Student Name</h3>
            <h3>Student ID</h3>
            <h3>Department</h3>
            <h3>Completed Credit</h3>
            <h3>Action</h3>
          </div>
          <div className={style.infobody}>
            {alumniRequest.map((item, index) => (
              <div className={style.bodyrow}>
                <div className={style.row1}>
                  <img src={`${domain}${item.image}`} alt="" />
                  <h4>{item.fullname}</h4>
                </div>
                <div className={style.row3}>
                  <h4>{item.studentid}</h4>
                </div>
                <div className={style.row2}>
                  <h4>Department Of {item.department}</h4>
                </div>
                <div className={style.row4}>
                  <h4>{item.completedcredit}</h4>
                </div>

                <div className={style.row121}>
                  <button
                    className={style.grantbtn}
                    onClick={() => handleApprove(`${item.id}`)}
                  >
                    Approve
                  </button>
                  <button
                    className={style.rejectbtn}
                    onClick={() => handleIgnore(`${item.id}`)}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.report2}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "gray" }}
            className={style.studenticon}
            icon={faClipboardList}
          />
          <h2>List Of Alumni From {admindata.department} Department</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div className={style.infoheader}>
            <h3>Student Name</h3>
            <h3>Student ID</h3>
            <h3>Department</h3>
            <h3>Status</h3>
          </div>
          <div className={style.infobody1}>
            {alumniList.map((item, index) => (
              <div className={style.bodyrow1}>
                <div className={style.row1}>
                  <img src={`${domain}${item.image}`} alt="" />
                  <h4>{item.fullname}</h4>
                </div>
                <div className={style.row3}>
                  <h4>{item.studentid}</h4>
                </div>
                <div className={style.row2}>
                  <h4>Department Of {item.department}</h4>
                </div>
                <div className={style.row5}>
                  <h4>
                    {item.position} At {item.company}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminAlumniRequest;
