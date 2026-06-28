import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { main } from "../../../../service/AIModal";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summaryDetails, setSummaryDetails] = useState(
    resumeInfo?.summary || "",
  );
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiSummary, setAiSummary] = useState(null);
  // const [selectedSummary, setSelectedSummary] = useState("");

  const prompt = `Generate a summary for resume for a {job} in 3-4 lines with 3 options to pick (fresher , intermediate , exprienced) return the response in json format which has an array of three objects each with the fields level and summary`;

  useEffect(() => {
    if (summaryDetails) {
      setResumeInfo((prev) => ({
        ...prev,
        summary: summaryDetails,
      }));
    }
  }, [summaryDetails]);

  const handleClick = async () => {
    setLoading(true);
    const generatePrompt = prompt.replace("{job}", resumeInfo?.jobTitle);
    const res = await main(generatePrompt);

    setAiSummary(res);
    setLoading(false);
  };

  const handleAiSummary = (s) => {
    // setSelectedSummary(s);
    setSummaryDetails(s);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summaryDetails,
      },
    };
    // console.log(data);
    // console.log(params);
    // return;

    updateResumeDetails(params?.resumeId, data)
      .then((res) => {
        console.log(res.data);
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      })
      .catch((err) => {
        console.log(err);
        toast("Update Failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your Resume!!</p>

        <form className="mt-7" onSubmit={onSubmit}>
          <div className="flex justify-between items-end">
            <label>
              Add Summary <span style={{ color: "red" }}>*</span>
            </label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="flex gap-2 border-primary text-primary cursor-pointer"
              onClick={handleClick}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            required
            value={summaryDetails}
            className="mt-5"
            onChange={(e) => setSummaryDetails(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiSummary && (
        <div className="mt-5 border-3 shadow-lg p-5 rounded-lg border-t-primary border-t-4">
          <h2 className="text-md text-center font-bold text-lg">
            {" "}
            Select an AI-Generated Summary !!!
          </h2>
          {aiSummary &&
            aiSummary.length > 0 &&
            aiSummary.map((v, i) => (
              <div
                key={i}
                className="border-2 p-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer text-sm"
                onClick={() => handleAiSummary(v.summary)}
              >
                <h3 className="text-md text-center font-bold">
                  {v.level.toUpperCase()}
                </h3>
                <p className="tet-sm mt-2">{v.summary}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
