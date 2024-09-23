import React from "react";
import { useRef, useEffect, useState } from "react";
import uiulogo from "./../assets/media/images/uiulogo.png";
import style from "./../assets/css/HeaderResearch.module.css";

const HeaderResearch = () => {
  return (
    <div>
      <div className={style.headernav}>
        <img src={uiulogo} alt="" />
        <h2>UIU Research</h2>
        <div>
          <h3 className={style.navitem}>Explore Ideas</h3>
          <h3 className={style.navitem}>My Research</h3>
          <h3 className={style.navitem}>Research Grant</h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderResearch;
