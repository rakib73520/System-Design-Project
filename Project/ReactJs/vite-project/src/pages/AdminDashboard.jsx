import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPaperPlane,
  faComments,
  faNewspaper,
  faAddressCard,
  faUserTie,
  faSearch,
  faUserCheck,
  faUserPen,
  faChalkboardTeacher,
  faCommentsDollar,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
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

  const initialCounts = {
    student_application: 0,
    faculty_application: 0,
    funding_application: 0,
    ua: 0,
    grader: 0,
    alumni_request: 0,
  };

  const [numberCounts, setNumberCounts] = useState(initialCounts);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchLiveNumberCounts = async () => {
      try {
        const facultyapp = await axios.get(
          `${domain}/api/facultyapplicationdept/${admindata.department}`
        );
        const studentapp = await axios.get(
          `${domain}/api/studentapplicationdept/${admindata.department}`
        );
        const ua = await axios.get(
          `${domain}/api/assistant/${
            admindata.department
          }/${"Undergraduate Assistant"}/`
        );
        const grader = await axios.get(
          `${domain}/api/assistant/${admindata.department}/${"Grader"}/`
        );
        const alumnireq = await axios.get(
          `${domain}/api/alumnirequest/${admindata.department}/`
        );
        const fetchedNumberCounts = {
          student_application: studentapp.data.length,
          faculty_application: facultyapp.data.length,
          // funding_application: 25,
          ua: ua.data.length,
          grader: grader.data.length,
          alumni_request: alumnireq.data.length,
        };

        const updateNumberCountsPromises = Object.keys(fetchedNumberCounts).map(
          async (key) => {
            const endNumberCount = fetchedNumberCounts[key];
            return new Promise(async (resolve) => {
              for (let i = 0; i <= endNumberCount; i++) {
                await delay(40);
                setNumberCounts((prevNumberCounts) => ({
                  ...prevNumberCounts,
                  [key]: i,
                }));
              }
              resolve();
            });
          }
        );

        await Promise.all(updateNumberCountsPromises);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };

    fetchLiveNumberCounts();
  }, []);

  const [reportList, setReportList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(0);
  const [name, setName] = useState("");
  const [action, setAction] = useState(0);

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await axios.get(`${domain}/api/report/`);
        setReportList(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getReport();
  }, [action]);

  useEffect(() => {
    const searchReport = async () => {
      try {
        const response = await axios.get(`${domain}/api/reportsearch/${name}/`);
        setSearchResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (name != "") {
      searchReport();
    }
  }, [isSearch]);

  const handleSearch = () => {
    setIsSearch(isSearch + 1);
  };

  const handleAction = async (id) => {
    try {
      await axios.get(`${domain}/api/reportaction/${id}/`);
      setAction(action + 1);
      alert("Reported");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  const handleIgnore = async (id) => {
    try {
      await axios.get(`${domain}/api/reportignore/${id}/`);
      setAction(action + 1);
      alert("Ignored");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  const handleAbort = async (id) => {
    try {
      await axios.get(`${domain}/api/reportabort/${id}/`);
      setAction(action + 1);
      alert("User Account Restored!");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div>
      <AdminHeader setLogoutClick={setLogoutClick} />
      <div className={style.adminbody}>
        <div className={style.control}>
          <div className={style.controlfirst}>
            <div
              className={style.studentapplication}
              onClick={() =>
                navigate("/admindashboard/adminstudentapplication")
              }
            >
              <h2>Student Application</h2>
              <FontAwesomeIcon
                className={style.studentapplicationicon}
                icon={faUserTie}
              />
              <div className={style.studentapplicationcount}>
                <h2>{numberCounts.student_application}</h2>
              </div>
            </div>
            <div
              className={style.facultyapplication}
              onClick={() =>
                navigate("/admindashboard/adminfacultyapplication")
              }
            >
              <h2>Faculty Application</h2>
              <FontAwesomeIcon
                className={style.facultyapplicationicon}
                icon={faChalkboardTeacher}
              />
              <div className={style.facultyapplicationcount}>
                <h2>{numberCounts.faculty_application}</h2>
              </div>
            </div>

            <div
              className={style.alumnievent}
              onClick={() => navigate("/admindashboard/adminalumnievent")}
            >
              <h2>Alumni Event</h2>
              <FontAwesomeIcon className={style.eventicon} icon={faNewspaper} />
            </div>
            <div
              className={style.ua}
              onClick={() =>
                navigate("/admindashboard/adminundergraduateassistant")
              }
            >
              <h2>Undergraduate Assistnat</h2>
              <FontAwesomeIcon className={style.uaicon} icon={faUserPen} />
              <div className={style.gradercount}>
                <h2>{numberCounts.ua}</h2>
              </div>
            </div>
            <div
              className={style.grader}
              onClick={() => navigate("/admindashboard/admingrader")}
            >
              <h2>Grader</h2>
              <FontAwesomeIcon
                className={style.gradericon}
                icon={faUserCheck}
              />
              <div className={style.gradercount}>
                <h2>{numberCounts.grader}</h2>
              </div>
            </div>
            <div
              className={style.alumnirequest}
              onClick={() => navigate("/admindashboard/adminalumnirequest")}
            >
              <h2>Alumni Request</h2>
              <FontAwesomeIcon
                className={style.requesticon}
                icon={faGraduationCap}
              />
              <div className={style.alumnirequestcount}>
                <h2>{numberCounts.alumni_request}</h2>
              </div>
            </div>
          </div>
          <div className={style.controlsecond}>
            <div
              className={style.postjob}
              onClick={() => navigate("/admindashboard/adminpostjob")}
            >
              <FontAwesomeIcon
                className={style.postjobicon}
                icon={faPaperPlane}
              />
              <h2>Post A Job</h2>
            </div>
            <div
              className={style.postjob}
              style={{ position: "relative", bottom: "180px" }}
              onClick={() => navigate("/admindashboard/adminrecruitment")}
            >
              <FontAwesomeIcon
                className={style.recruitmenticon}
                icon={faAddressCard}
              />
              <div className={style.recruitmenttitle}>
                <h2 className={style.title1}>Assistant</h2>
                <h2 className={style.title2}>Recruitment</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={style.report}>
          <div className={style.reportheading}>
            <FontAwesomeIcon className={style.commenticon} icon={faComments} />
            <h2>Review Reports</h2>
            <input
              type="text"
              placeholder="Search User"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FontAwesomeIcon
              className={style.searchicon}
              icon={faSearch}
              onClick={handleSearch}
            />
          </div>
          <hr />
          <div className={style.reportinfo}>
            <div className={style.infoheader}>
              <h3>User</h3>
              <h3>Report Messege</h3>
              <h3>Action</h3>
            </div>
            <div className={style.infobody}>
              {isSearch > 0
                ? searchResult.map((item, index) => (
                    <div className={style.bodyrow}>
                      <div className={style.row1}>
                        <div className={style.row1first}>
                          <img
                            src={`${domain}/media/${item.reporterimage}`}
                            alt=""
                          />
                          <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.reporterid } })
                }>{item.reportername}</h4>
                        </div>
                        <span>
                          reported against this user{" "}
                          <FontAwesomeIcon
                            className={style.pointicon}
                            icon={faHandPointDown}
                          />
                        </span>
                        <div className={style.row1second}>
                          <img
                            src={`${domain}/media/${item.reportedimage}`}
                            alt=""
                          />
                          <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.reportedid } })
                }>{item.reportedname}</h4>
                        </div>
                      </div>
                      <div className={style.row2}>
                        <p>{item.messege} </p>
                      </div>
                      {item.status != "blocked" ? (
                        <div className={style.row3}>
                          <button
                            className={style.takeactionbtn}
                            onClick={() => handleAction(`${item.id}`)}
                          >
                            Take Action
                          </button>
                          <button
                            className={style.ignorebtn}
                            onClick={() => handleIgnore(`${item.id}`)}
                          >
                            Ignore
                          </button>
                        </div>
                      ) : (
                        <div className={style.row3abort}>
                          <button
                            className={style.ignorebtn}
                            onClick={() => handleAbort(`${item.id}`)}
                          >
                            Abort Action
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                : reportList.map((item, index) => (
                    <div className={style.bodyrow}>
                      <div className={style.row1}>
                        <div className={style.row1first}>
                          <img
                            src={`${domain}/media/${item.reporterimage}`}
                            alt=""
                          />
                          <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.reporterid } })
                }>{item.reportername}</h4>
                        </div>
                        <span>
                          reported against this user{" "}
                          <FontAwesomeIcon
                            className={style.pointicon}
                            icon={faHandPointDown}
                          />
                        </span>
                        <div className={style.row1second}>
                          <img
                            src={`${domain}/media/${item.reportedimage}`}
                            alt=""
                          />
                          <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.reportedid } })
                }>{item.reportedname}</h4>
                        </div>
                      </div>
                      <div className={style.row2}>
                        <p>{item.messege} </p>
                      </div>
                      {item.status != "blocked" ? (
                        <div className={style.row3}>
                          <button
                            className={style.takeactionbtn}
                            onClick={() => handleAction(`${item.id}`)}
                          >
                            Take Action
                          </button>
                          <button
                            className={style.ignorebtn}
                            onClick={() => handleIgnore(`${item.id}`)}
                          >
                            Ignore
                          </button>
                        </div>
                      ) : (
                        <div className={style.row3abort}>
                          <button
                            className={style.ignorebtn}
                            onClick={() => handleAbort(`${item.id}`)}
                          >
                            Abort Action
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
