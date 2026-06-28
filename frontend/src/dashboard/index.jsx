import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/react";
import { getUserResume } from "../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && getResumeList();
  }, [user]);

  const getResumeList = () => {
    getUserResume(user?.primaryEmailAddress?.emailAddress)
      .then((res) => setResumeList(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-10 md:p-10 lg:p-20">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI Resume to find your next Job</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 my-10">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={getResumeList}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
