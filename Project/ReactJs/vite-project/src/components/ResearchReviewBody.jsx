import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/ResearchReviewBody.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import {
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
} from "@fortawesome/free-solid-svg-icons";

const ResearchReviewBody = () => {
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

  const Ref = useRef(null);
  const Ref1 = useRef(null);
  const Ref2 = useRef(null);
  const Ref3 = useRef(null);

  const visibleRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(visibleRef.current);
  }, []);

  useEffect(() => {
    const targetWidth = 400;
    const targetWidth1 = 450;
    const targetWidth2 = 300;
    const targetWidth3 = 450;
    const duration = 1000;

    const divElement = Ref.current;
    const divElement1 = Ref1.current;
    const divElement2 = Ref2.current;
    const divElement3 = Ref3.current;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const newWidth = progress * targetWidth;
      const newWidth1 = progress * targetWidth1;
      const newWidth2 = progress * targetWidth2;
      const newWidth3 = progress * targetWidth3;

      divElement.style.width = `${newWidth}px`;
      divElement1.style.width = `${newWidth1}px`;
      divElement2.style.width = `${newWidth2}px`;
      divElement3.style.width = `${newWidth3}px`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <div>
      <div className={style.reviewouter}>
        <div className={style.body}>
          <div className={style.row1}>
            <button className={style.backbtn}>Back</button>
            <button
              onClick={handleClick1}
              className={isClicked ? style.studentbtn : style.stdnot}
            >
              Student
            </button>
            <button
              onClick={handleClick2}
              className={isClicked1 ? style.facultybtn : style.facultynot}
            >
              Faculty
            </button>
            <button
              onClick={handleClick3}
              className={isClicked2 ? style.alumnibtn : style.alumninot}
            >
              Alumni
            </button>
            <h3>Student Feedback</h3>
          </div>
          <div className={style.row2}>
            <h3>Overall Ratings</h3>
            <h1>4.5</h1>
            <div className={style.row21}>
              <FontAwesomeIcon className={style.staricon} icon={faStar} />
              <FontAwesomeIcon className={style.staricon} icon={faStar} />
              <FontAwesomeIcon className={style.staricon} icon={faStar} />
              <FontAwesomeIcon className={style.staricon} icon={faStar} />
              <FontAwesomeIcon className={style.staricon} icon={faStar} />
            </div>
          </div>
          <div ref={visibleRef} className={style.row3}>
            <div className={style.row31}>
              <h4>Excellent</h4>
              <div className={style.row311}>
                <div ref={Ref}></div>
              </div>
            </div>
            <div className={style.row31}>
              <h4>Good</h4>
              <div className={style.row311}>
                <div ref={Ref1}></div>
              </div>
            </div>
            <div className={style.row31}>
              <h4>Average</h4>
              <div className={style.row311}>
                <div ref={Ref2}></div>
              </div>
            </div>
            <div className={style.row31}>
              <h4>Poor</h4>
              <div className={style.row311}>
                <div ref={Ref3}></div>
              </div>
            </div>
          </div>
          <div className={style.row4}>
            <div className={style.row41}>
              <img src={rakib} alt="" />
              <div className={style.row411}>
                <h4>Prapti Mojumder</h4>
                <p className={style.row411p1}>Student At UIU</p>
                <div className={style.row4111}>
                  <div className={style.row41111}>
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                  </div>
                  <h5>(4.0)</h5>
                </div>
                <p className={style.row411p2}>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nostrum aliquid sunt, voluptatem esse vel a ex, optio
                  excepturi nisi velit quis sed nemo quo? Incidunt explicabo
                  error earum ab nesciunt.Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Delectus in totam inventore
                  tempore et, incidunt debitis quos quam hic voluptas obcaecati
                  ut deleniti maxime laboriosam facere nesciunt magni. Dolores,
                  in? The Fastest Growing Cloud Based MarketPlace Company, Field
                  Nation is looking for a "Software Engineer" for its
                  development team. All the student of United International
                  University is highly encouraged to apply here.
                </p>
                <h5 className={style.row411h5}>Report this review</h5>
              </div>
            </div>
            <div className={style.row41}>
              <img src={rakib} alt="" />
              <div className={style.row411}>
                <h4>Prapti Mojumder</h4>
                <p className={style.row411p1}>Student At UIU</p>
                <div className={style.row4111}>
                  <div className={style.row41111}>
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                  </div>
                  <h5>(4.0)</h5>
                </div>
                <p className={style.row411p2}>
                  The Fastest Growing Cloud Based MarketPlace Company, Field
                  Nation is looking for a "Software Engineer" for its
                  development team. All the student of United International
                  University is highly encouraged to apply here.
                  sdflskdflkjsldkfjlksdjfksjdkfjlskdjf
                  sldflksjdkfjjjjjjjjjjjjjjjjjjjjjslkdjfksdlkfjlkjlksjdlkfjs
                  sdflsjdfsldkfjlksdfkl
                </p>
                <h5 className={style.row411h5}>Report this review</h5>
              </div>
            </div>
            <div className={style.row41}>
              <img src={rakib} alt="" />
              <div className={style.row411}>
                <h4>Prapti Mojumder</h4>
                <p className={style.row411p1}>Student At UIU</p>
                <div className={style.row4111}>
                  <div className={style.row41111}>
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={style.staricon1}
                      icon={faStar}
                    />
                  </div>
                  <h5>(4.0)</h5>
                </div>
                <p className={style.row411p2}>
                  The Fastest Growing Cloud Based MarketPlace Company, Field
                  Nation is looking for a "Software Engineer" for its
                  development team. All the student of United International
                  University is highly encouraged to apply here.
                </p>
                <h5 className={style.row411h5}>Report this review</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchReviewBody;
