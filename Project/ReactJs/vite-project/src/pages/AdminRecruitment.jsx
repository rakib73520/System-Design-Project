import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminRecruitment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faClipboardList,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import AdminRecruitmentHeader from "../components/AdminRecruitmentHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRecruitment = () => {
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

  const [type, setType] = useState("");
  const [credit, setCredit] = useState("");
  const [cgpa, setCGPA] = useState("");
  const [point, setPoint] = useState("");
  const [trimester, setTrimester] = useState("");
  const [department, setDepartment] = useState(admindata.department);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("none");
  const [recruitment, setRecruitment] = useState([]);
  const [isJobDeleted, setIsJobDeleted] = useState(false);

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
    setError(error);
    const getRecruitment = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/recruitmentdept/${admindata.department}/`
        );
        setRecruitment(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getRecruitment();
  }, [isJobDeleted, error]);

  useEffect(() => {
    setError(error);
    const createJob = async () => {
      let data = new FormData();
      data.append("type", type);
      data.append("credit", credit);
      data.append("cgpa", cgpa);
      data.append("point", point);
      data.append("trimester", trimester);
      data.append("department", department);
      data.append("deadline", deadline);
      data.append("description", description);
      data.append("file", file);
      data.append("nimage", admindata.image);

      try {
        const response = await axios.post(`${domain}/api/recruitment/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        setError("Recruitment Posted Successfully");
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

  const handlePost = async (event) => {
    event.preventDefault();
    if (
      type == "" ||
      credit == "" ||
      cgpa == "" ||
      point == "" ||
      trimester == "" ||
      department == "" ||
      deadline == "" ||
      description == "" ||
      file == ""
    ) {
      setError("All Field Is Required!");
      console.log(
        type,
        credit,
        cgpa,
        point,
        trimester,
        deadline,
        department,
        description,
        file
      );
    } else {
      let flag = 0;
      for (let i = 0; i < recruitment.length; i++) {
        const item = recruitment[i];
        if (item.department == department && item.type == type) {
          setError("A Similar Recruitment Is Already In Progress!");
          flag++;
          break;
        }
      }
      if (flag == 0) {
        setError("Posting...");
      }
    }
  };

  const handlePostDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete? With this action all the record of student and faculty assistant for this recruitment will be deleted!"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${domain}/api/recruitment/${id}`);
        setIsJobDeleted(true);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminRecruitmentHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "rgb(190, 189, 189)" }}
            className={style.studenticon}
            icon={faAddressCard}
          />
          <h2>Start Recruiting Academic Assistant</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Recruitment Posted Successfully"
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
          <form className={style.eventcreate} action="" onSubmit={handlePost}>
            <div
              className={style.eventcreate3}
              style={{ position: "relative", right: "17px", top: "0px" }}
            >
              <h4>Assistant Type</h4>
              <div>
                <select
                  className={style.eventcreate31}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Assistant Type
                  </option>
                  <option value="Undergraduate Assistant">
                    Undergraduate Assistant
                  </option>
                  <option value="Grader">Grader</option>
                </select>
              </div>
            </div>
            <div className={style.eventcreate2}>
              <h4>Requirements</h4>
              <div>
                <input
                  className={style.eventcreate21}
                  type="number"
                  placeholder="Completed Credit"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                />
                <input
                  className={style.eventcreate22}
                  type="number"
                  placeholder="Required CGPA"
                  value={cgpa}
                  onChange={(e) => setCGPA(e.target.value)}
                />
                <input
                  className={style.eventcreate23}
                  type="number"
                  placeholder="Applied Course Point"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                />
              </div>
            </div>
            <div className={style.eventcreate3}>
              <h4>Trimester</h4>
              <div>
                <select
                  className={style.eventcreate31}
                  value={trimester}
                  onChange={(e) => setTrimester(e.target.value)}
                >
                  <option value="">Select Trimester</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>
            </div>
            <div className={style.eventcreate4}>
              <h4>Deadline</h4>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className={style.eventcreate5}>
              <h4>Description</h4>
              <textarea
                type="text"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={style.eventcreate6}>
              <h4>Excel File</h4>
              <input
                type="file"
                id="fileInput"
                accept=".csv"
                onChange={updateFileName}
              />
              <label htmlFor="fileInput" className={style.eventcreate4vis}>
                <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                <h4>Add File</h4>
              </label>
            </div>
            <div className={style.eventcreate7}>
              <span id="fileName">No file chosen</span>
            </div>
            <button type="submit" className={style.create}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className={style.report2}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "gray" }}
            className={style.studenticon}
            icon={faClipboardList}
          />
          <h2>Manage Recruitment</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div className={style.infoheader}>
            <h3>Assistant Type</h3>
            <h3>Department</h3>
            <h3>Required CGPA</h3>
            <h3>Completed Credit</h3>
            <h3>Applied Course Grade</h3>
            <h3>Trimester</h3>
            <h3>Description</h3>
            <h3>Deadline</h3>
            <h3>Action</h3>
          </div>
          <div className={style.infobody1}>
            {recruitment.map((item, index) => (
              <div className={style.bodyrow1}>
                <div className={style.row1}>
                  <h4>{item.type}</h4>
                </div>
                <div className={style.row2}>
                  <h4>{item.department}</h4>
                </div>
                <div className={style.row3}>
                  <h4>{item.cgpa}</h4>
                </div>
                <div className={style.row4}>
                  <h4>{item.credit}</h4>
                </div>
                <div className={style.row5}>
                  <h4>{item.point}</h4>
                </div>
                <div className={style.row6}>
                  <h4>{item.trimester}</h4>
                </div>
                <div className={style.row7}>
                  <h4>{item.description}</h4>
                </div>
                <div className={style.row8}>
                  <h4>{item.deadline}</h4>
                </div>
                <div className={style.row121}>
                  <button
                    className={style.rejectbtn}
                    onClick={() => handlePostDelete(item.id)}
                  >
                    Delete
                  </button>
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

export default AdminRecruitment;
