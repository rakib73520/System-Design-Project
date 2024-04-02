import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "./../components/HeaderAssistantFaculty";
import rakib from "./../assets/media/images/rakib.jpg";
import style from "./../assets/css/FacultyAssistantRecommendation.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantRecommendation = () => {
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

  const [recommendation, setRecommendation] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/recommendation/${facultydata.id}/`
        );
        setRecommendation(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getRecommendation();
  }, [action]);

  const handleRecommend = async (aid, id) => {
    try {
      await axios.get(`${domain}/api/recommendationok/${aid}/${id}/`);
      setAction("ok");
      alert("Recommendation Approved");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };
  const handleIgnore = async (aid, id) => {
    try {
      await axios.get(`${domain}/api/recommendationcancel/${aid}/${id}/`);
      setAction("ok");
      alert("Recommendation Ignored");
    } catch (error) {
      console.log("Error connecting to the backend!");
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

      <div className={style.reportinfo}>
        <h1>Lists Of Recent Asked Recommendations From Student</h1>
        <div className={style.infoheader}>
          <h3>Request info.</h3>
          <h3>Messege</h3>
          <h3>Action</h3>
        </div>
        <div className={style.infobody}>
          {recommendation.map((item, index) => (
            <div className={style.bodyrow}>
              <div className={style.col1}>
                <div className={style.col11}>
                  <img src={`${domain}/media/${item.simage}`} alt="" />
                  <div className={style.col111}>
                    <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.sid } })
                }>{item.sname}</h4>
                    <p>
                      asked for your recommendation in his application for the{" "}
                      {item.type} position.
                    </p>
                  </div>
                </div>
                <h4 className={style.detailtitle}>Application details</h4>
                <div className={style.col12}>
                  <h5>
                    {item.coursename} | {item.courseid} | Section {item.section}{" "}
                    | {item.department} | {item.trimester}
                  </h5>
                </div>
              </div>
              <div className={style.col2}>
                <p>{item.messege}</p>
              </div>
              <div className={style.col3}>
                <button
                  className={style.recommend}
                  onClick={() => handleRecommend(`${item.said}`, `${item.id}`)}
                >
                  Recommend
                </button>
                <button
                  className={style.ignore}
                  onClick={() => handleIgnore(`${item.said}`, `${item.id}`)}
                >
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FacultyAssistantRecommendation;
