import React from "react";
import { Link } from "react-router-dom";

const ProjectPreview = ({ resumeInfo }) => {
  const projects = resumeInfo?.Projects || [];

  const hasProjects = projects.some(
    (pr) =>
      pr?.name?.trim() ||
      pr?.techStack?.trim() ||
      pr?.description?.trim() ||
      pr?.githubLink?.trim() ||
      pr?.liveLink?.trim(),
  );

  if (!hasProjects) return null;
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-[13pt] mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.Projects?.map((item, index) => (
        <div key={index} className="my-5">
          <div className="flex justify-between">
            <h2
              className="text-[12pt] font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {item.name}
            </h2>
            <div
              className="flex gap-2 text-[12pt]"
              style={{ color: resumeInfo?.themeColor }}
            >
              {item?.githubLink && <Link to={item.githubLink}>GitHub</Link>}

              {item?.liveLink && (
                <Link to={item.liveLink}>|&nbsp; Live Demo</Link>
              )}
            </div>
          </div>
          {item.techStack && (
            <div className="flex gap-1 text-sm">
              <h2>TechStack : </h2>
              <h2>{item.techStack}</h2>
            </div>
          )}
          <p className="text-sm my-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectPreview;
