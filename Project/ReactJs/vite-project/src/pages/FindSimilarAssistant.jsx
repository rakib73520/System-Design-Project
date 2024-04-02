import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/FindSimilarAssistant.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindSimilarAssistant = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [assistant, setAssistant] = useState([]);

  useEffect(() => {
    const getAssistant = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/findassistant/${locationdata.state.department}/${locationdata.state.type}/${locationdata.state.coursename}/${locationdata.state.courseid}/`
        );
        setAssistant(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getAssistant();
  }, []);

  return (
    <div className={style.report1}>
      <div className={style.divbtn}>
        <button className={style.btnback} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className={style.showhead}>
        <h2>
          Showing All {locationdata.state.type} And Associated Teacher Of{" "}
          {locationdata.state.coursename}
        </h2>
      </div>
      <div className={style.reportinfo}>
        <div className={style.infoheader}>
          <h3>Assistant Information</h3>
          <h3>Faculty Information</h3>
        </div>
        <div className={style.infobody}>
          {assistant.map((item, index) => (
            <div className={style.bodyrow}>
              <div className={style.row1}>
                <img src={`${domain}/media/${item.simage}`} alt="" />
                <div className={style.row11}>
                  <h4>{item.sname}</h4>
                  <h5>Student At UIU</h5>
                  <p>Department Of {item.department}</p>
                  <span>
                    {item.coursename} | {item.section} | {item.trimester}
                  </span>
                </div>
              </div>
              <div className={style.row1}>
                <img src={`${domain}/media/${item.fimage}`} alt="" />
                <div className={style.row11}>
                  <h4>{item.fname}</h4>
                  <h5>Faculty At UIU</h5>
                  <p className={style.row11extra}>
                    Department Of {item.department}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className={style.bodyrow}>
            <div className={style.row1}>
              <img src={rakib} alt="" />
              <div className={style.row11}>
                <h4>Rakibul Hasan</h4>
                <h5>Student At UIU</h5>
                <p>Department Of Computer Science and Engineering</p>
                <span>Data Structure and algorithm | B | Summer 2023</span>
              </div>
            </div>
            <div className={style.row1}>
              <img src={Swakkhar} alt="" />
              <div className={style.row11}>
                <h4>Swakkhar Shatabda</h4>
                <h5>Professor At UIU</h5>
                <p className={style.row11extra}>
                  Department Of Computer Science and Engineering
                </p>
              </div>
            </div>
          </div>
          <div className={style.bodyrow}>
            <div className={style.row1}>
              <img src={rakib} alt="" />
              <div className={style.row11}>
                <h4>Rakibul Hasan</h4>
                <h5>Student At UIU</h5>
                <p>Department Of Computer Science and Engineering</p>
                <span>Data Structure and algorithm | B | Summer 2023</span>
              </div>
            </div>
            <div className={style.row1}>
              <img src={Swakkhar} alt="" />
              <div className={style.row11}>
                <h4>Swakkhar Shatabda</h4>
                <h5>Professor At UIU</h5>
                <p className={style.row11extra}>
                  Department Of Computer Science and Engineering
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FindSimilarAssistant;
