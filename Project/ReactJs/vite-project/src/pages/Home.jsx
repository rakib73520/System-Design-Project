import React from "react";
import { useRef, useState, useEffect } from "react";
import Footer from "./../components/Footer";
import HomeNavbar from "./../components/HomeNavbar";
import style from "./../assets/css/Home.module.css";
import panda from "./../assets/media/images/panda.jpg";
import promo from "./../assets/media/images/promo.jpg";
import uiucampus from "./../assets/media/images/uiucampus.jpg";
import vcsir from "./../assets/media/images/vcsir.jpg";
import rezwan from "./../assets/media/images/rezwan.jpg";
import huda from "./../assets/media/images/huda.png";
import afsal from "./../assets/media/images/afsal.jpg";
import saim from "./../assets/media/images/saim.jpg";
import swakkhr from "./../assets/media/images/swakkhr.jpg";
import marsrover1 from "./../assets/media/images/marsrover1.jpg";
import debate from "./../assets/media/images/debate.jpg";
import uiuimg1 from "./../assets/media/images/uiuimg1.jpg";
import axios from "axios";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const showSlides = () => {
      let i;
      let slides = document.getElementsByClassName(style.mySlides);
      let dots = document.getElementsByClassName(style.dot);

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      setSlideIndex((prevIndex) => {
        let newIndex = prevIndex + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }

        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[newIndex].style.display = "block";
        dots[newIndex].className += " active";

        return newIndex;
      });

      setTimeout(showSlides, 3000);
    };

    showSlides();

    return () => clearTimeout(showSlides);
  }, []);

  const [studentcount, setStudentCount] = useState(0);
  const [facultycount, setFacultyCount] = useState(0);
  const [alumnicount, setAlumniCount] = useState(0);

  useEffect(() => {
    const getCountInformation = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/studentuser/"
        );
        const response1 = await axios.get(
          "http://127.0.0.1:8000/api/facultyuser/"
        );
        const response2 = await axios.get(
          "http://127.0.0.1:8000/api/alumniuser/"
        );
        setStudentCount(response.data.length);
        setFacultyCount(response1.data.length);
        setAlumniCount(response2.data.length);
      } catch (error) {
        console.log("Error connecting to the backend!");
      }
    };
    getCountInformation();
  }, []);

  const initialCounts = {
    students: 0,
    faculty: 0,
    alumni: 0,
  };

  const [counts, setCounts] = useState(initialCounts);

  useEffect(() => {
    const fetchLiveCounts = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const fetchedCounts = {
        students: studentcount,
        faculty: facultycount,
        alumni: alumnicount,
      };
      for (let key in fetchedCounts) {
        const startCount = 0;
        const endCount = fetchedCounts[key];

        for (let i = startCount; i <= endCount; i++) {
          await delay(100);
          setCounts((prevCounts) => ({
            ...prevCounts,
            [key]: i,
          }));
        }
      }
    };

    fetchLiveCounts();
  }, [studentcount, facultycount, alumnicount]);

  const [tempNotices, setTempNotices] = useState([]);
  const [noticeIndex, setNoticeIndex] = useState(0);
  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notices/`);
        setTempNotices(response.data);
      } catch (error) {
        console.log("Error connecting to the backend!");
        console.log(error);
      }
    };
    getNotices();
  }, []);

  const notices = tempNotices.map((item, index) => item.notice);

  useEffect(() => {
    const showNotices = () => {
      if (notices.length > 0) {
        setNoticeIndex((noticeIndex + 1) % tempNotices.length);
      }
      // setNoticeIndex((prevIndex) =>
      //   notices.length > 0 ? (prevIndex + 1) % notices.length : 0
      // );
      console.log("upper", noticeIndex);
      console.log("length", tempNotices.length);
      setTimeout(showNotices, 3000);
    };

    if (tempNotices.length > 0) {
      showNotices();
    }

    return () => clearTimeout(showNotices);
  }, []);

  const topnewsRef = useRef();
  const [news_isvisible, setnews_isvisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setnews_isvisible(entry.isIntersecting);
    });
    observer.observe(topnewsRef.current);
  }, []);

  const topnewsImgRef = useRef();
  const [img_isvisible, setimg_isvisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setimg_isvisible(entry.isIntersecting);
    });
    observer.observe(topnewsRef.current);
  }, []);

  const livecountRef = useRef();
  const [livecount_isvisible, setlivecount_isvisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setlivecount_isvisible(entry.isIntersecting);
    });
    observer.observe(livecountRef.current);
  }, []);

  const topfacultyRef = useRef();
  const [topfaculty_isvisible, settopfaculty_isvisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      settopfaculty_isvisible(entry.isIntersecting);
    });
    observer.observe(topfacultyRef.current);
  }, []);

  return (
    <div>
      <HomeNavbar />
      <div className={style.imgslide}>
        <div className={style.slideshowcontainer}>
          <div className={style.mySlides + " " + style.fade}>
            <div className={style.numbertext}>1 / 5</div>
            <img
              src={uiucampus}
              alt=""
              style={{ height: "400px", width: "1150px" }}
            />
            <div className={style.text}>Caption One</div>
          </div>

          <div className={style.mySlides + " " + style.fade}>
            <div className={style.numbertext}>2 / 5</div>
            <img
              src={promo}
              alt=""
              style={{ height: "400px", width: "1150px" }}
            />
            <div className={style.text}>Caption Two</div>
          </div>

          <div className={style.mySlides + " " + style.fade}>
            <div className={style.numbertext}>3 / 5</div>
            <img
              src={panda}
              alt=""
              style={{ height: "400px", width: "1150px" }}
            />
            <div className={style.text}>Caption Three</div>
          </div>
          <div className={style.mySlides + " " + style.fade}>
            <div className={style.numbertext}>4 / 5</div>
            <img
              src={uiuimg1}
              alt=""
              style={{ height: "400px", width: "1150px" }}
            />
            <div className={style.text}>Caption Four</div>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <span className={style.dot}></span>
          <span className={style.dot}></span>
          <span className={style.dot}></span>
          <span className={style.dot}></span>
        </div>
      </div>
      <div
        ref={livecountRef}
        className={livecount_isvisible ? style.livecounts : style.livecountsi}
      >
        <div className={style.livecounts1}>
          <span>{counts.students}+</span>
          <p>STUDENT</p>
        </div>
        <hr />
        <div className={style.livecounts1}>
          <span>{counts.faculty}+</span>
          <p>FACULTY</p>
        </div>
        <hr />
        <div className={style.livecounts2}>
          <span>{counts.alumni}+</span>
          <p>ALUMNI</p>
        </div>
      </div>

      <div className={style.homenotice}>
        <h1>Notice & Events</h1>
        <div>
          <p>{notices[noticeIndex]}</p>
        </div>
      </div>

      <div className={style.topfaculties}>
        <h1>TOP FACULTIES</h1>
        <div className={style.topfaculties1}>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>VICE CHANCELLOR</h4>
            <img
              src={vcsir}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>Prof Dr. Md. Abul Kashem Mia</p>
              <p>Vice Chancellor (In-Charge)</p>
              <p>Former Professor and Head, CSE Dept., BUET</p>
            </div>
          </div>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>PROFESSOR & EXECUTIVE DIRECTOR</h4>
            <img
              src={rezwan}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>Dr. M. Rezwan Khan</p>
              <p>
                Ph.D. Professor, EEE & Executive Director, IAR, Distinguished
                Lecturer, IEEE-IAS
              </p>
            </div>
          </div>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>PROFESSOR</h4>
            <img
              src={huda}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>Dr Mohammad Nurul Huda</p>
              <p>
                Professor, CSE and MSCSE Director, UIU Vice President(Academic),
                BCS; Senior Director( AI & NLP), eGeneration Ltd.
              </p>
            </div>
          </div>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>PROFESSOR</h4>
            <img
              src={afsal}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>Prof. Dr. Afzal Ahmed</p>
              <p>Professor and Head, Dept. of Civil Engineering</p>
            </div>
          </div>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>Professor & Director - IQAC</h4>
            <img
              src={saim}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>Dr. Salekul Islam</p>
              <p>
                Head of the Computer Science and Engineering (CSE) Department
              </p>
              <p>United International University (UIU), Bangladesh</p>
            </div>
          </div>
          <div
            ref={topfacultyRef}
            className={
              topfaculty_isvisible
                ? style.topfaculties1profile
                : style.topfaculties1profilei
            }
          >
            <h4>PROFESSOR</h4>
            <img
              src={swakkhr}
              alt=""
              style={{ height: "400px", width: "350px" }}
            />
            <div>
              <p>SWAKKHAR SHATABDA</p>
              <p>Professor & Director - B.Sc. in Data Science</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr style={{ width: "95%" }} />
      <div className={style.topnews}>
        <h1 style={{ textAlign: "center" }}>TOP NEWS</h1>
        <div className={style.topnews1}>
          <img
            className={
              img_isvisible ? style.topnews1imganimation : style.topnews1img
            }
            ref={topnewsImgRef}
            src={marsrover1}
            alt=""
          />
          <div>
            <h4>UIU MARSROVER</h4>
            <p
              className={news_isvisible ? style.animation : style.topnews2}
              ref={topnewsRef}
            >
              UIU's Mars rover – nicknamed "MAVEN" – ranked 1st among Asian
              countries and 13th among 36 global finalists at the University
              Rover Challenge (URC) 2022. The event was organised by the Mars
              Society, a US-based non-profit organisation that advocates and
              encourages human and robotic exploration on Mars, and also seeks
              to establish a permanent human presence on the Red Planet. The
              three-day world final round of the event took place from June 2-4
              at the Mars Desert Research Station (MDRS) in southern Utah.
              Before the final round, the UIU Mars Rover team competed with 98
              other universities from all around the world to secure a place in
              the finals. MAVEN achieved an outstanding score of 90.92 out of
              100 to be selected as one of the 36 finalists from 10 countries
              including the USA, Canada, Australia, India, Poland, Columbia,
              Egypt, Mexico, and Turkey.In the initial round, the team had to
              submit a System Acceptance Review (SAR) video to the competition.
              This video focused on the various capabilities of the rover, and
              its ability to perform a variety of missions like terrain
              traversal and delivery, equipment servicing, and autonomous
              mission. MAVEN also performed a variety of scientific tests where
              it analysed soil and rock samples to detect the presence of life.
              The video also went through MAVEN's core electronic and
              communication systems, as well as its testing and operation
              capabilities
            </p>
          </div>
        </div>
        <div className={style.topnews1}>
          <div>
            <h4>UIU DEBATECLUB</h4>
            <p
              className={news_isvisible ? style.animation : style.topnews2}
              ref={topnewsRef}
            >
              UIU Debate Club became Champion in the 6th Gold Bangladesh
              National Debate Fest 2022 United International University Debate
              Club (UIUDC) became the Unbeaten National Champion in Martyred Dr.
              Shamsuzzoha Memorial 6th Gold Bangladesh National Debate Fest 2022
              by defeating Jahangirnagar University by 9-0 ballots. The Fest was
              held in Rajshahi University on 2-3 September 2022. A team of three
              members from UIUDC participated in this fest. They are M M Tasnim,
              Dept. of Economics, Abdullah Al Habib Badhon, Dept. of CSE and K.
              M. Ismail Safa, Dept. of Economics. Among them, Abdullah Al Habib
              Badhon became ‘Debater of the Tournament’ and ‘Debater of the
              Final’ at a time. In this fest, 28 private and public Universities
              including Dhaka University, Jahangirnagar University, Jagannath
              University, Rajshahi University, Khulna University, Rajshahi
              College, East West University, Stamford University, Premier
              University, CUET, RUET participated in this national debate fest.
              Professor Golam Shabbir Sattar, honorable Vice-Chancellor of
              Rajshahi University was the Chief Guest and handed over the
              Champion trophy to the winners. Professor Md. Sultan-Ul-Islam, Pro
              Vice-Chancellor of Rajshahi University was the Special Guest.
              Among others, Prof. Dr. Pradip Kumar Panday, Dept. of Mass
              Communication and Journalism, Prof. Dr. Md. Rabiul Islam, Dept. of
              Social Work.
            </p>
          </div>
          <img
            className={
              img_isvisible ? style.topnews1imganimation : style.topnews1img
            }
            ref={topnewsImgRef}
            src={debate}
            alt=""
          />
        </div>
      </div>
      <br />
      <br />
      <hr style={{ width: "95%" }} />
      <div className={style.aboutus}>
        <h1>ABOUT US</h1>
        <p>
          United International University is a private university approved by
          the Government of the People’s Republic of Bangladesh and University
          Grants Commission (UGC). United International University is
          established with the generous support and patronage of the United
          Group, a very successful conglomerate operating in diverse business
          areas in Bangladesh. Vision: The vision of UIU is to become the center
          of excellence in teaching, learning and research in the South Asian
          region. Mission: The mission of UIU is to create excellent human
          resources with intellectual, creative, technical, moral and practical
          skills to serve community, industry and region. We do it by developing
          integrated, interactive, involved and caring relationships among
          teachers, students, guardians and employers.
        </p>
        <h4>UIU RANKING</h4>
        <p>
          THE Impact Ranking 2020 & 2021 and 2022 UIU is in 32nd position in the
          world on SDG 8 (Decent Work and Economic Growth). QS Asia University
          Ranking 2019, 2020, 2021 & 2022, UIU has been ranked among the top 350
          universities in Asia.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
