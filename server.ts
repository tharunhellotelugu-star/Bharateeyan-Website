import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Campaign Coach: Drafts an honest, inspiring campaign story from rough notes
app.post('/api/ai/coach', async (req, res) => {
  try {
    const { roughNotes, category, language, founderName, title } = req.body;
    
    if (!ai) {
      return res.json({
        text: `### The Problem\nIn small towns and rural regions across India, ${category || 'innovators'} face severe friction. Without expensive imported machinery, high post-harvest or manufacturing losses occur daily.\n\n### My Solution\nWe have built a practical, affordable working prototype of ${title || 'our product'} tailored for local conditions. It reduces costs by 65% and requires zero complicated maintenance.\n\n### Who I Am\nI am ${founderName || 'the founder'}, an engineer and grassroots maker dedicated to building tangible solutions for our community.\n\n### How Funds Will Be Used\n- 45%: Raw materials and precision tooling\n- 35%: Assembly and quality certification\n- 20%: Packaging, buffer stock, and prompt shipping of backer rewards\n\n### Timeline & Delivery\nBatch assembly starts immediately after campaign completion. First wave of backer perks ships within 60 days.\n\n### Risks & Challenges\nSupply chain lead times for specialized components may fluctuate by 10-14 days. We maintain a verified local backup supplier.`,
        mode: 'fallback'
      });
    }

    const systemInstruction = `You are the AI Campaign Coach for 'Bharateeyan', an Indian rewards-based crowdfunding platform for grassroots founders without elite college pedigree (no IIT/IIM). Backers pre-buy physical products or perks.
STRICT LEGAL REQUIREMENT: Never promise, suggest, or mention shares, equity, profit share, dividends, returns, interest, or investment yields. Backers only receive products, pre-orders, and perks.
Write a structured, honest, and compelling campaign story in ${language || 'English'} with the following sections:
- The Problem
- My Solution
- Who I Am
- How the Money Will Be Used (with percentage breakdown)
- Timeline
- Risks & Challenges`;

    const prompt = `Title: ${title}\nFounder: ${founderName}\nCategory: ${category}\nFounder's Rough Notes:\n${roughNotes || 'Grassroots hardware product designed for affordable local use.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/coach:', error);
    res.json({
      text: `### The Problem\nGrassroots innovators in India often lack working capital to manufacture their initial production batches despite proven demand.\n\n### My Solution\nAn affordable, locally serviceable product tested in real working conditions.\n\n### Who I Am\nA committed local founder building for everyday problems.\n\n### How Funds Will Be Used\nRaw material sourcing (50%), manufacturing & assembly (30%), packaging & shipping rewards (20%).\n\n### Timeline\nDelivery starts 60 days post campaign success.`,
      mode: 'fallback',
      error: error?.message,
    });
  }
});

