import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import style from "./../assets/css/StudentAssistantRecommendation.module.css";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudentAssistantRecommendation = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    } else if (locationdata.state == null) {
      navigate(
        "/studentdashboard/studentassistantdashboard/studentassistantmyapplication"
      );
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

  const [isFacultySearch, setIsFacultySearch] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [messege, setMessege] = useState("");
  const [fid, setFid] = useState("");
  const [error, setError] = useState("none");

  const [facultyResult, setFacultyResult] = useState([]);

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/facultysearch/${faculty}/`
        );
        setFacultyResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (faculty != "") {
      getFaculty();
    }
  }, [faculty]);

  const handleSeachClick = (fid, faculty) => {
    setFaculty(faculty);
    setFid(fid);
    setIsFacultySearch(false);
  };

  useEffect(() => {
    setError(error);
    const createRecommendation = async () => {
      let data = new FormData();
      data.append("fid", fid);
      data.append("messege", messege);
      data.append("said", locationdata.state.id);
      data.append("sid", studentdata.id);

      try {
        const response = await axios.post(
          `${domain}/api/studentcreaterecommendation/`,
          data
        );
        setError("Recommendation Asked Successfully");
        const delay = 1000;
        setTimeout(() => {
          navigate(
            "/studentdashboard/studentassistantdashboard/studentassistantmyapplication"
          );
        }, delay);
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
      }
    };
    if (error == "Asking...") {
      createRecommendation();
    }
  }, [error]);

  const handleApply = async (event) => {
    event.preventDefault();
    if (faculty == "" || messege == "" || fid == "") {
      setError("All Field Is Required!");
    } else {
      setError("Asking...");
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
                : error === "Recommendation Asked Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Asking..."
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
                You are requesting a recommendation for the{" "}
                {locationdata.state.coursename}[{locationdata.state.courseid}],
                Section {locationdata.state.section}, in your application for
                the {locationdata.state.type} position
              </h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="" onSubmit={handleApply}>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Faculty Member</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Search Faculty Member"
                    onClick={() => setIsFacultySearch(true)}
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Messege</h4>
                </div>
                <div className={style.row212}>
                  <textarea
                    className={style.sectioninput}
                    type="text"
                    placeholder="Write Messege"
                    value={messege}
                    onChange={(e) => setMessege(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button className={style.submitbtn}>Ask</button>
              <div
                style={isFacultySearch ? {} : { visibility: "hidden" }}
                className={style.searchresult}
              >
                {facultyResult.map((item, index) => (
                  <div
                    className={style.findfaculty}
                    onClick={() =>
                      handleSeachClick(`${item.id}`, `${item.fullname}`)
                    }
                  >
                    <img src={`${domain}${item.image}`} alt="" />
                    <h4>{item.fullname}</h4>
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

export default StudentAssistantRecommendation;
