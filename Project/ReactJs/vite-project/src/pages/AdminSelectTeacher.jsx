import React from 'react';
import { useState, useEffect } from 'react';
import style from "./../assets/css/AdminSelectTeacher.module.css";
import rakib from './../assets/media/images/rakib.jpg';
import tushar from './../assets/media/images/tushar.jpg';
import Swakkhar from './../assets/media/images/swakkhr.jpg';
import sadia from './../assets/media/images/sadia.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faPaperPlane, faComments, faNewspaper,faAddressCard,faUserTie, faSearch, faUserCheck, faUserPen, faChalkboardTeacher, faCommentsDollar, faHandPointDown} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

const AdminSelectTeacher = () => {
    return (
        <div className={style.studentappbody}>
            <AdminHeader/>
            <div className={style.report1}>
                    <div className={style.reportheading}>
                        <FontAwesomeIcon className={style.studenticon} icon={faChalkboardTeacher} />
                        <h2>Select Teacher</h2>
                        <input type="text" placeholder='Search User' />
                        <FontAwesomeIcon className={style.searchicon} icon={faSearch} />
                    </div>
                    <hr />
                    <div className={style.reportinfo}>
                        <div className={style.infoheader}>
                            <h3>Faculty Information</h3>
                            <h3>Action</h3>
                        </div>
                        <div className={style.infobody}>
                            <div className={style.bodyrow}>
                                <div className={style.row1}>
                                    <img src={Swakkhar} alt="" />
                                    <div className={style.row11}>
                                        <h4>Swakkhar Shatabda</h4>
                                        <h5>Professor At UIU</h5>
                                        <p>Department Of Computer Science and Engineering</p>
                                    </div>
                                </div>
                                <div className={style.row121}>
                                    <button className={style.selectbtn}>Associate</button>
                                </div>
                            </div>
                            <div className={style.bodyrow}>
                                <div className={style.row1}>
                                    <img src={Swakkhar} alt="" />
                                    <div className={style.row11}>
                                        <h4>Swakkhar Shatabda</h4>
                                        <h5>Professor At UIU</h5>
                                        <p>Department Of Computer Science and Engineering</p>
                                    </div>
                                </div>
                                <div className={style.row121}>
                                    <button className={style.selectbtn}>Associate</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            <AdminFooter/>
        </div>
    );
};

export default AdminSelectTeacher;