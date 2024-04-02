import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import FacultyMembers from "./pages/FacultyMembers";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentProfileUpdate from "./pages/StudentProfileUpdate";
import FacultyProfileUpdate from "./pages/FacultyProfileUpdate";
import AdminStudentApplication from "./pages/AdminStudentApplication";
import AdminFacultyApplication from "./pages/AdminFacultyApplication";
import AdminSelectAssistant from "./pages/AdminSelectAssistant";
import AdminSelectTeacher from "./pages/AdminSelectTeacher";
import AdminUndergraduateAssistant from "./pages/AdminUndergraduateAssistant";
import AdminGrader from "./pages/AdminGrader";
import AdminResearchFunding from "./pages/AdminResearchFunding";
import AdminAlumniRequest from "./pages/AdminAlumniRequest";
import AdminAlumniEvent from "./pages/AdminAlumniEvent";
import AdminRecruitment from "./pages/AdminRecruitment";
import AdminPostJob from "./pages/AdminPostJob";
import AdminEditPostedJob from "./pages/AdminEditPostedJob";
import Recruitment from "./pages/Recruitment";
import StudentResearchDashboard from "./pages/StudentResearchDashboard";
import StudentResearchExploreIdeas from "./pages/StudentResearchExploreIdeas";
import StudentResearchReview from "./pages/StudentResearchReview";
import StudentResearchMyResearch from "./pages/StudentResearchMyResearch";
import StudentAssistantMyApplication from "./pages/StudentAssistantMyApplication";
import FacultyAssistantMyApplication from "./pages/FacultyAssistantMyApplication";
import FacultyAssistantRecommendation from "./pages/FacultyAssistantRecommendation";
import FacultyResearchRequest from "./pages/FacultyResearchRequest";
import StudentResearchAddSupervisor from "./pages/StudentResearchAddSupervisor";
import StudentResearchAddMember from "./pages/StudentResearchAddMember";
import FacultyAssistantApply from "./pages/FacultyAssistantApply";
import StudentAssistantApply from "./pages/StudentAssistantApply";
import StudentAssistantRecommendation from "./pages/StudentAssistantRecommendation";
import FacultyAssistantAddTask from "./pages/FacultyAssistantAddTask";
import FacultyAssistantUpdateTask from "./pages/FacultyAssistantUpdateTask";
import StudentAssistantAddSubmission from "./pages/StudentAssistantAddSubmission";
import FacultyAssistantFeedback from "./pages/FacultyAssistantFeedback";
import FacultyResearchFeedback from "./pages/FacultyResearchFeedback";
import StudentResearchFeedback from "./pages/StudentResearchFeedback";
import StudentResearchAddDirectory from "./pages/StudentResearchAddDirectory";
import FacultyResearchAddDirectory from "./pages/FacultyResearchAddDirectory";
import StudentResearchGrant from "./pages/StudentResearchGrant";
import StudentAssistantDashboard from "./pages/StudentAssistantDashboard";
import FacultyAssistantDashboard from "./pages/FacultyAssistantDashboard";
import StudentAssistantAssociation from "./pages/StudentAssistantAssociation";
import FacultyAssistantAssociation from "./pages/FacultyAssistantAssociation";
import StudentAssistantTaskManagement from "./pages/StudentAssistantTaskManagement";
import FacultyAssistantTaskManagement from "./pages/FacultyAssistantTaskManagement";
import FacultyResearchMyResearch from "./pages/FacultyResearchMyResearch";
import StudentResearchAddProjectInfo from "./pages/StudentResearchAddProjectInfo";
import StudentResearchAddTask from "./pages/StudentResearchAddTask";
import FacultyResearchAddTask from "./pages/FacultyResearchAddTask";
import StudentResearchDirectory from "./pages/StudentResearchDirectory";
import FacultyResearchDirectory from "./pages/FacultyResearchDirectory";
import StudentResearchTaskManagement from "./pages/StudentResearchTaskManagement";
import StudentResearchUpdateTask from "./pages/StudentResearchUpdateTask";
import FacultyResearchUpdateTask from "./pages/FacultyResearchUpdateTask";
import StudentResearchAddWork from "./pages/StudentResearchAddWork";
import StudentResearchUpdateWork from "./pages/StudentResearchUpdateWork";
import StudentResearchFunding from "./pages/StudentResearchFunding";
import StudentResearchShare from "./pages/StudentResearchShare";
import StudentResearchCreateMeeting from "./pages/StudentResearchCreateMeeting";
import FacultyResearchCreateMeeting from "./pages/FacultyResearchCreateMeeting";
import StudentResearchMeetingInformation from "./pages/StudentResearchMeetingInformation";
import FacultyResearchMeetingInformation from "./pages/FacultyResearchMeetingInformation";
import FacultyPostJob from "./pages/FacultyPostJob";
import FacultyUpdatePostedJob from "./pages/FacultyUpdatePostedJob";
import FindSimilarAssistant from "./pages/FindSimilarAssistant";
import FacultyProfile from "./pages/FacultyProfile";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import FacultyLogin from "./pages/FacultyLogin";
import FacultySignup from "./pages/FacultySignup";
import AdminLogin from "./pages/AdminLogin";
import Practice from "./pages/Practice";
import StudentAlumniHome from "./pages/StudentAlumniHome";
import ViewStudentProfile from "./pages/ViewStudentProfile";
import FacultyAlumniHome from "./pages/FacultyAlumniHome";
import StudentAlumniEvent from "./pages/StudentAlumniEvents";
import FacultyAlumniEvents from "./pages/FacultyAlumniEvents";
import StudentAlumniMyInteraction from "./pages/StudentAlumniMyInteraction";
import FacultyAlumniMyInteraction from "./pages/FacultyAlumniMyInteraction";
import AlumniReport from "./pages/AlumniReport";
import ViewFacultyProfile from "./pages/ViewFacultyProfile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facultymembers" element={<FacultyMembers />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/facultylogin" element={<FacultyLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/studentsignup" element={<StudentSignup />} />
          <Route path="/facultysignup" element={<FacultySignup />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/facultydashboard" element={<FacultyDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route
            path="/studentdashboard/studentresearchdashboard"
            element={<StudentResearchDashboard />}
          />
          <Route
            path="/studentdashboard/studentresearchdashboard/studentresearchmyresearch"
            element={<StudentResearchMyResearch />}
          />
          <Route
            path="/studentdashboard/studentprofile"
            element={<StudentProfile />}
          />
          <Route
            path="/studentdashboard/studentprofile/studentprofileupdate"
            element={<StudentProfileUpdate />}
          />
          <Route
            path="/facultydashboard/facultyprofile"
            element={<FacultyProfile />}
          />
          <Route
            path="/facultydashboard/facultyprofile/facultyprofileupdate"
            element={<FacultyProfileUpdate />}
          />
          <Route
            path="/facultydashboard/facultypostjob"
            element={<FacultyPostJob />}
          />
          <Route
            path="/facultydashboard/facultyupdatepostedjob"
            element={<FacultyUpdatePostedJob />}
          />
          <Route
            path="admindashboard/adminpostjob"
            element={<AdminPostJob />}
          />
          <Route
            path="/admindashboard/adminpostjob/admineditpostedjob"
            element={<AdminEditPostedJob />}
          />
          <Route
            path="/admindashboard/adminrecruitment"
            element={<AdminRecruitment />}
          />
          <Route
            path="/admindashboard/adminfacultyapplication"
            element={<AdminFacultyApplication />}
          />
          <Route
            path="facultydashboard/facultyassistantdashboard"
            element={<FacultyAssistantDashboard />}
          />
          <Route
            path="/studentdashboard/studentassistantdashboard"
            element={<StudentAssistantDashboard />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultymyapplication"
            element={<FacultyAssistantMyApplication />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultymyapplication/facultyassistantapply"
            element={<FacultyAssistantApply />}
          />
          <Route
            path="/studentdashboard/studentassistantapply"
            element={<StudentAssistantApply />}
          />
          <Route
            path="/studentdashboard/studentassistantdashboard/studentassistantmyapplication"
            element={<StudentAssistantMyApplication />}
          />
          <Route
            path="/studentdashboard/studentassistantdashboard/studentassistantmyapplication/studentassistantrecommendation"
            element={<StudentAssistantRecommendation />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantrecommendation"
            element={<FacultyAssistantRecommendation />}
          />
          <Route
            path="/admindashboard/adminstudentapplication"
            element={<AdminStudentApplication />}
          />
          <Route
            path="/admindashboard/adminstudentapplication/adminselectassistant"
            element={<AdminSelectAssistant />}
          />
          <Route
            path="/admindashboard/adminundergraduateassistant"
            element={<AdminUndergraduateAssistant />}
          />
          <Route path="/admindashboard/admingrader" element={<AdminGrader />} />
          <Route
            path="/studentdashboard/studentassistantdashboard/studentassistantassociation"
            element={<StudentAssistantAssociation />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantassociation"
            element={<FacultyAssistantAssociation />}
          />

          <Route
            path="/studentdashboard/studentassistantdashboard/studentassistantassociation/studentassistanttaskmanagement"
            element={<StudentAssistantTaskManagement />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement"
            element={<FacultyAssistantTaskManagement />}
          />

          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantaddtask"
            element={<FacultyAssistantAddTask />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantupdatetask"
            element={<FacultyAssistantUpdateTask />}
          />
          <Route
            path="/studentdashboard/studentassistantdashboard/studentassistantassociation/studentassistanttaskmanagement/studentassistantaddsubmission"
            element={<StudentAssistantAddSubmission />}
          />
          <Route
            path="/facultydashboard/facultyassistantdashboard/facultyassistantassociation/facultyassistanttaskmanagement/facultyassistantfeedback"
            element={<FacultyAssistantFeedback />}
          />
          <Route
            path="/studentdashboard/studentprofile/findsimilarassistant"
            element={<FindSimilarAssistant />}
          />
          <Route
            path="/admindashboard/adminalumnirequest"
            element={<AdminAlumniRequest />}
          />
          <Route
            path="/studentdashboard/studentalumnihome"
            element={<StudentAlumniHome />}
          />
          <Route
            path="/studentdashboard/studentalumnihome/studentalumnievents"
            element={<StudentAlumniEvent />}
          />
          <Route
            path="/facultydashboard/facultyalumnihome"
            element={<FacultyAlumniHome />}
          />
          <Route
            path="/facultydashboard/facultyalumnihome/facultyalumnievents"
            element={<FacultyAlumniEvents />}
          />

          <Route
            path="/admindashboard/adminalumnievent"
            element={<AdminAlumniEvent />}
          />

          <Route path="/viewstudentprofile" element={<ViewStudentProfile />} />
          <Route path="/viewfacultyprofile" element={<ViewFacultyProfile />} />
          <Route
            path="/studentdashboard/studentalumnihome/studentalumnimyinteraction"
            element={<StudentAlumniMyInteraction />}
          />

          <Route
            path="/facultydashboard/facultyalumnihome/facultyalumnimyinteraction"
            element={<FacultyAlumniMyInteraction />}
          />

          <Route
            path="/studentdashboard/studentalumnihome/studentalumnimyinteraction/alumnireport"
            element={<AlumniReport />}
          />

          {/* Unsettled Route */}

          <Route path="/adminselectteacher" element={<AdminSelectTeacher />} />

          <Route
            path="/adminresearchfunding"
            element={<AdminResearchFunding />}
          />

          <Route path="/adminalumnievent" element={<AdminAlumniEvent />} />
          {/* <Route path="/adminrecruitment" element={<AdminRecruitment />} />

          <Route path="/recruitment" element={<Recruitment />} /> */}

          <Route
            path="/studentresearchexploreideas"
            element={<StudentResearchExploreIdeas />}
          />
          <Route
            path="/studentresearchreview"
            element={<StudentResearchReview />}
          />
          <Route
            path="/studentresearchdashboard"
            element={<StudentResearchDashboard />}
          />

          {/* <Route
            path="/facultyassistantrecommendation"
            element={<FacultyAssistantRecommendation />}
          /> */}
          <Route
            path="/facultyresearchrequest"
            element={<FacultyResearchRequest />}
          />
          <Route
            path="/studentresearchaddsupervisor"
            element={<StudentResearchAddSupervisor />}
          />
          <Route
            path="/studentresearchaddmember"
            element={<StudentResearchAddMember />}
          />

          <Route
            path="/studentresearchfeedback"
            element={<StudentResearchFeedback />}
          />
          <Route
            path="/studentresearchadddirectory"
            element={<StudentResearchAddDirectory />}
          />
          <Route
            path="/facultyresearchadddirectory"
            element={<FacultyResearchAddDirectory />}
          />
          <Route
            path="/studentresearchgrant"
            element={<StudentResearchGrant />}
          />

          <Route
            path="/facultyresearchmyresearch"
            element={<FacultyResearchMyResearch />}
          />
          <Route
            path="/studentresearchaddprojectinfo"
            element={<StudentResearchAddProjectInfo />}
          />
          <Route
            path="/studentresearchaddtask"
            element={<StudentResearchAddTask />}
          />
          <Route
            path="/facultyresearchaddtask"
            element={<FacultyResearchAddTask />}
          />
          <Route
            path="/studentresearchdirectory"
            element={<StudentResearchDirectory />}
          />
          <Route
            path="/facultyresearchdirectory"
            element={<FacultyResearchDirectory />}
          />
          <Route
            path="/studentresearchtaskmanagement"
            element={<StudentResearchTaskManagement />}
          />
          <Route
            path="/studentresearchupdatetask"
            element={<StudentResearchUpdateTask />}
          />
          <Route
            path="/facultyresearchupdatetask"
            element={<FacultyResearchUpdateTask />}
          />
          <Route
            path="/studentresearchaddwork"
            element={<StudentResearchAddWork />}
          />
          <Route
            path="/studentresearchupdatework"
            element={<StudentResearchUpdateWork />}
          />
          <Route
            path="/studentresearchfunding"
            element={<StudentResearchFunding />}
          />
          <Route
            path="/studentresearchshare"
            element={<StudentResearchShare />}
          />
          <Route
            path="/studentresearchcreatemeeting"
            element={<StudentResearchCreateMeeting />}
          />
          <Route
            path="/facultyresearchcreatemeeting"
            element={<FacultyResearchCreateMeeting />}
          />
          <Route
            path="/studentresearchmeetinginformation"
            element={<StudentResearchMeetingInformation />}
          />
          <Route
            path="/facultyresearchmeetinginformation"
            element={<FacultyResearchMeetingInformation />}
          />

          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
