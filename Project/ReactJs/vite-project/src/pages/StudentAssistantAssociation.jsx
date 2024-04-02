import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import Display from "./../assets/media/images/display3.jpg";
import Display2 from "./../assets/media/images/display5.jpg";
import style from "./../assets/css/StudentAssistantAssociation.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentAssistantAssociation = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [bellClick, setBellClick] = useState(0);
  const [searchClick, setSearchClick] = useState(0);
  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      studentdata.access = "no";
      const updatedstudentdata = JSON.stringify(studentdata);
      localStorage.setItem("student", updatedstudentdata);
      navigate("/");
    }
  }, [logoutClick]);

  const [application, setApplication] = useState([]);

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myassociation/${studentdata.id}/`
        );
        setApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getApplicationData();
  }, []);

  return (
    <div>
      <StudentHeader
        bellClick={bellClick}
        searchClick={searchClick}
        setBellClick={setBellClick}
        setSearchClick={setSearchClick}
        setLogoutClick={setLogoutClick}
      />
      <StudentHeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
      />
      <HeaderAssistant />
      <div className={style.row}>
        <p className={style.toptitle}>
          <b>You have been selected for the following courses as a UA/Grader</b>
        </p>
        <p className={style.toptitle1}>
          Click on the following courses to access their task management portals
        </p>
        <div className={style.row0}>
          {application.map((item, index) => (
            <div
              className={style.row1}
              onClick={() =>
                navigate(
                  "/studentdashboard/studentassistantdashboard/studentassistantassociation/studentassistanttaskmanagement",
                  {
                    state: {
                      department: item.department,
                      coursename: item.coursename,
                      courseid: item.courseid,
                      section: item.section,
                      trimester: item.trimester,
                      sname: item.sname,
                      simage: item.simage,
                      fname: item.fname,
                      fimage: item.fimage,
                      id: item.id,
                      type: item.type,
                    },
                  }
                )
              }
            >
              <img src={index % 2 === 0 ? Display : Display2} alt=""></img>
              <p className={style.row11}>
                Dept. Of{" "}
                {item.department === "Computer Science And Engineering"
                  ? "CSE"
                  : item.department === "Electrical And Electronics Engineering"
                  ? "EEE"
                  : item.department === "Civil Engineering"
                  ? "CE"
                  : item.department}
              </p>
              <p className={style.row12}>
                {item.trimester} {item.courseid} ({item.section}):{" "}
                {item.coursename}
              </p>
              <p className={style.row13}>
                <b>Course teacher</b>
              </p>
              <div>
                <div className={style.row14}>
                  <img src={`${domain}/media/${item.fimage}`} alt=""></img>
                  <div className={style.row141}>
                    <h4>{item.fname}</h4>
                    <p>Faculty at UIU</p>
                  </div>
                  <div>
                    <hr className={style.midline}></hr>
                  </div>
                  <div className={style.row142}>
                    <p className={style.row1421}>
                      <b>My position</b>
                    </p>
                    <p className={style.row1422}>{item.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentAssistantAssociation;
