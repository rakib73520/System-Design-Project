import React from "react";
import { useState, useEffect } from "react";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import FacultyHeaderAlumni from "../components/FacultyHeaderAlumni";
import style from "./../assets/css/AlumniHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faLink } from "@fortawesome/free-solid-svg-icons";
import Alumni from "./../assets/media/images/alumni.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAlumniHome = () => {
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

  useEffect(() => {
    if (logoutClick) {
      facultydata.access = "no";
      const updatedfacultydata = JSON.stringify(facultydata);
      localStorage.setItem("faculty", updatedfacultydata);
      navigate("/");
    }
  }, [logoutClick]);

  // new code here

  const [alumniList, setAlumniList] = useState([]);
  const [companyList, setCompanyiList] = useState([]);
  const [department, setDepartment] = useState(
    "Computer Science And Engineering"
  );
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    const getAlumni = async () => {
      try {
        const response1 = await axios.get(
          `${domain}/api/alumni/${department}/`
        );
        const response2 = await axios.get(`${domain}/api/company/`);
        setCompanyiList(response2.data);
        setAlumniList(response1.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getAlumni();
  }, [department]);

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

  const handleStart = async (id) => {
    let data = new FormData();
    data.append("aluid", id);
    data.append("myid", facultydata.id);
    data.append("type", "Faculty");
    try {
      await axios.post(`${domain}/api/startinteraction/`, data);
      navigate(
        "/facultydashboard/facultyalumnihome/facultyalumnimyinteraction"
      );
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
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
      <FacultyHeaderAlumni />
      <div className={style.outer}>
        <div
          className={style.image}
          style={{ backgroundImage: `url(${Alumni})` }}
        >
          <h1
            className={style.headline}
            style={{ color: "white", marginTop: 80 }}
          >
            Connect Back to UIU
          </h1>
          <div style={{ marginTop: 10 }}>
            <p
              className={style.para}
              style={{ color: "white", marginTop: 10, fontSize: 24 }}
            >
              UIU Alumni brings together and a deeper connection to the
              university.Whether <br></br>
              you’re interested in upskilling in your career, continuing your
              learning UIU is here to <br></br>
              support you
            </p>
          </div>
          <div className={style.btn}>
            <button
              className={style.buttonStyle}
              onClick={() => setDepartment("Computer Science And Engineering")}
            >
              CSE
            </button>
            <button
              className={style.buttonStyle}
              onClick={() =>
                setDepartment("Electrical And Electronics Engineering")
              }
            >
              EEE
            </button>
            <button
              className={style.buttonStyle}
              onClick={() => setDepartment("Civil Engineering")}
            >
              CE
            </button>
          </div>
        </div>

        <div className={style.Infotag}>
          <div>
            <h2 className={style.h2}>Alumni Information </h2>
            <p className={style.p2}>Department of {department}</p>
          </div>
          <div className={style.companies}>
            <p>
              <b>Companies</b>
            </p>
            <svg
              onClick={() => setIsCompany(!isCompany)}
              style={{ marginTop: 30, marginLeft: 20, cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="24"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </div>
        <hr className={style.line}></hr>

        <div className={style.container}>
          {alumniList.map((item, index) => (
            <div className={style.alumniPerson}>
              <img
                className={style.picture}
                src={`${domain}${item.image}`}
                alt=""
              ></img>
              <p className={style.name}>
                <b>{item.fullname}</b>
              </p>
              <p className={style.profile}>ALUMNI PROFILES | {item.position}</p>
              <div className={style.company}>
                <svg
                  style={{
                    backgroundColor: "rgb(99, 130, 255)",
                    marginRight: 7,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  width="22"
                  viewBox="0 0 384 512"
                >
                  <path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z" />
                </svg>
                <p className={style.workAt}>Work at {item.company}</p>
              </div>
              <div className={style.div}>
                <svg
                  className={style.logo}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "rgb(97, 128, 255)",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 320 512"
                  onClick={() =>
                    item.website ? handleWebsite(`${item.website}`) : ""
                  }
                >
                  <FontAwesomeIcon icon={faLink} />
                </svg>
                <svg
                  className={style.logo}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "rgb(97, 128, 255)",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 448 512"
                  onClick={() =>
                    item.linkedin ? handleLinkedin(`${item.linkedin}`) : ""
                  }
                >
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
                <svg
                  className={style.logo}
                  style={{ backgroundColor: "rgb(97, 128, 255)" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 448 512"
                  onClick={() =>
                    item.github ? handleGithub(`${item.github}`) : ""
                  }
                >
                  <path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z" />
                </svg>
              </div>
              <div
                className={style.div2}
                onClick={() => handleStart(`${item.id}`)}
              >
                <FontAwesomeIcon
                  style={{ width: 20, height: 20 }}
                  className={style.comment}
                  icon={faCommentDots}
                />
                <p className={style.conversation}>Start conversation</p>
              </div>
              <div
                className={style.div3}
                onClick={() =>
                  navigate("/viewstudentprofile", { state: { id: item.id } })
                }
              >
                <p style={{ color: "white", fontSize: 20, marginTop: 0 }}>
                  Learn more
                </p>
                <div className={style.backbtn}>
                  <svg
                    style={{ marginLeft: 5 }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={style.companylist}
          style={isCompany ? {} : { visibility: "hidden" }}
        >
          {companyList.map((item, index) => (
            <h4>{item.company}</h4>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacultyAlumniHome;
