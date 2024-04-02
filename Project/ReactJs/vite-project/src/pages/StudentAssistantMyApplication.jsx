import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import style from "./../assets/css/StudentAssistantMyApplication.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentAssistantMyApplication = () => {
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
  const [action, setAction] = useState("");

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/mystudentapplication/${studentdata.id}/`
        );
        setApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getApplicationData();
  }, [action]);

  const handleEditRec = async (id) => {
    try {
      await axios.get(`${domain}/api/recommendationedit/${id}/`);
      setAction("ok");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/studentapplicationdelete/${id}`);
        setAction("deleted");
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

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

      <div className={style.myapphead}>
        <h1>Undergraduate Assistant (UA) / Graders Applications</h1>
        <div>
          <h3>Want To Apply ?</h3>
          <h3
            className={style.myappheadh3}
            onClick={() =>
              navigate("/studentdashboard", {
                state: {
                  goapply: "ok",
                },
              })
            }
          >
            Visit Here
          </h3>
        </div>
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
          <h3>Recommended By</h3>
          <h3>Associated With</h3>
          <h3>Action</h3>
        </div>
        <div className={style.infobody}>
          {application.map((item, index) => (
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
              <div className={style.row10}>
                {item.did === 0 ? (
                  item.aemail === "" ? (
                    <div className={style.row101}>
                      <h5>No Recommendation</h5>
                      <button
                        className={style.askbtn}
                        onClick={() =>
                          navigate(
                            "/studentdashboard/studentassistantdashboard/studentassistantmyapplication/studentassistantrecommendation",
                            {
                              state: {
                                coursename: item.coursename,
                                courseid: item.courseid,
                                section: item.section,
                                type: item.type,
                                id: item.id,
                              },
                            }
                          )
                        }
                      >
                        Ask
                      </button>
                    </div>
                  ) : (
                    <div className={style.row101}>
                      <h5>No Recommendation</h5>
                    </div>
                  )
                ) : item.did !== 0 && item.rid === 0 ? (
                  <div className={style.row101}>
                    <h5>Asked To</h5>
                    <div className={style.row1011}>
                      <img src={`${domain}/media/${item.dimage}`} alt="" />
                      <div>
                        <h5 onClick={() =>
                 navigate("/viewfacultyprofile", { state: { id: item.did } })
                }>{item.dname}</h5>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className={style.deleteicon}
                      icon={faDeleteLeft}
                      onClick={() => handleEditRec(`${item.id}`)}
                    />
                  </div>
                ) : (
                  <div className={style.row101}>
                    <img src={`${domain}/media/${item.rimage}`} alt="" />
                    <h4 onClick={() =>
                 navigate("/viewfacultyprofile", { state: { id: item.rid } })
                }>{item.rname}</h4>
                  </div>
                )}
              </div>
              <div className={style.row11}>
                {item.aemail === "" ? (
                  <div className={style.row111}>
                    <h5>Pending</h5>
                  </div>
                ) : (
                  <div className={style.row111}>
                    <img src={`${domain}/media/${item.aimage}`} alt="" />
                    <h4 >{item.aname}</h4>
                  </div>
                )}
              </div>
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

export default StudentAssistantMyApplication;
