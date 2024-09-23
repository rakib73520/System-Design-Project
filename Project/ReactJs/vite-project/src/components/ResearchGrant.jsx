import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./../assets/css/ResearchGrant.module.css";
import rakib from "./../assets/media/images/rakib.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";

const ResearchGrant = () => {
  const fundRef = useRef();
  const [fundIsVisible, setFundIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setFundIsVisible(entry.isIntersecting);
    });
    observer.observe(fundRef.current);
  }, []);
  return (
    <div>
      <div ref={fundRef} className={style.outtop}>
        <h1 className={fundIsVisible ? style.outtoph1 : style.outtoph1not}>
          UIU RESEARCH GRANT
        </h1>
        <h3 className={fundIsVisible ? style.outtoph3 : style.outtoph3not}>
          United International University (UIU) has taken a pioneering
          initiative to provide Research Fund for its faculty members to conduct
          quality research activities and set examples for other institutions.
        </h3>
      </div>
      <div className={style.reportinfo}>
        <h1 className={style.toptitle}>List Of Granted Research Projects</h1>
        <div className={style.infoheader}>
          <h3>Title Of The Project</h3>
          <h3>Name of Principal Investigator</h3>
          <h3>Grant Amount</h3>
        </div>
        <div className={style.infobody1}>
          <div className={style.bodyrow1}>
            <div className={style.rowtitle}>
              <p>
                Application of Multi-facet Performance Measurement System: A
                Framework for the Ready Made Garments of Bangladesh
              </p>
            </div>
            <div className={style.rowfaculty}>
              <img src={Swakkhar} alt="" />
              <div className={style.rowfaculty1}>
                <h4>Swakkhar Shatabda</h4>
                <h5>Professor At UIU</h5>
                <p>Department Of Computer Science and Engineering</p>
              </div>
            </div>
            <div className={style.rowamount}>
              <p>BDT 6,00,000 TK</p>
            </div>
          </div>
          <div className={style.bodyrow1}>
            <div className={style.rowtitle}>
              <p>
                Application of Multi-facet Performance Measurement System: A
                Framework for the Ready Made Garments of Bangladesh
              </p>
            </div>
            <div className={style.rowfaculty}>
              <img src={Swakkhar} alt="" />
              <div className={style.rowfaculty1}>
                <h4>Swakkhar Shatabda</h4>
                <h5>Professor At UIU</h5>
                <p>Department Of Computer Science and Engineering</p>
              </div>
            </div>
            <div className={style.rowamount}>
              <p>BDT 6,00,000 TK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchGrant;
