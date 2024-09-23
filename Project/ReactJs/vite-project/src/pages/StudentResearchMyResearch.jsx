import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./../assets/css/StudentResearchMyResearch.module.css";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import StudentHeaderResearch from "../components/StudentHeaderResearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rakib from "./../assets/media/images/rakib.jpg";
import prapti from "./../assets/media/images/prapti1.jpg";
import Swakkhar from "./../assets/media/images/swakkhr.jpg";
import {
  faPlus,
  faCodeBranch,
  faCircleCheck,
  faSquareCheck,
  faTrash,
  faPen,
  faAngleRight,
  faClock,
  faDeleteLeft,
  faCircleArrowRight,
  faCirclePlus,
  faCircleMinus,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentResearchMyResearch = () => {
  const domain = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const studentlocal = localStorage.getItem("student");
  const studentdata = JSON.parse(studentlocal);

  useEffect(() => {
    if (studentdata.access == "no") {
      navigate("/");
    }
  }, []);

  const [bellClick, setBellClick] = useState(0);
  const [searchClick, setSearchClick] = useState(0);
  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    if (logoutClick) {
      studentdata.access = "no";
      const updatedstudentdata = JSON.stringify(studentdata);
      localStorage.setItem("student", updatedstudentdata);
      navigate("/");
    }
  }, [logoutClick]);

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
      <StudentHeader
        bellClick={bellClick}
        searchClick={searchClick}
        setBellClick={setBellClick}
        setSearchClick={setSearchClick}
        setLogoutClick={setLogoutClick}
      />
      <StudentHeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
      />
      <StudentHeaderResearch />
      <div className={style.body}>
        <div className={style.row1}>
          <h1>NO CURRENT RESEARCH PROJECT</h1>
          <button className={style.startprojectbtn}>
            Start Making a Project
          </button>
        </div>
        <div className={style.row2}>
          <div className={style.row21}>
            <h2>My Project</h2>
            <FontAwesomeIcon
              className={style.editicon}
              style={editClicked ? { visibility: "hidden" } : {}}
              onClick={handleeditclick}
              icon={faPen}
            />
            <FontAwesomeIcon
              className={style.deleteicon}
              style={editClicked ? {} : { visibility: "hidden" }}
              icon={faTrash}
            />
            <FontAwesomeIcon
              className={style.doneicon}
              style={editClicked ? {} : { visibility: "hidden" }}
              onClick={handleeditclick}
              icon={faSquareCheck}
            />
          </div>
          <div className={style.row22}>
            <div className={style.row221}>
              <h3>Supervisor</h3>
              <div className={style.row2211}>
                <img src={Swakkhar} alt="" />
                <div className={style.row22111}>
                  <h4>Swakkhar Shatabda</h4>
                  <p>Assistant professor at UIU</p>
                </div>
                <FontAwesomeIcon
                  className={style.crossicon}
                  style={editClicked ? {} : { visibility: "hidden" }}
                  icon={faDeleteLeft}
                />
              </div>
              <div className={style.row2211}>
                <img src={Swakkhar} alt="" />
                <div className={style.row22111}>
                  <h4>Swakkhar Shatabda</h4>
                  <p>Assistant professor at UIU</p>
                </div>
                <FontAwesomeIcon
                  className={style.crossicon}
                  style={editClicked ? {} : { visibility: "hidden" }}
                  icon={faDeleteLeft}
                />
              </div>
              <div className={style.row2211}>
                <img src={Swakkhar} alt="" />
                <div className={style.row22111}>
                  <h4>Swakkhar Shatabda</h4>
                  <p>Assistant professor at UIU</p>
                </div>
                <FontAwesomeIcon
                  className={style.crossicon}
                  style={editClicked ? {} : { visibility: "hidden" }}
                  icon={faDeleteLeft}
                />
              </div>
              <div className={style.row2212}>
                <button
                  className={style.addsupervisorbtn}
                  onClick={handleaddsupervisor}
                  style={isSupervisor ? { visibility: "hidden" } : {}}
                >
                  Add supervisor
                </button>
                <button
                  className={style.donebtn}
                  onClick={handleaddsupervisor}
                  style={isSupervisor ? {} : { visibility: "hidden" }}
                >
                  Done
                </button>
                <div
                  className={style.row22121}
                  style={isSupervisor ? {} : { visibility: "hidden" }}
                >
                  <input type="text" placeholder="Search Supervisor" />
                  <button className={style.searchbtn}>Search</button>
                </div>
                <div
                  className={style.row22122}
                  style={isSupervisor ? {} : { visibility: "hidden" }}
                >
                  <span>View All</span>
                  <FontAwesomeIcon
                    className={style.righticon}
                    icon={faCircleArrowRight}
                  />
                </div>
                <div
                  className={style.row22123}
                  style={isSupervisor ? {} : { visibility: "hidden" }}
                >
                  <p>Rakibul Hasan</p>
                </div>
              </div>
            </div>
            <div className={style.row222}>
              <h3>Working Domain</h3>
              <div className={style.row2221}>
                <FontAwesomeIcon
                  className={style.angleicon}
                  icon={faAngleRight}
                />
                <p>Medical Image</p>
                <FontAwesomeIcon
                  className={style.crossicon}
                  style={editClicked ? {} : { visibility: "hidden" }}
                  icon={faDeleteLeft}
                />
              </div>
              <div className={style.row2221}>
                <FontAwesomeIcon
                  className={style.angleicon}
                  icon={faAngleRight}
                />
                <p>Medical Image</p>
                <FontAwesomeIcon
                  className={style.crossicon}
                  style={editClicked ? {} : { visibility: "hidden" }}
                  icon={faDeleteLeft}
                />
              </div>
              <div className={style.row2222}>
                <button
                  className={style.adddomainbtn}
                  style={isDomain ? { visibility: "hidden" } : {}}
                  onClick={handleadddomain}
                >
                  Add Domain
                </button>
                <button
                  className={style.donebtn1}
                  style={isDomain ? {} : { visibility: "hidden" }}
                  onClick={handleadddomain}
                >
                  Done
                </button>
                <div
                  className={style.row22221}
                  style={isDomain ? {} : { visibility: "hidden" }}
                >
                  <input type="text" placeholder="Write" />
                  <button className={style.addbtn}>Add</button>
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
                    <FontAwesomeIcon
                      className={style.checkicon}
                      icon={faCircleCheck}
                    />
                    <FontAwesomeIcon
                      className={style.clockicon}
                      icon={faClock}
                    />
                  </div>
                  <FontAwesomeIcon
                    className={style.crossicon}
                    style={editClicked ? {} : { visibility: "hidden" }}
                    icon={faDeleteLeft}
                  />
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <FontAwesomeIcon
                      className={style.checkicon}
                      icon={faCircleCheck}
                    />
                    <FontAwesomeIcon
                      className={style.clockicon}
                      icon={faClock}
                    />
                  </div>
                  <FontAwesomeIcon
                    className={style.crossicon}
                    style={editClicked ? {} : { visibility: "hidden" }}
                    icon={faDeleteLeft}
                  />
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <FontAwesomeIcon
                      className={style.checkicon}
                      icon={faCircleCheck}
                    />
                    <FontAwesomeIcon
                      className={style.clockicon}
                      icon={faClock}
                    />
                  </div>
                  <FontAwesomeIcon
                    className={style.crossicon}
                    style={editClicked ? {} : { visibility: "hidden" }}
                    icon={faDeleteLeft}
                  />
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan</h5>
                    </div>
                    <FontAwesomeIcon
                      className={style.checkicon}
                      icon={faCircleCheck}
                    />
                    <FontAwesomeIcon
                      className={style.clockicon}
                      icon={faClock}
                    />
                  </div>
                  <FontAwesomeIcon
                    className={style.crossicon}
                    style={editClicked ? {} : { visibility: "hidden" }}
                    icon={faDeleteLeft}
                  />
                </div>
                <div className={style.row22310}>
                  <div className={style.row22311}>
                    <img src={rakib} alt="" />
                    <div>
                      <h5>Rakibul Hasan sdfsdfsd sdfsdfsd</h5>
                    </div>
                    <FontAwesomeIcon
                      className={style.checkicon}
                      icon={faCircleCheck}
                    />
                    <FontAwesomeIcon
                      className={style.clockicon}
                      icon={faClock}
                    />
                  </div>
                  <FontAwesomeIcon
                    className={style.crossicon}
                    style={editClicked ? {} : { visibility: "hidden" }}
                    icon={faDeleteLeft}
                  />
                </div>
                <div className={style.row223100}>
                  <FontAwesomeIcon
                    className={style.plusicon}
                    onClick={handleaddmember}
                    style={isMember ? { visibility: "hidden" } : {}}
                    icon={faCirclePlus}
                  />
                  <FontAwesomeIcon
                    className={style.minusicon}
                    onClick={handleaddmember}
                    style={isMember ? {} : { visibility: "hidden" }}
                    icon={faCircleMinus}
                  />
                  <h5 className={style.addmem}>Add New Member</h5>
                </div>
              </div>
              <div
                className={style.row2232}
                style={isMember ? {} : { visibility: "hidden" }}
              >
                <div className={style.row22321}>
                  <span>View All</span>
                  <FontAwesomeIcon
                    className={style.righticon}
                    icon={faCircleArrowRight}
                  />
                </div>
                <div className={style.row22322}>
                  <input type="text" placeholder="Search Member" />
                  <button className={style.searchbtn}>Search</button>
                </div>
                <div className={style.row22323}>
                  <p>Rakibul Hasan</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.row23}>
            <div className={style.row231}>
              <h4>Post your project to attract other interested members</h4>
              <button className={style.postbtn}>Post</button>
            </div>
            <div className={style.row232}>
              <h4>Submit your project for supervisor selection</h4>
              <button className={style.submitbtn}>Submit</button>
            </div>
          </div>
          <div className={style.memberreq}>
            <div className={style.row231}>
              <div className={style.memberreq1}>
                <img src={rakib} alt="" />
                <h4 className={style.reqname}>Rakibul Hasan</h4>
                <h4 className={style.reqmeg}>
                  has requested to join your research project
                </h4>
              </div>
              <div className={style.memberreq2}>
                <button className={style.recommend}>Accept</button>
                <button className={style.ignore}>Reject</button>
              </div>
            </div>
            <div className={style.row231}>
              <div className={style.memberreq1}>
                <img src={rakib} alt="" />
                <h4 className={style.reqname}>Rakibul Hasan</h4>
                <h4 className={style.reqmeg}>
                  has requested to join your research project
                </h4>
              </div>
              <div className={style.memberreq2}>
                <button className={style.recommend}>Accept</button>
                <button className={style.ignore}>Reject</button>
              </div>
            </div>
          </div>
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
                  <div className={style.row251121} style={{ display: "none" }}>
                    <h5>Make a meeting request to</h5>
                    <h4>Swakkhar Shatabda</h4>
                    <button className={style.reqbtn}>Request</button>
                  </div>
                  <div className={style.row251121}>
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
              </div>
              <div className={style.r3}>
                <h3 className={style.r3h3}>Group meeting</h3>
                <p style={isGroupMeeting ? { display: "none" } : {}}>
                  Start a online meeting with your team
                </p>
                <button
                  className={style.groupmeetingbtn}
                  style={isGroupMeeting ? { display: "none" } : {}}
                  onClick={handlegroupmeeting}
                >
                  Start meeting
                </button>
                <div
                  className={style.r31}
                  style={isGroupMeeting ? {} : { display: "none" }}
                >
                  <div className={style.r311}>
                    <h4>Meeting starts in</h4>
                    <h3>1:08:30</h3>
                  </div>
                  <h5>About this meeting</h5>
                  <button
                    className={style.cancelbtn}
                    onClick={handlegroupmeeting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={style.row23}>
            <div className={style.row231}>
              <h4>
                Share your completed research project with our faculty, alumni,
                and students
              </h4>
              <button className={style.postbtn}>Share</button>
            </div>
            <div className={style.row232}>
              <h4 className={style.row2321}>Funding request for publication</h4>
              <h5>Visit funding request page</h5>
            </div>
          </div>
        </div>

        {/* member request */}

        <div className={style.row2}>
          <div className={style.sukuna}>
            <h2 className={style.sukuna1}>Research Project Member Request</h2>

            <div className={style.infoheader}>
              <h3>Team Information</h3>
              <h3>Working Domain</h3>
              <h3>Action</h3>
            </div>
            <div className={style.infobody}>
              <div className={style.bodyrow}>
                <div className={style.col1}>
                  <div className={style.col11}>
                    <img src={rakib} alt="" />
                    <div className={style.col111}>
                      <h4>Rakibul Hasan</h4>
                      <p>
                        has invited you to join their research project team.
                      </p>
                    </div>
                  </div>
                  <h4 className={style.detailtitle}>Other Members</h4>
                  <div className={style.col12}>
                    <div className={style.col121}>
                      <img src={rakib} alt="" />
                      <h4>Rakibul Hasan</h4>
                    </div>
                    <div className={style.col121}>
                      <img src={rakib} alt="" />
                      <h4>Rakibul Hasan</h4>
                    </div>
                    <div className={style.col121}>
                      <img src={rakib} alt="" />
                      <h4>Rakibul Hasan</h4>
                    </div>
                    <div className={style.col121}>
                      <img src={rakib} alt="" />
                      <h4>Rakibul Hasan</h4>
                    </div>
                  </div>
                </div>
                <div className={style.col2}>
                  <h4>
                    Hello Rakibul, We will be working on the following domain
                  </h4>
                  <div className={style.col21}>
                    <div className={style.col211}>
                      <FontAwesomeIcon
                        className={style.angleicon}
                        icon={faAngleRight}
                      />
                      <h3>Medical Image</h3>
                    </div>
                    <div className={style.col211}>
                      <FontAwesomeIcon
                        className={style.angleicon}
                        icon={faAngleRight}
                      />
                      <h3>Medical Image</h3>
                    </div>
                    <div className={style.col211}>
                      <FontAwesomeIcon
                        className={style.angleicon}
                        icon={faAngleRight}
                      />
                      <h3>Medical Image</h3>
                    </div>
                  </div>
                </div>
                <div className={style.col3}>
                  <button className={style.recommend}>Accept</button>
                  <button className={style.ignore}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentResearchMyResearch;
