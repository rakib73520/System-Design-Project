import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import style from "./../assets/css/StudentAssistantAddSubmission.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudentAssistantAddSubmission = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    } else if (locationdata.state == null) {
      navigate("/studentdashboard");
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
  const [file, setFile] = useState("");
  const [postDate, setPostDate] = useState("");
  const [error, setError] = useState("none");

  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    setFile(fileInput.files[0]);
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

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
    const createSubmit = async () => {
      let taskdata = new FormData();
      taskdata.append("subcomment", comment);
      taskdata.append("subid", locationdata.state.id);
      taskdata.append("department", locationdata.state.department);
      taskdata.append("type", locationdata.state.type);
      taskdata.append("subdate", postDate);
      if (file != "") {
        taskdata.append("file", file);
      } else {
        taskdata.append("file", "");
      }

      try {
        await axios.post(`${domain}/api/createsub/`, taskdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Task Submitted Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate(-1);
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
      }
    };
    if (error == "Submitting...") {
      createSubmit();
    }
  }, [error]);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (comment == "") {
      setError("Submission Comment Field Is Required!");
    } else {
      setError("Submitting...");
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

      <div className={style.reviewouter}>
        <div className={style.body}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Task Submitted Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Submitting..."
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
              <h3>Add submission for “{locationdata.state.title}”</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleAdd}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4 style={{ position: "relative", bottom: "30px" }}>
                    Submission Comments
                  </h4>
                </div>
                <div className={style.row212}>
                  <textarea
                    className={style.courseinput}
                    type="text"
                    placeholder="Write Comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.row21} style={{ marginTop: "30px" }}>
                <div className={style.row211}>
                  <h4>Upload File</h4>
                </div>
                <div className={style.row212}>
                  <input type="file" id="fileInput" onChange={updateFileName} />
                  <label htmlFor="fileInput" className={style.eventcreate4vis}>
                    <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                    <h4>Add File</h4>
                  </label>
                </div>
              </div>
              <div className={style.eventcreate7}>
                <span id="fileName">No file chosen</span>
              </div>

              <button className={style.submitbtn}>Add</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentAssistantAddSubmission;
