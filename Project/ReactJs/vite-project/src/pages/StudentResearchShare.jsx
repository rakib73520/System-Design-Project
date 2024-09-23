import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearch from "../components/StudentHeaderResearch";
import style from "./../assets/css/StudentResearchShare.module.css";
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

const StudentResearchShare = () => {
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
  const [isPublish, setIsPublish] = useState(0);
  const handlequeryyes = () => {
    setIsPublish(1);
  };
  const handlequeryno = () => {
    setIsPublish(2);
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
              <h3>Share your research project</h3>
            </div>
          </div>
          <div className={style.row2}>
            <div
              className={style.query}
              style={
                isPublish === 2 || isPublish === 1 ? { display: "none" } : {}
              }
            >
              <h4>Has your research project been published?</h4>
              <div className={style.queryselect}>
                <button className={style.yesbtn} onClick={handlequeryyes}>
                  Yes
                </button>
                <button className={style.nobtn} onClick={handlequeryno}>
                  No
                </button>
              </div>
            </div>
            <form action="">
              <div
                className={style.row21}
                style={
                  isPublish === 0 || isPublish === 2 ? { display: "none" } : {}
                }
              >
                <div className={style.row211}>
                  <h4>Publication Link</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter publication link.."
                  />
                </div>
              </div>
              <div
                className={style.row21}
                style={
                  isPublish === 0 || isPublish === 1 ? { display: "none" } : {}
                }
              >
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
              <div
                className={style.eventcreate7}
                style={
                  isPublish === 0 || isPublish === 1 ? { display: "none" } : {}
                }
              >
                <span id="fileName">No file chosen</span>
              </div>

              <button
                style={isPublish === 0 ? { display: "none" } : {}}
                className={style.submitbtn}
              >
                Share
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentResearchShare;
