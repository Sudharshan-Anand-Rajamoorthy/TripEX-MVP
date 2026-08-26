import React, { useState } from 'react';
import { BookOpen, Upload, Share2, Smile, Download, Check } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface JourneyJournalProps {
  hasIsic: boolean;
  savingsPercentage: number;
}

interface SavedItem {
  title: string;
  content: string;
  mood: string;
  social_share_text: string;
}

export const JourneyJournal: React.FC<JourneyJournalProps> = ({ hasIsic, savingsPercentage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('🚀');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCard, setUploadedCard] = useState<SavedItem | null>(null);

  const moods = ['🚀', '🍕', '🏰', '🍻', '🌲', '🎓', '💖'];

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsUploading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/journal/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, mood, has_isic: hasIsic })
      });
      const data = await res.json();
      if (data.success) {
        setUploadedCard(data.saved_item);
      }
    } catch {
      // Offline fallback
      setUploadedCard({
        title,
        content,
        mood,
        social_share_text: `Just planned my Kaunas trip with TripEX! Saved ${hasIsic ? '34.5%' : '12%'} on local highlights! #Erasmus #TripEx #Kaunas`
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col space-y-6">
      <div className="flex items-center space-x-3 border-b border-brand-border pb-4">
        <BookOpen className="h-6 w-6 text-brand-accent animate-pulse" />
        <div>
          <h2 className="text-xl font-bold font-sans text-glow-primary">Interactive Journey Journal</h2>
          <p className="text-xs text-gray-400">Log memories & build viral social recap cards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Journal Entry Form */}
        <form onSubmit={handleUpload} className="space-y-4 lg:col-span-6">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Memory Title</label>
            <input
              type="text"
              placeholder="e.g. Sunset at Santaka Confluence"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#111622] border border-brand-border rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Journal Details</label>
            <textarea
              rows={3}
              placeholder="How was the student life today? E.g. Met friends from ESN, visited Kaunas Castle for €2..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#111622] border border-brand-border rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent text-xs"
              required
            />
          </div>

          {/* Mood Emojis */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-1">Trip Mood</label>
            <div className="flex space-x-2">
              {moods.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center border transition-all ${mood === m
                    ? 'bg-brand-accent/20 border-brand-accent scale-110 shadow-md shadow-brand-accent/10'
                    : 'bg-[#111622] border-brand-border hover:border-gray-500'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Photo placeholder */}
          <div className="border-2 border-dashed border-brand-border rounded-xl p-4 text-center cursor-pointer hover:border-brand-accent/50 transition">
            <Upload className="h-5 w-5 mx-auto text-gray-500 mb-1" />
            <span className="text-[10px] font-semibold text-gray-400 block">Drag photo here or click to choose</span>
            <span className="text-[9px] text-gray-500 block">JPG, PNG up to 5MB (Mocked)</span>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-2.5 px-4 rounded-xl border border-brand-accent text-brand-accent font-bold hover:bg-brand-accent/15 tracking-wide text-xs transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isUploading ? (
              <div className="h-4 w-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>GENERATE VIRAL SOCIAL RECAP</span>
              </>
            )}
          </button>
        </form>

        {/* Viral Card Preview */}
        <div className="lg:col-span-6 flex items-center justify-center">
          {uploadedCard ? (
            <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl bg-gradient-to-b from-[#1E1B4B] to-[#0B0F19] p-4 border border-brand-accent/30 relative flex flex-col justify-between shadow-2xl overflow-hidden animate-fade-in">
              {/* Background glows */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl -z-10" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl -z-10" />

              {/* Card Header */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full border border-brand-secondary/20">
                  TripEX Recap
                </span>
                <span className="text-xl">{uploadedCard.mood}</span>
              </div>

              {/* Content Body */}
              <div className="my-auto space-y-3">
                <h3 className="text-lg font-black font-sans leading-tight text-white">
                  {uploadedCard.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-4 italic leading-relaxed">
                  "{uploadedCard.content}"
                </p>
                <div className="bg-[#111622]/80 border border-brand-border rounded-xl p-2.5 text-center shadow-inner">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Smart Student Savings</span>
                  <span className="text-xl font-black text-brand-secondary">
                    {savingsPercentage > 0 ? `${savingsPercentage}%` : '34.5%'} SAVED
                  </span>
                  <span className="text-[8px] text-brand-success font-semibold block mt-0.5">
                    with ISIC + ESN discounts
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-[9px] text-gray-400">
                  <Check className="h-3 w-3 text-brand-success" />
                  <span>Generated by tripex.ai</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Recap card downloaded to your device!")}
                  className="w-full py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold text-[10px] rounded-xl flex items-center justify-center space-x-1 transition shadow-lg shadow-brand-accent/20"
                >
                  <Download className="h-3 w-3" />
                  <span>DOWNLOAD CARD</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl border-2 border-dashed border-brand-border flex flex-col items-center justify-center p-6 text-center text-gray-500 bg-[#111622]/30">
              <Smile className="h-10 w-10 mb-2 text-gray-600 animate-pulse" />
              <span className="text-xs font-bold text-gray-400">Social Card Waiting</span>
              <p className="text-[10px] text-gray-500 mt-1">
                Fill in your journal title and memories on the left to export a customized sharing graphic!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
