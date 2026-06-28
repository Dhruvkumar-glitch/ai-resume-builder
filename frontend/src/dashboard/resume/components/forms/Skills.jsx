import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = ({ enableNext }) => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const handleOnChange = (index, name, value) => {
    enableNext(false);
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.Skills);
  }, []);

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const removeSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const handleOnClick = () => {
    setLoading(true);
    const data = {
      data: {
        Skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    // console.log(data);
    updateResumeDetails(params?.resumeId, data)
      .then((res) => {
        console.log(res.data);
        enableNext(true);
        toast("Details Updated !");
      })
      .catch((err) => {
        console.log(err);
        toast("Server Error , Please try again !");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your top sills</p>
        <div>
          {skillsList &&
            skillsList?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border rounded-lg p-3 mb-3"
              >
                <div>
                  <label className="text-xs">
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    value={item.name}
                    required
                    onChange={(e) =>
                      handleOnChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={item.rating}
                  onChange={(v) => handleOnChange(index, "rating", v)}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewSkills}
            >
              + Add More Skills
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeSkills}
            >
              Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={handleOnClick}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
