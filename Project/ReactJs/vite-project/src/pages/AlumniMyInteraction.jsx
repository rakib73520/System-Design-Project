import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/AlumniMyInteraction.module.css";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderAlumni from "../components/HeaderAlumni";
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
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const AlumniMyInteraction = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

  const headerimgh1Ref = useRef();
  const [headimgh1_isVisible, setheadimgh1_isVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setheadimgh1_isVisible(entry.isIntersecting);
    });
    observer.observe(headerimgh1Ref.current);
  }, []);
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
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
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
      <HeaderAlumni />
      <div ref={headerimgh1Ref} className={style.headerimg}>
        <div className={style.headerimg2}>
          <h1
            className={
              headimgh1_isVisible ? style.headerimg2h1 : style.headerimg2h1not
            }
          >
            Connect with our alumni, where possibilities meet opportunities.
            Explore, learn, and enhance your chances for success.
          </h1>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.row1}>
          <h2>List of Alumni you are Interacting</h2>
          <div className={style.seebtn}>
            <button
              onClick={handleClick2}
              className={isClicked1 ? style.facultybtn : style.facultynot}
            >
              Faculty
            </button>
            <button
              onClick={handleClick1}
              className={isClicked ? style.studentbtn : style.stdnot}
            >
              Student
            </button>
          </div>
          <div className={style.listout}>
            <div className={style.list}>
              <img src={rakib} alt="" />
              <div className={style.list1}>
                <h3>Rakibul Hasan</h3>
                <h4>Software Engineer At Amazon,Inc</h4>
                <div className={style.list11}>
                  <h4 className={style.viewtitle}>View Conversation</h4>
                  <FontAwesomeIcon
                    className={style.righticon}
                    icon={faArrowCircleRight}
                  />
                </div>
                <h5>Report this user</h5>
              </div>
            </div>
            <div className={style.list}>
              <img src={rakib} alt="" />
              <div className={style.list1}>
                <h3>Rakibul Hasan</h3>
                <h4>Software Engineer At Amazon,Inc</h4>
                <div className={style.list11}>
                  <h4 className={style.viewtitle}>View Conversation</h4>
                  <FontAwesomeIcon
                    className={style.righticon}
                    icon={faArrowCircleRight}
                  />
                </div>
                <h5>Report this user</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={style.row2}>
          <h2>Conversation</h2>
          <div className={style.chat}>
            <div className={style.chat1}>
              <img src={rakib} alt="" />
              <div className={style.chat11}>
                <h4>Prapti Mojumder</h4>
                <p>Software Engineer at Amazon.com, Inc</p>
              </div>
            </div>
            <div className={style.chat2}>
              <div className={style.p1}>
                <div className={style.p11}>
                  <h4>Buy Me a Coffe</h4>
                  <img src={rakib} alt="" />
                </div>
                <p>Delevered on 27/10/23 at 7.30pm</p>
              </div>
              <div className={style.p2}>
                <div className={style.p21}>
                  <img src={rakib} alt="" />
                  <h4>Buy Me a Coffe</h4>
                </div>
                <p>Delevered on 27/10/23 at 7.30pm</p>
              </div>
              <div className={style.p2}></div>
            </div>
            <div className={style.chat3}>
              <div className={style.row212}>
                <input type="file" id="fileInput" onChange={updateFileName} />
                <label htmlFor="fileInput" className={style.eventcreate4vis}>
                  <FontAwesomeIcon className={style.imgicon} icon={faFile} />
                  <h4>Add File</h4>
                </label>
              </div>

              <input
                className={style.courseinput}
                type="text"
                name=""
                id=""
                placeholder="Write Messege"
              />
              <FontAwesomeIcon
                className={style.planeicon}
                icon={faPaperPlane}
              />
            </div>
            <div className={style.eventcreate7}>
              <span id="fileName">No file chosen</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniMyInteraction;
