import React from "react";
import { useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderPrev from "../components/HeaderPrev";
import HeaderNext from "../components/FacultyHeaderNext";
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
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import style from "./../assets/css/Recruitment.module.css";

const Recruitment = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const slideRef = useRef(null);

  const handleleft = () => {
    const divElement = slideRef.current;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex == 0) {
      setCurrentIndex(currentIndex + 2);
    }
    divElement.style.transform = "translateX(-150%)";

    setTimeout(() => {
      divElement.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      divElement.style.transform = "translateX(300%)";
    }, 300);
    setTimeout(() => {
      divElement.style.opacity = "1";
      divElement.style.transform = "translateX(0)";
    }, 600);
  };
  const handleright = () => {
    const divElement = slideRef.current;
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex == 2) {
      setCurrentIndex(currentIndex - 2);
    }
    divElement.style.transform = "translateX(150%)";

    setTimeout(() => {
      divElement.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      divElement.style.transform = "translateX(-300%)";
    }, 300);
    setTimeout(() => {
      divElement.style.opacity = "1";
      divElement.style.transform = "translateX(0)";
    }, 600);
  };

  const slideRef1 = useRef(null);

  const handleleft1 = () => {
    const divElement = slideRef1.current;
    if (currentIndex1 > 0) {
      setCurrentIndex1(currentIndex1 - 1);
    } else if (currentIndex1 == 0) {
      setCurrentIndex1(currentIndex1 + 2);
    }
    divElement.style.transform = "translateX(-150%)";

    setTimeout(() => {
      divElement.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      divElement.style.transform = "translateX(300%)";
    }, 300);
    setTimeout(() => {
      divElement.style.opacity = "1";
      divElement.style.transform = "translateX(0)";
    }, 600);
  };
  const handleright1 = () => {
    const divElement = slideRef1.current;
    if (currentIndex1 < 2) {
      setCurrentIndex1(currentIndex1 + 1);
    } else if (currentIndex1 == 2) {
      setCurrentIndex1(currentIndex1 - 2);
    }
    divElement.style.transform = "translateX(150%)";

    setTimeout(() => {
      divElement.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      divElement.style.transform = "translateX(-300%)";
    }, 300);
    setTimeout(() => {
      divElement.style.opacity = "1";
      divElement.style.transform = "translateX(0)";
    }, 600);
  };

  const data = [
    {
      department: "Department Of Computer Science And Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Student of United International University are highly encourage to apply. and do the best of their ability.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
    {
      department: "Department Of Electrical And Electronics And Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Those who dont have previous experience dont have to appy for this post.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
    {
      department: "Department Of Civil Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Student of United International University are highly encourage to apply. and do the best of their ability.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
  ];

  const data1 = [
    {
      department: "Department Of Computer Science And Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Student of United International University are highly encourage to apply. and do the best of their ability.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
    {
      department: "Department Of Electrical And Electronics And Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Those who dont have previous experience dont have to appy for this post.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
    {
      department: "Department Of Civil Engineering",
      description:
        "Student of United International University are highly encourage to apply. and do the best of their ability. Student of United International University are highly encourage to apply. and do the best of their ability.",
      publishdate: "28th May, 2023",
      deadline: "28th May, 2023",
      appliedcoursegrader: "A",
      requiredcgpa: "3.80",
      completedcredit: "80",
    },
  ];

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
      <HeaderPrev />
      <HeaderNext />
      <div className={style.headerheading}>
        <h1>Recent Recruitments</h1>
      </div>
      <div className={style.recruitmentbody}>
        <h3>Undergraduate Assistant (UA) Recruitment for FALL 2023</h3>
        <div className={style.body1}>
          <div className={style.row1}>
            <FontAwesomeIcon
              className={style.lefticon}
              icon={faArrowCircleLeft}
              onClick={handleleft}
            />
          </div>
          <div ref={slideRef} className={style.row2}>
            <div className={style.row21}>
              <h4 className={style.dept}>{data[currentIndex].department}</h4>
              <h4>Job Responsibilities</h4>
              <p>Assisting the course teacher.</p>
              <p>Leading discussion.</p>
              <p>Grading assignments.</p>
              <p>Assisting with course preparation.</p>
              <p>Providing feedback and guidance.</p>
              <p>Assisting with administrative task.</p>
              <h4>Requirements</h4>
              <p>
                Obtained grade for applied courses:{" "}
                {data[currentIndex].appliedcoursegrader}
              </p>
              <p>
                Minimum CGPA required to apply:{" "}
                {data[currentIndex].requiredcgpa}
              </p>
              <p>
                Minimum credits to be completed:{" "}
                {data[currentIndex].completedcredit}
              </p>
            </div>
            <div className={style.row23}>
              <h4>Recruitment Description</h4>
              <p>{data[currentIndex].description}</p>
            </div>
            <div className={style.row22}>
              <div className={style.row221}>
                <h5>Publish Date</h5>
                <p>{data[currentIndex].publishdate}</p>
              </div>
              <button className={style.applybtn}>Apply</button>
              <div className={style.row222}>
                <h5>Deadline</h5>
                <p>{data[currentIndex].deadline}</p>
              </div>
            </div>
          </div>
          <div className={style.row3}>
            <FontAwesomeIcon
              className={style.righticon}
              icon={faArrowCircleRight}
              onClick={handleright}
            />
          </div>
        </div>
      </div>
      <div className={style.recruitmentbody1}>
        <h3>Grader Recruitment for FALL 2023</h3>
        <div className={style.body1}>
          <div className={style.row1}>
            <FontAwesomeIcon
              className={style.lefticon}
              icon={faArrowCircleLeft}
              onClick={handleleft1}
            />
          </div>
          <div ref={slideRef1} className={style.row2}>
            <div className={style.row21}>
              <h4 className={style.dept}>{data1[currentIndex1].department}</h4>
              <h4>Job Responsibilities</h4>
              <p>Assisting the course teacher.</p>
              <p>Leading discussion.</p>
              <p>Grading assignments.</p>
              <p>Assisting with course preparation.</p>
              <p>Providing feedback and guidance.</p>
              <p>Assisting with administrative task.</p>
              <h4>Requirements</h4>
              <p>
                Obtained grade for applied courses:{" "}
                {data1[currentIndex1].appliedcoursegrader}
              </p>
              <p>
                Minimum CGPA required to apply:{" "}
                {data1[currentIndex1].requiredcgpa}
              </p>
              <p>
                Minimum credits to be completed:{" "}
                {data1[currentIndex1].completedcredit}
              </p>
            </div>
            <div className={style.row23}>
              <h4>Recruitment Description</h4>
              <p>{data1[currentIndex1].description}</p>
            </div>
            <div className={style.row22}>
              <div className={style.row221}>
                <h5>Publish Date</h5>
                <p>{data1[currentIndex1].publishdate}</p>
              </div>
              <button className={style.applybtn}>Apply</button>
              <div className={style.row222}>
                <h5>Deadline</h5>
                <p>{data1[currentIndex1].deadline}</p>
              </div>
            </div>
          </div>
          <div className={style.row3}>
            <FontAwesomeIcon
              className={style.righticon}
              icon={faArrowCircleRight}
              onClick={handleright1}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recruitment;
