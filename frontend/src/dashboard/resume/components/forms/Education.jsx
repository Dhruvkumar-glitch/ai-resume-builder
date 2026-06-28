import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { toast } from "sonner";

const Education = ({ enableNext }) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      university: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.Education);
    console.log(resumeInfo);
  }, []);

  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        university: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const handleOnChange = (e, i) => {
    enableNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[i][name] = value;
    setEducationalList(newEntries);
  };

  const handleOnClick = () => {
    setLoading(true);
    const data = {
      data: {
        Education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    updateResumeDetails(params.resumeId, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        toast("Details Updated");
      })
      .catch((err) => {
        console.log(err);
        toast("Server Error , Please try again!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Education: educationalList,
    });
  }, [educationalList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add Your Educational Details</p>
        <div>
          {educationalList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label>
                    University Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="university"
                    required
                    value={item.university}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>
                    Degree <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="degree"
                    required
                    value={item.degree}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>
                    Major <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="major"
                    required
                    value={item.major}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>
                    Start Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    required
                    value={item.startDate}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>
                    End Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    required
                    value={item.endDate}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div className="col-span-2 ">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    required
                    value={item.description}
                    onChange={(e) => handleOnChange(e, index)}
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
              onClick={addNewEducation}
            >
              + Add More Eduaction
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeEducation}
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

export default Education;
