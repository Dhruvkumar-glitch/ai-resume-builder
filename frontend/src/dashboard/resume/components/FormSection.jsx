import React, { act, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Projects from "./forms/Projects";
import DropDown from "./DropDown";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const params = useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>Home</Button>
          </Link>
          <ThemeColor />
          <DropDown />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft /> Prev{" "}
            </Button>
          )}

          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal detaial  */}
      {/* summary  */}
      {/* experience */}
      {/* projects */}
      {/* education */}
      {/* skills */}
      {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Projects enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 7 ? (
        <Navigate to={`/my-resume/${params.resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;
