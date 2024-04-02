import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./../assets/css/HeaderNext.module.css";

const StudentHeaderNext = ({
  setIsJobDept,
  setIsRecentClicked,
  isRecentClicked,
}) => {
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setIsRecentClicked(false);
    setIsJobDept("");
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setIsRecentClicked(true);
    setIsJobDept("");
  };
  const handleCse = () => {
    setIsJobDept("Computer Science And Engineering");
  };
  const handleEee = () => {
    setIsJobDept("Electrical and Electronics Engineering");
  };
  const handleCe = () => {
    setIsJobDept("Civil Engineering");
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
              className={
                isClicked && !isRecentClicked ? style.headerimg1b1 : style.b1not
              }
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
            className={
              isClicked1 || isRecentClicked ? style.headerimg1b2 : style.b2not
            }
            onClick={handleClick2}
          >
            Recent Recruitments
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHeaderNext;
