import React from "react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderPrev from "../components/HeaderPrev";
import style from "./../assets/css/PostJob.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyPostJob = () => {
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
  const [jobTitle, setJobTitle] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("none");

  useEffect(() => {
    if (logoutClick) {
      facultydata.access = "no";
      const updatedfacultydata = JSON.stringify(facultydata);
      localStorage.setItem("faculty", updatedfacultydata);
      navigate("/");
    }
  }, [logoutClick]);

  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    setImage(fileInput.files[0]);
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

  useEffect(() => {
    setError(error);
    const createJob = async () => {
      let jobdata = new FormData();
      jobdata.append("jobtitle", jobTitle);
      if (siteLink) {
        jobdata.append("sitelink", siteLink);
      }
      jobdata.append("description", description);
      jobdata.append("username", facultydata.fullname);
      jobdata.append("usertype", "FACULTY PROFILE");
      jobdata.append("userposition", facultydata.facultytype);
      jobdata.append("userid", facultydata.id);
      jobdata.append("userimage", facultydata.image);
      jobdata.append("department", facultydata.department);
      if (image) {
        jobdata.append("image", image);
      }

      try {
        await axios.post(`${domain}/api/postedjob/`, jobdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Job Posted Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate("/facultydashboard");
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    if (error == "Posting...") {
      createJob();
    }
  }, [error]);

  const handlePostJob = async (event) => {
    event.preventDefault();
    if (jobTitle == "" && description == "") {
      setError("Job Title & Description Field Is Required!");
    } else if (jobTitle == "") {
      setError("Job Title Field Is Required!");
    } else if (description == "") {
      setError("Description Field Is Required!");
    } else {
      setError("Posting...");
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
      <HeaderPrev />
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Job Posted Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Posting..."
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
              <h3>Post Job for Student</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handlePostJob}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Job title</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Write Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Site Link</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Website link"
                    value={siteLink}
                    onChange={(e) => setSiteLink(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Description</h4>
                </div>
                <div className={style.row212}>
                  <textarea
                    className={style.sectioninput}
                    type="text"
                    placeholder="Write description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div
                className={style.row21}
                style={{ position: "relative", top: "57px" }}
              >
                <div className={style.row211}>
                  <h4>Image</h4>
                </div>
                <div className={style.row212}>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={updateFileName}
                    accept="image/*"
                  />
                  <label htmlFor="fileInput" className={style.eventcreate4vis}>
                    <FontAwesomeIcon className={style.imgicon} icon={faImage} />
                    <h4>Add Image</h4>
                  </label>
                </div>
              </div>
              <div className={style.eventcreate7}>
                <span id="fileName">No file chosen</span>
              </div>

              <button type="submit" className={style.submitbtn}>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacultyPostJob;
