import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/StudentResearchMyResearch.module.css";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearchFaculty from "../components/HeaderResearchFaculty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import tushar from "./../assets/media/images/tushar.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import sadia from "./../assets/media/images/sadia.jpg";
import {
  faPlus,
  faCodeBranch,
  faCircleCheck,
  faSquareCheck,
  faTrash,
  faPen,
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
  faDeleteLeft,
  faCircleArrowRight,
  faCirclePlus,
  faCircleMinus,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

const FacultyResearchMyResearch = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

  const [editClicked, setEditClicked] = useState(false);
  const handleeditclick = () => {
    setEditClicked(!editClicked);
  };

  const [isSupervisor, setIsSupervisor] = useState(false);
  const handleaddsupervisor = () => {
    setIsSupervisor(!isSupervisor);
  };
  const [isDomain, setIsDomain] = useState(false);
  const handleadddomain = () => {
    setIsDomain(!isDomain);
  };
  const [isMember, setIsMember] = useState(false);
  const handleaddmember = () => {
    setIsMember(!isMember);
  };

  const [isGroupMeeting, setIsGroupMeeting] = useState(false);
  const handlegroupmeeting = () => {
    setIsGroupMeeting(!isGroupMeeting);
  };

  return (
    <div>
      <Header
        bellClick={bellClick}
        searchClick={searchClick}
        setbellClick={setbellClick}
        setsearchClick={setsearchClick}
      />
      <HeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
        setsearchClick={setsearchClick}
      />
      <HeaderResearchFaculty />
      <div className={style.body}>
        <div className={style.row1}>
          <h1>NO CURRENT RESEARCH PROJECT</h1>
        </div>

        {/* row 2 end here */}

        <div className={style.row2}>
          <div className={style.row21}>
            <h2>About Project</h2>
            <FontAwesomeIcon className={style.editicon1} icon={faPen} />
            <FontAwesomeIcon className={style.deleteicon1} icon={faTrash} />
          </div>
          <div className={style.row24}>
            <div className={style.row241}>
              <div className={style.row2411} style={{ visibility: "hidden" }}>
                <FontAwesomeIcon
                  className={style.plusicon1}
                  icon={faCirclePlus}
                />
                <p>Add project info.</p>
              </div>
              <div className={style.row2412}>
                <h3>Title</h3>
                <p>
                  Development of a Framework/Tool for Generating Serious Games
                </p>
                <h3>Description</h3>
                <p>
                  GUI based software that will be able to generate games for
                  multi purposes and multi platforms, students must know either
                  unity or java based android application development. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Soluta
                  voluptatem dolore rem harum amet illo explicabo est!
                  Voluptatum ipsum eum quisquam, repellendus recusandae deserunt
                  expedita, fugit officiis officia sequi accusamus.
                </p>
                <h3>FYDP-1 | Section(A)</h3>
              </div>
            </div>
          </div>
          <div className={style.row25}>
            <div className={style.row251}>
              <div className={style.row2511}>
                <div className={style.row25111}>
                  <h3 className={style.superheader}>Supervisor</h3>
                  <div className={style.row251111}>
                    <img src={Swakkhar} alt="" />
                    <div className={style.row2511111}>
                      <h3>Swakkhar Shatabda</h3>
                      <p>Assistant professor at UIU</p>
                    </div>
                  </div>
                </div>
                <div className={style.row25112}>
                  <div className={style.row251121}>
                    <button className={style.reqbtnfaculty}>
                      Create a meeting
                    </button>
                  </div>
                  <div className={style.row251121} style={{ display: "none" }}>
                    <h5>Meeting starts in</h5>
                    <h4>1:08:30</h4>
                    <a href="">About this meeting</a>
                  </div>
                </div>
                <div></div>
              </div>
              <div className={style.row2512}>
                <h3 className={style.r2down}>Supervisor Comments</h3>
                <div className={style.r21super}>
                  <img src={rakib} alt="" />
                  <div className={style.r211}>
                    <h4>
                      Prapti Mojumder in Market research 2014 sdfsdfsdfsdfsdfsdf
                    </h4>
                    <h3>Find my keynote attached in the..</h3>
                  </div>
                </div>
                <div className={style.r21super}>
                  <img src={rakib} alt="" />
                  <div className={style.r211}>
                    <h4>Prapti Mojumder in Market research 2014</h4>
                    <h3>Find my keynote attached in the..</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.row252}>
              <div className={style.row2521}>
                <h3>Tasks</h3>
                <div className={style.row25211}>
                  <FontAwesomeIcon
                    className={style.cleanplusicon}
                    icon={faPlus}
                  />
                  <h4>Add Task</h4>
                </div>
              </div>
              <div className={style.row2522}>
                <div className={style.row25221}>
                  <FontAwesomeIcon
                    className={style.signright}
                    icon={faCaretRight}
                  />
                  <div className={style.tasktitle}>
                    <p>Finish monthly reporting</p>
                  </div>
                  <div className={style.row252211}>
                    <h4>Completed</h4>
                    <div className={style.row2522111}>
                      <span>Updated by</span>
                      <img src={rakib} alt="" />
                      <span>Rakibul Hasan</span>
                    </div>
                    <span>On 31/12/2023 at 7.30pm</span>
                  </div>
                </div>
                <div className={style.row25222}>
                  <h4>Assigned To</h4>
                  <div className={style.row252221}>
                    <img src={rakib} alt="" />
                    <h4>Rakibul Hasan</h4>
                  </div>
                </div>
                <hr className={style.taskline} />
              </div>
              <div className={style.row2522}>
                <div className={style.row25221}>
                  <FontAwesomeIcon
                    className={style.signright}
                    icon={faCaretRight}
                  />
                  <div className={style.tasktitle}>
                    <p>Finish monthly reporting</p>
                  </div>
                  <div className={style.row252211}>
                    <h4>Completed</h4>
                    <div className={style.row2522111}>
                      <span>Updated by</span>
                      <img src={rakib} alt="" />
                      <span>Rakibul Hasan</span>
                    </div>
                    <span>On 31/12/2023 at 7.30pm</span>
                  </div>
                </div>
                <div className={style.row25222}>
                  <h4>Assigned To</h4>
                  <div className={style.row252221}>
                    <img src={rakib} alt="" />
                    <h4>Rakibul Hasan</h4>
                  </div>
                </div>
                <hr className={style.taskline} />
              </div>
            </div>
          </div>
          <div className={style.row22}>
            <div className={style.r1}>
              <div className={style.r1top}>
                <h3>Project Directory</h3>
                <div>
                  <FontAwesomeIcon
                    className={style.cleanplusicon}
                    icon={faPlus}
                  />
                  <h4>Add</h4>
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
              <div className={style.r11}>
                <FontAwesomeIcon
                  className={style.branchicon}
                  icon={faCodeBranch}
                />
                <div className={style.r111}>
                  <h4>Market research 2014</h4>
                  <div className={style.r1111}>
                    <p>Contribution : </p>
                    <div>
                      <img src={rakib} alt="" />
                      <img src={prapti} alt="" />
                    </div>
                  </div>
                  <hr className={style.grayline} />
                </div>
              </div>
            </div>
            <div className={style.r2}>
              <h3 className={style.r2down}>New Comments</h3>
              <div className={style.r21}>
                <img src={rakib} alt="" />
                <div className={style.r211}>
                  <h4>
                    Prapti Mojumder in Market research 2014 sddfsdfsdfsdfsdfsdf
                  </h4>
                  <h3>Find my keynote attached in the..</h3>
                </div>
              </div>
              <div className={style.r21}>
                <img src={rakib} alt="" />
                <div className={style.r211}>
                  <h4>Prapti Mojumder in Market research 2014</h4>
                  <h3>Find my keynote attached in the..</h3>
                </div>
              </div>
            </div>
            <div className={style.row223}>
              <h3>Team Directory</h3>
              <div className={style.row2231}>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <p>Contribution : 9</p>
                  </div>
                </div>
                <div className={style.r3}></div>
              </div>
            </div>
          </div>
          <div className={style.memberreq}>
            <div className={style.row231fund}>
              <div className={style.memberreq1}>
                <img src={rakib} alt="" />
                <h4 className={style.reqname}>Rakibul Hasan</h4>
                <h4 className={style.reqmeg}>
                  has requested your approval for funding from the university to
                  publish this research paper
                </h4>
              </div>
              <div className={style.funddetails}>
                <div className={style.detail1}>
                  <h5>Uploaded project</h5>
                  <p>Click to view</p>
                </div>
                <div className={style.detail2}>
                  <h5>Funding Amount</h5>
                  <p>BDT. 10,000TK</p>
                </div>
                {/* <div className={style.row3}>
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
                </div> */}
              </div>
              <div className={style.memberreq2}>
                <button className={style.recommend}>Accept</button>
                <button className={style.ignore}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacultyResearchMyResearch;
