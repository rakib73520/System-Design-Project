import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/StudentProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCircleChevronDown,
  faArrowRight,
  faDeleteLeft,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewFacultyProfile = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const locationdata = useLocation();
  const [assistantIsClicked, setAssistantIsClicked] = useState(false);

  const [user, setUser] = useState([]);
  const [facultyapplication, setFacultyApplication] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/facultyuser/${locationdata.state.id}/`
        );
        const response1 = await axios.get(
            `${domain}/api/myfacultyapp/${locationdata.state.id}/`
          );
        setUser(response.data);
        setFacultyApplication(response1.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (locationdata.state.id) {
      getUserData();
    }
  }, []);

  const handleWebsite = (website) => {
    window.location.href = `https://${website}`;
  };
  const handleGithub = (github) => {
    window.location.href = `https://${github}`;
  };
  const handleLinkedin = (linkedin) => {
    window.location.href = `https://${linkedin}`;
  };

  const handleDropClick = () => {
    setAssistantIsClicked(!assistantIsClicked);
  };

  return (
    <div>
      <div className={style.profile}>
        <div className={style.headerbutton}>
          <button className={style.btnback} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className={style.content}>
          <div className={style.div1}>
            <div className={style.div11}>
              <img src={`${domain}/${user.image}`} alt="" />
              <h2>{user.fullname}</h2>
              <h3>{user.facultytype} At UIU</h3>
              <p>{user.bio}</p>
            </div>
          </div>
          <div className={style.div2}>
            <div className={style.div21}>
              <h3>User Information</h3>
              <div className={style.div21info}>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Email</h4>
                  <h4 className={style.infodata2}>{user.email}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Gender</h4>
                  <h4 className={style.infodata2}>{user.gender}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Department</h4>
                  <h4 className={style.infodata2}>{user.department}</h4>
                </div>

                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Website</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={()=>user.website ? handleWebsite(`${user.website}`) : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Github</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={()=>user.github ? handleGithub(`${user.github}`) : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Linkedin</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={()=>user.linkedin ? handleLinkedin(`${user.linkedin}`) : ""}
                  />
                </div>
              </div>
            </div>
            <div className={style.div22}>
              <div className={style.div22heading}>
                <h3>Current Courses</h3>
                <FontAwesomeIcon
                  onClick={handleDropClick}
                  className={style.dropicon}
                  icon={faCircleChevronDown}
                  style={{ position: "relative", left: "655px" }}
                />
              </div>
              {facultyapplication.map((item, index) => (
                <div
                  style={{ display: assistantIsClicked ? "" : "none" }}
                  className={style.div22body}
                >
                  <h4>
                    {item.coursename} ({item.section}) ({item.classtime}) (
                    {item.day})
                  </h4>

                  <hr className={style.bodyhr} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFacultyProfile;
