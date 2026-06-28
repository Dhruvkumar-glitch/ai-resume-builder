import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/resumePreview/ResumePreview";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import dummy from "../../../../data/dummy";
import { getResumeById } from "../../../../service/GlobalApi";
import ResumePreview2 from "../../components/resumePreview/ResumePreview2";

const EditResume = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [resumeInfo, setResumeInfo] = useState();

  const GetResumeInfo = () => {
    // console.log(params);
    setLoading(true);
    getResumeById(params?.resumeId)
      .then((res) => {
        console.log(res.data.data);
        setResumeInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    GetResumeInfo();
  }, [params.resumeId]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        {resumeInfo?.Template === "template-1" ? (
          <ResumePreview />
        ) : resumeInfo?.Template === "template-2" ? (
          <ResumePreview2 />
        ) : (
          <ResumePreview />
        )}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
