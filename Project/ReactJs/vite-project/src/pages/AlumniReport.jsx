import React from "react";
import { useState, useEffect, useRef } from "react";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import StudentHeaderAlumni from "../components/StudentHeaderAlumni";
import style from "./../assets/css/StudentResearchFeedback.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const AlumniReport = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

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

  const [comment, setComment] = useState("");
  const [error, setError] = useState("none");

  useEffect(() => {
    setError(error);
    const updateFeedback = async () => {
      let taskdata = new FormData();
      taskdata.append("messege", comment);
      taskdata.append("reporterid", locationdata.state.reporterid);
      taskdata.append("reportedid", locationdata.state.reportedid);
      taskdata.append("id", locationdata.state.id);

      try {
        await axios.post(`${domain}/api/doreport/`, taskdata);
        setError("User Reported!");
        const delay = 1000;
        setTimeout(() => {
          navigate(-1);
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
      }
    };
    if (error == "Reporting...") {
      updateFeedback();
    }
  }, [error]);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (comment == "") {
      setError("Report Messege Field Is Required!");
    } else {
      setError("Reporting...");
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
      <StudentHeaderAlumni />

      <div className={style.reviewouter}>
        <div className={style.body}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "User Reported!"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Reporting..."
                ? {}
                : {}
            }
          >
            <p className={style.errormsg}>{error}</p>
          </div>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
            <div className={style.row12}>
              <h3>Explain Your Reaseon For Reporting</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleAdd}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4 style={{ position: "relative", bottom: "30px" }}>
                    Report Messege
                  </h4>
                </div>
                <div className={style.row212}>
                  <textarea
                    className={style.courseinput}
                    type="text"
                    placeholder="Write Feedback"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <button
                className={style.submitbtn}
                style={{
                  position: "relative",
                  left: "320px",
                  backgroundColor: "red",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AlumniReport;
