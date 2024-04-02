import React from "react";
import uiulogo1 from "./../assets/media/images/uiulogo1.png";
import rainimg from "./../assets/media/images/rain2.jpg";
import style from "./../assets/css/StudentSignup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSignup = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [completedCredit, setCompletedCredit] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("none");
  const [student, setStudent] = useState([]);

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

  useEffect(() => {
    setError(error);
    const createUser = async () => {
      let studentdata = new FormData();
      studentdata.append("fullname", fullName);
      studentdata.append("studentid", studentId);
      studentdata.append("email", email);
      studentdata.append("cgpa", cgpa);
      studentdata.append("completedcredit", completedCredit);
      studentdata.append("department", department);
      studentdata.append("password", password);

      try {
        const response = await axios.post(
          `${domain}/api/studentuser/`,
          studentdata
        );
        const data = {
          access: "yes",
          fullname: response.data.fullname,
          studentid: response.data.studentid,
          email: response.data.email,
          cgpa: response.data.cgpa,
          completedcredit: response.data.completedcredit,
          department: response.data.department,
          password: response.data.password,
          gender: "",
          website: "",
          github: "",
          linkedin: "",
          bio: "",
          image: response.data.image,
          id: response.data.id,
          company: "",
          position: "",
          alumni: 0,
          report: 0,
        };
        const stringdata = JSON.stringify(data);
        localStorage.setItem("student", stringdata);
        navigate("/studentdashboard");
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    if (error == "ok") {
      createUser();
    }
  }, [error]);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (
      fullName == "" ||
      studentId == "" ||
      email == "" ||
      cgpa == "" ||
      completedCredit == "" ||
      department == "" ||
      password == ""
    ) {
      setError("All Fields Are Required!");
    } else if (!email.endsWith("@gmail.com")) {
      setError("Email Is Not Valid!");
    } else if (cgpa > 4) {
      setError("CGPA Is Not Valid!");
    } else if (completedCredit > 137) {
      setError("Completed Credit Is Not Valid!");
    } else {
      let flag = 0;
      for (let index = 0; index < student.length; index++) {
        const user = student[index];
        if (user.studentid == studentId || user.email == email) {
          setError("User Already Exists!");
          flag++;
          break;
        }
      }
      if (flag == 0) {
        setError("ok");
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
        onClick={() => navigate(-1)}
      />
      <div className={style.login}>
        <img src={uiulogo1} alt="" />
        <h2>Signup</h2>
        <div
          className={style.error}
          style={
            error == "none" || error == "ok" ? { visibility: "hidden" } : {}
          }
        >
          <p className={style.errormsg}>{error}</p>
        </div>
        <div className={style.login1}>
          <form action="" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              className={style.courseinput}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Student ID"
              className={style.courseinput}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={style.courseinput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="CGPA"
              className={style.courseinput}
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
            <input
              type="number"
              placeholder="Completed Credit"
              className={style.courseinput}
              value={completedCredit}
              onChange={(e) => setCompletedCredit(e.target.value)}
            />
            <select
              className={style.typeinput}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="" disabled selected>
                Select Department
              </option>
              <option value="Computer Science And Engineering">CSE</option>
              <option value="Electrical and Electronics Engineering">
                EEE
              </option>
              <option value="Civil Engineering">CE</option>
            </select>
            <input
              type="text"
              placeholder="Password"
              className={style.courseinput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.loginbtn}>REGISTER</button>
          </form>
        </div>
        <div className={style.login2}>
          <h3>Already have an account?</h3>
          <button
            className={style.registerbtn}
            onClick={() => navigate("/studentlogin")}
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
