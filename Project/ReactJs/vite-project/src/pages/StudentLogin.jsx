import React from "react";
import uiulogo1 from "./../assets/media/images/uiulogo1.png";
import rainimg from "./../assets/media/images/rain2.jpg";
import style from "./../assets/css/StudentLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [error, setError] = useState("none");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await axios.get(`${domain}/api/studentuser/`);
        setStudent(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getUserInformation();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    for (let i = 0; i < student.length; i++) {
      const user = student[i];
      if (studentId == "") {
        setError("All Fields Are Required!");
      } else if (password == "") {
        setError("All Fields Are Required!");
      } else if (user.studentid == studentId && user.password == password) {
        setError("ok");
        const data = {
          access: "yes",
          fullname: user.fullname,
          studentid: user.studentid,
          email: user.email,
          cgpa: user.cgpa,
          completedcredit: user.completedcredit,
          department: user.department,
          password: user.password,
          gender: user.gender,
          website: user.website,
          github: user.github,
          linkedin: user.linkedin,
          bio: user.bio,
          image: user.image,
          id: user.id,
          company: user.company,
          position: user.position,
          alumni: user.alumni,
          report: user.report,
        };
        const stringdata = JSON.stringify(data);
        localStorage.setItem("student", stringdata);
        if (user.report == 1) {
          navigate(
            "/studentdashboard/studentassistantdashboard/studentassistantassociation"
          );
        } else {
          navigate("/studentdashboard");
        }
      } else if (user.studentid == studentId && user.password != password) {
        setError("Password Does Not Match");
      } else if (user.studentid != studentId && user.password == password) {
        setError("Student ID Does Not Match");
      } else {
        setError("User Does Not Exist");
      }
    }
  };

  return (
    <div
      className={style.studentloginbody}
      style={{ backgroundImage: `url("${rainimg}")` }}
    >
      <FontAwesomeIcon
        className={style.backhome}
        icon={faHome}
        onClick={() => navigate("/", { replace: true })}
      />
      <div className={style.login}>
        <img src={uiulogo1} alt="" />
        <h2>Login</h2>
        <div
          className={style.error}
          style={
            error == "none" || error == "ok" ? { visibility: "hidden" } : {}
          }
        >
          <p className={style.errormsg}>{error}</p>
        </div>
        <div className={style.login1}>
          <form action="" onSubmit={handleLogin}>
            <input
              type="number"
              placeholder="Enter Your Student ID"
              className={style.courseinput}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Your Password"
              className={style.courseinput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.loginbtn}>LOG IN</button>
          </form>
        </div>
        <div className={style.login2}>
          <h3>Not registered yet?</h3>
          <button
            className={style.registerbtn}
            onClick={() => navigate("/studentsignup")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
