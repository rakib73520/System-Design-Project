import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "../components/HeaderAssistantFaculty";
import style from "./../assets/css/FacultyAssistantUpdateTask.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantUpdateTask = () => {
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

  const [title, setTitle] = useState(locationdata.state.title);
  const [instruction, setInstruction] = useState(
    locationdata.state.instruction
  );
  const [postdate, setPostDate] = useState("");
  const [deadline, setDeadline] = useState(locationdata.state.deadline);
  const [file, setFile] = useState("");
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
    const createTask = async () => {
      let taskdata = new FormData();
      taskdata.append("title", title);
      taskdata.append("instruction", instruction);
      if (deadline == null) {
        taskdata.append("deadline", "");
      } else {
        taskdata.append("deadline", deadline);
      }
      if (file) {
        taskdata.append("file", file);
      } else {
        taskdata.append("file", "");
      }
      taskdata.append("postdate", postdate);
      taskdata.append("id", locationdata.state.id);

      try {
        await axios.post(`${domain}/api/updatetask/`, taskdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Task Updated Successfully");
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
      createTask();
    }
  }, [error]);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (title == "") {
      setError("Task Title Field Is Required!");
    } else if (instruction == "") {
      setError("Instruction Field Is Required!");
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
                : error === "Task Updated Successfully"
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
              <h3>Update Task</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleAdd}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Task Title</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Write Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Instruction</h4>
                </div>
                <div className={style.row212}>
                  <textarea
                    className={style.sectioninput}
                    type="text"
                    placeholder="Write Instruction"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21} style={{ marginTop: "60px" }}>
                <div className={style.row211}>
                  <h4>Deadline</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.dateinput}
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Assessment (If any)</h4>
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

              <button className={style.submitbtn}>Update</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FacultyAssistantUpdateTask;
