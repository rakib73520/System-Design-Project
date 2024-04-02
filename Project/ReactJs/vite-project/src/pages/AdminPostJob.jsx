import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminPostJob.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faClipboardList,
  faImage,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AdminPostJobHeader from "../components/AdminPostJobHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPostJob = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);

  useEffect(() => {
    if (admindata.access == "no") {
      navigate("/");
    }
  }, []);

  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      admindata.access = "no";
      const updatedadmindata = JSON.stringify(admindata);
      localStorage.setItem("admin", updatedadmindata);
      navigate("/");
    }
  }, [logoutClick]);

  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const [isMyPostedClicked, setIsMyPostedClicked] = useState(false);
  const [isJobDept, setIsJobDept] = useState("");
  const [isJobDeleted, setIsJobDeleted] = useState(false);

  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setIsMyPostedClicked(false);
    setIsJobDept("");
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setIsMyPostedClicked(true);
    setIsJobDept("");
  };
  const handleCse = () => {
    setIsJobDept("Computer Science And Engineering");
    setIsMyPostedClicked(false);
  };
  const handleEee = () => {
    setIsJobDept("Electrical And Electronics Engineering");
    setIsMyPostedClicked(false);
  };
  const handleCe = () => {
    setIsJobDept("Civil Engineering");
    setIsMyPostedClicked(false);
  };

  const [jobTitle, setJobTitle] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("none");

  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    setImage(fileInput.files[0]);
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

  const handleWebsite = (link) => {
    window.location.href = `https://${link}`;
  };

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
            `${domain}/api/mypostedjob/${admindata.id}`
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
  }, [isJobDept, isMyPostedClicked, isJobDeleted, error]);

  useEffect(() => {
    setError(error);
    const createJob = async () => {
      let jobdata = new FormData();
      jobdata.append("jobtitle", jobTitle);
      if (siteLink) {
        jobdata.append("sitelink", siteLink);
      }
      jobdata.append("description", description);
      jobdata.append("username", "UIU");
      jobdata.append("usertype", "DEPARTMENT PROFILE");
      if (admindata.department == "Computer Science And Engineering") {
        jobdata.append("userposition", "CSE");
      } else if (
        admindata.department == "Electrical And Electronics Engineering"
      ) {
        jobdata.append("userposition", "EEE");
      } else {
        jobdata.append("userposition", "CE");
      }
      jobdata.append("userid", admindata.id);
      jobdata.append("userimage", admindata.image);
      jobdata.append("department", admindata.department);
      if (image) {
        jobdata.append("image", image);
      }

      try {
        await axios.post(`${domain}/api/postedjob/`, jobdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setError("Job Posted Successfully");
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    if (error == "Posting...") {
      createJob();
    }
  }, [error]);

  const handlePostJob = async (event) => {
    event.preventDefault();
    if (jobTitle == "" && description == "") {
      setError("Job Title & Description Field Is Required!");
    } else if (jobTitle == "") {
      setError("Job Title Field Is Required!");
    } else if (description == "") {
      setError("Description Field Is Required!");
    } else {
      setError("Posting...");
    }
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

  return (
    <div className={style.studentappbody}>
      <AdminPostJobHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "rgb(190, 189, 189)" }}
            className={style.studenticon}
            icon={faPaperPlane}
          />
          <h2>Post A Job</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Job Posted Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Posting..."
                ? {}
                : {}
            }
          >
            <p className={style.errormsg}>{error}</p>
          </div>
          <form
            className={style.eventcreate}
            action=""
            onSubmit={handlePostJob}
          >
            <div className={style.eventcreate1}>
              <h4>Job Title</h4>
              <input
                type="text"
                placeholder="Write Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className={style.eventcreate2}>
              <h4>Site Link</h4>
              <input
                type="text"
                placeholder="Write Title"
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
              />
            </div>
            <div className={style.eventcreate3}>
              <h4>Description</h4>
              <textarea
                type="text"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={style.eventcreate4}>
              <h4>Image</h4>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={updateFileName}
              />
              <label htmlFor="fileInput" className={style.eventcreate4vis}>
                <FontAwesomeIcon className={style.imgicon} icon={faImage} />
                <h4>Add Image</h4>
              </label>
            </div>
            <div className={style.eventcreate5}>
              <span id="fileName">No file chosen</span>
            </div>
            <button type="submit" className={style.create}>
              Post
            </button>
          </form>
        </div>
      </div>
      <div className={style.report2}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "gray" }}
            className={style.studenticon}
            icon={faClipboardList}
          />
          <h2>Manage Posted Job</h2>
          <div className={style.headerimg1}>
            <div className={style.headerimg1first}>
              <button
                onClick={handleClick1}
                className={isClicked ? style.headerimg1b1 : style.b1not}
              >
                All Posted Jobs
              </button>
              <div className={style.dropbutton}>
                <button onClick={handleCse}>CSE</button>
                <button onClick={handleEee}>EEE</button>
                <button onClick={handleCe}>CE</button>
              </div>
            </div>
            <button
              onClick={handleClick2}
              className={isClicked1 ? style.headerimg1b2 : style.b2not}
            >
              My Posted Jobs
            </button>
          </div>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div className={style.headerheading}>
            <div>
              <h1>Recent Posted Jobs</h1>
              <h4>
                {isJobDept
                  ? isJobDept
                  : isMyPostedClicked
                  ? "My posted jobs"
                  : ""}
              </h4>
            </div>
          </div>
          <div className={style.infobody1}>
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
                      <p className={style.jobinfodetails}>{item.description}</p>
                      <h5 className={style.jobinfovisit}>Visit Here</h5>
                      <p className={style.jobinfolink} style={{cursor:'pointer'}} onClick={()=>item.sitelink ? handleWebsite(`${item.sitelink}`) : ""}>
                        Click to visit recruitment site
                      </p>
                    </div>
                    <div className={style.editpost}>
                      <FontAwesomeIcon
                        className={style.editicon}
                        icon={faPen}
                        onClick={() =>
                          navigate(
                            "/admindashboard/adminpostjob/admineditpostedjob",
                            {
                              state: {
                                id: item.id,
                                jobtitle: item.jobtitle,
                                sitelink: item.sitelink,
                                description: item.description,
                                image: item.image,
                              },
                            }
                          )
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
              <div className={style.notshow}>
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
                      <p className={style.jobinfodetails}>{item.description}</p>
                      <h5 className={style.jobinfovisit}>Visit Here</h5>
                      <p className={style.jobinfolink} style={{cursor:'pointer'}} onClick={()=>item.sitelink ? handleWebsite(`${item.sitelink}`) : ""}>
                        Click to visit recruitment site
                      </p>
                    </div>
                    <div
                      className={style.editpost}
                      style={{ visibility: "hidden" }}
                    >
                      <FontAwesomeIcon
                        className={style.editicon}
                        icon={faPen}
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
              <div className={style.notshow}>
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
                      <p className={style.jobinfodetails}>{item.description}</p>
                      <h5 className={style.jobinfovisit}>Visit Here</h5>
                      <p className={style.jobinfolink} style={{cursor:'pointer'}} onClick={()=>item.sitelink ? handleWebsite(`${item.sitelink}`) : ""}>
                        Click to visit recruitment site
                      </p>
                    </div>
                    <div
                      className={style.editpost}
                      style={{ visibility: "hidden" }}
                    >
                      <FontAwesomeIcon
                        className={style.editicon}
                        icon={faPen}
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
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminPostJob;
