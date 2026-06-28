import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error(error);
  }
}

export async function analyzePdfWithGemini({ filePath, prompt }) {
  try {
    const fileBuffer = fs.readFileSync(filePath);

    const base64File = fileBuffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                prompt ||
                "Analyze this resume and return JSON with: score (0-100), strengths, weaknesses, suggestions",
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64File,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    let result;

    try {
      result = JSON.parse(response.text);
    } catch {
      console.log("Raw response:", response.text);
      throw new Error("Invalid JSON from Gemini");
    }

    return result;
  } catch (error) {
    console.error("Gemini PDF Analysis Error:", error);
    throw error;
  }
}
