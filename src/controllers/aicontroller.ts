// backend/controllers/aiController.ts
import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateCampaignMessages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { campaignObjective } = req.body;

    if (!campaignObjective) {
      return res.status(400).json({ error: 'Campaign objective is required' });
    }

    // Request AI to generate 2-3 message variants for the campaign
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate 2-3 message variants for the campaign: "${campaignObjective}"`,
    });

    // Handle missing response text
    if (!response.text) {
      return res.status(500).json({ error: 'AI generation returned no content' });
    }

    // Split the response text into separate messages
    const messages = response.text.split("\n").slice(0, 3);

    // Return the generated messages
    return res.json({ messages });
  } catch (err) {
    console.error('AI generation error:', err);
    return res.status(500).json({ error: 'AI generation failed' });
  }
};