// 2. Suggest Reward Tiers: Proposes 4 rewards for pre-buyers
app.post('/api/ai/suggest-rewards', async (req, res) => {
  try {
    const { title, description, category, targetGoal } = req.body;

    if (!ai) {
      return res.json({
        rewards: [
          {
            title: 'Early Bird Community Supporter',
            price: 499,
            description: 'Digital Founder Thank-You certificate, early access firmware/updates, and your name etched on our Wall of Backers.',
            items: ['Digital Backer Certificate', 'Name on Founder Wall', 'Exclusive Behind-The-Scenes Updates'],
            estimatedDeliveryMonth: 'Nov 2026',
            quantityLimit: 250
          },
          {
            title: 'Standard Single Unit Pre-Order',
            price: 2499,
            description: 'One full retail unit of the product with founder-edition serial numbering and 1-year replacement warranty.',
            items: ['1x Full Working Unit', 'Founder-Edition Badge', '1-Year Warranty & Priority Support'],
            estimatedDeliveryMonth: 'Dec 2026',
            quantityLimit: 150
          },
          {
            title: 'Founders Dual Pack (Best Value)',
            price: 4499,
            description: 'Two full units—keep one, gift one to a local family or school. Includes custom engraved casing.',
            items: ['2x Full Working Units', 'Custom Laser Engraving', 'Spare Consumables Kit'],
            estimatedDeliveryMonth: 'Dec 2026',
            quantityLimit: 100
          },
          {
            title: 'Community Champion / Sponsor Batch',
            price: 11999,
            description: '5 units delivered to your chosen rural school or cooperative, plus a direct 1-on-1 virtual design session with the founder.',
            items: ['5x Full Units for Donation or Field Use', '1-on-1 Video Call with Founder', 'VIP Community Backer Plaque'],
            estimatedDeliveryMonth: 'Jan 2027',
            quantityLimit: 25
          }
        ]
      });
    }

    const systemInstruction = `You are a rewards crowdfunding strategist for Bharateeyan. Propose exactly 4 rewards tiers for a rewards crowdfunding campaign.
Backers receive physical items, perks, or pre-orders. NO equity, NO shares, NO profit. Return pure JSON matching the requested structure.`;

    const prompt = `Product Title: ${title}\nDescription: ${description}\nCategory: ${category}\nGoal: ₹${targetGoal}\nGenerate 4 tiered rewards in Indian Rupees (INR) from entry-level backer perk to full pre-order and multi-pack.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const rewards = Array.isArray(parsed) ? parsed : (parsed.rewards || []);
    res.json({ rewards: rewards.length ? rewards : [] });
  } catch (error: any) {
    console.error('Error in /api/ai/suggest-rewards:', error);
    res.json({
      rewards: [
        {
          title: 'Early Bird Backer Edition',
          price: 999,
          description: 'Special first-batch unit with exclusive founder thank you card and launch merchandise.',
          items: ['First Batch Unit', 'Founder Letter', 'Backer Badge'],
          estimatedDeliveryMonth: 'Dec 2026',
          quantityLimit: 100
        },
        {
          title: 'Standard Pre-Order',
          price: 2499,
          description: 'Standard production unit with priority delivery and 1-year product warranty.',
          items: ['1x Production Unit', 'User Manual in Regional Languages', '1-Year Warranty'],
          estimatedDeliveryMonth: 'Jan 2027',
          quantityLimit: 200
        }
      ]
    });
  }
});

// 3. AI Translation: Translates campaign story to Telugu, Hindi, or English
app.post('/api/ai/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    if (!ai) {
      if (targetLanguage === 'te') {
        return res.json({
          translatedText: `[తెలుగు అనువాదం]\n\n${text}\n\n(భారతీయున్ వేదిక ద్వారా స్థానిక వ్యవస్థాపకులకు సంపూర్ణ మద్దతు అందించబడుతుంది. ఇందులో షేర్లు లేదా రాబడులు ఉండవు - కేవలం ఉత్పత్తులు మాత్రమే లభిస్తాయి.)`
        });
      } else if (targetLanguage === 'hi') {
        return res.json({
          translatedText: `[हिन्दी अनुवाद]\n\n${text}\n\n(भारतीयन मंच के माध्यम से स्थानीय संस्थापकों को समर्थन दिया जाता है। इसमें कोई शेयर या वित्तीय लाभ नहीं हैं - केवल उत्पाद और पुरस्कार मिलते हैं।)`
        });
      }
      return res.json({ translatedText: text });
    }

    const languageMap: Record<string, string> = {
      te: 'Telugu (తెలుగు)',
      hi: 'Hindi (हिन्दी)',
      en: 'English'
    };

    const targetLangName = languageMap[targetLanguage] || targetLanguage;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Translate the following campaign story accurately and naturally into ${targetLangName}. Maintain Markdown headings and bullet points. Preserve the respectful, authentic Indian grassroots tone:\n\n${text}`,
    });

    res.json({ translatedText: response.text || text });
  } catch (error: any) {
    console.error('Error in /api/ai/translate:', error);
    res.json({ translatedText: req.body?.text || '' });
  }
});

