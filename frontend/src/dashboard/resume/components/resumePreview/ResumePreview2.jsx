import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import PersonalDetails2 from "../template/template2/PersonalDetails2";
import Details from "../template/template2/Details";
import Education2 from "../template/template2/Education2";
import Skills2 from "../template/template2/Skills2";
import ProfessionalExperience2 from "../template/template2/ProfessionalExperience2";
import Projects2 from "../template/template2/Projects2";

const ResumePreview2 = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div>
      <div className="grid grid-cols-3 shadow-2xl min-h-[275mm]">
        <div
          className="col-span-1  mr-2 pr-4"
          style={{ backgroundColor: resumeInfo?.themeColor }}
        >
          <div className="flex justify-center items-center w-full my-6">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                src={resumeInfo?.profilePicture || "/profile.png"}
                className="w-full h-full object-cover object-[50%_30%]"
                alt="profile"
              />
            </div>
          </div>
          <Details resumeInfo={resumeInfo} />

          <Education2 resumeInfo={resumeInfo} />
          <Skills2 resumeInfo={resumeInfo} />
        </div>
        <div className="col-span-2 my-5 mx-2">
          <PersonalDetails2 resumeInfo={resumeInfo} />
          <ProfessionalExperience2 resumeInfo={resumeInfo} />
          <Projects2 resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview2;
