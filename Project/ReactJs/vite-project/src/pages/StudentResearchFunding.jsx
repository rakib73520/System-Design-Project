import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import style from "./../assets/css/StudentResearchFunding.module.css";
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

const StudentResearchFunding = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);
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
              <h3>To request funding, please complete the following form</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Amount in BDT</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write amount"
                  />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Start Date</h4>
                </div>
                <div className={style.row212}>
                  <input className={style.dateinput} type="date" />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>End Date</h4>
                </div>
                <div className={style.row212}>
                  <input className={style.dateinput} type="date" />
                </div>
              </div>
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Upload Project</h4>
                </div>
                <div className={style.row212}>
                  <input type="file" id="fileInput" onChange={updateFileName} />
                  <label htmlFor="fileInput" className={style.eventcreate4vis}>
                    <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                    <h4>Add File</h4>
                  </label>
                </div>
              </div>
              <div className={style.eventcreate7}>
                <span id="fileName">No file chosen</span>
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

export default StudentResearchFunding;
