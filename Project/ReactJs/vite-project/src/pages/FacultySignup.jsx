import React from "react";
import uiulogo1 from "./../assets/media/images/uiulogo1.png";
import lakeimg from "./../assets/media/images/lake.png";
import style from "./../assets/css/StudentSignup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultySignup = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyType, setFacultyType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("none");
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await axios.get(`${domain}/api/facultyuser/`);
        setFaculty(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getUserInformation();
  }, []);

  useEffect(() => {
    setError(error);
    const createUser = async () => {
      let facultydata = new FormData();
      facultydata.append("fullname", fullName);
      facultydata.append("email", email);
      facultydata.append("department", department);
      facultydata.append("facultytype", facultyType);
      facultydata.append("password", password);

      try {
        const response = await axios.post(
          `${domain}/api/facultyuser/`,
          facultydata
        );
        const data = {
          access: "yes",
          fullname: response.data.fullname,
          email: response.data.email,
          department: response.data.department,
          facultytype: response.data.facultytype,
          password: response.data.password,
          gender: "",
          website: "",
          github: "",
          linkedin: "",
          bio: "",
          image: response.data.image,
          id: response.data.id,
        };
        const stringdata = JSON.stringify(data);
        localStorage.setItem("faculty", stringdata);
        navigate("/facultydashboard");
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
      email == "" ||
      department == "" ||
      facultyType == "" ||
      password == ""
    ) {
      setError("All Fields Are Required!");
    } else if (
      department == "Computer Science And Engineering" &&
      !email.endsWith("@cse.uiu.ac.bd")
    ) {
      setError("Email Is Not Valid!");
    } else if (
      department == "Electrical and Electronics Engineering" &&
      !email.endsWith("@eee.uiu.ac.bd")
    ) {
      setError("Email Is Not Valid!");
    } else if (
      department == "Civil Engineering" &&
      !email.endsWith("@ce.uiu.ac.bd")
    ) {
      setError("Email Is Not Valid!");
    } else {
      let flag = 0;
      for (let index = 0; index < faculty.length; index++) {
        const user = faculty[index];
        if (user.email == email) {
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
      style={{ backgroundImage: `url("${lakeimg}")` }}
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
              type="email"
              placeholder="Email"
              className={style.courseinput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              className={style.typeinput}
              value={facultyType}
              onChange={(e) => setFacultyType(e.target.value)}
            >
              <option value="" disabled selected>
                Faculty Type
              </option>
              <option value="Professor">Professor</option>
              <option value="Lecturer">Lecturer</option>
            </select>
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
          <h3>Not registered yet?</h3>
          <button
            className={style.registerbtn}
            onClick={() => navigate("/facultylogin")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultySignup;
