import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminSelectAssistant.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminFacultyApplicationHeader from "../components/AdminFacultyApplicationHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminSelectAssistant = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);
  const locationdata = useLocation();

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
  const [name, setName] = useState("");

  useEffect(() => {
    const getStudentApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/studentapplicationview/${locationdata.state.id}/`
        );
        setStudentApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getStudentApplication();
  }, []);

  useEffect(() => {
    const searchStudentApplication = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/studentapplicationselectsearch/${locationdata.state.id}/${name}/`
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (name != "") {
      searchStudentApplication();
    }
  }, [isSearch]);

  const handleSearch = () => {
    setIsSearch(isSearch + 1);
  };

  const handleSelection = async (id) => {
    try {
      const response = await axios.get(
        `${domain}/api/studentapplicationselect/${id}/`
      );
      alert(response.data);
      navigate("/admindashboard/adminfacultyapplication");
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminFacultyApplicationHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon className={style.studenticon} icon={faUserTie} />
          <h2>Select Assistant</h2>
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
            <h3>Student Name</h3>
            <h3>Student ID</h3>
            <h3>CGPA</h3>
            <h3>Completed Credit</h3>
            <h3>Applied Course Point</h3>
            <h3>Experience</h3>
            <h3>Recommended By</h3>
            <h3>Select Assistant</h3>
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
                    </div>
                    <div className={style.row2}>
                      <h4>{item.sstudentid}</h4>
                    </div>
                    <div className={style.row3}>
                      <h4>{item.cgpa}</h4>
                    </div>
                    <div className={style.row4}>
                      <h4>{item.credit}</h4>
                    </div>
                    <div className={style.row5}>
                      <h4>{item.point}</h4>
                    </div>
                    <div className={style.row7}>
                      <h4>
                        Worked before as {item.type} for {item.coursename}
                      </h4>
                    </div>
                    <div className={style.row10}>
                      {item.rid === 0 ? (
                        <div className={style.row101}>
                          <h4 style={{ color: "gray" }}>No Recommendation</h4>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.rimage}`} alt="" />
                          <h4>{item.rname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row121}>
                      <button
                        className={style.selectbtn}
                        onClick={() => handleSelection(`${id}`)}
                      >
                        Select
                      </button>
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
                    </div>
                    <div className={style.row2}>
                      <h4>{item.sstudentid}</h4>
                    </div>
                    <div className={style.row3}>
                      <h4>{item.cgpa}</h4>
                    </div>
                    <div className={style.row4}>
                      <h4>{item.credit}</h4>
                    </div>
                    <div className={style.row5}>
                      <h4>{item.point}</h4>
                    </div>
                    <div className={style.row7}>
                      <h4>
                        Worked before as {item.type} for {item.coursename}
                      </h4>
                    </div>
                    <div className={style.row10}>
                      {item.rid === 0 ? (
                        <div className={style.row101}>
                          <h4 style={{ color: "gray" }}>No Recommendation</h4>
                        </div>
                      ) : (
                        <div className={style.row101}>
                          <img src={`${domain}/media/${item.rimage}`} alt="" />
                          <h4>{item.rname}</h4>
                        </div>
                      )}
                    </div>
                    <div className={style.row121}>
                      <button
                        className={style.selectbtn}
                        onClick={() => handleSelection(`${item.id}`)}
                      >
                        Select
                      </button>
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

export default AdminSelectAssistant;
