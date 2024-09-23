import React from "react";
import { useState } from "react";
import style from "./../assets/css/ResearchDirectory.module.css";
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

const ResearchDirectory = () => {
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
          <div className={style.row2}>
            <FontAwesomeIcon
              className={style.listicon}
              icon={faClipboardList}
            />
            <div className={style.row21}>
              <div className={style.row211}>
                <h4>Finish monthly reporting lore</h4>
                <p>Added on 31/12/2023 at 7.30pm</p>
                <div className={style.row2111}>
                  <p>by</p>
                  <img src={rakib} alt="" />
                  <p>Rakibul Hasan</p>
                </div>
              </div>
              <div className={style.row212}>
                <FontAwesomeIcon className={style.editicon} icon={faEdit} />
                <FontAwesomeIcon className={style.deleteicon} icon={faTrash} />
              </div>
            </div>
          </div>
          <div className={style.row2}>
            <FontAwesomeIcon
              className={style.listicon}
              icon={faClipboardList}
            />
            <div className={style.row21}>
              <div className={style.row211}>
                <h4>Finish monthly reporting lore</h4>
                <p>Added on 31/12/2023 at 7.30pm</p>
                <div className={style.row2111}>
                  <p>by</p>
                  <img src={rakib} alt="" />
                  <p>Rakibul Hasan</p>
                </div>
              </div>
              <div className={style.row212}>
                <FontAwesomeIcon className={style.editicon} icon={faEdit} />
                <FontAwesomeIcon className={style.deleteicon} icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDirectory;
