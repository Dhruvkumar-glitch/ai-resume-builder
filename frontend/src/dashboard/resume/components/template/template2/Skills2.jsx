import React from "react";

const Skills2 = ({ resumeInfo }) => {
  const skills = resumeInfo?.Skills || [];

  const hasSkills = skills.some((skl) => skl?.name?.trim());

  if (!hasSkills) return null;
  return (
    <div className="my-6 text-white px-5">
      <hr className="border-[1.5px] my-2 bg-white" />
      <h2 className="text-center font-bold text-[10pt] mb-2 ">Skills</h2>
      <hr className="border-[1.5px] my-2 bg-white" />
      <div className="my-5">
        {resumeInfo?.Skills?.map((skill, index) => (
          <div key={index} className="flex gap-5">
            <h2 className="text-[10pt]"> {skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-30">
              <div
                className="h-2 bg-white "
                style={{
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

export default Skills2;
