import React from "react";
import uiulogo1 from "./../assets/media/images/uiulogo1.png";
import lakeimg from "./../assets/media/images/lake.png";
import style from "./../assets/css/StudentLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyLogin = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    for (let i = 0; i < faculty.length; i++) {
      const user = faculty[i];
      if (email == "") {
        setError("All Fields Are Required!");
      } else if (password == "") {
        setError("All Fields Are Required!");
      } else if (user.email == email && user.password == password) {
        setError("ok");
        const data = {
          access: "yes",
          fullname: user.fullname,
          email: user.email,
          department: user.department,
          facultytype: user.facultytype,
          password: user.password,
          gender: user.gender,
          website: user.website,
          github: user.github,
          linkedin: user.linkedin,
          bio: user.bio,
          image: user.image,
          id: user.id,
        };
        const stringdata = JSON.stringify(data);
        localStorage.setItem("faculty", stringdata);
        navigate("/facultydashboard");
      } else if (user.email == email && user.password != password) {
        setError("Password Does Not Match");
      } else if (user.email != email && user.password == password) {
        setError("Email Does Not Match");
      } else {
        setError("User Does Not Exist");
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
              type="email"
              placeholder="Enter Your Email"
              className={style.courseinput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={() => navigate("/facultysignup")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
