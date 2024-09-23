import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./../assets/css/HeaderResearchNext.module.css";

const HeaderResearchNext = () => {
  const [isClicked, setisClicked] = useState(true);
  const [isClicked1, setisClicked1] = useState(false);
  const [isClicked2, setisClicked2] = useState(false);
  const handleClick1 = () => {
    setisClicked(true);
    setisClicked1(false);
    setisClicked2(false);
  };
  const handleClick2 = () => {
    setisClicked1(true);
    setisClicked(false);
    setisClicked2(false);
  };
  const handleClick3 = () => {
    setisClicked2(true);
    setisClicked(false);
    setisClicked1(false);
  };

  const headerimgh1Ref = useRef();
  const [headimgh1_isVisible, setheadimgh1_isVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setheadimgh1_isVisible(entry.isIntersecting);
    });
    observer.observe(headerimgh1Ref.current);
  }, []);

  return (
    <div>
      <div ref={headerimgh1Ref} className={style.headerimg}>
        <div className={style.headerimg2}>
          <h1
            className={
              headimgh1_isVisible ? style.headerimg2h1 : style.headerimg2h1not
            }
          >
            Research and innovation at UIU
          </h1>
          <h3
            className={
              headimgh1_isVisible ? style.headerimg2h3 : style.headerimg2h3not
            }
          >
            The UIU Knowledge Enterprise advances research, innovation,
            strategic partnerships, entrepreneurship, economic development and
            international development.
          </h3>
        </div>
        <div className={style.headerimg1}>
          <button
            onClick={handleClick1}
            className={isClicked ? style.headerimg1b1 : style.b1not}
          >
            CSE
          </button>
          <button
            onClick={handleClick2}
            className={isClicked1 ? style.headerimg1b2 : style.b2not}
          >
            EEE
          </button>
          <button
            onClick={handleClick3}
            className={isClicked2 ? style.headerimg1b3 : style.b3not}
          >
            CE
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderResearchNext;
