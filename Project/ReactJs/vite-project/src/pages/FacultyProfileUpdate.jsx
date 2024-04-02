import React from "react";
import { useState, useEffect } from "react";
import noimage from "./../assets/media/images/noimage.png";
import style from "./../assets/css/StudentProfileUpdate.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyProfileUpdate = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const facultylocal = localStorage.getItem("faculty");
  const facultydata = JSON.parse(facultylocal);

  useEffect(() => {
    if (facultydata.access == "no") {
      navigate("/");
    }
  }, []);

  const [fullName, setFullName] = useState(facultydata.fullname);
  const [department, setDepartment] = useState(facultydata.department);
  const [facultyType, setFacultyType] = useState(facultydata.facultytype);
  const [gender, setGender] = useState(facultydata.gender);
  const [website, setWebsite] = useState(facultydata.website);
  const [github, setGithub] = useState(facultydata.github);
  const [linkedin, setLinkedin] = useState(facultydata.linkedin);
  const [bio, setBio] = useState(facultydata.bio);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedata = new FormData();
    updatedata.append("fullname", fullName);
    updatedata.append("email", facultydata.email);
    updatedata.append("department", department);
    updatedata.append("password", facultydata.password);
    updatedata.append("facultytype", facultyType);
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
        `${domain}/api/facultyuser/${facultydata.id}/`,
        updatedata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      facultydata.fullname = response.data.fullname;
      facultydata.department = response.data.department;
      facultydata.facultytype = response.data.facultytype;
      facultydata.gender = response.data.gender;
      facultydata.website = response.data.website;
      facultydata.github = response.data.github;
      facultydata.linkedin = response.data.linkedin;
      facultydata.bio = response.data.bio;
      facultydata.image = response.data.image;
      const stringdata = JSON.stringify(facultydata);
      localStorage.setItem("faculty", stringdata);
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
              <img src={`${domain}/${facultydata.image}`} alt="" />
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

            <label>Faculty Type :</label>
            <select
              value={facultyType}
              onChange={(e) => setFacultyType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Professor">Professor</option>
              <option value="Lecturer">Lecturer</option>
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

            <label>Gender :</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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

export default FacultyProfileUpdate;
