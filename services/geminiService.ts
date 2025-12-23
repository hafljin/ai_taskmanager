
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { MeetingAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const analysisFunction: FunctionDeclaration = {
  name: "analyze_meeting_notes",
  description: "Extract summary, key points, and action items from meeting notes or transcriptions.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A short descriptive title for the meeting."
      },
      summary: {
        type: Type.STRING,
        description: "A 2-3 sentence overview of what was discussed."
      },
      keyPoints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of the most important discussion points."
      },
      actionItems: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING, description: "Clear description of the task." },
            assignee: { type: Type.STRING, description: "The person responsible (if mentioned)." },
            dueDate: { type: Type.STRING, description: "Deadline for the task (if mentioned)." },
            priority: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Urgency of the task." }
          },
          required: ["task", "priority"]
        },
        description: "List of concrete actions to be taken after the meeting."
      }
    },
    required: ["title", "summary", "keyPoints", "actionItems"]
  }
};

export const analyzeNotes = async (
  content: string,
  imageUri?: string
): Promise<MeetingAnalysis> => {
  // Vite環境変数はimport.meta.envで参照
  const useDummy = import.meta.env.VITE_USE_DUMMY_AI === 'true';
  if (useDummy) {
    // ダミーデータを返す（デモ用）
    return {
      title: 'デモ会議タイトル',
      summary: 'これはダミーの要約です。会議内容を簡潔にまとめています。',
      keyPoints: ['ダミーキーポイント1', 'ダミーキーポイント2', 'ダミーキーポイント3'],
      actionItems: [
        { task: 'ダミータスク1', priority: 'High' },
        { task: 'ダミータスク2', priority: 'Medium' },
        { task: 'ダミータスク3', priority: 'Low' }
      ]
    };
  }
  // ...existing code...
  const model = "gemini-3-flash-preview";
  const parts: any[] = [];
  if (content) parts.push({ text: content });
  if (imageUri) {
    const base64Data = imageUri.split(',')[1];
    const mimeType = imageUri.split(';')[0].split(':')[1];
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }
  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      tools: [{ functionDeclarations: [analysisFunction] }],
      systemInstruction: "You are a professional secretary. Analyze the provided meeting notes or images of notes/whiteboards and extract structured information. Be precise and action-oriented."
    }
  });
  const calls = response.functionCalls;
  if (!calls || calls.length === 0) {
    throw new Error("AI failed to generate structured data. Please try again.");
  }
  return calls[0].args as unknown as MeetingAnalysis;
};
