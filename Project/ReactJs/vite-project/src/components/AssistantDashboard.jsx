import React from "react";
import { useState, useRef, useEffect } from "react";
import style from "./../assets/css/AssistantDashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssistantDashboard = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);

  const [type, setType] = useState("Undergraduate Assistant");
  const [department, setDepartment] = useState(
    "Computer Science And Engineering"
  );

  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setType("Undergraduate Assistant");
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setType("Grader");
  };
  const assistantRef = useRef();
  const [assistantIsVisible, setAssistantIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setAssistantIsVisible(entry.isIntersecting);
    });
    observer.observe(assistantRef.current);
  }, []);

  const [assistant, setAssistant] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ua = await axios.get(
          `${domain}/api/assistant/${department}/${type}/`
        );
        setAssistant(ua.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    fetchData();
  }, [type, department]);

  return (
    <div>
      <div ref={assistantRef} className={style.row1}>
        <h1 className={assistantIsVisible ? style.outtoph1 : style.outtoph1not}>
          UIU Academic Assistant
        </h1>
        <p className={assistantIsVisible ? style.outtopp : style.outtoppnot}>
          A bridge that helps students cross the river of knowledge, turning
          obstacles into stepping stones on their educational journey and and
          discover the path to their aspirations.
        </p>
      </div>
      <div className={style.row2}>
        <div className={style.row21}>
          <h2>Undergraduate Assistants (UA) and Graders List</h2>
          <p>{department}</p>
        </div>
        <div className={style.row22}>
          <select
            className={style.typeinput}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Department</option>
            <option value="Computer Science And Engineering">CSE</option>
            <option value="	Electrical And Electronics Engineering">EEE</option>
            <option value="Civil Engineering">CE</option>
          </select>
        </div>
      </div>
      <hr className={style.inline}></hr>
      <div className={style.row3}>
        <button
          onClick={handleClick1}
          className={isClicked ? style.uabtn : style.uabtnnot}
        >
          UA
        </button>
        <button
          onClick={handleClick2}
          className={isClicked1 ? style.graderbtn : style.graderbtnnot}
        >
          Grader
        </button>
      </div>
      <div className={style.row4}>
        {assistant.map((item, inbox) => (
          <div className={style.row41}>
            <img src={`${domain}/media/${item.simage}`} alt="" />
            <div className={style.row411}>
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
        ))}
        {/* <div className={style.row41}>
          <img src={rakib} alt="" />
          <div className={style.row411}>
            <h4>Rakibul Hasan</h4>
            <h5>Student At UIU</h5>
            <p>Department Of Computer Science and Engineering</p>
            <span>Data Structure and algorithm | B | Summer 2023</span>
          </div>
        </div>
        <div className={style.row41}>
          <img src={rakib} alt="" />
          <div className={style.row411}>
            <h4>Rakibul Hasan</h4>
            <h5>Student At UIU</h5>
            <p>Department Of Computer Science and Engineering</p>
            <span>Data Structure and algorithm | B | Summer 2023</span>
          </div>
        </div>
        <div className={style.row41}>
          <img src={rakib} alt="" />
          <div className={style.row411}>
            <h4>Rakibul Hasan</h4>
            <h5>Student At UIU</h5>
            <p>Department Of Computer Science and Engineering</p>
            <span>Data Structure and algorithm | B | Summer 2023</span>
          </div>
        </div>
        <div className={style.row41}>
          <img src={rakib} alt="" />
          <div className={style.row411}>
            <h4>Rakibul Hasan</h4>
            <h5>Student At UIU</h5>
            <p>Department Of Computer Science and Engineering</p>
            <span>Data Structure and algorithm | B | Summer 2023</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AssistantDashboard;
