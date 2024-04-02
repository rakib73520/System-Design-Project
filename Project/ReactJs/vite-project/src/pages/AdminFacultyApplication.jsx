import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminFacultyApplication.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import AdminFacultyApplicationHeader from "../components/AdminFacultyApplicationHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminFacultyApplication = () => {
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

  const [facultyapplication, setFacultyApplication] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const getFacultyApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/facultyapplicationdept/${admindata.department}`
        );
        setFacultyApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getFacultyApplication();
  }, []);

  useEffect(() => {
    const searchFacultyApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/facultyapplicationsearch/${name}/`
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (name != "") {
      searchFacultyApplication();
    }
  }, [isSearch]);

  const handleSearch = () => {
    setIsSearch(isSearch + 1);
  };

  return (
    <div className={style.studentappbody}>
      <AdminFacultyApplicationHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            className={style.studenticon}
            icon={faChalkboardTeacher}
          />
          <h2>Faculty Applications</h2>
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
            <h3>Faculty Name</h3>
            <h3>Course Name</h3>
            <h3>Course Code</h3>
            <h3>Department</h3>
            <h3>Section</h3>
            <h3>Day</h3>
            <h3>Class Time</h3>
            <h3>Trimester</h3>
            <h3>Assistant Type</h3>
            <h3>Assistant</h3>
            <h3>Select Assistant</h3>
          </div>
          <div className={style.infobody}>
            {isSearch > 0
              ? searchResult.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <div className={style.row11}>
                        <img src={`${domain}/media/${item.fimage}`} alt="" />
                        <h4 >{item.fname}</h4>
                      </div>
                    </div>
                    <div className={style.row2}>
                      <h4>{item.coursename}</h4>
                    </div>
                    <div className={style.row3}>
                      <h4>{item.courseid}</h4>
                    </div>
                    <div className={style.row4}>
                      <h4>{item.department}</h4>
                    </div>
                    <div className={style.row5}>
                      <h4>{item.section}</h4>
                    </div>
                    <div className={style.row6}>
                      <h4>{item.day}</h4>
                    </div>
                    <div className={style.row7}>
                      <h4>{item.classtime}</h4>
                    </div>
                    <div className={style.row8}>
                      <h4>{item.trimester}</h4>
                    </div>
                    <div className={style.row9}>
                      <h4>{item.type}</h4>
                    </div>
                    <div className={style.row112}>
                      {item.aid === 0 ? (
                        <div className={style.row111}>
                          <h5>Pending</h5>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.aimage}`} alt="" />
                          <h4>{item.aname}</h4>
                        </div>
                      )}
                    </div>
                    {item.aid === 0 ? (
                      <div className={style.row121}>
                        <button
                          className={style.selectbtn}
                          onClick={() =>
                            navigate(
                              "/admindashboard/adminstudentapplication/adminselectassistant",
                              {
                                state: {
                                  id: item.id,
                                },
                              }
                            )
                          }
                        >
                          Select
                        </button>
                      </div>
                    ) : (
                      <div className={style.row121}>
                        <h4>Selected</h4>
                      </div>
                    )}
                  </div>
                ))
              : facultyapplication.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <div className={style.row11}>
                        <img src={`${domain}/media/${item.fimage}`} alt="" />
                        <h4>{item.fname}</h4>
                      </div>
                    </div>
                    <div className={style.row2}>
                      <h4>{item.coursename}</h4>
                    </div>
                    <div className={style.row3}>
                      <h4>{item.courseid}</h4>
                    </div>
                    <div className={style.row4}>
                      <h4>{item.department}</h4>
                    </div>
                    <div className={style.row5}>
                      <h4>{item.section}</h4>
                    </div>
                    <div className={style.row6}>
                      <h4>{item.day}</h4>
                    </div>
                    <div className={style.row7}>
                      <h4>{item.classtime}</h4>
                    </div>
                    <div className={style.row8}>
                      <h4>{item.trimester}</h4>
                    </div>
                    <div className={style.row9}>
                      <h4>{item.type}</h4>
                    </div>
                    <div className={style.row112}>
                      {item.aid === 0 ? (
                        <div className={style.row111}>
                          <h5>Pending</h5>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.aimage}`} alt="" />
                          <h4>{item.aname}</h4>
                        </div>
                      )}
                    </div>
                    {item.aid === 0 ? (
                      <div className={style.row121}>
                        <button
                          className={style.selectbtn}
                          onClick={() =>
                            navigate(
                              "/admindashboard/adminstudentapplication/adminselectassistant",
                              {
                                state: {
                                  id: item.id,
                                },
                              }
                            )
                          }
                        >
                          Select
                        </button>
                      </div>
                    ) : (
                      <div className={style.row121}>
                        <h4>Selected</h4>
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminFacultyApplication;
