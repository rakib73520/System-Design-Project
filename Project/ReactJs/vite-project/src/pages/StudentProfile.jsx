import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/StudentProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCircleChevronDown,
  faArrowRight,
  faDeleteLeft,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [assistantIsClicked, setAssistantIsClicked] = useState(false);
  const [updateIsClicked, setUpdateIsClicked] = useState(false);
  const [careerIsClicked, setCareerIsClicked] = useState(false);

  const [skill, setSkill] = useState("");
  const [postDate, setPostDate] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [action, setAction] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);

  const [application, setApplication] = useState([]);

  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myassociation/${studentdata.id}/`
        );
        setApplication(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getApplicationData();
  }, []);

  const [mySkills, setMySkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myskills/${studentdata.id}/`
        );
        setMySkills(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getMySkills();
  }, [action]);

  const [myCareer, setMyCareer] = useState([]);

  useEffect(() => {
    const getMyCareer = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/mycareer/${studentdata.id}/`
        );
        setMyCareer(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getMyCareer();
  }, [action]);

  useEffect(() => {
    const date = new Date();

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const showDateTime = date.toLocaleString("en-US", options);
    setPostDate(showDateTime);
  }, []);

  const [skillResult, setSkillResult] = useState([]);

  useEffect(() => {
    const getSkillName = async () => {
      try {
        const response = await axios.get(`${domain}/api/skillsearch/${skill}`);
        setSkillResult(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (skill != "") {
      getSkillName();
    }
  }, [skill]);

  const handleWebsite = () => {
    window.location.href = `https://${studentdata.website}`;
  };
  const handleGithub = () => {
    window.location.href = `https://${studentdata.github}`;
  };
  const handleLinkedin = () => {
    window.location.href = `https://${studentdata.linkedin}`;
  };
  const handleDropClick = () => {
    setAssistantIsClicked(!assistantIsClicked);
  };

  const handleSearchClick = (skillname) => {
    setSkill(skillname);
    setIsSearchBar(true);
  };

  const handleAddSkillClick = () => {
    setIsSearchBar(false);
    setIsAdd(!isAdd);
  };

  const handleAdd = async () => {
    setIsAdd(!isAdd);
    let data = new FormData();
    data.append("skillname", skill);
    data.append("id", studentdata.id);
    try {
      await axios.post(`${domain}/api/skilladd/`, data);
      setAction(action + 1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  const handleRemove = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/myskillsdelete/${id}/`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  const handleDropClick2 = async (event) => {
    event.preventDefault();
    if (company == "" || position == "") {
      alert("All Field Is Required");
    } else {
      let data = new FormData();
      data.append("company", company);
      data.append("position", position);
      data.append("postdate", postDate);
      data.append("userid", studentdata.id);
      try {
        await axios.post(`${domain}/api/addcareer/`, data);
        setAction(action + 1);
        setUpdateIsClicked(!updateIsClicked);
        studentdata.company = company;
        studentdata.position = position;
        const stringdata = JSON.stringify(studentdata);
        localStorage.setItem("student", stringdata);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };
  const handleDropClick3 = () => {
    setCareerIsClicked(!careerIsClicked);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setUpdateIsClicked(false);
  };

  const handleRemoveCareer = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Career Status?"
    );
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/removecareer/${id}/`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  const handleUp = async () => {
    if (studentdata.completedcredit == "") {
      alert(
        "Please Update The 'Completed Credit' Field To Make Alumni Request"
      );
    } else if (studentdata.completedcredit < 137) {
      alert("Required Credit Hasn't Completed Yet!");
    } else {
      try {
        await axios.get(`${domain}/api/uprequest/${studentdata.id}/`);
        studentdata.alumni = 1;
        const stringdata = JSON.stringify(studentdata);
        localStorage.setItem("student", stringdata);
        alert(
          "Request sent! You will be notified when the admin approves your request"
        );
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  return (
    <div>
      <div className={style.profile}>
        <div className={style.headerbutton}>
          <button
            className={style.btnback}
            onClick={() => navigate("/studentdashboard")}
          >
            Back
          </button>
          <button
            className={style.btnedit}
            onClick={() =>
              navigate("/studentdashboard/studentprofile/studentprofileupdate")
            }
          >
            Edit
          </button>
          {studentdata.alumni === 0 ? (
            <button className={style.btnupgrade} onClick={handleUp}>
              Upgrade Profile to Alumni
            </button>
          ) : (
            ""
          )}
        </div>
        <div className={style.content}>
          <div className={style.div1}>
            <div className={style.div11}>
              <img src={`${domain}/${studentdata.image}`} alt="" />
              <h2>{studentdata.fullname}</h2>
              <h3>{studentdata.alumni === 2 ? "Alumni" : "Student"} At UIU</h3>
              {studentdata.company !== "" && studentdata.position !== "" ? (
                <span className={style.pos}>
                  {studentdata.position} At {studentdata.company}
                </span>
              ) : (
                <span className={style.pos}></span>
              )}
              <p>{studentdata.bio}</p>
            </div>
            <h2 style={{ marginLeft: "33px" }}>Skills</h2>
            <div className={style.div12}>
              {mySkills.map((item, index) => (
                <div className={style.skill}>
                  <h4>{item.skillname}</h4>
                  <FontAwesomeIcon
                    className={style.skilldeleteicon}
                    icon={faDeleteLeft}
                    style={isRemove ? {} : { visibility: "hidden" }}
                    onClick={() => handleRemove(`${item.id}`)}
                  />
                </div>
              ))}
            </div>
            <div className={style.div13}>
              <div
                className={style.addskills}
                onClick={() => handleAddSkillClick()}
              >
                <FontAwesomeIcon
                  className={style.plusicon}
                  icon={faCirclePlus}
                />
                <h4>Add Skills</h4>
              </div>
              <div
                className={style.removeskills}
                onClick={() => setIsRemove(!isRemove)}
              >
                <FontAwesomeIcon
                  className={style.skillremoveicon}
                  icon={faCircleMinus}
                />
                <h4>Remove Skills</h4>
              </div>
            </div>
            <div
              className={style.diva}
              style={isAdd ? {} : { visibility: "hidden" }}
            >
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Add Skills</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    placeholder="Search Skills"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  <button className={style.add} onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </div>
              <div
                className={style.dir}
                style={isSearchBar ? { visibility: "hidden" } : {}}
              >
                <div className={style.searchresult}>
                  {skillResult.map((item, index) => (
                    <h4 onClick={() => handleSearchClick(`${item.skillname}`)}>
                      {item.skillname}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={style.div2}>
            <div className={style.div21}>
              <h3>User Information</h3>
              <div className={style.div21info}>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Student ID</h4>
                  <h4 className={style.infodata2}>{studentdata.studentid}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Gender</h4>
                  <h4 className={style.infodata2}>{studentdata.gender}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Department</h4>
                  <h4 className={style.infodata2}>{studentdata.department}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>CGPA</h4>
                  <h4 className={style.infodata2}>{studentdata.cgpa}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Completed Credit</h4>
                  <h4 className={style.infodata2}>
                    {studentdata.completedcredit}
                  </h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Email</h4>
                  <h4 className={style.infodata2}>{studentdata.email}</h4>
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Website</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={studentdata.website ? handleWebsite : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Github</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={studentdata.github ? handleGithub : ""}
                  />
                </div>
                <div className={style.infodata}>
                  <h4 className={style.infodata1}>Linkedin</h4>
                  <FontAwesomeIcon
                    className={style.linkicon}
                    icon={faLink}
                    onClick={studentdata.linkedin ? handleLinkedin : ""}
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
              {application.map((item, index) => (
                <div
                  style={{ display: assistantIsClicked ? "" : "none" }}
                  className={style.div22body}
                >
                  <h4>
                    {item.type} Of {item.coursename}({item.section}){" "}
                  </h4>
                  <p>Department Of {item.department}</p>
                  <span
                    onClick={() =>
                      navigate(
                        "/studentdashboard/studentprofile/findsimilarassistant",
                        {
                          state: {
                            coursename: item.coursename,
                            courseid: item.courseid,
                            department: item.department,
                            type: item.type,
                          },
                        }
                      )
                    }
                  >
                    Find other {item.type} for this course{" "}
                    <FontAwesomeIcon
                      className={style.righticon2}
                      icon={faArrowRight}
                    />
                  </span>
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
                      <FontAwesomeIcon
                        style={{ display: updateIsClicked ? "" : "none" }}
                        className={style.deleteicon}
                        icon={faDeleteLeft}
                        onClick={() => handleRemoveCareer(`${item.id}`)}
                      />
                    </div>
                    <hr className={style.bodyhr} />
                  </div>
                ))}
              </div>
              <div
                style={{ display: careerIsClicked ? "" : "none" }}
                className={style.bodypart3}
              >
                <button
                  style={{ display: updateIsClicked ? "none" : "" }}
                  className={style.updatebtn}
                  onClick={() => setUpdateIsClicked(true)}
                >
                  Update Career Status
                </button>
                <form
                  style={{ display: updateIsClicked ? "" : "none" }}
                  className={style.updateform}
                  action=""
                >
                  <input
                    className={style.updateforminput}
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <input
                    className={style.updateforminput}
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <div className={style.btndiv}>
                    <button
                      className={style.addbtn}
                      type="submit"
                      onClick={handleDropClick2}
                    >
                      Update
                    </button>
                    <button
                      className={style.cancelbtn}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
