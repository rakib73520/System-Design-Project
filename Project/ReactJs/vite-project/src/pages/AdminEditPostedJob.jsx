import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminPostJob.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faImage } from "@fortawesome/free-solid-svg-icons";
import AdminPostJobHeader from "../components/AdminPostJobHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminEditPostedJob = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);
  const locationdata = useLocation();

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

  const [jobTitle, setJobTitle] = useState(locationdata.state.jobtitle);
  const [siteLink, setSiteLink] = useState(locationdata.state.sitelink);
  const [description, setDescription] = useState(
    locationdata.state.description
  );
  const [image, setImage] = useState("");
  const [error, setError] = useState("none");

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
      jobdata.append("id", locationdata.state.id);
      jobdata.append("jobtitle", jobTitle);
      jobdata.append("sitelink", siteLink);
      jobdata.append("description", description);
      jobdata.append("image", "");
      if (image) {
        jobdata.append("image", image);
      }
      jobdata.append("username", "UIU");
      if (admindata.department == "Computer Science And Engineering") {
        jobdata.append("userposition", "CSE");
      } else if (
        admindata.department == "Electrical and Electronics Engineering"
      ) {
        jobdata.append("userposition", "EEE");
      } else {
        jobdata.append("userposition", "CE");
      }
      jobdata.append("userimage", admindata.image);
      jobdata.append("department", admindata.department);

      try {
        await axios.post(`${domain}/api/updatepostedjob/`, jobdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Job Updated Successfully");
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    if (error == "Updating...") {
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
      setError("Updating...");
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminPostJobHeader setLogoutClick={setLogoutClick} />
      <div style={{ marginBottom: "60px" }} className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "rgb(190, 189, 189)" }}
            className={style.studenticon}
            icon={faPaperPlane}
          />
          <h2>Edit Posted Job</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Job Updated Successfully"
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
          <form
            className={style.eventcreate}
            action=""
            onSubmit={handlePostJob}
          >
            <div className={style.eventcreate1}>
              <h4>Job Title</h4>
              <input
                type="text"
                placeholder="Write Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className={style.eventcreate2}>
              <h4>Site Link</h4>
              <input
                type="text"
                placeholder="Write Title"
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
              />
            </div>
            <div className={style.eventcreate3}>
              <h4>Description</h4>
              <textarea
                type="text"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={style.eventcreate4}>
              <h4>Image</h4>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={updateFileName}
              />
              <label htmlFor="fileInput" className={style.eventcreate4vis}>
                <FontAwesomeIcon className={style.imgicon} icon={faImage} />
                <h4>Add Image</h4>
              </label>
            </div>
            <div className={style.eventcreate5}>
              <span id="fileName">No file chosen</span>
            </div>
            <button type="submit" className={style.create}>
              Post
            </button>
          </form>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminEditPostedJob;
