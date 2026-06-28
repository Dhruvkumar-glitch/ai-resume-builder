import React from "react";

const EducationPreview = ({ resumeInfo }) => {
  const educations = resumeInfo?.Education || [];

  const hasEducations = educations.some(
    (edu) =>
      edu?.university?.trim() ||
      edu?.degree?.trim() ||
      edu?.major?.trim() ||
      edu?.description?.trim() ||
      edu?.startDate?.trim() ||
      edu.endDate?.trim(),
  );

  if (!hasEducations) return null;

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-[13pt] mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Education?.map((education, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-[12pt] font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {education?.university}
          </h2>
          <div className="flex justify-between text-sm">
            <h2>
              {education?.degree} {education?.major && " in "}
              {education?.major}
            </h2>
            <h2>
              {education?.startDate} {education?.endDate && " - "}
              {education?.endDate}
            </h2>
          </div>
          <p className="text-sm my-2 ">{education?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationPreview;