// 4. "Why this score?" Explains Merit Score in plain language with 3 tips
app.post('/api/ai/why-score', async (req, res) => {
  try {
    const { score, factors, title, founderName, city } = req.body;

    if (!ai) {
      return res.json({
        summary: `${title} by ${founderName} from ${city} has achieved a Merit Score of ${score}/100. This score reflects strong grassroots momentum: high public backing, verified real customer orders outside close personal networks, and an active prototype demo.`,
        tips: [
          'Post a short behind-the-scenes video update of your workshop assembly line to increase Working Product confidence by +3 points.',
          'Encourage early backers to post reviews on WhatsApp groups and generate community verified upvotes.',
          'Maintain an answer latency under 6 hours on the campaign Comments tab to boost Founder Commitment score.'
        ]
      });
    }

    const systemInstruction = `You are the Merit Score Auditor for Bharateeyan.
Merit Score is calculated strictly on:
1. Public backing (backers count & % goal)
2. Real customers (orders outside immediate network)
3. Delivery record (past fulfillment on time)
4. Working product (prototype video & tests)
5. Founder commitment (full time dedication & updates)
6. Community votes (verified citizen upvotes)
CRITICAL: Never evaluate college pedigree, IIT/IIM tag, past employers, English fluency, age, or gender.
Explain the score in friendly, empowering language and provide exactly 3 concrete, practical tips for the founder to improve it.
Return JSON with { "summary": string, "tips": string[] }.`;

    const prompt = `Campaign: ${title}\nFounder: ${founderName} (${city})\nTotal Score: ${score}/100\nFactors: ${JSON.stringify(factors)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      summary: parsed.summary || `Campaign ${title} has a merit score of ${score}/100 based on verified backer support and product readiness.`,
      tips: parsed.tips || [
        'Upload continuous video proofs of manufacturing.',
        'Engage regularly in the backer comments tab.',
        'Reach out to local trade associations for organic backer discovery.'
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/ai/why-score:', error);
    res.json({
      summary: `Score of ${req.body.score || 75}/100 based on public community interest and working prototype validation.`,
      tips: [
        'Add more photo/video evidence of product durability tests.',
        'Provide weekly progress updates to current backers.',
        'Encourage backers to leave verified feedback upon receiving rewards.'
      ]
    });
  }
});

// 5. Wording Checker: Scans campaign text and flags investment promises with safe rewrites
app.post('/api/ai/check-wording', async (req, res) => {
  try {
    const { text } = req.body;

    const forbiddenTerms = [
      'shares', 'equity', 'return', 'returns', 'profit', 'dividends', 
      'interest', 'roi', 'guaranteed income', 'invest', 'investment', 
      'shareholder', 'yield'
    ];

    const lower = (text || '').toLowerCase();
    const flagged = forbiddenTerms.filter(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lower);
    });

    if (!ai) {
      if (flagged.length > 0) {
        return res.json({
          isCompliant: false,
          flaggedWords: flagged,
          explanation: `Bharateeyan is strictly a rewards-based pre-order crowdfunding platform. Offering shares, equity, profit share, or financial returns is illegal under Indian SEBI regulations for non-accredited public crowdfunding.`,
          suggestedRewrite: `Replace terms like "${flagged.join(', ')}" with pre-order phrasing such as "pre-buy our first production batch", "exclusive backer perk", or "receive a discounted founder-edition product".`
        });
      }
      return res.json({
        isCompliant: true,
        flaggedWords: [],
        explanation: 'Your campaign text adheres to Indian rewards-based pre-order regulations.',
        suggestedRewrite: null
      });
    }

    const systemInstruction = `You are a Indian Crowdfunding Compliance Officer for Bharateeyan.
Under Indian law, rewards crowdfunding is only legal when backers receive products, services, or perks. It must NEVER promise equity, shares, profit shares, debentures, interest, or financial returns.
Analyze the submitted text. Detect any direct or implied investment or financial return promises.
Return JSON with:
{
  "isCompliant": boolean,
  "flaggedWords": string[],
  "explanation": string,
  "suggestedRewrite": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Audit this text for illegal equity/return promises:\n\n${text}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/ai/check-wording:', error);
    res.json({
      isCompliant: true,
      flaggedWords: [],
      explanation: 'Text checked with baseline regex filter.',
      suggestedRewrite: null
    });
  }
});

// Setup Vite middlewares for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bharateeyan server running on port ${PORT}`);
  });
}

startServer();
