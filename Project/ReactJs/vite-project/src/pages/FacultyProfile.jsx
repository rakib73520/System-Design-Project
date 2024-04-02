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
import axios from "axios";

const FacultyProfile = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);

  useEffect(() => {
    if (facultydata.access == "no") {
      navigate("/");
    }
  }, []);

  const [assistantIsClicked, setAssistantIsClicked] = useState(false);
  const [researchIsClicked, setResearchIsClicked] = useState(false);
  const [updateIsClicked, setUpdateIsClicked] = useState(false);
  const [careerIsClicked, setCareerIsClicked] = useState(false);

  const [facultyapplication, setFacultyApplication] = useState([]);

  useEffect(() => {
    const getFacultyApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myfacultyapplication/${facultydata.email}`
        );
        setFacultyApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getFacultyApplication();
  }, []);

  const handleWebsite = () => {
    window.location.href = `https://${facultydata.website}`;
  };
  const handleGithub = () => {
    window.location.href = `https://${facultydata.github}`;
  };
  const handleLinkedin = () => {
    window.location.href = `https://${facultydata.linkedin}`;
  };

  const handleDropClick = () => {
    setAssistantIsClicked(!assistantIsClicked);
  };
  const handleDropClick1 = () => {
    setResearchIsClicked(!researchIsClicked);
  };
  const handleDropClick2 = (event) => {
    event.preventDefault();
    setUpdateIsClicked(!updateIsClicked);
  };
  const handleDropClick3 = () => {
    setCareerIsClicked(!careerIsClicked);
  };

  const [isDirSearch, setIsDirSearch] = useState(false);
  const [isMemSearch, setIsMemSearch] = useState(false);

  const handledirsearch = () => {
    setIsDirSearch(!isDirSearch);
  };

  return (
    <div>
      <div className={style.profile}>
        <div className={style.headerbutton}>
          <button className={style.btnback} onClick={() => navigate(-1)}>
            Back
          </button>
          <button
            className={style.btnedit}
            onClick={() =>
              navigate("/facultydashboard/facultyprofile/facultyprofileupdate")
            }
          >
            Edit
          </button>
        </div>
        <div className={style.content}>
          <div className={style.div1}>
            <div className={style.div11}>
              <img src={`${domain}/${facultydata.image}`} alt="" />
              <h2>{facultydata.fullname}</h2>
              <h3>{facultydata.facultytype} At UIU</h3>
              <p>{facultydata.bio}</p>
            </div>
          </div>
          <div className={style.div2}>
            <div className={style.div21}>
              <h3>User Information</h3>
              <div className={style.div21info}>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Email</h4>
                  <h4 className={style.infodata2}>{facultydata.email}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Gender</h4>
                  <h4 className={style.infodata2}>{facultydata.gender}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Department</h4>
                  <h4 className={style.infodata2}>{facultydata.department}</h4>
                </div>

                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Website</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={facultydata.website ? handleWebsite : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Github</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={facultydata.github ? handleGithub : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Linkedin</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={facultydata.linkedin ? handleLinkedin : ""}
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

export default FacultyProfile;
