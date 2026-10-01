'use client';

import React, { useState, useEffect } from 'react';
import { AnalyticsEvent } from '@/types';
import { getEventLog, subscribeToAnalytics, clearEventLog } from '@/lib/analytics';
import { Activity, ChevronDown, ChevronUp, Trash2, Eye, ShieldCheck, Check } from 'lucide-react';

export function AnalyticsHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getEventLog());
    const unsubscribe = subscribeToAnalytics((updated) => {
      setEvents(updated);
    });
    return unsubscribe;
  }, []);

  const copyPayload = (event: AnalyticsEvent) => {
    navigator.clipboard.writeText(JSON.stringify(event, null, 2));
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <aside aria-label="Analytics Monitor" className="fixed bottom-4 right-4 z-40">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-track="analytics-hud-toggle"
        className="flex items-center gap-2.5 bg-stone-900/95 hover:bg-stone-900 text-stone-100 px-3.5 py-2.5 rounded-full shadow-xl border border-stone-700/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-xs font-semibold group"
        title="Toggle Analytics Event Monitor"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <Activity className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
        <span>Live Analytics</span>
        <span className="bg-stone-800 text-emerald-400 px-1.5 py-0.5 rounded-full text-[10px] font-mono border border-stone-700">
          {events.length}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Modal / Inspector Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-[380px] sm:w-[460px] max-h-[500px] bg-stone-950/95 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800 bg-stone-900/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold tracking-wide uppercase text-stone-200">
                Analytics & Event Stream
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearEventLog}
                className="text-stone-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors p-1"
                title="Clear event history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Clear</span>
              </button>
            </div>
          </div>

          {/* Subtext info */}
          <div className="px-4 py-2 bg-stone-900/30 text-[11px] text-stone-400 border-b border-stone-800/80 flex items-center justify-between">
            <span>Dispatched via <code className="text-emerald-400">CustomEvent</code> &amp; <code className="text-amber-400">dataLayer</code></span>
            <span className="text-[10px] text-stone-500">Live feed</span>
          </div>

          {/* Events list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[380px] font-mono text-xs">
            {events.length === 0 ? (
              <div className="text-center py-10 text-stone-500 text-xs font-sans">
                <Eye className="w-6 h-6 mx-auto mb-2 opacity-50" />
                No events recorded yet. Click buttons, search, or add items to cart!
              </div>
            ) : (
              events.map((evt) => {
                const timeStr = new Date(evt.timestamp).toLocaleTimeString();
                const isCopied = copiedId === evt.id;

                let badgeColor = 'bg-stone-800 text-stone-300 border-stone-700';
                if (evt.eventName.includes('cart')) badgeColor = 'bg-emerald-950 text-emerald-400 border-emerald-800';
                if (evt.eventName.includes('checkout')) badgeColor = 'bg-indigo-950 text-indigo-300 border-indigo-800';
                if (evt.eventName.includes('search') || evt.eventName.includes('filter')) badgeColor = 'bg-amber-950 text-amber-300 border-amber-800';
                if (evt.eventName.includes('contact')) badgeColor = 'bg-sky-950 text-sky-300 border-sky-800';

                return (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeColor}`}>
                          {evt.eventName}
                        </span>
                        <span className="text-[10px] text-stone-500">{timeStr}</span>
                      </div>
                      <button
                        onClick={() => copyPayload(evt)}
                        className="text-stone-500 hover:text-stone-300 p-1 text-[10px] flex items-center gap-1"
                        title="Copy JSON Payload"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="underline">JSON</span>}
                      </button>
                    </div>

                    <pre className="text-[11px] text-stone-300 bg-stone-950/80 p-2 rounded overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-900">
                      {JSON.stringify(evt.payload, null, 2)}
                    </pre>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
