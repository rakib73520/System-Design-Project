import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderPrev from "../components/HeaderPrev";
import StudentHeaderNext from "../components/StudentHeaderNext";
import style from "./../assets/css/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  const [isRecentClicked, setIsRecentClicked] = useState(false);

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    } else if (locationdata.state != null) {
      if (locationdata.state.goapply == "ok") {
        setIsRecentClicked(true);
        navigate(location.pathname, { replace: true });
      }
    }
  }, []);

  const [bellClick, setBellClick] = useState(0);
  const [searchClick, setSearchClick] = useState(0);
  const [logoutClick, setLogoutClick] = useState(false);
  const [isJobDept, setIsJobDept] = useState("");

  useEffect(() => {
    if (logoutClick) {
      studentdata.access = "no";
      const updatedstudentdata = JSON.stringify(studentdata);
      localStorage.setItem("student", updatedstudentdata);
      navigate("/");
    }
  }, [logoutClick]);

  const descriptionRef = useRef(null);
  useEffect(() => {
    if (descriptionRef.current) {
      setShowMore(
        descriptionRef.current.scrollHeight !==
          descriptionRef.current.clientHeight
      );
    }
  }, []);

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    const getJobData = async () => {
      try {
        if (isJobDept) {
          const response = await axios.get(
            `${domain}/api/departmentpostedjob/${isJobDept}`
          );
          setJobData(response.data);
        } else {
          const response = await axios.get(`${domain}/api/postedjob/`);
          setJobData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getJobData();
  }, [isJobDept]);

  const [expandStates, setExpandStates] = useState(jobData.map(() => false));

  const toggleReadMore = (index) => {
    const newExpandStates = [...expandStates];
    newExpandStates[index] = !newExpandStates[index];
    setExpandStates(newExpandStates);
  };

  const handleWebsite = (link) => {
    window.location.href = `https://${link}`;
  };

  // recruitment code

  const [underGraduate, setUnderGraduate] = useState([]);
  const [grader, setGrader] = useState([]);

  useEffect(() => {
    const getRecruitment = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/recruitmentshow/Undergraduate Assistant`
        );
        const response1 = await axios.get(
          `${domain}/api/recruitmentshow/Grader`
        );
        setUnderGraduate(response.data);
        setGrader(response1.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getRecruitment();
  }, []);

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
      <HeaderPrev />
      <StudentHeaderNext
        setIsRecentClicked={setIsRecentClicked}
        isRecentClicked={isRecentClicked}
        setIsJobDept={setIsJobDept}
      />
      {isRecentClicked ? (
        <div>
          <div className={style.headerheadingrec}>
            <h1>Recent Recruitments</h1>
          </div>
          <div className={style.recruitmentbody}>
            <h3>Undergraduate Assistant (UA) Recruitment for FALL 2023</h3>
            {underGraduate.map((item, index) => (
              <div className={style.body1}>
                <div className={style.row2}>
                  <div className={style.row21}>
                    <h4 className={style.dept}>{item.department}</h4>
                    <h4>Job Responsibilities</h4>
                    <p>Assisting the course teacher.</p>
                    <p>Leading discussion.</p>
                    <p>Grading assignments.</p>
                    <p>Assisting with course preparation.</p>
                    <p>Providing feedback and guidance.</p>
                    <p>Assisting with administrative task.</p>
                    <h4>Requirements</h4>
                    <p>Obtained grade for applied courses: {item.point}</p>
                    <p>Minimum CGPA required to apply: {item.cgpa}</p>
                    <p>Minimum credits to be completed: {item.credit}</p>
                  </div>
                  <div className={style.row23}>
                    <h4>Recruitment Description</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className={style.row22}>
                    <button
                      className={style.applybtn}
                      onClick={() =>
                        navigate("/studentdashboard/studentassistantapply", {
                          state: {
                            department: item.department,
                            type: item.type,
                            trimester: item.trimester,
                          },
                        })
                      }
                    >
                      Apply
                    </button>
                    <div className={style.row222}>
                      <h5>Deadline</h5>
                      <p>{item.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={style.recruitmentbody1}>
            <h3>Grader Recruitment for FALL 2023</h3>
            {grader.map((item, index) => (
              <div className={style.body1}>
                <div className={style.row2}>
                  <div className={style.row21}>
                    <h4 className={style.dept}>{item.department}</h4>
                    <h4>Job Responsibilities</h4>
                    <p>Assisting the course teacher.</p>
                    <p>Leading discussion.</p>
                    <p>Grading assignments.</p>
                    <p>Assisting with course preparation.</p>
                    <p>Providing feedback and guidance.</p>
                    <p>Assisting with administrative task.</p>
                    <h4>Requirements</h4>
                    <p>Obtained grade for applied courses: {item.point}</p>
                    <p>Minimum CGPA required to apply: {item.cgpa}</p>
                    <p>Minimum credits to be completed: {item.credit}</p>
                  </div>
                  <div className={style.row23}>
                    <h4>Recruitment Description</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className={style.row22}>
                    <button
                      className={style.applybtn}
                      onClick={() =>
                        navigate("/studentdashboard/studentassistantapply", {
                          state: {
                            department: item.department,
                            type: item.type,
                            trimester: item.trimester,
                          },
                        })
                      }
                    >
                      Apply
                    </button>
                    <div className={style.row222}>
                      <h5>Deadline</h5>
                      <p>{item.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={style.headerheading}>
            <div>
              <h1>Recommended Job Opportunities</h1>
              <h4>{isJobDept ? isJobDept : "Explore recently posted jobs"}</h4>
            </div>
          </div>
          <div className={style.outermost}>
            {isJobDept && jobData.length > 0 ? (
              jobData.map((item, index) => (
                <div>
                  <div className={style.headerjob}>
                    <img
                      className={style.headerjobimg1}
                      src={`${domain}${item.userimage}`}
                      alt=""
                    />
                    <div className={style.headerjobinfo}>
                      <h4 className={style.jobinfofname}>{item.username} onClick={() =>
                  item.username != "UIU" ? navigate("/viewfacultyprofile", { state: { id: item.userid } }) : {}
                }</h4>
                      <h5 className={style.jobinfofstatus}>
                        {item.usertype} | {item.userposition}
                      </h5>
                      <p className={style.jobinfopostdate}>
                        posted on {item.datetime.substring(0, 10)} at{" "}
                        {item.datetime.substring(11, 19)}
                      </p>
                      <h5 className={style.jobinfojobtitle}>Job Title</h5>
                      <p className={style.jobinfoposition}>{item.jobtitle}</p>
                      <h5 className={style.jobinfodescription}>Description</h5>
                      <p className={style.jobinfodetails}>
                        {expandStates[index]
                          ? item.description
                          : `${item.description.slice(0, 300)}`}
                      </p>
                      <div className={style.readmore}>
                        {item.description.length > 300 && (
                          <span>
                            {expandStates[index] ? "Read Less" : "Read More"}
                          </span>
                        )}
                        {item.description.length > 300 && (
                          <FontAwesomeIcon
                            onClick={() => toggleReadMore(index)}
                            className={style.readicon}
                            icon={
                              expandStates[index]
                                ? faArrowCircleLeft
                                : faArrowCircleRight
                            }
                          />
                        )}
                      </div>
                      <h5 className={style.jobinfovisit}>Visit Here</h5>
                      <p className={style.jobinfolink} style={{cursor:'pointer'}} onClick={()=>item.sitelink ? handleWebsite(`${item.sitelink}`) : ""}>
                        Click to visit recruitment site
                      </p>
                    </div>
                    <div
                      className={style.edit}
                      style={{ visibility: "hidden" }}
                    >
                      <FontAwesomeIcon
                        className={style.editicon}
                        icon={faEdit}
                      />
                      <FontAwesomeIcon
                        className={style.deleteicon}
                        icon={faTrash}
                      />
                    </div>
                    <img
                      className={style.headerjobimg2}
                      src={`${domain}/${item.image}`}
                      alt=""
                    />
                  </div>

                  <br />
                  <hr className={style.grayline} />
                </div>
              ))
            ) : isJobDept && jobData.length === 0 ? (
              <div>
                <h3 className={style.jobnotfound}>
                  No Posted Job From {isJobDept}
                </h3>
              </div>
            ) : (
              jobData.map((item, index) => (
                <div>
                  <div className={style.headerjob}>
                    <img
                      className={style.headerjobimg1}
                      src={`${domain}${item.userimage}`}
                      alt=""
                    />
                    <div className={style.headerjobinfo}>
                      <h4 className={style.jobinfofname} onClick={() =>
                  item.username != "UIU" ? navigate("/viewfacultyprofile", { state: { id: item.userid } }) : {}
                }>{item.username}</h4>
                      <h5 className={style.jobinfofstatus}>
                        {item.usertype} | {item.userposition}
                      </h5>
                      <p className={style.jobinfopostdate}>
                        posted on {item.datetime.substring(0, 10)} at{" "}
                        {item.datetime.substring(11, 19)}
                      </p>
                      <h5 className={style.jobinfojobtitle}>Job Title</h5>
                      <p className={style.jobinfoposition}>{item.jobtitle}</p>
                      <h5 className={style.jobinfodescription}>Description</h5>
                      <p className={style.jobinfodetails}>
                        {expandStates[index]
                          ? item.description
                          : `${item.description.slice(0, 300)}`}
                      </p>
                      <div className={style.readmore}>
                        {item.description.length > 300 && (
                          <span>
                            {expandStates[index] ? "Read Less" : "Read More"}
                          </span>
                        )}
                        {item.description.length > 300 && (
                          <FontAwesomeIcon
                            onClick={() => toggleReadMore(index)}
                            className={style.readicon}
                            icon={
                              expandStates[index]
                                ? faArrowCircleLeft
                                : faArrowCircleRight
                            }
                          />
                        )}
                      </div>
                      <h5 className={style.jobinfovisit}>Visit Here</h5>
                      <p className={style.jobinfolink} style={{cursor:'pointer'}} onClick={()=>item.sitelink ? handleWebsite(`${item.sitelink}`) : ""}>
                        Click to visit recruitment site
                      </p>
                    </div>
                    <div
                      className={style.edit}
                      style={{ visibility: "hidden" }}
                    >
                      <FontAwesomeIcon
                        className={style.editicon}
                        icon={faEdit}
                      />
                      <FontAwesomeIcon
                        className={style.deleteicon}
                        icon={faTrash}
                      />
                    </div>
                    <img
                      className={style.headerjobimg2}
                      src={`${domain}/${item.image}`}
                      alt=""
                    />
                  </div>

                  <br />
                  <hr className={style.grayline} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StudentDashboard;
