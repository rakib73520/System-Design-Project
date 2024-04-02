import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "../components/HeaderAssistantFaculty";
import style from "./../assets/css/FacultyAssistantMyApplication.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantMyApplication = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);

  useEffect(() => {
    if (facultydata.access == "no") {
      navigate("/");
    }
  }, []);

  const [bellClick, setBellClick] = useState(0);
  const [searchClick, setSearchClick] = useState(0);
  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      facultydata.access = "no";
      const updatedfacultydata = JSON.stringify(facultydata);
      localStorage.setItem("faculty", updatedfacultydata);
      navigate("/");
    }
  }, [logoutClick]);

  const [facultyapplication, setFacultyApplication] = useState([]);
  const [action, setAction] = useState(0);

  useEffect(() => {
    const getFacultyApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myfacultyapplication/${facultydata.email}`
        );
        setFacultyApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getFacultyApplication();
  }, [action]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/facultyapplicationdelete/${id}`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  return (
    <div>
      <FacultyHeader
        bellClick={bellClick}
        searchClick={searchClick}
        setBellClick={setBellClick}
        setSearchClick={setSearchClick}
        setLogoutClick={setLogoutClick}
      />
      <FacultyHeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
      />
      <HeaderAssistantFaculty />
      <div className={style.myapphead}>
        <h1>To request an Undergraduate Assistant (UA) or a Grader , please</h1>
        <h2
          onClick={() =>
            navigate(
              "/facultydashboard/facultyassistantdashboard/facultymyapplication/facultyassistantapply"
            )
          }
        >
          Apply here
        </h2>
      </div>
      <div className={style.reportinfo}>
        <h1>My Applications</h1>
        <div className={style.infoheader}>
          <h3>Course Name</h3>
          <h3>Course Code</h3>
          <h3>Department</h3>
          <h3>Section</h3>
          <h3>Day</h3>
          <h3>Class Time</h3>
          <h3>Trimester</h3>
          <h3>Assistant Type</h3>
          <h3>Assistant</h3>
          <h3>Action</h3>
        </div>
        <div className={style.infobody}>
          {facultyapplication.map((item, index) => (
            <div className={style.bodyrow}>
              <div className={style.row2}>
                <h4>{item.coursename}</h4>
              </div>
              <div className={style.row3}>
                <h4>{item.courseid}</h4>
              </div>
              <div className={style.row4}>
                <h4>{item.department}</h4>
              </div>
              <div className={style.row5}>
                <h4>{item.section}</h4>
              </div>
              <div className={style.row6}>
                <h4>{item.day}</h4>
              </div>
              <div className={style.row7}>
                <h4>{item.classtime}</h4>
              </div>
              <div className={style.row8}>
                <h4>{item.trimester}</h4>
              </div>
              <div className={style.row9}>
                <h4>{item.type}</h4>
              </div>
              {item.aid === 0 ? (
                <div className={style.row112}>
                  <div className={style.row111}>
                    <h5>Pending</h5>
                  </div>
                </div>
              ) : (
                <div className={style.row10}>
                  <div className={style.row101}>
                    <img src={`${domain}/media/${item.aimage}`} alt="" />
                    <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.aid } })
                }>{item.aname}</h4>
                  </div>
                </div>
              )}
              <div className={style.row121}>
                <button
                  className={style.deletebtn}
                  onClick={() => handleDelete(`${item.id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacultyAssistantMyApplication;
