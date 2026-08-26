import React from 'react';
import { Sparkles, Trophy, ExternalLink, Ticket, TrendingDown } from 'lucide-react';

interface AdItem {
  id: string;
  title: string;
  content: string;
  action_url: string;
  image_url: string;
}

interface Financials {
  total_mainstream_cost: number;
  total_student_cost: number;
  savings_value: number;
  savings_percentage: number;
}

interface MonetizationPanelProps {
  tier: string;
  showAds: boolean;
  ads: AdItem[];
  financials: Financials;
  onUpgrade: () => void;
}

export const MonetizationPanel: React.FC<MonetizationPanelProps> = ({
  tier,
  showAds,
  ads,
  financials,
  onUpgrade,
}) => {
  const isPremium = tier === 'Premium';

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-brand-border pb-4">
        <div className="flex items-center space-x-3">
          <Sparkles className={`h-6 w-6 ${isPremium ? 'text-brand-accent animate-pulse' : 'text-gray-400'}`} />
          <div>
            <h2 className="text-xl font-bold font-sans text-glow-primary">
              {isPremium ? 'Premium Savings Analysis' : 'Student Partner Hub'}
            </h2>
            <p className="text-xs text-gray-400">
              {isPremium ? 'Advanced compound analytics unlocked' : 'Supported by student CPM ads'}
            </p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
          isPremium 
            ? 'bg-brand-accent/20 border border-brand-accent/30 text-brand-accent' 
            : 'bg-gray-800 border border-gray-700 text-gray-400'
        }`}>
          {tier} TIER
        </span>
      </div>

      {/* Free Tier: Ad space + Upgrade banner */}
      {showAds ? (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[10px]">
            Partner Offers (CPM Ad Space)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads && ads.map((ad) => (
              <a 
                key={ad.id} 
                href={ad.action_url} 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col bg-[#111622] border border-brand-border rounded-xl overflow-hidden hover:border-brand-primary/40 transition duration-300 shadow-lg"
              >
                <div className="h-28 overflow-hidden relative">
                  <img 
                    src={ad.image_url} 
                    alt={ad.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                    Sponsored
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-brand-secondary transition flex items-center">
                      {ad.title} <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{ad.content}</p>
                  </div>
                  <span className="text-[9px] font-bold text-brand-primary mt-2 uppercase tracking-wide block">
                    Claim Student Discount →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Upgrade Banner */}
          <div className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-3 md:space-y-0 shadow-lg">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center justify-center md:justify-start">
                <Trophy className="h-4 w-4 mr-1.5 text-brand-accent" /> Unlock Compound Analytics
              </h4>
              <p className="text-[11px] text-gray-300 mt-0.5 max-w-md">
                Upgrade to Premium to visualize compound savings graphs, unlock exclusive ESN vouchers, and remove sponsored ads.
              </p>
            </div>
            <button
              onClick={onUpgrade}
              className="glow-btn-primary px-4 py-2 text-xs font-extrabold uppercase rounded-lg tracking-wider text-white whitespace-nowrap"
            >
              UPGRADE €1.99 / mo
            </button>
          </div>
        </div>
      ) : (
        /* Premium Tier: Compound Savings graph + exclusive codes */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Compound Savings stats */}
            <div className="md:col-span-4 space-y-4 bg-[#111622] border border-brand-border rounded-xl p-4">
              <div className="flex items-center space-x-2 text-brand-accent">
                <TrendingDown className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Compound Savings</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Total Savings</span>
                <span className="text-2xl font-black text-brand-accent">
                  €{financials.savings_value.toFixed(2)}
                </span>
                <span className="text-xs text-brand-success font-bold block">
                  ({financials.savings_percentage}% saved)
                </span>
              </div>

              <div className="space-y-1.5 border-t border-brand-border pt-3 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mainstream Tourist Cost:</span>
                  <span className="text-gray-300 font-bold">€{financials.total_mainstream_cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Optimized Student Cost:</span>
                  <span className="text-brand-secondary font-bold">€{financials.total_student_cost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Savings Bar Graph */}
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[10px] block">
                Itinerary Cost Comparison
              </span>
              
              <div className="bg-[#111622] border border-brand-border rounded-xl p-4 flex flex-col space-y-4">
                {/* Mainstream Cost Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-400">Mainstream Tourist Price</span>
                    <span className="text-gray-300">€{financials.total_mainstream_cost.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-error/70 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Student Cost Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-secondary font-bold">TripEx Student Price (ISIC + ESN)</span>
                    <span className="text-brand-secondary font-bold">
                      €{financials.total_student_cost.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-1000" 
                      style={{ width: `${(financials.total_student_cost / financials.total_mainstream_cost) * 100}%` }} 
                    />
                  </div>
                </div>

                <div className="text-[10px] text-brand-success font-semibold text-center italic border-t border-brand-border/40 pt-2">
                  Compound optimization complete. Saved €{financials.savings_value.toFixed(2)} through ESN public transport discount and partner benefits.
                </div>
              </div>
            </div>
          </div>

          {/* Premium Voucher Codes */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[10px] flex items-center">
              <Ticket className="h-4 w-4 mr-1 text-brand-accent" /> Premium ESN Discount Vouchers
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#111622] border border-brand-accent/20 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">FLIXBUS CODE</span>
                <span className="text-xs font-extrabold text-white font-mono block select-all bg-brand-dark px-2 py-1.5 rounded mt-1.5 border border-brand-border">
                  ESNKAUNAS15
                </span>
                <span className="text-[8px] text-brand-success font-semibold block mt-1">15% Off Vouchers</span>
              </div>
              <div className="bg-[#111622] border border-brand-accent/20 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">RYANAIR CODE</span>
                <span className="text-xs font-extrabold text-white font-mono block select-all bg-brand-dark px-2 py-1.5 rounded mt-1.5 border border-brand-border">
                  RYANESN26BAG
                </span>
                <span className="text-[8px] text-brand-success font-semibold block mt-1">Free Cabin Bag</span>
              </div>
              <div className="bg-[#111622] border border-brand-accent/20 rounded-xl p-3 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">BOLT SCOOTER</span>
                <span className="text-xs font-extrabold text-white font-mono block select-all bg-brand-dark px-2 py-1.5 rounded mt-1.5 border border-brand-border">
                  BOLTRIDEKAUNAS
                </span>
                <span className="text-[8px] text-brand-success font-semibold block mt-1">€5.00 First Ride Free</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
