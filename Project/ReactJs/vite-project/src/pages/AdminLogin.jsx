import React from "react";
import uiulogo1 from "./../assets/media/images/uiulogo1.png";
import library from "./../assets/media/images/library.jpg";
import style from "./../assets/css/StudentLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState("none");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await axios.get(`${domain}/api/adminuser/`);
        setAdmin(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getUserInformation();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    for (let i = 0; i < admin.length; i++) {
      const user = admin[i];
      console.log(user.username, ",", user.department, ",", user.password);
      if (username == "") {
        setError("All Fields Are Required!");
      } else if (password == "") {
        setError("All Fields Are Required!");
      } else if (department == "") {
        setError("All Fields Are Required!");
      } else if (
        user.username == username &&
        user.password == password &&
        user.department == department
      ) {
        setError("ok");
        const data = {
          access: "yes",
          department: user.department,
          id: user.id,
          image: user.image,
        };
        const stringdata = JSON.stringify(data);
        localStorage.setItem("admin", stringdata);
        navigate("/admindashboard");
      } else {
        setError("User Does Not Exist");
      }
    }
  };
  return (
    <div
      className={style.studentloginbody}
      style={{ backgroundImage: `url("${library}")` }}
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
              type="text"
              placeholder="Enter Your Username"
              className={style.courseinput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              <option value="Electrical And Electronics Engineering">
                EEE
              </option>
              <option value="Civil Engineering">CE</option>
            </select>
            <input
              type="text"
              placeholder="Enter Your Password"
              className={style.courseinput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.loginbtn}>LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
