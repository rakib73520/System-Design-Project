import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/StudentProfileUpdate.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentProfileUpdate = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [fullName, setFullName] = useState(studentdata.fullname);
  const [email, setEmail] = useState(studentdata.email);
  const [cgpa, setCgpa] = useState(studentdata.cgpa);
  const [completedCredit, setCompletedCredit] = useState(
    studentdata.completedcredit
  );
  const [department, setDepartment] = useState(studentdata.department);
  const [gender, setGender] = useState(studentdata.gender);
  const [website, setWebsite] = useState(studentdata.website);
  const [github, setGithub] = useState(studentdata.github);
  const [linkedin, setLinkedin] = useState(studentdata.linkedin);
  const [bio, setBio] = useState(studentdata.bio);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedata = new FormData();
    updatedata.append("fullname", fullName);
    updatedata.append("studentid", studentdata.studentid);
    updatedata.append("email", email);
    updatedata.append("cgpa", cgpa);
    updatedata.append("completedcredit", completedCredit);
    updatedata.append("department", department);
    updatedata.append("password", studentdata.password);
    updatedata.append("gender", gender);
    updatedata.append("website", website);
    updatedata.append("github", github);
    updatedata.append("linkedin", linkedin);
    updatedata.append("bio", bio);
    if (image) {
      updatedata.append("image", image);
    }
    try {
      const response = await axios.put(
        `${domain}/api/studentuser/${studentdata.id}/`,
        updatedata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      studentdata.fullname = response.data.fullname;
      studentdata.email = response.data.email;
      studentdata.cgpa = response.data.cgpa;
      studentdata.completedcredit = response.data.completedcredit;
      studentdata.department = response.data.department;
      studentdata.gender = response.data.gender;
      studentdata.website = response.data.website;
      studentdata.github = response.data.github;
      studentdata.linkedin = response.data.linkedin;
      studentdata.bio = response.data.bio;
      studentdata.image = response.data.image;
      const stringdata = JSON.stringify(studentdata);
      localStorage.setItem("student", stringdata);
      navigate(-1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  };

  return (
    <div>
      <div className={style.updaeprofile}>
        <div className={style.updateprofilecontainer}>
          <h1>Update Profile</h1>

          <div className={style.profileimagesection}>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Profile" />
            ) : (
              <img src={`${domain}/${studentdata.image}`} alt="" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <label>Full Name :</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>CGPA :</label>
            <input
              type="number"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />

            <label>Completed Credit :</label>
            <input
              type="number"
              value={completedCredit}
              onChange={(e) => setCompletedCredit(e.target.value)}
            />

            <label>Gender :</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label>Department :</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="Computer Science And Engineering">CSE</option>
              <option value="Electrical and Electronics Engineering">
                EEE
              </option>
              <option value="Civil Engineering">CE</option>
            </select>

            <label>Website Link :</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <label>Github Link :</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />

            <label>LinkedIn Link :</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <label>Bio :</label>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <div className={style.buttoncontainer}>
              <button type="submit">Save</button>
              <button type="button" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileUpdate;
