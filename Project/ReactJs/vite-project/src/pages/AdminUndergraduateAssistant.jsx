import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminUndergraduateAssistant.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPen } from "@fortawesome/free-solid-svg-icons";
import AdminFooter from "../components/AdminFooter";
import AdminUaHeader from "./../components/AdminUaHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminUndergraduateAssistant = () => {
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

  const [ua, setUa] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(0);
  const [action, setAction] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const getua = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/assistant/${
            admindata.department
          }/${"Undergraduate Assistant"}/`
        );
        setUa(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getua();
  }, [action]);

  useEffect(() => {
    const searchassistant = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/assistantsearch/${
            admindata.department
          }/${"Undergraduate Assistant"}/${name}/`
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (name != "") {
      searchassistant();
    }
  }, [isSearch]);

  const handleSearch = () => {
    setIsSearch(isSearch + 1);
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.get(`${domain}/api/assistantremove/${id}/`);
      setAction(action + 1);
      alert(response.data);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminUaHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon className={style.studenticon} icon={faUserPen} />
          <h2>Undergraduate Assistant</h2>
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
            <h3>Assistant Information</h3>
            <h3>Faculty Information</h3>
            <h3>Action</h3>
          </div>
          <div className={style.infobody}>
            {isSearch > 0
              ? searchResult.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <img src={`${domain}/media/${item.simage}`} alt="" />
                      <div className={style.row11}>
                        <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.sid } })
                }>{item.sname}</h4>
                        <h5>Student At UIU</h5>
                        <p>Department Of {item.department}</p>
                        <span>
                          {item.coursename} | {item.section} | {item.trimester}
                        </span>
                      </div>
                    </div>
                    <div className={style.row1}>
                      <img src={`${domain}/media/${item.fimage}`} alt="" />
                      <div className={style.row11}>
                        <h4>{item.fname}</h4>
                        <h5>Faculty At UIU</h5>
                        <p className={style.row11extra}>
                          Department Of {item.department}
                        </p>
                      </div>
                    </div>
                    <div className={style.row121}>
                      <button
                        className={style.selectbtn}
                        onClick={() => handleRemove(`${item.id}`)}
                      >
                        Remove Association
                      </button>
                    </div>
                  </div>
                ))
              : ua.map((item, index) => (
                  <div className={style.bodyrow}>
                    <div className={style.row1}>
                      <img src={`${domain}/media/${item.simage}`} alt="" />
                      <div className={style.row11}>
                        <h4 onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.sid } })
                }>{item.sname}</h4>
                        <h5>Student At UIU</h5>
                        <p>Department Of {item.department}</p>
                        <span>
                          {item.coursename} | {item.section} | {item.trimester}
                        </span>
                      </div>
                    </div>
                    <div className={style.row1}>
                      <img src={`${domain}/media/${item.fimage}`} alt="" />
                      <div className={style.row11}>
                        <h4 >{item.fname}</h4>
                        <h5>Faculty At UIU</h5>
                        <p className={style.row11extra}>
                          Department Of {item.department}
                        </p>
                      </div>
                    </div>
                    <div className={style.row121}>
                      <button
                        className={style.selectbtn}
                        onClick={() => handleRemove(`${item.id}`)}
                      >
                        Remove Association
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

export default AdminUndergraduateAssistant;
