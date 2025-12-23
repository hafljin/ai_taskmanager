
import React from 'react';
import { MeetingAnalysis, ActionItem } from '../types';

interface Props {
  data: MeetingAnalysis;
}

const PriorityBadge: React.FC<{ priority: ActionItem['priority'] }> = ({ priority }) => {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-orange-100 text-orange-700 border-orange-200",
    Low: "bg-green-100 text-green-700 border-green-200"
  };
  return (
    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${styles[priority]}`}>
      {priority}
    </span>
  );
};

export const AnalysisDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{data.title}</h2>
        
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 tracking-wider mb-2">要約</h3>
          <p className="text-slate-600 leading-relaxed text-lg italic">"{data.summary}"</p>
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 tracking-wider mb-4">キーポイント</h3>
          <ul className="space-y-3">
            {data.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 tracking-wider">タスク</h3>
            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md font-medium">
              {data.actionItems.length} 件
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.actionItems.map((item, i) => (
              <div key={i} className="group p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-200 hover:bg-white transition-all">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-slate-800 leading-tight">{item.task}</p>
                  <PriorityBadge priority={item.priority} />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {item.assignee && (
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {item.assignee}
                    </div>
                  )}
                  {item.dueDate && (
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {item.dueDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
