import React from "react";

const ProfessionalExperiencePreview = ({ resumeInfo }) => {
  const experiences = resumeInfo?.Experience || [];

  const hasExperience = experiences.some(
    (exp) =>
      exp?.title?.trim() ||
      exp?.companyName?.trim() ||
      exp?.workSummary?.trim() ||
      exp?.city?.trim() ||
      exp?.state?.trim() ||
      exp?.startDate?.trim() ||
      exp?.endDate?.trim(),
  );

  if (!hasExperience) return null;

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-[13pt] mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-[12pt] font-bold "
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <div className="flex items-center justify-between">
            <h2 className="text-sm">
              {experience?.companyName} {experience?.city} {experience?.state}
            </h2>
            <span className="font-normal text-sm">
              {experience?.startDate}
              {experience?.endDate && " - "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </div>
          {/* <p className="text-xs my-2">{experience?.workSummary}</p> */}
          <div
            className="text-sm mt-3"
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperiencePreview;
