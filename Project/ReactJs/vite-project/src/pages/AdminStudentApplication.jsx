import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminStudentApplication.module.css";
import sadia from "./../assets/media/images/sadia.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminStudentApplicationHeader from "../components/AdminStudentApplicationHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminStudentApplication = () => {
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

  const [studentApplication, setStudentApplication] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(0);
  const [isSelected, setIsSelected] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getStudentApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/studentapplicationdept/${admindata.department}`
        );
        setStudentApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getStudentApplication();
  }, [isSelected]);

  useEffect(() => {
    const searchStudentApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/studentapplicationsearch/${search}/`
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (search != "") {
      searchStudentApplication();
    }
  }, [isSearch]);

  const handleSearch = () => {
    setIsSearch(isSearch + 1);
  };

  const handleSelection = async (id) => {
    try {
      const response = await axios.get(
        `${domain}/api/studentapplicationselectin/${id}/`
      );
      alert(response.data);
      setIsSelected(isSelected + 1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminStudentApplicationHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon className={style.studenticon} icon={faUserTie} />
          <h2>Student Applications</h2>
          <input
            type="text"
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <h3>Student Information</h3>
            <h3>Course Name</h3>
            <h3>Course Code</h3>
            <h3>Department</h3>
            <h3>Section</h3>
            <h3>Day</h3>
            <h3>Class Time</h3>
            <h3>Trimester</h3>
            <h3>Assistant Type</h3>
            <h3>Recommended By</h3>
            <h3>Associated With</h3>
            <h3>Select Teacher</h3>
          </div>
          <div className={style.infobody}>
            {isSearch > 0
              ? searchResult.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <div className={style.row11}>
                        <img src={`${domain}/media/${item.simage}`} alt="" />
                        <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.sid } })
                }>{item.sname}</h4>
                      </div>
                      <div className={style.row12}>
                        <h5>ID</h5>
                        <p>{item.sstudentid}</p>
                      </div>
                      <div className={style.row13}>
                        <h5>CGPA</h5>
                        <p>{item.cgpa}</p>
                      </div>
                      <div className={style.row14}>
                        <h5>Com. Credit</h5>
                        <p>{item.credit}</p>
                      </div>
                      <div className={style.row16}>
                        <h5>Experience</h5>
                        {item.experience === "NO" ? (
                          <p>No Experience</p>
                        ) : (
                          <p>Worked before for Data {item.experience}</p>
                        )}
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
                    <div className={style.row10}>
                      {item.rid === 0 ? (
                        <div className={style.row101}>
                          <h5>No Recommendation</h5>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.rimage}`} alt="" />
                          <h4 >{item.rname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row11}>
                      {item.aemail === "" ? (
                        <div className={style.row111}>
                          <h5>Pending</h5>
                        </div>
                      ) : (
                        <div className={style.row111}>
                          <img src={`${domain}/media/${item.aimage}`} alt="" />
                          <h4 >{item.aname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row121}>
                      {item.aemail === "" ? (
                        <button
                          className={style.selectbtn}
                          onClick={() => handleSelection(`${item.id}`)}
                        >
                          Select
                        </button>
                      ) : (
                        <h4>Selected</h4>
                      )}
                    </div>
                  </div>
                ))
              : studentApplication.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <div className={style.row11}>
                        <img src={`${domain}/media/${item.simage}`} alt="" />
                        <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.sid } })
                }>{item.sname}</h4>
                      </div>
                      <div className={style.row12}>
                        <h5>ID</h5>
                        <p>{item.sstudentid}</p>
                      </div>
                      <div className={style.row13}>
                        <h5>CGPA</h5>
                        <p>{item.cgpa}</p>
                      </div>
                      <div className={style.row14}>
                        <h5>Com. Credit</h5>
                        <p>{item.credit}</p>
                      </div>
                      <div className={style.row16}>
                        <h5>Experience</h5>
                        {item.experience === "NO" ? (
                          <p>No Experience</p>
                        ) : (
                          <p>Worked before for Data {item.experience}</p>
                        )}
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
                    <div className={style.row10}>
                      {item.rid === 0 ? (
                        <div className={style.row101}>
                          <h5>No Recommendation</h5>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.rimage}`} alt="" />
                          <h4 >{item.rname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row11}>
                      {item.aemail === "" ? (
                        <div className={style.row111}>
                          <h5>Pending</h5>
                        </div>
                      ) : (
                        <div className={style.row111}>
                          <img src={`${domain}/media/${item.aimage}`} alt="" />
                          <h4 >{item.aname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row121}>
                      {item.aemail === "" ? (
                        <button
                          className={style.selectbtn}
                          onClick={() => handleSelection(`${item.id}`)}
                        >
                          Select
                        </button>
                      ) : (
                        <h4>Selected</h4>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminStudentApplication;
