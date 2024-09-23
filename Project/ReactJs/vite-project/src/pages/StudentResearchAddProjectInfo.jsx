import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import style from "./../assets/css/StudentResearchAddProjectInfo.module.css";
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

const StudentResearchAddProjectInfo = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);
  const [isCourseSearch, setIsCourseSearch] = useState(false);

  const handlecoursesearch = () => {
    setIsCourseSearch(!isCourseSearch);
  };
  function updateFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }
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
              <h3>Add your Research Project information</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Title</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write title"
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Description</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.sectioninput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write description.."
                  />
                </div>
              </div>
              <div className={style.row21} style={{ marginTop: "60px" }}>
                <div className={style.row211}>
                  <h4>If Necessaray</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput1}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Course Name"
                  />
                  <input
                    className={style.courseinput2}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Section"
                  />
                </div>
              </div>

              <button className={style.submitbtn}>Create</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentResearchAddProjectInfo;
