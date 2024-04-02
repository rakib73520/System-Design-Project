import React from "react";
import style from "./../assets/css/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div>
      <section>
        <div className={style.footer1}>
          <h3 className={style.footer2}>Quick Contact</h3>
          <div className={style.footer3}>
            <p>United City, Madani Avenue, Badda, Dhaka 1212, Bangladesh.</p>
            <p>Phone: +88 09604-848-848</p>
            <p>
              info@uiu.ac.bd
              <br />
              Admission Office: +8801759039498, +8801759039451, +8801759039465,
              +8801914001470
            </p>
            <p>Office Time: Sat-Wed 8:30 AM to 4:30 PM</p>
            <p>&nbsp;</p>
          </div>
          <div className={style.footer4}>
            Made With{" "}
            <FontAwesomeIcon className={style.footer5} icon={faHeart} /> By TEAM
            THIRTY FIRST
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
