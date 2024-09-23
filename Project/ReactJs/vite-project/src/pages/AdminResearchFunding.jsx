import React from 'react';
import { useState, useEffect } from 'react';
import style from "./../assets/css/AdminResearchFunding.module.css";
import rakib from './../assets/media/images/rakib.jpg';
import tushar from './../assets/media/images/tushar.jpg';
import Swakkhar from './../assets/media/images/swakkhr.jpg';
import sadia from './../assets/media/images/sadia.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faPaperPlane, faComments, faNewspaper,faAddressCard,faUserTie, faSearch, faUserCheck, faUserPen, faChalkboardTeacher, faCommentsDollar, faHandPointDown,faClipboardList} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

const AdminResearchFunding = () => {
    return (
        <div className={style.studentappbody}>
            <AdminHeader/>
            <div className={style.report1}>
                    <div className={style.reportheading}>
                        <FontAwesomeIcon className={style.studenticon} icon={faCommentsDollar} />
                        <h2>Funding Request</h2>
                    </div>
                    <hr />
                    <div className={style.reportinfo}>
                        <div className={style.infoheader}>
                            <h3>Request Information</h3>
                            <h3>Funding Information</h3>
                            <h3>Department</h3>
                            <h3>Action</h3>
                        </div>
                        <div className={style.infobody}>
                            <div className={style.bodyrow}>
                               <div className={style.row1}>
                                    <div className={style.row1first}>
                                        <img src={rakib} alt="" />
                                        <div className={style.row1first1}>
                                            <h4>Rakibul Hasan</h4>
                                            <p>and his team Appeal for Research Project Funding and Publication Support</p>
                                        </div>
                                    </div>
                                    <h5 className={style.row1third}>Approved by Supervisor</h5>
                                    <div className={style.row1second}>
                                        <img src={Swakkhar} alt="" />
                                        <div className={style.row1second1}>
                                            <h4>Swakkhar Shatabda</h4>
                                            <p>Professor At UIU</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.row2}>
                                    <h4>Department Of Computer Science and Engineering</h4>
                                </div>
                                <div className={style.row3}>
                                    <div className={style.row3first}>
                                        <h5>Uploaded project</h5>
                                        <p>Click to view</p>
                                    </div>
                                    <div className={style.row3second}>
                                        <h5>Research Duration</h5>
                                        <p>13 nov,2023 to 31 dec,2023</p>
                                    </div>
                                    <div className={style.row3third}>
                                        <h5>Funding Amount</h5>
                                        <p>BDT. 10,000TK</p>
                                    </div>
                                </div>
                                <div className={style.row121}>
                                    <button className={style.grantbtn}>Grant</button>
                                    <button className={style.rejectbtn}>Reject</button>
                                </div>
                            </div>
                            <div className={style.bodyrow}>
                               <div className={style.row1}>
                                    <div className={style.row1first}>
                                        <img src={rakib} alt="" />
                                        <div className={style.row1first1}>
                                            <h4>Rakibul Hasan</h4>
                                            <p>and his team Appeal for Research Project Funding and Publication Support</p>
                                        </div>
                                    </div>
                                    <h5 className={style.row1third}>Approved by Supervisor</h5>
                                    <div className={style.row1second}>
                                        <img src={Swakkhar} alt="" />
                                        <div className={style.row1second1}>
                                            <h4>Swakkhar Shatabda</h4>
                                            <p>Professor At UIU</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.row2}>
                                    <h4>Department Of Computer Science and Engineering</h4>
                                </div>
                                <div className={style.row3}>
                                    <div className={style.row3first}>
                                        <h5>Uploaded project</h5>
                                        <p>Click to view</p>
                                    </div>
                                    <div className={style.row3second}>
                                        <h5>Research Duration</h5>
                                        <p>13 nov,2023 to 31 dec,2023</p>
                                    </div>
                                    <div className={style.row3third}>
                                        <h5>Funding Amount</h5>
                                        <p>BDT. 10,000TK</p>
                                    </div>
                                </div>
                                <div className={style.row121}>
                                    <button className={style.grantbtn}>Grant</button>
                                    <button className={style.rejectbtn}>Reject</button>
                                </div>
                            </div>
                            <div className={style.bodyrow}>
                               <div className={style.row1}>
                                    <div className={style.row1first}>
                                        <img src={rakib} alt="" />
                                        <div className={style.row1first1}>
                                            <h4>Rakibul Hasan</h4>
                                            <p>and his team Appeal for Research Project Funding and Publication Support</p>
                                        </div>
                                    </div>
                                    <h5 className={style.row1third}>Approved by Supervisor</h5>
                                    <div className={style.row1second}>
                                        <img src={Swakkhar} alt="" />
                                        <div className={style.row1second1}>
                                            <h4>Swakkhar Shatabda</h4>
                                            <p>Professor At UIU</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.row2}>
                                    <h4>Department Of Computer Science and Engineering</h4>
                                </div>
                                <div className={style.row3}>
                                    <div className={style.row3first}>
                                        <h5>Uploaded project</h5>
                                        <p>Click to view</p>
                                    </div>
                                    <div className={style.row3second}>
                                        <h5>Research Duration</h5>
                                        <p>13 nov,2023 to 31 dec,2023</p>
                                    </div>
                                    <div className={style.row3third}>
                                        <h5>Funding Amount</h5>
                                        <p>BDT. 10,000TK</p>
                                    </div>
                                </div>
                                <div className={style.row121}>
                                    <button className={style.grantbtn}>Grant</button>
                                    <button className={style.rejectbtn}>Reject</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={style.report2}>
                    <div className={style.reportheading}>
                        <FontAwesomeIcon className={style.studenticon} icon={faClipboardList} />
                        <h2>List Of Granted Research Projects</h2>
                    </div>
                    <hr />
                    <div className={style.reportinfo}>
                        <div className={style.infoheader}>
                            <h3>Title Of The Project</h3>
                            <h3>Name of Principal Investigator</h3>
                            <h3>Grant Amount</h3>
                            <h3>Action</h3>
                        </div>
                        <div className={style.infobody1}>
                            <div className={style.bodyrow1}>
                                <div className={style.rowtitle}>
                                    <p>Application of Multi-facet Performance Measurement System: A Framework for the Ready Made Garments of Bangladesh</p>
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
                                <div className={style.row121}>
                                    <button className={style.removebtn}>Remove</button>
                                </div>
                            </div>
                            <div className={style.bodyrow1}>
                                <div className={style.rowtitle}>
                                    <p>Application of Multi-facet Performance Measurement System: A Framework for the Ready Made Garments of Bangladesh</p>
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
                                <div className={style.row121}>
                                    <button className={style.removebtn}>Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            <AdminFooter/>
        </div>
    );
};

export default AdminResearchFunding;