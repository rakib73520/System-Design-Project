import React, { useState,useRef } from 'react';
import style from "./../assets/css/ResearchDashboardBody.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import rakib from './../assets/media/images/rakib.jpg';
import prapti from './../assets/media/images/prapti1.jpg';
import tushar from './../assets/media/images/tushar.jpg';
import Swakkhar from './../assets/media/images/swakkhr.jpg';
import sadia from './../assets/media/images/sadia.jpg';
import { faXmark,faStar,faGraduationCap,faPaperPlane, faComments, faNewspaper,faAddressCard,faUserTie, faSearch, faUserCheck, faUserPen, faChalkboardTeacher, faCommentsDollar, faHandPointDown,faClipboardList,faImage,faArrowCircleLeft,faArrowCircleRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const ResearchDashboardBody = () => {

    const [isReview, setIsReview] = useState(false);
    const handleClick1 = ()=>{
        setIsReview(!isReview);
    }
    const handleClick2 = (event)=>{
        event.preventDefault();
        setIsReview(!isReview);
    }
    const [isStar, setIsStar] = useState([false,false,false,false,false]);
    const handle1ststar = () => {
        setIsStar(prevStar => {
          const newStar = [...prevStar];
          newStar[0] = !isStar[0];
          return newStar;
        });
    };
    const handle2ststar = () => {
        setIsStar(prevStar => {
          const newStar = [...prevStar];
          newStar[1] = !isStar[1];
          return newStar;
        });
    };
    const handle3ststar = () => {
        setIsStar(prevStar => {
          const newStar = [...prevStar];
          newStar[2] = !isStar[2];
          return newStar;
        });
    };
    const handle4ststar = () => {
        setIsStar(prevStar => {
          const newStar = [...prevStar];
          newStar[3] = !isStar[3];
          return newStar;
        });
    };
    const handle5ststar = () => {
        setIsStar(prevStar => {
          const newStar = [...prevStar];
          newStar[4] = !isStar[4];
          return newStar;
        });
    };

    return (
        <div>
            <div className={style.headerheading}>
                <h1>Academic Research Papers</h1>
            </div>
            <div className={style.researchbody}>
                <div className={style.body1}>
                    <div className={style.row1}>
                        <h5>Posted 7m ago</h5>
                        <h3>Title</h3>
                        <p>Development of a Framework/Tool for Generating Serious Games Development of a Framework/Tool for Generating Serious Games</p>
                        <h3>Deliverable</h3>
                        <p>A GUI based software that will be able to generate games for multi purposes and multi platforms, students must know either unity or java based android application development. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestias maxime deserunt labore non, nam odit facere soluta consequuntur cum accusantium est ipsa sequi repudiandae? Accusamus labore officia aspernatur aperiam!</p>
                        <h3>Publication</h3>
                        <div className={style.row11}>
                            <p>Read paper</p>
                            <FontAwesomeIcon className={style.righticon} icon={faArrowCircleRight} />
                        </div>
                    </div>
                    <div className={style.row2}>
                        <div className={style.row21}>
                            <span>Supervisor</span>
                            <div className={style.row211}>
                                <img src={Swakkhar} alt="" />
                                <div>
                                    <h4>Swakkhar Shatabda</h4>
                                    <p>Assistant professor at UIU</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.row22}>
                            <span>Research Assistant</span>
                            <div className={style.row22outer}>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={prapti} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Prapti Mojumder</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={tushar} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Mahmudur Rahman Tushar sdfsd</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.body2}>
                    <div className={style.row3}>
                        <h4>How was our artical ?</h4>
                        <hr className={style.blackline}/>
                        <div className={style.row31}>
                            <p>Tap to rate</p>
                            <div className={style.row311}>
                                <FontAwesomeIcon onClick={handle1ststar} className={style.staricon} style={isStar[0] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle2ststar} className={style.staricon} style={isStar[1] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle3ststar} className={style.staricon} style={isStar[2] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle4ststar} className={style.staricon} style={isStar[3] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle5ststar} className={style.staricon} style={isStar[4] ? {color:'orange'} : {}} icon={faStar} />
                            </div>
                            <div className={style.row32}>
                                <button onClick={handleClick1} className={style.reviewbtn} style={isReview ? { visibility: 'hidden' } : {}}>Write a review</button>
                                <div className={style.reviewform} style={isReview ? {} : {visibility: 'hidden'}}>
                                    <form action="" onSubmit={handleClick2}>
                                        <input type="text" placeholder='Write your review'/>
                                        <div className={style.formbtn}>
                                            <button type='submit' className={style.submitbtn}>Submit</button>
                                            <button type='submit' className={style.cancelbtn}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.row4}>
                        <h3>Overall Ratings</h3>
                        <h1>4.5</h1>
                        <h4>Based on 20 reviews</h4>
                    </div>
                    <div className={style.row5}>
                        <h4>See others review</h4>
                    </div>
                </div>
            </div>

            <div className={style.researchbody}>
                <div className={style.body1}>
                    <div className={style.row1}>
                        <h5>Posted 7m ago</h5>
                        <h3>Title</h3>
                        <p>Development of a Framework/Tool for Generating Serious Games Development of a Framework/Tool for Generating Serious Games</p>
                        <h3>Deliverable</h3>
                        <p>A GUI based software that will be able to generate games for multi purposes and multi platforms, students must know either unity or java based android application development. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestias maxime deserunt labore non, nam odit facere soluta consequuntur cum accusantium est ipsa sequi repudiandae? Accusamus labore officia aspernatur aperiam!</p>
                        <h3>Publication</h3>
                        <div className={style.row11}>
                            <p>Read paper</p>
                            <FontAwesomeIcon className={style.righticon} icon={faArrowCircleRight} />
                        </div>
                    </div>
                    <div className={style.row2}>
                        <div className={style.row21}>
                            <span>Supervisor</span>
                            <div className={style.row211}>
                                <img src={Swakkhar} alt="" />
                                <div>
                                    <h4>Swakkhar Shatabda</h4>
                                    <p>Assistant professor at UIU</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.row22}>
                            <span>Research Assistant</span>
                            <div className={style.row22outer}>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={prapti} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Prapti Mojumder</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={tushar} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Mahmudur Rahman Tushar</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                                <div className={style.row221}>
                                    <img src={rakib} alt="" />
                                    <div className={style.row2211}>
                                        <h4>Rakibul Hasan</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.body2}>
                    <div className={style.row3}>
                        <h4>How was our artical ?</h4>
                        <hr className={style.blackline}/>
                        <div className={style.row31}>
                            <p>Tap to rate</p>
                            <div className={style.row311}>
                                <FontAwesomeIcon onClick={handle1ststar} className={style.staricon} style={isStar[0] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle2ststar} className={style.staricon} style={isStar[1] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle3ststar} className={style.staricon} style={isStar[2] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle4ststar} className={style.staricon} style={isStar[3] ? {color:'orange'} : {}} icon={faStar} />
                                <FontAwesomeIcon onClick={handle5ststar} className={style.staricon} style={isStar[4] ? {color:'orange'} : {}} icon={faStar} />
                            </div>
                            <div className={style.row32}>
                                <button onClick={handleClick1} className={style.reviewbtn} style={isReview ? { visibility: 'hidden' } : {}}>Write a review</button>
                                <div className={style.reviewform} style={isReview ? {} : {visibility: 'hidden'}}>
                                    <form action="" onSubmit={handleClick2}>
                                        <input type="text" placeholder='Write your review'/>
                                        <div className={style.formbtn}>
                                            <button type='submit' className={style.submitbtn}>Submit</button>
                                            <button type='submit' className={style.cancelbtn}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.row4}>
                        <h3>Overall Ratings</h3>
                        <h1>4.5</h1>
                        <h4>Based on 20 reviews</h4>
                    </div>
                    <div className={style.row5}>
                        <h4>See others review</h4>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ResearchDashboardBody;