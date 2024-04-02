import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import FacultyHeaderPrev from "../components/FacultyHeaderPrev";
import FacultyHeaderNext from "../components/FacultyHeaderNext";
import style from "./../assets/css/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyDashboard = () => {
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
  const [isMyPostedClicked, setIsMyPostedClicked] = useState(false);
  const [isJobDept, setIsJobDept] = useState("");
  const [isJobDeleted, setIsJobDeleted] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      facultydata.access = "no";
      const updatedfacultydata = JSON.stringify(facultydata);
      localStorage.setItem("faculty", updatedfacultydata);
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
        } else if (isMyPostedClicked) {
          const response = await axios.get(
            `${domain}/api/mypostedjob/${facultydata.id}`
          );
          setJobData(response.data);
        } else {
          const response = await axios.get(`${domain}/api/postedjob/`);
          setJobData(response.data);
        }
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getJobData();
  }, [isJobDept, isMyPostedClicked, isJobDeleted]);

  const [expandStates, setExpandStates] = useState(jobData.map(() => false));

  const toggleReadMore = (index) => {
    const newExpandStates = [...expandStates];
    newExpandStates[index] = !newExpandStates[index];
    setExpandStates(newExpandStates);
  };

  const handlePostDelete = async (jobid) => {
    console.log("i am here");
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      try {
        await axios.delete(`${domain}/api/postedjob/${jobid}`);
        setIsJobDeleted(true);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  const handleWebsite = (link) => {
    window.location.href = `https://${link}`;
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
      <FacultyHeaderPrev />
      <FacultyHeaderNext
        setIsMyPostedClicked={setIsMyPostedClicked}
        setIsJobDept={setIsJobDept}
      />
      <div className={style.headerheading}>
        <div>
          <h1>Recommended Job Opportunities</h1>
          <h4>{isJobDept ? isJobDept : "Explore recently posted jobs"}</h4>
        </div>
        <button
          onClick={() => navigate("/facultydashboard/facultypostjob")}
          className={style.mypostedbtn}
        >
          Post A Job
        </button>
      </div>
      <div className={style.outermost}>
        {isMyPostedClicked && jobData.length > 0 ? (
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
                <div className={style.edit}>
                  <FontAwesomeIcon
                    className={style.editicon}
                    icon={faEdit}
                    onClick={() =>
                      navigate("/facultydashboard/facultyupdatepostedjob", {
                        state: {
                          id: item.id,
                          jobtitle: item.jobtitle,
                          sitelink: item.sitelink,
                          description: item.description,
                          image: item.image,
                        },
                      })
                    }
                  />
                  <FontAwesomeIcon
                    className={style.deleteicon}
                    icon={faTrash}
                    onClick={() => handlePostDelete(item.id)}
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
        ) : isMyPostedClicked && jobData.length === 0 ? (
          <div>
            <h3 className={style.jobnotfound}>
              You haven't posted any jobs yet
            </h3>
          </div>
        ) : isJobDept && jobData.length > 0 ? (
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
                <div className={style.edit} style={{ visibility: "hidden" }}>
                  <FontAwesomeIcon className={style.editicon} icon={faEdit} />
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
                <div className={style.edit} style={{ visibility: "hidden" }}>
                  <FontAwesomeIcon className={style.editicon} icon={faEdit} />
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
      <Footer />
    </div>
  );
};

export default FacultyDashboard;
