
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string), vertexai: true });

export const enhancePrompt = async (basePrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `Enhance this AI image generation prompt to be more descriptive, professional, and effective for high-quality results. Keep it concise but impactful: "${basePrompt}"` }]
      },
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || basePrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return basePrompt;
  }
};

export const analyzeImageForPrompt = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image
            }
          },
          { text: "Describe this image in detail as an AI image generation prompt. Focus on style, lighting, composition, and subject matter." }
        ]
      }
    });
    return response.text || "A beautiful AI generated image.";
  } catch (error) {
    console.error('Error analyzing image:', error);
    return "Error generating prompt from image.";
  }
};
