import React from 'react';
import { useState } from 'react';
import style from "./../assets/css/ResearchExploreIdeasBody.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import rakib from './../assets/media/images/rakib.jpg';
import prapti from './../assets/media/images/prapti1.jpg';
import tushar from './../assets/media/images/tushar.jpg';
import Swakkhar from './../assets/media/images/swakkhr.jpg';
import sadia from './../assets/media/images/sadia.jpg';
import { faXmark,faStar,faGraduationCap,faPaperPlane, faComments, faNewspaper,faAddressCard,faUserTie, faSearch, faUserCheck, faUserPen, faChalkboardTeacher, faCommentsDollar, faHandPointDown,faClipboardList,faImage,faArrowCircleLeft,faArrowCircleRight,faArrowLeft, faAngleRight, faClock} from '@fortawesome/free-solid-svg-icons';

const ResearchExploreIdeasBody = () => {

    return (
        <div>
            <div className={style.headerheading}>
                <h1>Ongoing Research Papers You Might Find Interesting</h1>
            </div>
            <div className={style.researchbody}>
                <div className={style.body1}>
                    <div className={style.row1}>
                        <div className={style.row11}>
                            <img src={rakib} alt="" />
                            <div className={style.row111}>
                                <h3>Rakibul Hasan</h3>
                                <p>We are looking for team members</p>
                            </div>
                        </div>
                        <div className={style.row12}>
                            <h3>Working Domain</h3>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Medical Image</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Block Chain</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Machine Learning</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Something i dont know</p>
                            </div>
                        </div>
                        <div className={style.row13}>
                            <h4>FYDP-1</h4>
                            <p>Section (A)</p>
                        </div>
                    </div>
                    <div className={style.row2}>
                        <div className={style.row21}>
                            <h5>Posted 7m ago</h5>
                            <FontAwesomeIcon className={style.clockicon} icon={faClock} />
                        </div>
                        <div className={style.row22}>
                            <h2>Want To Join Us ?</h2>
                            <p>Make a request here</p>
                            <button className={style.reqbtn}>Request</button>
                        </div>
                    </div>
                    <div className={style.row3}>
                        <h2>Current Members</h2>
                        <div className={style.row31}>
                            <div className={style.row311}>
                                <img src={rakib} alt="" />
                                <h4>Prapti Mojumder</h4>
                            </div>
                            <div className={style.row311}>
                                <img src={rakib} alt="" />
                                <h4>Prapti Mojumder</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.body1}>
                    <div className={style.row1}>
                        <div className={style.row11}>
                            <img src={rakib} alt="" />
                            <div className={style.row111}>
                                <h3>Rakibul Hasan</h3>
                                <p>We are looking for team members</p>
                            </div>
                        </div>
                        <div className={style.row12}>
                            <h3>Working Domain</h3>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Medical Image</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Block Chain</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Machine Learning</p>
                            </div>
                            <div className={style.row121}>
                                <FontAwesomeIcon className={style.angleicon} icon={faAngleRight} />
                                <p>Something i dont know</p>
                            </div>
                        </div>
                        <div className={style.row13}>
                            <h4>FYDP-1</h4>
                            <p>Section (A)</p>
                        </div>
                    </div>
                    <div className={style.row2}>
                        <div className={style.row21}>
                            <h5>Posted 7m ago</h5>
                            <FontAwesomeIcon className={style.clockicon} icon={faClock} />
                        </div>
                        <div className={style.row22}>
                            <h2>Want To Join Us ?</h2>
                            <p>Make a request here</p>
                            <button className={style.reqbtn}>Request</button>
                        </div>
                    </div>
                    <div className={style.row3}>
                        <h2>Current Members</h2>
                        <div className={style.row31}>
                            <div className={style.row311}>
                                <img src={rakib} alt="" />
                                <h4>Prapti Mojumder</h4>
                            </div>
                            <div className={style.row311}>
                                <img src={rakib} alt="" />
                                <h4>Prapti Mojumder</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ResearchExploreIdeasBody;