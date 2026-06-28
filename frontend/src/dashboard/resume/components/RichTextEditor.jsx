import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { main } from "../../../service/AIModal";
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";

const RichTextEditor = ({ onRichTextEditorChange, index, value }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const prompt =
    "position title : {Job Position} , Depends upon position title give me 2-3 bullet points for my experience in resume , return the response in json format with the name as experience_details";

  const [aiSummary, setAiSummary] = useState();

  const handleOnClick = async () => {
    // console.log(resumeInfo?.experience[index]);

    if (!resumeInfo?.Experience?.[index]?.title) {
      toast("Position Title is required!");
      return;
    }
    setLoading(true);
    const generatedPrompt = prompt.replace(
      "{Job Position}",
      resumeInfo?.Experience?.[index]?.title,
    );
    const res = await main(generatedPrompt);

    setAiSummary(res);
    setLoading(false);
  };

  useEffect(() => {
    // console.log(aiSummary);
    if (aiSummary?.experience_details?.length) {
      const html = `
      <ul>
        ${aiSummary.experience_details
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
    `;

      setData(html);
      onRichTextEditorChange({
        target: {
          value: html,
        },
      });
    }
  }, [aiSummary]);

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-sm">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary cursor-pointer"
          onClick={handleOnClick}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4" /> "Generate from AI"
            </>
          )}
        </Button>
      </div>
      <Editor
        className="text-sm"
        value={data ? data : value}
        onChange={(e) => {
          setData(e.target.value);
          onRichTextEditorChange(e);
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <Separator />
        </Toolbar>
      </Editor>
    </div>
  );
};

export default RichTextEditor;
