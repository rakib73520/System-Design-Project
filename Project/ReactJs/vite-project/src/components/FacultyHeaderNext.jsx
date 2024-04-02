import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./../assets/css/HeaderNext.module.css";
import uiulogo from "./../assets/media/images/uiulogo.png";

const FacultyHeaderNext = ({ setIsMyPostedClicked, setIsJobDept }) => {
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setIsMyPostedClicked(false);
    setIsJobDept("");
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setIsMyPostedClicked(true);
    setIsJobDept("");
  };
  const handleCse = () => {
    setIsJobDept("Computer Science And Engineering");
    setIsMyPostedClicked(false);
  };
  const handleEee = () => {
    setIsJobDept("Electrical and Electronics Engineering");
    setIsMyPostedClicked(false);
  };
  const handleCe = () => {
    setIsJobDept("Civil Engineering");
    setIsMyPostedClicked(false);
  };

  const headerimgRef = useRef();
  const [headimg_isVisible, setheadimg_isVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setheadimg_isVisible(entry.isIntersecting);
    });
    observer.observe(headerimgRef.current);
  }, []);

  return (
    <div>
      <div
        ref={headerimgRef}
        className={headimg_isVisible ? style.headerimg : style.headerimgnot}
      >
        <div className={style.headerimg1}>
          <div className={style.headerimg1first}>
            <button
              onClick={handleClick1}
              className={isClicked ? style.headerimg1b1 : style.b1not}
            >
              Posted Jobs
            </button>
            <div className={style.dropbutton}>
              <button onClick={handleCse}>CSE</button>
              <button onClick={handleEee}>EEE</button>
              <button onClick={handleCe}>CE</button>
            </div>
          </div>
          <button
            onClick={handleClick2}
            className={isClicked1 ? style.headerimg1b2 : style.b2not}
          >
            My Posted Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeaderNext;
