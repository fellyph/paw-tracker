import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBjG58lpTPR6jUTZNvX2_ZgXRjup_8gwxA'); // Replace with actual API key

export const identifyDogBreed = async (imageBase64: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    const prompt = "What breed is this dog? Please provide only the breed name without any additional text.";
    const imageParts = [
      {
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: 'image/jpeg'
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error identifying dog breed:', error);
    throw new Error('Failed to identify dog breed');
  }
};