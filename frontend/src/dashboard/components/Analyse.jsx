import React from "react";
import { Button } from "../../components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { toast } from "sonner";

const Analyse = () => {
  const navigate = useNavigate();
  const { has } = useAuth();
  const hasBasicPlan = has({ plan: "pro_plan" });

  const handleOnClick = () => {
    if (!hasBasicPlan) {
      toast.error("Subscribe to Pro plan to get this feature !!! ");
    } else {
      navigate("/resume-analyse");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10 mt-10 mx-10 justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-2">
            <Button variant="outline" size="lg" onClick={handleOnClick}>
              Analyse Resume
            </Button>
            <Button size="icon-lg" aria-label="Submit" variant="outline">
              <ArrowUpRightIcon />
            </Button>
          </div>
        </div>
        <div className="h-50 w-50 md:h-100 md:w-100">
          <img height={100} src="/resume-analyser.avif" alt="analyser" />
        </div>
      </div>
    </div>
  );
};

export default Analyse;
