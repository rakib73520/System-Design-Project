import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "../components/HeaderAssistantFaculty";
import style from "./../assets/css/StudentResearchFeedback.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantFeedback = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);
  const locationdata = useLocation();

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

  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [postdate, setPostDate] = useState("");
  const [error, setError] = useState("none");

  useEffect(() => {
    const date = new Date();

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const showDateTime = date.toLocaleString("en-US", options);
    setPostDate(showDateTime);
  }, []);

  useEffect(() => {
    setError(error);
    const updateFeedback = async () => {
      let taskdata = new FormData();
      taskdata.append("comment", comment);
      taskdata.append("status", status);
      taskdata.append("subid", locationdata.state.id);
      taskdata.append("postdate", postdate);
      taskdata.append("tid", locationdata.state.tid);

      try {
        await axios.post(`${domain}/api/updatefeedback/`, taskdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Feedback Updated Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate(-1);
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
      }
    };
    if (error == "Updating...") {
      updateFeedback();
    }
  }, [error]);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (comment == "") {
      setError("Feedback Field Is Required!");
    } else if (status == "") {
      setError("Status Field Is Required!");
    } else {
      setError("Updating...");
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

      <div className={style.reviewouter}>
        <div className={style.body}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Feedback Updated Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Updating..."
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
              <h3>Give feedback for “{locationdata.state.title}”</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleAdd}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4 style={{ position: "relative", bottom: "30px" }}>
                    Feedback
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
              <div className={style.row21} style={{ marginTop: "30px" }}>
                <div className={style.row211}>
                  <h4>Status</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <button className={style.submitbtn}>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FacultyAssistantFeedback;
