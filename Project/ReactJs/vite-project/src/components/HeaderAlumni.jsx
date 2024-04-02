import React from "react";
import { useRef, useEffect, useState } from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderAlumni.module.css";

const HeaderAlumni = () => {
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2>UIU Alumni</h2>
        <div>
          <h3 className={style.navitem}>Alumni Events</h3>
          <h3 className={style.navitem}>My Interaction</h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderAlumni;
