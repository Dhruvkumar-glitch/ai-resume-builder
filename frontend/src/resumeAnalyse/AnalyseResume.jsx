// import React from "react";
import Header from "../components/custom/Header";
import Footer from "../components/custom/Footer";

import React, { useState } from "react";
import { analyzePdfWithGemini } from "../service/AIModal";

const AnalyseResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setResult(null);

    try {
      // console.log(file);
      setLoading(true);
      const formData = new FormData();
      formData.append("resumePdf", file);

      const res = await fetch(
        `${import.meta.env.VITE_PREP_FORGE_URL}/api/v1/analyse`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await res.json();

      setResult(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 my-10 min-h-[400px]">
        <div className="flex flex-col items-center gap-5 border p-6 rounded-lg shadow">
          <h2 className="font-bold text-xl">Upload Your Resume</h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Analyse Resume
          </button>

          {file && (
            <p className="text-sm text-gray-500">Selected: {file.name}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-5 border p-6 rounded-lg shadow min-h-[250px]">
          <div className="flex gap-5 justify-center">
            <h2 className="font-bold flex flex-col justify-center">
              Resume Analyser{" "}
            </h2>{" "}
          </div>

          {loading && (
            <div className="flex items-center gap-3">
              <p>Analyzing...</p>
              <img width={40} src="/robot.png" alt="AI Bot" />
            </div>
          )}

          {!loading && !result && (
            <p className="text-gray-400">Upload a resume to see analysis</p>
          )}

          {!loading && result && (
            <div className="w-full">
              <p className="font-semibold">
                Score: {result.aiResponse.score}/100
              </p>

              <div className="mt-3">
                <p className="font-semibold">Strengths:</p>
                <ul className="list-disc ml-5">
                  {result.aiResponse.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <p className="font-semibold">Weaknesses:</p>
                <ul className="list-disc ml-5">
                  {result.aiResponse.weaknesses.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <p className="font-semibold">Suggestions:</p>
                <ul className="list-disc ml-5">
                  {result.aiResponse.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyseResume;
