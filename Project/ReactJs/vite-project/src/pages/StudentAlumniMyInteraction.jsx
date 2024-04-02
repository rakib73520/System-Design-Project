import React from "react";
import { useState, useEffect, useRef } from "react";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import style from "./../assets/css/AlumniMyInteraction.module.css";
import StudentHeaderAlumni from "../components/StudentHeaderAlumni";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rakib from "./../assets/media/images/rakib.jpg";
import {
  faPaperPlane,
  faArrowCircleRight,
  faFile,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudentAlumniMyInteraction = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);
  const locationdata = useLocation();

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [bellClick, setBellClick] = useState(0);
  const [searchClick, setSearchClick] = useState(0);
  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      studentdata.access = "no";
      const updatedstudentdata = JSON.stringify(studentdata);
      localStorage.setItem("student", updatedstudentdata);
      navigate("/");
    }
  }, [logoutClick]);

  // new code here

  const headerimgh1Ref = useRef();
  const [headimgh1_isVisible, setheadimgh1_isVisible] = useState(false);
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const [isView, setIsView] = useState(false);
  const [type, setType] = useState("Student");
  const [messege, setMessege] = useState("");
  const [file, setFile] = useState("");
  const [aluid, setAluid] = useState("");
  const [aluname, setAluname] = useState("");
  const [aluimage, setAluimage] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [action, setAction] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setheadimgh1_isVisible(entry.isIntersecting);
    });
    observer.observe(headerimgh1Ref.current);
  }, []);
  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    setFile(fileInput.files[0]);
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

  const chatRef = useRef(null);
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setType("Student");
    setIsView(false);
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setType("Faculty");
    setIsView(false);
  };

  const handleFile = (file) => {
    if (file) {
      window.open(file, "_blank");
    }
  };

  const [interactionList, setInteractionList] = useState([]);
  const [myinteractionList, setMyInteractionList] = useState([]);
  const [messegeList, setMessegeList] = useState([]);

  useEffect(() => {
    const getInteraction = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/interaction/${studentdata.id}/${"Student"}/`
        );
        setInteractionList(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getInteraction();
  }, [action]);

  useEffect(() => {
    const getMyInteraction = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/myinteraction/${studentdata.id}/${type}/`
        );
        setMyInteractionList(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getMyInteraction();
  }, [type, action]);

  useEffect(() => {
    const getMessege = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/messeges/${studentdata.id}/${aluid}/${type}/`
        );
        setMessegeList(response.data);
        scrollToBottom();
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (aluid) {
      getMessege();
    }
  }, [action]);

  const handleView = (aluid, aluname, aluimage, company, position) => {
    setIsView(!isView);
    setAluid(aluid);
    setAluname(aluname);
    setAluimage(aluimage);
    setCompany(company);
    setPosition(position);
    setAction(action + 1);
  };

  const handleSend = async () => {
    const date = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const showDateTime = date.toLocaleString("en-US", options);
    if (messege != "") {
      let data = new FormData();
      data.append("sender", studentdata.id);
      data.append("receiver", aluid);
      data.append("messege", messege);
      data.append("postdate", showDateTime);
      data.append("type", type);
      if (file) {
        data.append("file", file);
      } else {
        data.append("file", "");
      }
      try {
        await axios.post(`${domain}/api/sendmessege/`, data);
        setAction(action + 1);
        setMessege("");
        setFile("");
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this conversition?"
    );
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/deleteinteraction/${id}/`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

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
      <StudentHeaderAlumni />
      <div ref={headerimgh1Ref} className={style.headerimg}>
        <div className={style.headerimg2}>
          <h1
            className={
              headimgh1_isVisible ? style.headerimg2h1 : style.headerimg2h1not
            }
          >
            Connect with our alumni, where possibilities meet opportunities.
            Explore, learn, and enhance your chances for success.
          </h1>
        </div>
      </div>
      {studentdata.alumni == 2 ? (
        <div className={style.row}>
          <div className={style.row1}>
            <h2>List of Student & Faculty you are Interacting</h2>
            <div className={style.seebtn}>
              <button
                onClick={handleClick2}
                className={isClicked1 ? style.facultybtn : style.facultynot}
              >
                Faculty
              </button>
              <button
                onClick={handleClick1}
                className={isClicked ? style.studentbtn : style.stdnot}
              >
                Student
              </button>
            </div>
            <div className={style.listout}>
              {myinteractionList.map((item, index) => (
                <div className={style.list}>
                  <img src={`${domain}/media/${item.myimage}`} alt="" />
                  <div className={style.list1}>
                    <h3>{item.myname}</h3>
                    {type === "Faculty" ? (
                      <h4>Faculty At UIU</h4>
                    ) : (
                      <h4>Student At UIU</h4>
                    )}
                    <div className={style.list11}>
                      <h4 className={style.viewtitle}>View Conversation</h4>
                      <FontAwesomeIcon
                        className={style.righticon}
                        icon={faArrowCircleRight}
                        onClick={() =>
                          handleView(
                            `${item.myid}`,
                            `${item.myname}`,
                            `${item.myimage}`,
                            `${item.company}`,
                            `${item.position}`
                          )
                        }
                      />
                    </div>
                    <h5
                      onClick={() =>
                        navigate(
                          "/studentdashboard/studentalumnihome/studentalumnimyinteraction/alumnireport",
                          {
                            state: {
                              id: item.id,
                              reporterid: studentdata.id,
                              reportedid: item.myid,
                            },
                          }
                        )
                      }
                      style={type === "Faculty" ? { visibility: "hidden" } : {}}
                    >
                      Report this user
                    </h5>
                    <FontAwesomeIcon
                      className={style.deleteicon}
                      icon={faTrash}
                      onClick={() => handleDelete(`${item.id}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={style.row2}
            style={isView ? {} : { visibility: "hidden" }}
          >
            <h2>Conversation</h2>
            <div className={style.chat}>
              <div className={style.chat1}>
                <FontAwesomeIcon
                  className={style.rotateicon}
                  icon={faRotateRight}
                  onClick={() => setAction(action + 1)}
                />
                <img src={`${domain}/media/${aluimage}`} alt="" />
                <div className={style.chat11}>
                  <h4>{aluname}</h4>
                  {type === "Student" ? (
                    <p>Student At UIU</p>
                  ) : (
                    <p>Faculty At UIU</p>
                  )}
                </div>
              </div>
              <div className={style.chat2} ref={chatRef}>
                {messegeList.map((item, index) =>
                  item.sender == studentdata.id ? (
                    <div className={style.p1}>
                      <div className={style.p11}>
                        <FontAwesomeIcon
                          style={
                            item.file
                              ? {
                                  position: "relative",
                                  right: "20px",
                                  height: "25px",
                                  width: "25px",
                                  color: "green",
                                  cursor: "pointer",
                                }
                              : { visibility: "hidden" }
                          }
                          icon={faFile}
                          onClick={() => handleFile(`${domain}${item.file}`)}
                        />
                        <h4>{item.msg}</h4>
                        <img src={`${domain}${studentdata.image}`} alt="" />
                      </div>
                      <p>Delevered on {item.time}</p>
                    </div>
                  ) : (
                    <div className={style.p2}>
                      <div className={style.p21}>
                        <img src={`${domain}/media/${aluimage}`} alt="" />
                        <h4>{item.msg}</h4>
                        <FontAwesomeIcon
                          style={
                            item.file
                              ? {
                                  position: "relative",
                                  left: "20px",
                                  height: "25px",
                                  width: "25px",
                                  color: "green",
                                  cursor: "pointer",
                                }
                              : { visibility: "hidden" }
                          }
                          icon={faFile}
                          onClick={() => handleFile(`${domain}${item.file}`)}
                        />
                      </div>
                      <p>Delevered on {item.time}</p>
                    </div>
                  )
                )}
              </div>
              <div className={style.chat3}>
                <div className={style.row212}>
                  <input type="file" id="fileInput" onChange={updateFileName} />
                  <label htmlFor="fileInput" className={style.eventcreate4vis}>
                    <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                    <h4>Add File</h4>
                  </label>
                </div>

                <input
                  className={style.courseinput}
                  type="text"
                  placeholder="Write Messege"
                  value={messege}
                  onChange={(e) => setMessege(e.target.value)}
                />
                <FontAwesomeIcon
                  className={style.planeicon}
                  icon={faPaperPlane}
                  onClick={handleSend}
                />
              </div>
              <div className={style.eventcreate7}>
                <span id="fileName">No file chosen</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.row}>
          <div className={style.row1}>
            <h2>List of Alumni you are Interacting</h2>
            <div className={style.listout}>
              {interactionList.map((item, index) => (
                <div className={style.list}>
                  <img src={`${domain}/media/${item.aluimage}`} alt="" />
                  <div className={style.list1}>
                    <h3>{item.aluname}</h3>
                    <h4>
                      {item.position} At {item.company}
                    </h4>
                    <div className={style.list11}>
                      <h4 className={style.viewtitle}>View Conversation</h4>
                      <FontAwesomeIcon
                        className={style.righticon}
                        icon={faArrowCircleRight}
                        onClick={() =>
                          handleView(
                            `${item.aluid}`,
                            `${item.aluname}`,
                            `${item.aluimage}`,
                            `${item.company}`,
                            `${item.position}`
                          )
                        }
                      />
                    </div>
                    <FontAwesomeIcon
                      className={style.deleteicon}
                      icon={faTrash}
                      onClick={() => handleDelete(`${item.id}`)}
                      style={{ position: "relative", bottom: "180px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={style.row2}
            style={isView ? {} : { visibility: "hidden" }}
          >
            <h2>Conversation</h2>
            <div className={style.chat}>
              <div className={style.chat1}>
                <FontAwesomeIcon
                  className={style.rotateicon}
                  icon={faRotateRight}
                  onClick={() => setAction(action + 1)}
                />
                <img src={`${domain}/media/${aluimage}`} alt="" />
                <div className={style.chat11}>
                  <h4>{aluname}</h4>
                  <p>
                    {position} at {company}
                  </p>
                </div>
              </div>
              <div className={style.chat2} ref={chatRef}>
                {messegeList.map((item, index) =>
                  item.sender == studentdata.id ? (
                    <div className={style.p1}>
                      <div className={style.p11}>
                        <FontAwesomeIcon
                          style={
                            item.file
                              ? {
                                  position: "relative",
                                  right: "20px",
                                  height: "25px",
                                  width: "25px",
                                  color: "green",
                                  cursor: "pointer",
                                }
                              : { visibility: "hidden" }
                          }
                          icon={faFile}
                          onClick={() => handleFile(`${domain}${item.file}`)}
                        />
                        <h4>{item.msg}</h4>
                        <img src={`${domain}${studentdata.image}`} alt="" />
                      </div>
                      <p>Delevered on {item.time}</p>
                    </div>
                  ) : (
                    <div className={style.p2}>
                      <div className={style.p21}>
                        <img src={`${domain}/media/${aluimage}`} alt="" />
                        <h4>{item.msg}</h4>
                        <FontAwesomeIcon
                          style={
                            item.file
                              ? {
                                  position: "relative",
                                  left: "20px",
                                  height: "25px",
                                  width: "25px",
                                  color: "green",
                                  cursor: "pointer",
                                }
                              : { visibility: "hidden" }
                          }
                          icon={faFile}
                          onClick={() => handleFile(`${domain}${item.file}`)}
                        />
                      </div>
                      <p>Delevered on {item.time}</p>
                    </div>
                  )
                )}
              </div>
              <div className={style.chat3}>
                <div className={style.row212}>
                  <input type="file" id="fileInput" onChange={updateFileName} />
                  <label htmlFor="fileInput" className={style.eventcreate4vis}>
                    <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                    <h4>Add File</h4>
                  </label>
                </div>

                <input
                  className={style.courseinput}
                  type="text"
                  placeholder="Write Messege"
                  value={messege}
                  onChange={(e) => setMessege(e.target.value)}
                />
                <FontAwesomeIcon
                  className={style.planeicon}
                  icon={faPaperPlane}
                  onClick={handleSend}
                />
              </div>
              <div className={style.eventcreate7}>
                <span id="fileName">No file chosen</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StudentAlumniMyInteraction;
