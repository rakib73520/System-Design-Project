import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/StudentProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewStudentProfile = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const locationdata = useLocation();

  const [assistantIsClicked, setAssistantIsClicked] = useState(false);
  const [careerIsClicked, setCareerIsClicked] = useState(false);

  const [user, setUser] = useState([]);
  const [myCareer, setMyCareer] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [association, setAssociation] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response1 = await axios.get(
          `${domain}/api/myassociation/${locationdata.state.id}/`
        );
        const response2 = await axios.get(
          `${domain}/api/myskills/${locationdata.state.id}/`
        );
        const response3 = await axios.get(
          `${domain}/api/mycareer/${locationdata.state.id}/`
        );
        const response = await axios.get(
          `${domain}/api/studentuser/${locationdata.state.id}/`
        );
        setUser(response.data);
        setAssociation(response1.data);
        setMySkills(response2.data);
        setMyCareer(response3.data);
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

  const handleDropClick3 = () => {
    setCareerIsClicked(!careerIsClicked);
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
              <h3>{user.alumni === 2 ? "Alumni" : "Student"} At UIU</h3>
              {user.company !== "" && user.position !== "" ? (
                <span className={style.pos}>
                  {user.position} At {user.company}
                </span>
              ) : (
                <span className={style.pos}></span>
              )}
              <p>{user.bio}</p>
            </div>
            <h2 style={{ marginLeft: "33px" }}>Skills</h2>
            <div className={style.div12}>
              {mySkills.map((item, index) => (
                <div className={style.skill}>
                  <h4>{item.skillname}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className={style.div2}>
            <div className={style.div21}>
              <h3>User Information</h3>
              <div className={style.div21info}>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Student ID</h4>
                  <h4 className={style.infodata2}>{user.studentid}</h4>
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
                  <h4 className={style.infodata1}>CGPA</h4>
                  <h4 className={style.infodata2}>{user.cgpa}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Completed Credit</h4>
                  <h4 className={style.infodata2}>{user.completedcredit}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Email</h4>
                  <h4 className={style.infodata2}>{user.email}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Website</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={() =>
                      item.website ? handleWebsite(`${user.website}`) : ""
                    }
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Github</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={() =>
                      item.github ? handleGithub(`${user.github}`) : ""
                    }
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Linkedin</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={() =>
                      item.linkedin ? handleLinkedin(`${user.linkedin}`) : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className={style.div22}>
              <div className={style.div22heading}>
                <h3>Academic Assistant Status</h3>
                <FontAwesomeIcon
                  onClick={handleDropClick}
                  className={style.dropicon}
                  icon={faCircleChevronDown}
                />
              </div>
              {association.map((item, index) => (
                <div
                  style={{ display: assistantIsClicked ? "" : "none" }}
                  className={style.div22body}
                >
                  <h4>
                    {item.type} Of {item.coursename}({item.section}){" "}
                  </h4>
                  <p>Department Of {item.department}</p>
                  <hr className={style.bodyhr} />
                </div>
              ))}
            </div>
            <div className={style.div24}>
              <div className={style.div24heading}>
                <h3>Career Update</h3>
                <FontAwesomeIcon
                  onClick={handleDropClick3}
                  className={style.dropicon}
                  icon={faCircleChevronDown}
                />
              </div>
              <div
                style={{ display: careerIsClicked ? "" : "none" }}
                className={style.div24body}
              >
                {myCareer.map((item, index) => (
                  <div>
                    <div className={style.d24first}>
                      <div>
                        <h4>
                          {item.position} At {item.company}
                        </h4>
                        <p>updated on {item.postdate} </p>
                      </div>
                    </div>
                    <hr className={style.bodyhr} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentProfile;
