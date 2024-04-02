import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import style from "./../assets/css/StudentAssistantApply.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudentAssistantApply = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    } else if (locationdata.state == null) {
      console.log("whats");
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

  // new code here

  const [isCourseSearch, setIsCourseSearch] = useState(false);
  const [isSectionSearch, setIsSectionSearch] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [coursename, setCoursename] = useState("");
  const [courseid, setCourseid] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("");
  const [classtime, setClasstime] = useState("");
  const [point, setPoint] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("none");

  const [courseResult, setCourseResult] = useState([]);
  const [sectionResult, setSectionResult] = useState([]);

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

  useEffect(() => {
    const getSection = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/sectionsearch/${coursename}/${courseid}/${locationdata.state.department}/${locationdata.state.type}/`
        );
        setSectionResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (isSectionSearch == true) {
      getSection();
    }
  }, [isSectionSearch]);

  const handleSeachClick = (coursesearchname, coursesearchid) => {
    setCoursename(coursesearchname);
    setCourseid(coursesearchid);
    setIsCourseSearch(false);
    setIsSectionSearch(true);
  };

  const handleSectionClick = (section, classtime, day) => {
    setSection(section);
    setClasstime(classtime);
    setDay(day);
    setIsSectionSearch(false);
    setIsTitle(true);
  };

  const [selectedValue, setSelectedValue] = useState(false);

  useEffect(() => {
    if (experience == "YES") {
      setSelectedValue(true);
    }
  }, [experience]);

  const handleExperience = (event) => {
    event.preventDefault();
    setSelectedValue(false);
  };

  const [application, setApplication] = useState([]);

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/studentapply/${locationdata.state.department}/${locationdata.state.type}/`
        );
        setApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getApplicationData();
  }, [error]);

  useEffect(() => {
    setError(error);
    const createApplication = async () => {
      let data = new FormData();
      data.append("coursename", coursename);
      data.append("courseid", courseid);
      data.append("type", locationdata.state.type);
      data.append("department", locationdata.state.department);
      data.append("section", section);
      data.append("day", day);
      data.append("classtime", classtime);
      data.append("trimester", locationdata.state.trimester);
      data.append("experience", experience);
      data.append("sid", studentdata.id);
      data.append("point", point);

      try {
        await axios.post(`${domain}/api/studentcreateapplication/`, data);
        setError("Applied Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate(
            "/studentdashboard/studentassistantdashboard/studentassistantmyapplication"
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
      courseid == "" ||
      section == "" ||
      day == "" ||
      classtime == "" ||
      point == "" ||
      experience == ""
    ) {
      setError("All Field Is Required!");
    } else {
      let flag = 0;
      for (let i = 0; i < application.length; i++) {
        const item = application[i];
        if (
          item.department == locationdata.state.department &&
          item.type == locationdata.state.type &&
          item.coursename == coursename &&
          item.courseid == courseid &&
          item.sstudentid == studentdata.studentid &&
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
              <h3>
                To apply for the position of {locationdata.state.type} in the
                Department of {locationdata.state.department}, please follow
                these steps:
              </h3>
            </div>
          </div>
          <div
            className={style.showmsg}
            style={isTitle ? {} : { visibility: "hidden" }}
          >
            <h4>
              You are applying for {coursename}[{courseid}][{section}][
              {classtime}][{day}]
              {experience != "" && experience != "YES" && experience != "NO" ? (
                <h4>[Experienced Course : {experience}]</h4>
              ) : (
                ""
              )}
            </h4>
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
                  <h4>Applied Course Point</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.sectioninput}
                    type="number"
                    placeholder="Write Point"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Experience</h4>
                </div>
                <div className={style.row212}>
                  <select
                    className={style.typeinput}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
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
              <div
                className={style.experiencecourse}
                style={selectedValue ? {} : { visibility: "hidden" }}
              >
                <input
                  className={style.experienceinput}
                  type="text"
                  placeholder="Write your experienced course name"
                  onChange={(e) => setExperience(e.target.value)}
                />
                <button className={style.addbtn} onClick={handleExperience}>
                  Add
                </button>
              </div>
            </form>
          </div>
          <div
            className={style.row3}
            style={isSectionSearch ? {} : { visibility: "hidden" }}
          >
            <div className={style.row3header}>
              <h3>Section</h3>
              <h3>Class Time</h3>
              <h3>Action</h3>
            </div>
            {sectionResult.map((item, index) => (
              <div className={style.row3body}>
                <div className={style.sec1}>
                  <h4>{item.section}</h4>
                </div>
                <div className={style.sec2}>
                  <p>
                    {item.classtime}({item.day})
                  </p>
                </div>
                <div className={style.sec3}>
                  <button
                    className={style.choosebtn}
                    onClick={() =>
                      handleSectionClick(
                        `${item.section}`,
                        `${item.classtime}`,
                        `${item.day}`
                      )
                    }
                  >
                    Choose
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentAssistantApply;
