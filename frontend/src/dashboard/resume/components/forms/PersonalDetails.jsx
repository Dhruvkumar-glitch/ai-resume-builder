import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { updateResumeDetails } from "../../../../service/GlobalApi";
import { AlignCenter, LoaderCircle, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

const PersonalDetails = ({ enableNext }) => {
  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = async (e) => {
    enableNext(false);

    const { name, files, type, value } = e.target;

    if (type === "file") {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (resumeInfo?.profile_public_id) {
      }
      console.log("Uploading file:", file);

      const formDataUpload = new FormData();
      formDataUpload.append("profilePicture", file);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_CLOUDINARY_URL}/api/upload`,
          {
            method: "POST",
            body: formDataUpload,
          },
        );

        console.log("UPLOAD STATUS:", res.status);

        const data = await res.json();
        console.log("UPLOAD RESPONSE:", data);

        if (!res.ok) throw new Error("Upload failed");

        const imageUrl = data.url;
        const publicId = data.publicId;
        console.log(imageUrl);

        setFormData((prev) => ({
          ...prev,
          [name]: imageUrl,
          profile_public_id: publicId,
        }));

        setResumeInfo((prev) => ({
          ...prev,
          [name]: imageUrl,
        }));
      } catch (err) {
        console.error("Upload error:", err);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setResumeInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      ...formData,
      themeColor: resumeInfo?.themeColor ?? "",
      Template: resumeInfo?.Template ?? "",
    };

    const data = {
      data: updatedFormData,
    };
    updateResumeDetails(params?.resumeId, data)
      .then((res) => {
        // console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started with the basic Information!!</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="firstName"
              required
              value={resumeInfo?.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="lastName"
              required
              value={resumeInfo?.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">
              Job Title <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="jobTitle"
              required
              value={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">
              Address <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="address"
              required
              value={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Phone <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="phone"
              required
              value={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              name="email"
              required
              value={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
          {resumeInfo?.Template === "template-2" && (
            <div className="col-span-2 my-5">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="profilePicture"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg cursor-pointer hover:bg-primary/20 transition-colors border-2 border-dashed border-primary/30"
                >
                  <Paperclip size={18} />
                  <span className="text-sm font-medium">
                    Upload Photo <span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <input
                  ref={fileInputRef}
                  name="profilePicture"
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    console.log("FIRED ✅", e.target.files);
                    handleInputChange(e);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
