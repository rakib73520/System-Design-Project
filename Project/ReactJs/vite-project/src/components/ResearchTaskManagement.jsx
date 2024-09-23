import React from "react";
import { useState } from "react";
import style from "./../assets/css/ResearchTaskManagement.module.css";
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
  faEdit,
  faChalkboardTeacher,
  faCommentsDollar,
  faHandPointDown,
  faClipboardList,
  faImage,
  faCaretDown,
  faFile,
  faCodeBranch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ResearchTaskManagement = () => {
  return (
    <div>
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <div className={style.row11}>
              <button className={style.backbtn}>Back</button>
            </div>
            <div className={style.row12}>
              <FontAwesomeIcon
                className={style.branchicon}
                icon={faCodeBranch}
              />
              <h3>Market research 2014 | Directory</h3>
            </div>
          </div>
          <div className={style.outer}>
            <div className={style.row2}>
              <FontAwesomeIcon
                className={style.listicon}
                icon={faClipboardList}
              />
              <div className={style.row21}>
                <div className={style.row211}>
                  <h4>Finish monthly reporting lore</h4>
                  <div className={style.row2111}>
                    <p>Added on 31/12/2023 at 7.30pm by</p>
                    <img src={rakib} alt="" />
                    <p>Rakibul Hasan</p>
                  </div>
                </div>
                <div className={style.row212}>
                  <FontAwesomeIcon className={style.editicon} icon={faEdit} />
                  <FontAwesomeIcon
                    className={style.deleteicon}
                    icon={faTrash}
                  />
                </div>
              </div>
            </div>
            <div className={style.row3}>
              <h4>Assigned To</h4>
              <img src={rakib} alt="" />
              <h4 className={style.assign}>Rakibul Hasan</h4>
            </div>

            <div className={style.row312}>
              <h4 className={style.r1}>Comments</h4>
              <p className={style.r2}>
                I have provided my updated methodoloy on the following
                directory. check the updated files and let me know is their any
                correction needed. i will highly suggest to sadman to complete
                this part as if he is more fimiliar with this field.
              </p>
              <h4 className={style.r3}>Directory</h4>
              <a className={style.r4}>Market research 2014 | Introduction1</a>
            </div>
            <hr className={style.grayline} />
          </div>
          <div className={style.outer1}>
            <div className={style.outer11}>
              <h3>Task Update</h3>
              <div className={style.row212assign}>
                <FontAwesomeIcon className={style.editicon} icon={faEdit} />
                <FontAwesomeIcon className={style.deleteicon} icon={faTrash} />
              </div>
            </div>
          </div>
          <div className={style.outer2}>
            <div className={style.row31}>
              <div className={style.row311}>
                <img src={rakib} alt=""></img>
                <div className={style.row3111}>
                  <h4>Md Tarek Hasan</h4>
                  <p>updated on 31/12/2023 at 7.30pm</p>
                </div>
              </div>
              <div className={style.row312assign}>
                <h4 className={style.r1}>Comments</h4>
                <p className={style.r2}>
                  I have provided my updated methodoloy on the following
                  directory. check the updated files and let me know is their
                  any correction needed. i will highly suggest to sadman to
                  complete this part as if he
                </p>
                <h4 className={style.r3}>Directory</h4>
                <a className={style.r4}>Market research 2014 | Introduction1</a>
                <h4 className={style.r3}>Status</h4>
                <p className={style.r5}>In progress</p>
                <h4 className={style.r3}>Feedback</h4>
                <div className={style.feedback}>
                  <div className={style.feedback1}>
                    <img src={rakib} alt="" />
                    <div className={style.feedback11}>
                      <h4>Rakibul Hasan (Team Leader)</h4>
                      <p>updated on 31/12/2023 at 7.30pm</p>
                    </div>
                  </div>
                  <div className={style.feedback2}>
                    <p>
                      I have provided my updated methodoloy on the following
                      directory. check the updated files and let me know is
                      their any correction needed.
                    </p>
                  </div>
                </div>
                <div className={style.feedback}>
                  <div className={style.feedback1}>
                    <img src={rakib} alt="" />
                    <div className={style.feedback11}>
                      <h4>Rakibul Hasan (Team Leader)</h4>
                      <p>updated on 31/12/2023 at 7.30pm</p>
                    </div>
                  </div>
                  <div className={style.feedback2}>
                    <p>
                      I have provided my updated methodoloy on the following
                      directory. check the updated files and let me know is
                      their any correction needed.
                    </p>
                  </div>
                </div>
                <button className={style.feedbackbtn}>Add Feedback</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTaskManagement;
