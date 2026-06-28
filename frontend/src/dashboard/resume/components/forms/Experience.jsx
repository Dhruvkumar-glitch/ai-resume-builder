import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formFeild = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

// 3 : 44 : 46

const Experience = ({ enableNext }) => {
  const [experienceList, setExperienceList] = useState([formFeild]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const addNewExperience = () => {
    setExperienceList([...experienceList, formFeild]);
  };

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.Experience?.length > 0 &&
      setExperienceList(resumeInfo?.Experience);
  }, []);

  const handleOnChange = (i, e) => {
    enableNext(false);
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[i][name] = value;
    setExperienceList(newEntries);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, i) => {
    const newEntries = experienceList.slice();
    newEntries[i][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const handleOnClick = () => {
    // console.log(experienceList);
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    console.log(data);

    updateResumeDetails(params.resumeId, data)
      .then((res) => {
        console.log(res.data);
        // Update context with saved data
        enableNext(true);
        setResumeInfo((prev) => ({
          ...prev,
          Experience: experienceList,
        }));
        toast("Details Updated !");
      })
      .catch((err) => {
        console.log(err);
        toast("Server Error , Please try again !");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      Experience: experienceList,
    }));
    // console.log(experienceList);
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-sm ">
                    Position Title <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="title"
                    required
                    value={item?.title}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-sm ">
                    Company <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="companyName"
                    required
                    value={item?.companyName}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-sm ">
                    City <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="city"
                    required
                    value={item?.city}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-sm ">
                    State <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="state"
                    required
                    value={item?.state}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-sm ">
                    Start Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    required
                    value={item?.startDate}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-sm ">
                    End Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    required
                    value={item?.endDate}
                    onChange={(e) => handleOnChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    required
                    value={item?.workSummary}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditor(e, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeExperience}
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

export default Experience;
