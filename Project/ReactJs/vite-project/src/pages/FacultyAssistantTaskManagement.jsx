import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import FacultyHeader from "../components/FacultyHeader";
import FacultyHeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAssistantFaculty from "../components/HeaderAssistantFaculty";
import style from "./../assets/css/StudentAssistantTaskManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyAssistantTaskManagement = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);
  const locationdata = useLocation();

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

  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState(0);
  const [isClick, setIsClick] = useState("recently");
  const [title, setTitle] = useState("");
  const [isSub, setIsSub] = useState(0);

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
  }, [isClick, action]);

  const handleFile = (file) => {
    if (file) {
      window.open(file, "_blank");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete? With this action all the record of submission will be deleted!"
    );
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/taskdelete/${id}/`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

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

  const handleSub = (id, title) => {
    setAction(action + 1);
    setIsSub(id);
    setTitle(title);
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
      <HeaderAssistantFaculty />
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
            The following tasks are assigned to {locationdata.state.type}
          </p>
          <img
            src={`${domain}/media/${locationdata.state.simage}`}
            alt=""
          ></img>
          <p className={style.teacher2}>{locationdata.state.sname}</p>
        </div>
      </div>
      <div className={style.mytaskfaculty}>
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
          <div
            className={style.row22addtask}
            onClick={() =>
              navigate(
                "/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantaddtask",
                {
                  state: {
                    tid: locationdata.state.id,
                    department: locationdata.state.department,
                    type: locationdata.state.type,
                  },
                }
              )
            }
          >
            <FontAwesomeIcon className={style.plusicon1} icon={faCirclePlus} />{" "}
            <p className={style.row221task}> Add Task </p>
          </div>
        </div>
        <div className={style.div}>
          {tasks.map((item, index) => (
            <div
              className={style.div1}
              onClick={() => handleSub(item.id, item.title)}
            >
              <div className={style.firstlevel}>
                <p className={style.div11}>updated on {item.postdate}</p>
                <div className={style.editdiv}>
                  <FontAwesomeIcon
                    className={style.update}
                    icon={faEdit}
                    onClick={() =>
                      navigate(
                        "/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantupdatetask",
                        {
                          state: {
                            id: item.id,
                            title: item.title,
                            instruction: item.instruction,
                            deadline: item.deadline,
                          },
                        }
                      )
                    }
                  />
                  <FontAwesomeIcon
                    className={style.delete}
                    icon={faTrash}
                    onClick={() => handleDelete(`${item.id}`)}
                  />
                </div>
              </div>
              <div className={style.div12}>
                <p>{item.title}</p>
              </div>
              <div className={style.div13}>{item.instruction}</div>
              {item.assessment ? (
                <div className={style.box1}>
                  <span
                    onClick={() => handleFile(`${domain}${item.assessment}`)}
                  >
                    View assessment
                  </span>
                  <p>Deadline : {item.deadline}</p>
                </div>
              ) : (
                <div className={style.box1}>
                  <p style={{ position: "relative", left: "150px" }}>
                    Deadline : {item.deadline}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={style.SecondDiv}>
        <div className={style.row2}>
          <h4 className={style.row21}>My Feedback</h4>
          <h4 className={style.row23faculty}>Assistant Submission</h4>
        </div>
        {isSub > 0 ? (
          subData.map((item, index) => (
            <div>
              <hr className={style.line}></hr>
              <div className={style.row3}>
                {item.feddate === "" ? (
                  <div className={style.row31}>
                    <div
                      className={style.feedback}
                      onClick={() =>
                        navigate(
                          "/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantfeedback",
                          { state: { id: item.id, title: title, tid: isSub } }
                        )
                      }
                    >
                      <div className={style.row22addfeedback}>
                        <FontAwesomeIcon
                          className={style.plusicon2}
                          icon={faCirclePlus}
                        />{" "}
                        <p className={style.row221feedback}> Add Feedback </p>
                      </div>
                    </div>
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
                        <p>updated {item.feddate}</p>
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
                  </div>
                  <div className={style.row312}>
                    <h4 className={style.r1}>Comments</h4>
                    <p className={style.r2}>{item.subcomment}</p>
                    <h4 className={style.r3}>Submitted file</h4>
                    <span
                      className={style.r4}
                      style={{ fontSize: "15px" }}
                      onClick={() => handleFile(`${domain}${item.subfile}`)}
                    >
                      Click To View File
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <hr className={style.line}></hr>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FacultyAssistantTaskManagement;
