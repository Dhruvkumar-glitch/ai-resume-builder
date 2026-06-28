import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  // console.log(resumeInfo?.summary);
  return (
    <div>
      <p className="text-sm">{resumeInfo?.summary}</p>
    </div>
  );
};

export default SummaryPreview;
