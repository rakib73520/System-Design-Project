import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import style from "./../assets/css/StudentResearchFeedback.module.css";
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

const StudentResearchFeedback = () => {
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
              <h3>Give feedback for “Make class test quetions”</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4 style={{ position: "relative", bottom: "30px" }}>
                    Feedback
                  </h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Feedback"
                  />
                </div>
              </div>
              <div className={style.row21} style={{ marginTop: "30px" }}>
                <div className={style.row211}>
                  <h4>Status</h4>
                </div>
                <div className={style.row212}>
                  <select className={style.typeinput}>
                    <option value="" disabled selected>
                      Select Status
                    </option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <button className={style.submitbtn}>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentResearchFeedback;
