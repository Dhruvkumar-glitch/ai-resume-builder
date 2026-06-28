import React from "react";

const PersonalDetails2 = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="font-bold text-[22pt] text-center mt-5 "
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-[13pt] font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <p className="p-5 text-sm">{resumeInfo?.summary}</p>
    </div>
  );
};

export default PersonalDetails2;
