import React, { useContext, useEffect } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import PersonalDetailPreview from "../template/template1/PersonalDetailPreview";
import SummaryPreview from "../template/template1/SummaryPreview";
import ProfessionalExperiencePreview from "../template/template1/ProfessionalExperiencePreview";
import EducationPreview from "../template/template1/EducationPreview";
import SkillsPreview from "../template/template1/SkillsPreview";
import ProjectPreview from "../template/template1/ProjectPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg min-h-[275mm] p-14 border-t-20"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* personal details  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* summary  */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* professional experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

      {/* projects */}
      <ProjectPreview resumeInfo={resumeInfo} />

      {/* education */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
