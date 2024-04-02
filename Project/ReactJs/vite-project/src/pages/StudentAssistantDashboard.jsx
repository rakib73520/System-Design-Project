import React from "react";
import { useState, useEffect } from "react";
import Footer from "./../components/Footer";
import StudentHeader from "../components/StudentHeader";
import StudentHeaderSearchAndNotification from "../components/StudentHeaderSearchAndNotification";
import HeaderAssistant from "../components/HeaderAssistant";
import AssistantDashboard from "../components/AssistantDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentAssistantDashboard = () => {
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
      <HeaderAssistant />
      <AssistantDashboard />
      <Footer />
    </div>
  );
};

export default StudentAssistantDashboard;
