import React from "react";

const Details = ({ resumeInfo }) => {
  return (
    <div className="text-white px-5 my-6">
      <hr className="border-[1.5px] my-2 bg-white" />
      <h2 className="text-center font-bold text-[10pt] mb-2 ">Contacts</h2>
      <hr className="border-[1.5px] my-2 bg-white" />

      <h2 className="font-normal text-[8pt] my-3">
        {resumeInfo?.phone ? "Phone : " : null}
        {resumeInfo?.phone}
      </h2>
      <h2 className="font-normal text-[8pt] my-3">
        {resumeInfo?.email ? "Email : " : null}
        {resumeInfo?.email}
      </h2>
      <h2 className="font-normal text-[8pt] my-3">
        {resumeInfo?.address ? "Address : " : null}
        {resumeInfo?.address}
      </h2>
    </div>
  );
};

export default Details;
