import React, { useState } from 'react';
import { Compass, ShieldAlert, BadgeDollarSign, CalendarDays } from 'lucide-react';

interface ItineraryBuilderProps {
  onGenerate: (data: {
    destination: string;
    budget: number;
    duration: number;
    has_isic: boolean;
    simulate_hazard: string;
  }) => void;
  isLoading: boolean;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ onGenerate, isLoading }) => {
  const [destination, setDestination] = useState('Kaunas, Lithuania');
  const [budget, setBudget] = useState(150);
  const [duration, setDuration] = useState(3);
  const [hasIsic, setHasIsic] = useState(true);
  const [simulateHazard, setSimulateHazard] = useState('weather');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      destination,
      budget,
      duration,
      has_isic: hasIsic,
      simulate_hazard: simulateHazard
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col space-y-6">
      <div className="flex items-center space-x-3 border-b border-brand-border pb-4">
        <Compass className="h-6 w-6 text-brand-secondary animate-spin-slow" />
        <h2 className="text-xl font-bold font-sans text-glow-primary">Create Your Journey</h2>
      </div>

      {/* Destination */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Destination</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-[#111622] border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary"
        >
          <option value="Kaunas, Lithuania">Kaunas, Lithuania (ESN Center)</option>
          <option value="Vilnius, Lithuania">Vilnius, Lithuania</option>
          <option value="Klaipėda, Lithuania">Klaipėda, Lithuania</option>
        </select>
      </div>

      {/* Budget Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center">
            <BadgeDollarSign className="h-4 w-4 mr-1 text-brand-success" /> Max Budget
          </label>
          <span className="text-sm font-bold text-brand-success">€{budget}</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-brand-success"
        />
        <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
          <span>€50 (Shoestring)</span>
          <span>€500 (Erasmus Baller)</span>
        </div>
      </div>

      {/* Duration and Traveller count */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center">
            <CalendarDays className="h-4 w-4 mr-1 text-brand-accent" /> Duration
          </label>
          <div className="flex items-center space-x-2 bg-[#111622] border border-brand-border rounded-xl p-1">
            <button
              type="button"
              onClick={() => setDuration(Math.max(1, duration - 1))}
              className="px-3 py-1 bg-[#161B26] hover:bg-brand-border text-gray-300 font-bold rounded-lg transition"
            >
              -
            </button>
            <span className="flex-1 text-center font-bold text-white">{duration} Days</span>
            <button
              type="button"
              onClick={() => setDuration(Math.min(7, duration + 1))}
              className="px-3 py-1 bg-[#161B26] hover:bg-brand-border text-gray-300 font-bold rounded-lg transition"
            >
              +
            </button>
          </div>
        </div>

        {/* ISIC / ESN status */}
        <div className="space-y-2 flex flex-col justify-end">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Student Benefits</label>
          <button
            type="button"
            onClick={() => setHasIsic(!hasIsic)}
            className={`w-full py-2.5 px-4 rounded-xl font-bold border transition duration-300 flex items-center justify-center ${
              hasIsic
                ? 'bg-brand-primary/20 border-brand-primary text-brand-secondary shadow-md shadow-brand-primary/10'
                : 'bg-transparent border-brand-border text-gray-400 hover:text-white'
            }`}
          >
            {hasIsic ? 'ISIC / ESN Card Active' : 'No ISIC / ESN Card'}
          </button>
        </div>
      </div>

      {/* Silent Safety Backbone Simulation Trigger */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center">
          <ShieldAlert className="h-4 w-4 mr-1 text-brand-warning animate-pulse-subtle" /> Simulate Real-time Threat
        </label>
        <select
          value={simulateHazard}
          onChange={(e) => setSimulateHazard(e.target.value)}
          className="w-full bg-[#111622] border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary"
        >
          <option value="weather">⛈️ Severe Rains & Storms (Triggers indoor swap)</option>
          <option value="transit">🚌 Trolleybus Drivers Strike (Triggers bike tour)</option>
          <option value="none">☀️ Sunny Weather (Standard activities)</option>
        </select>
        <p className="text-[10px] text-gray-500 italic">
          Forces the AdaptiveAgent to analyze threat feeds and coordinate live budget-safe rerouting.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full glow-btn-primary py-4 rounded-xl text-white font-bold tracking-wide text-sm flex items-center justify-center transition disabled:opacity-50 disabled:transform-none"
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          'GENERATE OPTIMIZED TRIP'
        )}
      </button>
    </form>
  );
};
