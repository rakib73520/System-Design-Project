import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/StudentResearchAddMember.module.css";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import {
  faPlus,
  faCodeBranch,
  faCircleCheck,
  faSquareCheck,
  faTrash,
  faPen,
  faXmark,
  faStar,
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
  faAngleRight,
  faClock,
  faDeleteLeft,
  faCircleArrowRight,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

const StudentResearchAddMember = () => {
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
      <HeaderResearch />

      <div className={style.reportinfo}>
        <h1>Available Student For Research Project</h1>
        <div className={style.infoheader}>
          <h3>Student Information</h3>
          <h3>Action</h3>
        </div>
        <div className={style.infobody}>
          <div className={style.bodyrow}>
            <div className={style.row1}>
              <img src={rakib} alt="" />
              <div className={style.row11}>
                <h4>Rakibul Hasan</h4>
                <h5 className={style.row11h51}>Student At UIU</h5>
                <h5 className={style.row11h52}>ID : 011202106</h5>
                <p>Department Of Computer Science and Engineering</p>
              </div>
            </div>
            <div className={style.row121}>
              <button className={style.selectbtn}>Add</button>
            </div>
          </div>
          <div className={style.bodyrow}>
            <div className={style.row1}>
              <img src={rakib} alt="" />
              <div className={style.row11}>
                <h4>Rakibul Hasan</h4>
                <h5 className={style.row11h51}>Student At UIU</h5>
                <h5 className={style.row11h52}>ID : 011202106</h5>
                <p>Department Of Computer Science and Engineering</p>
              </div>
            </div>
            <div className={style.row121}>
              <button className={style.selectbtn}>Add</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentResearchAddMember;
