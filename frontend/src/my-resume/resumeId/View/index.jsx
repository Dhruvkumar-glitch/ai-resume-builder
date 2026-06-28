import React, { useEffect, useState } from "react";
import Header from "../../../components/custom/Header";
import { Button } from "@/components/ui/button";
import ResumePreview from "../../../dashboard/resume/components/resumePreview/ResumePreview";
import ResumePreview2 from "../../../dashboard/resume/components/resumePreview/ResumePreview2";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useNavigate, useParams } from "react-router-dom";
import { getResumeById, updateResumeDetails } from "../../../service/GlobalApi";
import { useAuth, useUser } from "@clerk/react";
import Footer from "../../../components/custom/Footer";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const { has } = useAuth();

  const hasBasicPlan = has({ plan: "pro_plan" });
  const navigate = useNavigate();

  const getResumeInfo = () => {
    setLoading(true);
    getResumeById(resumeId)
      .then((res) => {
        console.log(res.data.data);
        setResumeInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  const handlePrintDownload = async () => {
    console.log("Plan :", hasBasicPlan);
    if (hasBasicPlan) {
      window.print();
    } else {
      await getResumeInfo();
      const currentCount = resumeInfo?.downloadCounter || 0;

      if (currentCount >= 5) {
        console.log("Limit Reached");
        toast.error("Limit Reached .. Subscribe to Pro plan !");
      } else {
        setLoading(true);

        const data = {
          data: {
            downloadCounter: currentCount + 1,
          },
        };

        try {
          await updateResumeDetails(resumeId, data);
          window.print();
        } catch {
          toast("Server Error");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume",
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Web Share not supported");
    }
  };

  useEffect(() => {
    getResumeInfo();
  }, []);

  return (
    <div>
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="no-print">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Your Resume Is Ready !!!{" "}
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download and share your Resume{" "}
            </p>
            <div className="flex justify-between my-10 md:mx-40 lg:mx-50">
              <Button onClick={handlePrintDownload} disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Download"
                )}
              </Button>
              <Button onClick={handleShare}>Share</Button>
            </div>
          </div>
        </div>

        <div className=" my-10 mx-auto max-w-6xl ">
          <div id="print-area">
            {resumeInfo?.Template == "template-1" ? (
              <ResumePreview />
            ) : resumeInfo?.Template == "template-2" ? (
              <ResumePreview2 />
            ) : (
              <ResumePreview />
            )}
          </div>
        </div>
      </ResumeInfoContext.Provider>
    </div>
  );
};

export default ViewResume;
