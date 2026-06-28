import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { toast } from "sonner";

const Projects = ({ enableNext }) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [projectList, setProjectList] = useState([
    {
      name: "",
      techStack: "",
      description: "",
      githubLink: "",
      liveLink: "",
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.Projects?.length > 0) {
      setProjectList(resumeInfo.Projects);
    }
  }, []);

  const handleOnChange = (e, i) => {
    enableNext(false);
    const newEntries = [...projectList];
    newEntries[i][e.target.name] = e.target.value;
    setProjectList(newEntries);
  };

  const addNewProjects = () => {
    setProjectList([
      ...projectList,
      {
        name: "",
        techStack: "",
        description: "",
        githubLink: "",
        liveLink: "",
      },
    ]);
  };

  const removeProjects = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  const handleOnClick = () => {
    setLoading(true);

    const data = {
      data: {
        Projects: projectList.map(({ id, ...rest }) => rest),
      },
    };

    updateResumeDetails(params.resumeId, data)
      .then((res) => {
        console.log(res.data);
        enableNext(true);
        setResumeInfo((prev) => ({
          ...prev,
          Projects: projectList,
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
      Projects: projectList,
    }));
    // console.log(experienceList);
  }, [projectList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Add Your Projects</p>
        <div>
          {projectList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg">
                <div>
                  <label>
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="name"
                    required
                    value={item.name}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>
                    Tech Stack <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="techStack"
                    required
                    value={item.techStack}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <label>
                    Description <span style={{ color: "red" }}>*</span>
                  </label>
                  <Textarea
                    name="description"
                    required
                    value={item.description}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>GitHub Link</label>
                  <Input
                    name="githubLink"
                    value={item.githubLink}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
                <div>
                  <label>Live Link</label>
                  <Input
                    name="liveLink"
                    value={item.liveLink}
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewProjects}
            >
              + Add More Projects
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeProjects}
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

export default Projects;
