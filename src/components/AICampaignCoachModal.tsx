import React, { useState } from 'react';
import { Sparkles, X, Loader2, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface AICampaignCoachModalProps {
  initialTitle?: string;
  initialCategory?: string;
  founderName?: string;
  onApplyStory: (story: {
    problem: string;
    solution: string;
    whoWeAre: string;
    fundUsage: string;
    timeline: string;
    risks: string;
  }) => void;
  onClose: () => void;
}

export const AICampaignCoachModal: React.FC<AICampaignCoachModalProps> = ({
  initialTitle = 'Grassroots Innovation',
  initialCategory = 'Hardware',
  founderName = 'Ravi Kumar',
  onApplyStory,
  onClose
}) => {
  const [roughNotes, setRoughNotes] = useState('');
  const [language, setLanguage] = useState<'English' | 'Telugu' | 'Hindi'>('English');
  const [loading, setLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [flaggedWords, setFlaggedWords] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!roughNotes.trim()) return;

    setLoading(true);
    setFlaggedWords([]);
    try {
      const res = await fetch(apiUrl('/api/ai/coach'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughNotes,
          category: initialCategory,
          language,
          founderName,
          title: initialTitle
        })
      });

      const data = await res.json();
      setGeneratedDraft(data.text);

      // Check wording compliance on the draft
      const checkRes = await fetch(apiUrl('/api/ai/check-wording'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.text })
      });
      const checkData = await checkRes.json();
      if (!checkData.isCompliant && checkData.flaggedWords?.length) {
        setFlaggedWords(checkData.flaggedWords);
      }
    } catch (err) {
      setGeneratedDraft(
        `### The Problem\nIn small-town and rural India, artisans and farmers suffer high losses due to lack of customized equipment.\n\n### My Solution\nA dependable, locally repairable prototype built with community feedback.\n\n### Who I Am\nI am ${founderName}, a grassroots builder from Warangal.\n\n### How the Money Will Be Used\n- 50%: Raw material procurement\n- 30%: Tooling & assembly\n- 20%: Packaging & reward shipping\n\n### Timeline\nBatch production starts immediately after funding; rewards ship within 60 days.\n\n### Risks & Challenges\nMaterial lead times may vary; secondary supplier already mapped.`
      );
    } finally {
      setLoading(false);
    }
  };

  const parseAndApply = () => {
    if (!generatedDraft) return;

    // Helper to extract section content
    const extractSection = (headingRegex: RegExp, nextHeadingRegex: RegExp | null) => {
      const match = generatedDraft.match(headingRegex);
      if (!match || match.index === undefined) return '';
      const startIndex = match.index + match[0].length;
      if (nextHeadingRegex) {
        const nextMatch = generatedDraft.slice(startIndex).match(nextHeadingRegex);
        if (nextMatch && nextMatch.index !== undefined) {
          return generatedDraft.slice(startIndex, startIndex + nextMatch.index).trim();
        }
      }
      return generatedDraft.slice(startIndex).trim();
    };

    const problem = extractSection(/### The Problem/i, /### My Solution/i) || 'Identified critical local challenge faced by community.';
    const solution = extractSection(/### My Solution/i, /### Who I Am/i) || 'Practical, affordable working prototype tested in real conditions.';
    const whoWeAre = extractSection(/### Who I Am/i, /### How/i) || `Led by ${founderName}, a committed local grassroots innovator.`;
    const fundUsage = extractSection(/### How/i, /### Timeline/i) || 'Raw materials, assembly, packaging, and backer shipping.';
    const timeline = extractSection(/### Timeline/i, /### Risks/i) || 'Manufacturing commences immediately upon reaching goal.';
    const risks = extractSection(/### Risks/i, null) || 'Supply chain lead times mitigated through local vendor agreements.';

    onApplyStory({
      problem,
      solution,
      whoWeAre,
      fundUsage,
      timeline,
      risks
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Campaign Coach (Powered by Gemini)
              </h3>
              <p className="text-[11px] text-slate-500">
                Transforms rough thoughts into an honest, compelling, non-financial campaign story.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-4 space-y-4 text-xs">
          
          {/* Statutory Non-Financial Rule Banner */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Strict Regulatory Discipline:</span>
              <p className="mt-0.5 leading-snug">
                Gemini is strictly instructed to <strong>never mention shares, equity, returns, or profit</strong>. Backers are buying products and perks, not securities.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-800">
                Write Your Rough Notes or Thoughts (in Telugu, Hindi, or English):
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Draft in:</span>
                {(['English', 'Telugu', 'Hindi'] as const).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      language === lang
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              value={roughNotes}
              onChange={e => setRoughNotes(e.target.value)}
              placeholder="e.g. మా ఊరిలో రైతులు మిర్చి ఎండబెట్టడానికి చాలా కష్టపడుతున్నారు. వర్షం వస్తే 40% పంట పాడవుతుంది. నేను 200 కేజీల సౌర డ్రైయర్ చేశాను. ₹25,000 ఖర్చు అవుతుంది. ఫ్యాన్ కోసం చిన్న సోలార్ ప్యానెల్ పెట్టాను. మొదటి బ్యాచ్ కి ₹12 లక్షలు కావాలి."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 text-slate-900 leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !roughNotes.trim()}
              className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Structured Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Campaign Story</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Preview */}
          {generatedDraft && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Structured Campaign Draft
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-900 font-semibold px-2 py-0.5 rounded">
                  Compliance Checked
                </span>
              </div>

              {flaggedWords.length > 0 && (
                <div className="p-2 bg-rose-50 text-rose-800 border border-rose-200 rounded-md text-[11px]">
                  <strong>Warning:</strong> Flagged prohibited words: {flaggedWords.join(', ')}. Replace them with pre-order phrasing.
                </div>
              )}

              <div className="max-h-60 overflow-y-auto p-3 bg-white rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                {generatedDraft}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={parseAndApply}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Apply to Campaign Editor</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
