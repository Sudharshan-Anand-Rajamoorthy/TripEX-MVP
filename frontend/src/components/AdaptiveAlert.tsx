import React from 'react';
import { ShieldCheck, ShieldAlert, RotateCcw } from 'lucide-react';

interface AlertItem {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: string;
}

interface ModificationItem {
  original: string;
  rerouted_to: string;
  reason: string;
}

interface AdaptiveAlertProps {
  newsHeadline: string;
  sentimentSummary: string;
  alerts: AlertItem[];
  modifications: ModificationItem[];
}

export const AdaptiveAlert: React.FC<AdaptiveAlertProps> = ({
  newsHeadline,
  sentimentSummary,
  alerts,
  modifications,
}) => {
  const hasAlerts = alerts.length > 0;

  return (
    <div className={`glass-panel rounded-2xl p-6 shadow-xl border-l-4 transition-all duration-500 ${
      hasAlerts ? 'border-l-brand-warning' : 'border-l-brand-success'
    }`}>
      <div className="flex justify-between items-start border-b border-brand-border pb-4 mb-4">
        <div className="flex items-center space-x-3">
          {hasAlerts ? (
            <ShieldAlert className="h-6 w-6 text-brand-warning animate-bounce" />
          ) : (
            <ShieldCheck className="h-6 w-6 text-brand-success" />
          )}
          <div>
            <h2 className="text-xl font-bold font-sans text-glow-primary">Silent Safety Backbone</h2>
            <p className="text-xs text-gray-400">Grok sentiment scan & active rerouting engine</p>
          </div>
        </div>
        <span className="text-[10px] text-gray-500 font-mono hidden md:inline-block bg-[#111622] px-2.5 py-1 rounded border border-brand-border">
          {sentimentSummary || "Analyzing news stream..."}
        </span>
      </div>

      {/* News Scan summary */}
      <div className="bg-[#111622] border border-brand-border rounded-xl p-3 mb-4 text-xs">
        <div className="font-semibold text-gray-400 mb-1 uppercase tracking-wider text-[10px]">
          Latest Scanned Threat Feed
        </div>
        <div className="text-gray-200 font-medium italic">
          "{newsHeadline || "Local news feeds indicate optimal travel conditions in Kaunas."}"
        </div>
      </div>

      {/* Rerouting warnings */}
      {hasAlerts ? (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-brand-warning/10 border border-brand-warning/20 rounded-xl p-4">
              <h4 className="text-sm font-bold text-brand-warning mb-1 flex items-center">
                ⚠️ {alert.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">{alert.message}</p>
            </div>
          ))}

          {/* Rerouted activities breakdown */}
          {modifications.length > 0 && (
            <div className="space-y-2 mt-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[10px]">
                Autonomous Rerouting Applied
              </div>
              {modifications.map((mod, index) => (
                <div key={index} className="flex items-start space-x-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4">
                  <div className="p-1.5 bg-brand-primary/20 rounded-lg text-brand-secondary">
                    <RotateCcw className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      Rerouted activity: <span className="line-through text-gray-400 font-normal">{mod.original}</span>
                    </h5>
                    <p className="text-xs font-semibold text-brand-secondary mt-0.5">
                      New activity: {mod.rerouted_to}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Reason: {mod.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2 bg-brand-success/10 border border-brand-success/20 rounded-xl p-4 text-xs text-brand-success">
          <span>✔️</span>
          <span className="font-medium">
            Active safety monitoring active. Outdoor activities safe. No transport strikes scheduled.
          </span>
        </div>
      )}
    </div>
  );
};
