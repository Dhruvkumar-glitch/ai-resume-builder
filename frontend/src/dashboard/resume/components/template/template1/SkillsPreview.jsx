import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
  const skills = resumeInfo?.Skills || [];

  const hasSkills = skills.some((skl) => skl?.name?.trim());

  if (!hasSkills) return null;
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-[13pt] mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.Skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-[12pt]"> {skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-30">
              <div
                className="h-2 "
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
