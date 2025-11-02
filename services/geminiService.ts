
import { GoogleGenAI } from "@google/genai";
import { WritingTaskType, SuggestionType } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateWritingPrompt = async (taskType: WritingTaskType): Promise<string> => {
  try {
    const prompt = `Generate a Cambridge B2 First (FCE) style writing prompt for an ${taskType}. The prompt should be creative, engaging, and suitable for a 16-20 year old student. It must be between 40 and 60 words.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating writing prompt:", error);
    return `Error: Could not generate a prompt for ${taskType}. Please try again.`;
  }
};

export const getAiSuggestions = async (text: string, suggestionType: SuggestionType): Promise<string> => {
  let prompt = '';
  switch (suggestionType) {
    case SuggestionType.GRAMMAR:
      prompt = `You are an expert Cambridge English examiner. Review the following text for grammatical errors and awkward phrasing typical of a B2 level student. Provide corrections and brief, simple explanations for each correction. Format your response as a list using markdown. Text: "${text}"`;
      break;
    case SuggestionType.CONNECTORS:
      prompt = `You are an expert Cambridge English examiner. Suggest 3-5 more sophisticated connectors or linking phrases that could be used in the following text to improve its organization and flow. Do not rewrite the text. Just list the suggested connectors and explain where they could be used effectively. Format as a markdown list. Text: "${text}"`;
      break;
    case SuggestionType.VOCABULARY:
        prompt = `You are an expert Cambridge English examiner. Identify 3-5 words or phrases in the following text that could be replaced with more advanced (B2/C1 level) vocabulary. For each, provide the original word/phrase and a list of suitable synonyms. Format as a markdown list. Text: "${text}"`;
        break;
    case SuggestionType.REPHRASE:
      prompt = `You are an expert Cambridge English examiner. Take the following text and provide three alternative ways to phrase it to make it more engaging, formal, or sophisticated, suitable for a B2 level exam. Format your response as a numbered markdown list. Text: "${text}"`;
      break;
  }

  if (!prompt) return "Invalid suggestion type.";

  try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error(`Error getting AI suggestions for ${suggestionType}:`, error);
    return "Error: Could not get suggestions at this time. Please try again.";
  }
};
   