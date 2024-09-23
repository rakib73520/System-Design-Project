import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const [student, setStudent] = useState([]);
  const domain = "http://127.0.0.1:8000";

  // const getdata = async () => {
  //   const response = await axios.get(
  //     "http://127.0.0.1:8000/api/studentuser/8/"
  //   );
  //   setStudent(response.data);
  // };
  // useEffect(() => {
  //   getdata();
  // }, []);

  // const [id, setId] = useState("");
  // const [studentName, setStudentName] = useState("");
  // const [email, setEmail] = useState("");

  // const [user, setUser] = useState({ name: "", id: "" });
  // // setUser((prevUser) => ({ ...prevUser, id: "1234" }));
  // console.log(user.name);
  // const updateDictionary = () => {
  //   // Update the value of 'key2'
  //   setUser((prevState) => ({
  //     ...prevState, // Spread the previous state
  //     id: "newValue2", // Update the specific key
  //   }));
  // };
  // console.log(user.id);
  // const data = {
  //   user: "rakib",
  //   email: "go@mail.com",
  // };
  // localStorage.setItem("student", JSON.stringify(data));
  // const data1 = {
  //   user: "tarek",
  //   email: "tarek@mail.com",
  // };
  // localStorage.setItem("faculty", JSON.stringify(data1));

  // // Retrieving data from localStorage
  // const storedData = localStorage.getItem("student");
  // const parsedData = JSON.parse(storedData);

  // // Accessing the 'user' property
  // const userName = parsedData.user;

  // console.log(userName);
  // const storedData1 = localStorage.getItem("faculty");
  // const parsedData1 = JSON.parse(storedData1);

  // // Accessing the 'user' property
  // const userName1 = parsedData1.user;

  // console.log(userName1);

  // // Update the 'user' property
  // parsedData.user = "newUsername";

  // // Convert the object back into a JSON string
  // const updatedData = JSON.stringify(parsedData);

  // // Set the updated JSON string back in localStorage
  // localStorage.setItem("student", updatedData);
  // const storedData2 = localStorage.getItem("student");
  // const parsedData2 = JSON.parse(storedData2);

  // // Accessing the 'user' property
  // const userName2 = parsedData2.user;

  // console.log(userName2);

  // const [value, setValue] = useState("");
  const [file, setFiles] = useState("");

  const handleClick = async (e) => {
    // const now = new Date();
    // const datePart = now.toISOString().split("T")[0];
    // const timePart = now.toTimeString().split(" ")[0];
    // let jobdata = new FormData();
    // jobdata.append("jobtitle", "go");
    // jobdata.append("description", "go");
    // jobdata.append("username", "go");
    // jobdata.append("usertype", "fo");
    // jobdata.append("userposition", "go");
    // jobdata.append("userid", "1");
    // jobdata.append("date", value);
    e.preventDefault();
    const department = "Computer Science And Engineering";

    let formdata = new FormData();
    formdata.append("excel", file);
    formdata.append("name", "Rakib");
    try {
      const response = await axios.post(`${domain}/api/exceldata/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Job Posted Successfully");
    } catch (error) {
      console.log("Error connecting to the backend!");
      console.log(error);
    }
  };
  const a = "department";
  console.log("I am me" + a);

  const handleadd = async () => {
    // let studentdata = new FormData();
    // studentdata.append("fullname", id);
    // studentdata.append("studentid", studentName);
    // studentdata.append("email", email);
    // studentdata.append("cgpa", email);
    // studentdata.append("completedcredit", email);
    // studentdata.append("department", email);
    // studentdata.append("password", email);
    // await axios.post("http://127.0.0.1:8000/api/studentuser/", studentdata);
  };
  const [jobData, setJobData] = useState(["ok"]);

  return (
    <div>
      {/* {jobData.map((item, index) => {
        return <div>hi</div>;
      })} */}

      {/* <input type="date" onChange={(e) => setValue(e.target.value)} /> */}
      {/* <h1>Showing all student</h1>
      <p>{student.fullname}</p>
      <img className="" src={`http://127.0.0.1:8000/${student.image}`} /> */}
      {/* {student.map((student, index) => (
        <div key={index}>
          <p>ID: {student.fullname}</p>
          <p>Email: {student.email}</p>
          <img src={student.image} alt="" />
        </div>
      ))} */}
      {/* <div>
        <h1>Add Student</h1>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          name="studentname"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleadd}>Add</button>
      </div> */}
      <form action="" onSubmit={handleClick}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFiles(e.target.files[0])}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Practice;
