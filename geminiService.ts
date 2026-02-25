import { GoogleGenAI } from '@google/genai';

// Initialize the SDK using Vite's environment variables
// Note: We use import.meta.env instead of process.env
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  project: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT,
  location: import.meta.env.VITE_GOOGLE_CLOUD_LOCATION,
  vertexai: true 
});

/**
 * Enhances a text prompt using Gemini 2.5 Flash
 */
export const enhancePrompt = async (basePrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: `Enhance this AI image generation prompt to be more descriptive, professional, and effective for high-quality results. Keep it concise but impactful: "${basePrompt}"` }]
      }],
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

/**
 * Analyzes a Base64 image to generate a descriptive prompt
 */
export const analyzeImageForPrompt = async (base64Image: string): Promise<string> => {
  try {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,") if it exists
    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data
            }
          },
          { text: "Describe this image in detail as an AI image generation prompt. Focus on style, lighting, composition, and subject matter." }
        ]
      }]
    });

    return response.text || "A beautiful AI generated image.";
  } catch (error) {
    console.error('Error analyzing image:', error);
    return "Error generating prompt from image.";
  }
};
