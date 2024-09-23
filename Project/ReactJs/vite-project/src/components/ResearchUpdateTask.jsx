import React from "react";
import { useState } from "react";
import style from "./../assets/css/ResearchAddTask.module.css";
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

const ResearchUpdateTask = () => {
  const [isDirSearch, setIsDirSearch] = useState(false);
  const [isMemSearch, setIsMemSearch] = useState(false);

  const handledirsearch = () => {
    setIsDirSearch(!isDirSearch);
  };
  const handlememsearch = () => {
    setIsMemSearch(!isMemSearch);
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
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn}>Back</button>
            </div>
            <div className={style.row12}>
              <h3>Update Task</h3>
            </div>
          </div>
          <div className={style.row2}>
            <form action="">
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Task Title</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write Task Title"
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
                    placeholder="Write Comment.."
                  />
                </div>
              </div>
              <div
                className={style.row21}
                style={{ position: "relative", top: "60px" }}
              >
                <div className={style.row211}>
                  <h4>Assigned To</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Find Member"
                    onClick={handlememsearch}
                    onBlur={handlememsearch}
                  />
                </div>
              </div>
              <div className={style.row21} style={{ marginTop: "60px" }}>
                <div className={style.row211}>
                  <h4>Directory</h4>
                </div>
                <div className={style.row212}>
                  <input
                    className={style.courseinput}
                    type="text"
                    name=""
                    id=""
                    placeholder="Choose Directory"
                    onClick={handledirsearch}
                    onBlur={handledirsearch}
                  />
                </div>
              </div>
              <div className={style.row21}>
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

              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Add File (If any)</h4>
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
              <div className={style.dir}>
                <div
                  style={isDirSearch ? {} : { visibility: "hidden" }}
                  className={style.searchresult}
                >
                  <h4>Market Research 2014</h4>
                </div>
              </div>
              <div className={style.mem}>
                <div
                  style={isMemSearch ? {} : { visibility: "hidden" }}
                  className={style.searchresult}
                >
                  <img src={rakib} alt="" />
                  <h4>Rakibul Hasan</h4>
                </div>
              </div>

              <button className={style.submitbtn}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchUpdateTask;
