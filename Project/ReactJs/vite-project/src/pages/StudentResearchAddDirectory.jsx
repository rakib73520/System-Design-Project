import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import style from "./../assets/css/StudentResearchAddDirectory.module.css";
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

import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";

const StudentResearchAddDirectory = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

  const [isCourseSearch, setIsCourseSearch] = useState(false);

  const handlecoursesearch = () => {
    setIsCourseSearch(!isCourseSearch);
  };
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

      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn}>Back</button>
            </div>
            <div className={style.row12}>
              <h3>Add Directory</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Directory name</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Directory Name"
                  />
                </div>
              </div>

              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Comments</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.sectioninput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Messege"
                  />
                </div>
              </div>
              <button className={style.submitbtn}>Ask</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentResearchAddDirectory;
