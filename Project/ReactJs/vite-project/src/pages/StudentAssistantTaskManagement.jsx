import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import style from "./../assets/css/StudentAssistantTaskManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentAssistantTaskManagement = () => {
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

  const [tasks, setTasks] = useState([]);
  const [isClick, setIsClick] = useState("recently");
  const [title, setTitle] = useState("");
  const [isSub, setIsSub] = useState(0);
  const [action, setAction] = useState(0);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/taskview/${locationdata.state.id}/${isClick}/`
        );
        setTasks(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getTaskData();
  }, [isClick]);

  const [subData, setSubData] = useState([]);

  useEffect(() => {
    const getSubData = async () => {
      try {
        const response = await axios.get(`${domain}/api/subview/${isSub}/`);
        setSubData(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (isSub != 0) {
      getSubData();
    }
  }, [action]);

  const handleFile = (file) => {
    if (file) {
      window.open(file, "_blank");
    }
  };

  const handleSub = (id, title) => {
    setAction(action + 1);
    setTitle(title);
    setIsSub(id);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/subdelete/${id}/`);
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
      <HeaderAssistant />
      <div className={style.row1}>
        <p className={style.row11}>
          <b>
            Dept. Of{" "}
            {locationdata.state.department ===
            "Computer Science And Engineering"
              ? "CSE"
              : locationdata.state.department ===
                "Electrical And Electronics Engineering"
              ? "EEE"
              : locationdata.state.department === "Civil Engineering"
              ? "CE"
              : locationdata.state.department}
          </b>
        </p>
        <p className={style.row12}>
          {locationdata.state.trimester} {locationdata.state.courseid} (
          {locationdata.state.section}) : {locationdata.state.coursename}
        </p>
        <div className={style.teacher}>
          <p className={style.teacher1}>
            The following tasks are assigned by the course teacher
          </p>
          <img
            src={`${domain}/media/${locationdata.state.fimage}`}
            alt=""
          ></img>
          <p className={style.teacher2}>{locationdata.state.fname}</p>
        </div>
        <div className={style.position}>
          <p>My position : {locationdata.state.type}</p>
        </div>
      </div>
      <div className={style.mytask}>
        {" "}
        <p className={style.mytask1}>My tasks</p>
        <div className={style.condition}>
          <h3
            className={style.firstConditation}
            onClick={() => setIsClick("recently")}
          >
            Recently
          </h3>
          <h3
            className={style.secondConditation}
            onClick={() => setIsClick("inprogress")}
          >
            In progress
          </h3>
          <h3
            className={style.thirdConditation}
            onClick={() => setIsClick("completed")}
          >
            Completed
          </h3>
        </div>
        <div className={style.div}>
          {tasks.map((item, index) => (
            <div
              className={style.div1}
              onClick={() => handleSub(item.id, item.title)}
            >
              <p className={style.div11}>updated on {item.postdate}</p>
              <div className={style.div12}>
                <p>{item.title}</p>
              </div>
              <div className={style.div13}>{item.instruction}</div>
              <div className={style.box1}>
                <span
                  style={item.assessment ? {} : { visibility: "hidden" }}
                  onClick={() => handleFile(`${domain}${item.assessment}`)}
                >
                  View assessment
                </span>
                <p style={item.deadline ? {} : { visibility: "hidden" }}>
                  Deadline : {item.deadline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.SecondDiv}>
        <div className={style.row2}>
          <h4 className={style.row21}>My Submission</h4>
          <div
            className={style.row22}
            style={isSub !== 0 ? {} : { visibility: "hidden" }}
            onClick={() =>
              navigate(
                "/studentdashboard/studentassistantdashboard/studentassistantassociation/studentassistanttaskmanagement/studentassistantaddsubmission",
                {
                  state: {
                    id: isSub,
                    title: title,
                    department: locationdata.state.department,
                    type: locationdata.state.type,
                  },
                }
              )
            }
          >
            <FontAwesomeIcon className={style.plusicon} icon={faCirclePlus} />{" "}
            <p className={style.row221}> Add submission </p>
          </div>
          <h4 className={style.row23}>Feedback</h4>
        </div>
        {isSub > 0 ? (
          subData.map((item, index) => (
            <div>
              <hr className={style.line}></hr>
              <div className={style.row3}>
                <div className={style.row31}>
                  <div className={style.row311}>
                    <img
                      src={`${domain}/media/${locationdata.state.simage}`}
                      alt=""
                    ></img>
                    <div className={style.row3111}>
                      <h4>{locationdata.state.sname}</h4>
                      <p>updated on {item.subdate}</p>
                    </div>
                    <FontAwesomeIcon
                      className={style.delete}
                      style={
                        item.feddate
                          ? { visibility: "hidden" }
                          : {
                              position: "relative",
                              top: "10px",
                              left: "90px",
                            }
                      }
                      icon={faTrash}
                      onClick={() => handleDelete(`${item.id}`)}
                    />
                  </div>
                  <div className={style.row312}>
                    <h4 className={style.r1}>Comments</h4>
                    <p className={style.r2}>{item.subcomment}</p>
                    <h4 className={style.r3}>Submitted file</h4>
                    <span
                      className={style.r4}
                      style={
                        item.subfile
                          ? { fontSize: "15px" }
                          : { visibility: "hidden" }
                      }
                      onClick={() => handleFile(`${domain}${item.subfile}`)}
                    >
                      Click To View File
                    </span>
                  </div>
                </div>
                {item.feddate === "" ? (
                  <div className={style.row31}>
                    <h3 className={style.r6}>No Feedback Yet</h3>
                  </div>
                ) : (
                  <div className={style.row31}>
                    <div className={style.row311}>
                      <img
                        src={`${domain}/media/${locationdata.state.fimage}`}
                        alt=""
                      ></img>
                      <div className={style.row3111}>
                        <h4>{locationdata.state.fname}</h4>
                        <p>updated on {item.feddate}</p>
                      </div>
                    </div>
                    <div className={style.row312}>
                      <h4 className={style.r1}>Feedback</h4>
                      <p className={style.r2}>{item.fedcomment}</p>
                      <h4 className={style.r3}>Status</h4>
                      <p
                        className={style.r5}
                        style={
                          item.status === "Completed" ? { color: "green" } : {}
                        }
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <hr className={style.line}></hr>
          </div>
        )}

        {/* <hr className={style.line}></hr>
        <div className={style.row3}>
          <div className={style.row31}>
            <div className={style.row311}>
              <img src={rakib} alt=""></img>
              <div className={style.row3111}>
                <h4>Rakibul Hasan</h4>
                <p>updated on 31/12/2023 at 7.30pm</p>
              </div>
            </div>
            <div className={style.row312}>
              <h4 className={style.r1}>Comments</h4>
              <p className={style.r2}>
                I have provided my updated methodoloy on the following
                directory. check the updated files and let me know is their any
                correction needed. i will highly suggest to sadman to complete
                this part as if he is more fimiliar with this field.
              </p>
              <h4 className={style.r3}>Submitted file</h4>
              <a className={style.r4}>classtestquestion1.pdf</a>
            </div>
          </div>
          <div className={style.row31}>
            <h3 className={style.r6}>No Feedback Yet</h3>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default StudentAssistantTaskManagement;
