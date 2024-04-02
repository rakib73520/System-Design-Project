import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/AlumniEvents.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Alumni from "./../assets/media/images/alumni.jpg";
import axios from "axios";

const AlumniHome = () => {
  const domain = "http://127.0.0.1:8000";
  const [department, setDepartment] = useState(
    "Computer Science And Engineering"
  );

  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/eventshow/${department}/`
        );
        setEventData(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getEventData();
  }, [department]);

  return (
    <div>
      <div className={style.outer}>
        <div
          className={style.image}
          style={{ backgroundImage: `url(${Alumni})` }}
        >
          <h1
            className={style.headline}
            style={{ color: "white", marginTop: 120 }}
          >
            Don’t Miss Awesome Story From Our Alumni
          </h1>
          <div className={style.btn}>
            <button
              className={style.buttonStyle}
              onClick={() => setDepartment("Computer Science And Engineering")}
            >
              CSE
            </button>
            <button
              className={style.buttonStyle}
              onClick={() =>
                setDepartment("Electrical And Electronics Engineering")
              }
            >
              EEE
            </button>
            <button
              className={style.buttonStyle}
              onClick={() => setDepartment("Civil Engineering")}
            >
              CE
            </button>
          </div>
        </div>
        <div className={style.eventTag}>
          <div>
            <h2 className={style.h2}>Alumni Events </h2>
            <p className={style.p2}>Department of {department}</p>
          </div>
        </div>

        <div className={style.container}>
          <div className={style.note}>
            <h1 className={style.head}>Upcoming Events</h1>
            <p style={{ fontSize: 22, color: "white", marginBottom: 0 }}>
              Alumni and friends of the University are invited to all of our
              get-togethers. No matter the occasion, these are great <br></br>{" "}
              opportunities to reconnect with fellow alums, reminisce your UIU
              experience, meet new friends, and most important – <br></br>
            </p>
            <p style={{ fontSize: 22, color: "white", marginTop: 0 }}>
              have fun!
            </p>
          </div>
          {eventData.map((item, index) => (
            <div className={style.Event}>
              <img
                className={style.img}
                src={`${domain}${item.image}`}
                alt=""
              ></img>
              <div className={style.eventDate}>
                <h1 className={style.date}>
                  {item.title} | <br></br>
                  {item.date}
                </h1>
                <p style={{ fontSize: 18, width: "500px" }}>
                  {item.description}
                </p>
                <div className={style.dateAndLocation}>
                  <div className={style.dateTime}>
                    <FontAwesomeIcon
                      style={{ marginTop: 20 }}
                      className={style.calendar}
                      icon={faCalendarWeek}
                    />
                    <p style={{ fontSize: 16, marginLeft: 10 }}>
                      {item.date}
                      <br></br>
                      {item.time}
                    </p>
                  </div>
                  <div className={style.dateTime} style={{ marginLeft: 15 }}>
                    <FontAwesomeIcon
                      style={{ marginTop: 20 }}
                      className={style.calendar}
                      icon={faLocationDot}
                    />
                    <p style={{ fontSize: 16, marginLeft: 8 }}>
                      Parment campus, Badda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniHome;
