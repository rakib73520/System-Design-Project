import React from "react";
import { useState } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import StudentHeaderResearch from "../components/StudentHeaderResearch";
import HeaderResearchNext from "../components/HeaderResearchNext";
import ResearchDashboardBody from "../components/ResearchDashboardBody";

const StudentResearchDashboard = () => {
  const [bellClick, setbellClick] = useState(0);
  const [searchClick, setsearchClick] = useState(0);

  return (
    <div>
      <StudentHeader
        bellClick={bellClick}
        searchClick={searchClick}
        setbellClick={setbellClick}
        setsearchClick={setsearchClick}
      />
      <StudentHeaderSearchAndNotification
        bellClick={bellClick}
        searchClick={searchClick}
        setsearchClick={setsearchClick}
      />
      <StudentHeaderResearch />
      <HeaderResearchNext />
      <ResearchDashboardBody />
      <Footer />
    </div>
  );
};

export default StudentResearchDashboard;
