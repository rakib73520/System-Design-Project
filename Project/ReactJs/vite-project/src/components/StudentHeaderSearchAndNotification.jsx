import React, { useState,useEffect } from "react";
import style from "./../assets/css/HeaderSearchAndNotification.module.css";
import uiu from "./../assets/media/images/uiulogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const StudentHeaderSearchAndNotification = ({ bellClick, searchClick }) => {

  const domain = "http://127.0.0.1:8000";
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  const [notification, setNotification] = useState([]);
  const [action, setAction] = useState(0);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get(`${domain}/api/notification/${studentdata.id}/${"student"}/`);
        setNotification(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getNotification();
  }, [bellClick,action]);

  const handledelete = async(id) =>{
    try {
      await axios.get(`${domain}/api/notificationdelete/${id}/`);
      setAction(action+1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  }

  const handledeleteall = async() =>{
    try {
      await axios.get(`${domain}/api/notificationdeleteall/${studentdata.id}/${"student"}/`);
      setAction(action+1);
    } catch (error) {
      console.log("Error connecting to the backend!");
    }
  }

  return (
    <div>
      <div
        className={
          bellClick === 1 ? style.headertopnotification : style.bellnotclicked
        }
      >
        <div className={style.notificationheader}>
          <h3>Notifications</h3>
          <h4 onClick={()=>handledeleteall()}>Clear All</h4>
        </div>
        <div className={style.notificationout}>
          {
            notification.map((item,index) => (
              <div className={style.notificationbody}>
              <img src={item.image ? `${domain}/media/${item.image}` : uiu} alt="" />
              <h4>
                {item.notification}
              </h4>
              <FontAwesomeIcon
                className={style.notificationdelete}
                icon={faDeleteLeft}
                onClick={()=>handledelete(`${item.id}`)}
              />
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default StudentHeaderSearchAndNotification;
