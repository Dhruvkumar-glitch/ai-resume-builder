import React from "react";

const Education2 = ({ resumeInfo }) => {
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
    <div className="text-white my-6 px-5">
      <hr className="border-[1.5px] my-2 bg-white" />
      <h2 className="text-center font-bold text-[10pt] mb-2 ">Education</h2>
      <hr className="border-[1.5px] my-2 bg-white" />

      {resumeInfo?.Education?.map((education, index) => (
        <div key={index} className="my-5">
          <h2 className="text-[10pt] font-bold">{education?.university}</h2>
          <div className=" text-[8pt]">
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

export default Education2;
