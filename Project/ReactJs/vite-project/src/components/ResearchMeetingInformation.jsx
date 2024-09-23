import React from "react";
import { useState } from "react";
import style from "./../assets/css/ResearchMeetingInformation.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPaperPlane,
  faComments,
  faNewspaper,
  faAddressCard,
  faUserTie,
  faSearch,
  faUserCheck,
  faUserPen,
  faChalkboardTeacher,
  faCommentsDollar,
  faHandPointDown,
  faClipboardList,
  faImage,
  faCaretDown,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const ResearchMeetingInformation = () => {
  return (
    <div>
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn}>Back</button>
            </div>
            <div className={style.row12}>
              <h3>Meeting with Swakkhar Shatabda </h3>
            </div>
          </div>
          <div className={style.row2}>
            <div className={style.row21}>
              <h4>About this meeting</h4>
              <p>
                I have seen your last 10 days work, and i have find some problem
                and correction thats need to be done as fast as possible. all of
                you have to join this meeting, i have some important
                announcement to make.
              </p>
              <div className={style.row211}>
                <p>Created by </p>
                <img src={rakib} alt="" />
                <p>Swakkhar Shatabda on 31/12/2023 at 7.30pm</p>
              </div>
              <div className={style.row212}>
                <h4 className={style.row2121}>Meeting starts in</h4>
                <h3>1:08:30</h3>
              </div>
              <button className={style.joinbtn}>Join Meeting</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchMeetingInformation;
