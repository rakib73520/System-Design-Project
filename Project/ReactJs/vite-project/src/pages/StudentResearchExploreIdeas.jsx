import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import Header from "../components/FacultyHeader";
import HeaderSearchAndNotification from "../components/FacultyHeaderSearchAndNotification";
import HeaderResearchNext from "../components/HeaderResearchNext";
import ResearchExploreIdeasBody from "../components/ResearchExploreIdeasBody";

const StudentResearchExploreIdeas = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

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
      <HeaderResearchNext />
      <ResearchExploreIdeasBody />
      <Footer />
    </div>
  );
};

export default StudentResearchExploreIdeas;
