import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";

const DropDown = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div>
      <Select
        value={resumeInfo?.Template}
        onValueChange={(value) => {
          setResumeInfo((prev) => ({
            ...prev,
            Template: value,
          }));
        }}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Select Template" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="template-1">Template 1</SelectItem>
            <SelectItem value="template-2">Template 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDown;
