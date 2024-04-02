import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "../components/HeaderAssistantFaculty";
import style from "./../assets/css/FacultyAssistantApply.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantApply = () => {
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

  const [isCourseSearch, setIsCourseSearch] = useState(false);
  const [coursename, setCoursename] = useState("");
  const [courseid, setCourseid] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("");
  const [classtime, setClasstime] = useState("");
  const [trimester, setTrimester] = useState("");
  const [error, setError] = useState("none");

  const [courseResult, setCourseResult] = useState([]);

  useEffect(() => {
    const getCourseName = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/coursesearch/${coursename}`
        );
        setCourseResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (coursename != "") {
      getCourseName();
    }
  }, [coursename]);

  const handleSeachClick = (coursesearchname, coursesearchid) => {
    setCoursename(coursesearchname);
    setCourseid(coursesearchid);
    setIsCourseSearch(false);
  };

  const [application, setApplication] = useState([]);

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/facultyapply/${department}/${type}/${trimester}`
        );
        setApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (department != "" && type != "" && trimester != "") {
      getApplicationData();
    }
  }, [department, type, trimester]);

  useEffect(() => {
    setError(error);
    const createApplication = async () => {
      let data = new FormData();
      data.append("coursename", coursename);
      data.append("courseid", courseid);
      data.append("type", type);
      data.append("department", department);
      data.append("section", section);
      data.append("day", day);
      data.append("classtime", classtime);
      data.append("trimester", trimester);
      data.append("fid", facultydata.id);

      try {
        const response = await axios.post(
          `${domain}/api/facultycreateapplication/`,
          data
        );
        console.log(response);
        setError("Applied Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate(
            "/facultydashboard/facultyassistantdashboard/facultymyapplication"
          );
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    if (error == "Applying...") {
      createApplication();
    }
  }, [error]);

  const handleApply = async (event) => {
    event.preventDefault();
    if (
      coursename == "" ||
      type == "" ||
      department == "" ||
      section == "" ||
      trimester == "" ||
      day == "" ||
      classtime == ""
    ) {
      setError("All Field Is Required!");
    } else {
      let flag = 0;
      if (application.length == 0) {
        setError("Department Hasn't Posted This Recruitment Yet!");
        flag++;
      }
      for (let i = 0; i < application.length; i++) {
        const item = application[i];
        if (
          item.department == department &&
          item.type == type &&
          item.coursename == coursename &&
          item.courseid == courseid &&
          item.femail == facultydata.email &&
          item.section == section
        ) {
          setError("You Already Made a Similar Application!");
          flag++;
          break;
        }
      }
      if (flag == 0) {
        setError("Applying...");
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

      <div className={style.reviewouter}>
        <div className={style.body}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Applied Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Applying..."
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
              <h3>Ask for Undergraduate Assistant / Grader</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleApply}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Course</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Course Search"
                    onClick={() => setIsCourseSearch(true)}
                    value={coursename}
                    onChange={(e) => setCoursename(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Assistant Type</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Undergraduate Assistant">
                      Undergraduate Assistant
                    </option>
                    <option value="Grader">Grader</option>
                  </select>
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Department</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science And Engineering">
                      CSE
                    </option>
                    <option value="Electrical and Electronics Engineering">
                      EEE
                    </option>
                    <option value="Civil Engineering">CE</option>
                  </select>
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Section</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.sectioninput}
                    type="text"
                    placeholder="Write Section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Day</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value="">Select Day</option>
                    <option value="Sun-Wed">Sun-Wed</option>
                    <option value="Sat-Tue">Sat-Tue</option>
                  </select>
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Class Time</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    value={classtime}
                    onChange={(e) => setClasstime(e.target.value)}
                  >
                    <option value="">Select Class Time</option>
                    <option value="8.30AM-10.00AM">8.30AM-10.00AM</option>
                    <option value="10.00AM-11.30AM">10.00AM-11.30AM</option>
                    <option value="11.30AM-1.00PM">11.30AM-1.00PM</option>
                    <option value="1.30AM-3.00PM">1.30AM-3.00PM</option>
                    <option value="8.30AM-11.00AM">8.30AM-11.00AM</option>
                    <option value="11.00AM-1.30PM">11.00AM-1.30PM</option>
                    <option value="1.30AM-4.00PM">1.30PM-4.00PM</option>
                  </select>
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Trimester</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
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
              <button className={style.submitbtn}>Submit</button>
              <div
                style={isCourseSearch ? {} : { visibility: "hidden" }}
                className={style.searchresult}
              >
                {courseResult.map((item, index) => (
                  <div className={style.namediv}>
                    <h4
                      onClick={() =>
                        handleSeachClick(
                          `${item.coursename}`,
                          `${item.courseid}`
                        )
                      }
                    >
                      {item.coursename}[{item.courseid}]
                    </h4>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FacultyAssistantApply;
