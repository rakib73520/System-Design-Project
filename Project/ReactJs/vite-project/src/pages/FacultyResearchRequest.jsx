import React from "react";
import { useState, useRef } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearchFaculty from "../components/HeaderResearchFaculty";
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
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowLeft,
  faDeleteLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import style from "./../assets/css/FacultyResearchRequest.module.css";

const FacultyResearchRequest = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);
  return (
    <div>
      <Header
        bellClick={bellClick}
        searchClick={searchClick}
        setbellClick={setbellClick}
        setsearchClick={setsearchClick}
      />
      <HeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
        setsearchClick={setsearchClick}
      />
      <HeaderResearchFaculty />

      <div className={style.reportinfo}>
        <h1>Thesis Supervising Request</h1>
        <div className={style.infoheader}>
          <h3>Team Information</h3>
          <h3>Working Domain</h3>
          <h3>Action</h3>
        </div>
        <div className={style.infobody}>
          <div className={style.bodyrow}>
            <div className={style.col1}>
              <div className={style.col11}>
                <img src={rakib} alt="" />
                <div className={style.col111}>
                  <h4>Rakibul Hasan</h4>
                  <p>
                    has requested your supervision for their research project.
                  </p>
                </div>
              </div>
              <h4 className={style.detailtitle}>Other Members</h4>
              <div className={style.col12}>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
              </div>
            </div>
            <div className={style.col2}>
              <h4>
                Greetings, sir. We will be working on the following domain
              </h4>
              <div className={style.col21}>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
              </div>
            </div>
            <div className={style.col3}>
              <button className={style.recommend}>Accept</button>
              <button className={style.ignore}>Reject</button>
            </div>
          </div>
          <div className={style.bodyrow}>
            <div className={style.col1}>
              <div className={style.col11}>
                <img src={rakib} alt="" />
                <div className={style.col111}>
                  <h4>Rakibul Hasan</h4>
                  <p>
                    has requested your supervision for their research project.
                  </p>
                </div>
              </div>
              <h4 className={style.detailtitle}>Other Members</h4>
              <div className={style.col12}>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
                <div className={style.col121}>
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
              </div>
            </div>
            <div className={style.col2}>
              <h4>
                Greetings, sir. We will be working on the following domain
              </h4>
              <div className={style.col21}>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
                <div className={style.col211}>
                  <FontAwesomeIcon
                    className={style.angleicon}
                    icon={faAngleRight}
                  />
                  <h3>Medical Image</h3>
                </div>
              </div>
            </div>
            <div className={style.col3}>
              <button className={style.recommend}>Accept</button>
              <button className={style.ignore}>Reject</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FacultyResearchRequest;
