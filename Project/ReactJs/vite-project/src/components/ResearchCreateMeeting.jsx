import React from "react";
import { useState } from "react";
import style from "./../assets/css/ResearchCreateMeeting.module.css";
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

const ResearchCreateMeeting = () => {
  return (
    <div>
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn}>Back</button>
            </div>
            <div className={style.row12}>
              <h3>Create a meeting with Project members</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Meeting Link</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Meeting link"
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Meeting Date</h4>
                </div>
                <div className={style.row212}>
                  <input className={style.dateinput} type="date" />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Meeting Time</h4>
                </div>
                <div className={style.row212}>
                  <input className={style.timeinput} type="time" />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>About Meeting</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.sectioninput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write about this meeting.."
                  />
                </div>
              </div>

              <button className={style.submitbtn}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchCreateMeeting;
