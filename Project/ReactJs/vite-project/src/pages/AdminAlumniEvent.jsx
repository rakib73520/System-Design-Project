import React from "react";
import { useState, useEffect } from "react";
import style from "./../assets/css/AdminAlumniEvent.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import AdminAlumniEventHeader from "../components/AdminAlumniEventHeader";
import AdminFooter from "../components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAlumniEvent = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const adminlocal = localStorage.getItem("admin");
  const admindata = JSON.parse(adminlocal);

  useEffect(() => {
    if (admindata.access == "no") {
      navigate("/");
    }
  }, []);

  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      admindata.access = "no";
      const updatedadmindata = JSON.stringify(admindata);
      localStorage.setItem("admin", updatedadmindata);
      navigate("/");
    }
  }, [logoutClick]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [action, setAction] = useState(0);
  const [error, setError] = useState("none");

  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    setImage(fileInput.files[0]);
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/eventshow/${admindata.department}/`
        );
        setEventData(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getEventData();
  }, [action]);

  useEffect(() => {
    setError(error);
    const createEvent = async () => {
      let eventdata = new FormData();
      eventdata.append("title", title);
      eventdata.append("description", description);
      eventdata.append("date", date);
      eventdata.append("time", time);
      eventdata.append("image", image);
      eventdata.append("department", admindata.department);
      try {
        await axios.post(`${domain}/api/postevent/`, eventdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAction(action + 1);
        setError("Event Posted Successfully");
      } catch (error) {
        setError("none");
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    if (error == "Posting...") {
      createEvent();
    }
  }, [error]);

  const handlePostEvent = async (event) => {
    event.preventDefault();
    if (
      title == "" ||
      description == "" ||
      date == "" ||
      time == "" ||
      image == ""
    ) {
      setError("All Field Is Required!");
    } else {
      setError("Posting...");
    }
  };

  const handleEventDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (isConfirmed) {
      try {
        await axios.get(`${domain}/api/deleteevent/${id}/`);
        setAction(action + 1);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    }
  };

  return (
    <div className={style.studentappbody}>
      <AdminAlumniEventHeader setLogoutClick={setLogoutClick} />
      <div className={style.report1}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "rgb(190, 189, 189)" }}
            className={style.studenticon}
            icon={faNewspaper}
          />
          <h2>Create Alumni Event</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div
            className={style.error}
            style={
              error == "none"
                ? { visibility: "hidden" }
                : error === "Event Posted Successfully"
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    border: "green",
                  }
                : error === "Posting..."
                ? {}
                : {}
            }
          >
            <p className={style.errormsg}>{error}</p>
          </div>
          <form
            className={style.eventcreate}
            action=""
            onSubmit={handlePostEvent}
          >
            <div className={style.eventcreate1}>
              <h4>Event Title</h4>
              <input
                type="text"
                placeholder="Write Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={style.eventcreate2}>
              <h4>Description</h4>
              <textarea
                type="text"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={style.eventcreate3}>
              <h4>Date & Time</h4>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className={style.eventcreate4}>
              <h4>Image</h4>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={updateFileName}
              />
              <label htmlFor="fileInput" className={style.eventcreate4vis}>
                <FontAwesomeIcon className={style.imgicon} icon={faImage} />
                <h4>Add Image</h4>
              </label>
            </div>
            <div className={style.eventcreate5}>
              <span id="fileName">No file chosen</span>
            </div>
            <button type="submit" className={style.create}>
              Create
            </button>
          </form>
        </div>
      </div>
      <div className={style.report2}>
        <div className={style.reportheading}>
          <FontAwesomeIcon
            style={{ color: "gray" }}
            className={style.studenticon}
            icon={faClipboardList}
          />
          <h2>Upcomming Alumni Event</h2>
        </div>
        <hr />
        <div className={style.reportinfo}>
          <div className={style.infoheader}>
            <h3>Event Title</h3>
            <h3>Description</h3>
            <h3>Department</h3>
            <h3>Date & Time</h3>
            <h3>Location</h3>
            <h3>Action</h3>
          </div>
          <div className={style.infobody1}>
            {eventData.map((item, index) => (
              <div className={style.bodyrow1}>
                <div className={style.row1}>
                  <h4>
                    {item.title} | {item.date}
                  </h4>
                </div>
                <div className={style.row2}>
                  <h4>{item.description}</h4>
                </div>
                <div className={style.row3}>
                  <h4>Department Of {item.department}</h4>
                </div>
                <div className={style.row4}>
                  <h4>
                    {item.date} At {item.time}
                  </h4>
                </div>
                <div className={style.row5}>
                  <h4>Parment campus, Badda</h4>
                </div>
                <div className={style.row121}>
                  <button
                    className={style.rejectbtn}
                    onClick={() => handleEventDelete(`${item.id}`)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminAlumniEvent;
