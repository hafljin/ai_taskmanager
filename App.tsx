
import React, { useState, useRef } from 'react';
import { Button } from './components/ui/Button';
import { analyzeNotes } from './services/geminiService';
import { MeetingAnalysis, AnalysisStatus } from './types';
import { AnalysisDisplay } from './components/AnalysisDisplay';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<MeetingAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setInputText('');
    setImagePreview(null);
    setResult(null);
    setStatus('idle');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!inputText && !imagePreview) {
      setError('Please provide some text or an image of your notes.');
      return;
    }

    setStatus('loading');
    setError(null);
    
    try {
      const data = await analyzeNotes(inputText, imagePreview || undefined);
      setResult(data);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Minute Master</h1>
              <p className="text-xs text-slate-500 font-medium">AI Meeting Assistant</p>
            </div>
          </div>
          <Button variant="secondary" onClick={handleClear} disabled={status === 'loading'}>
            Clear All
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Input Section */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Meeting Notes or Transcript</label>
            <textarea
              className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-slate-700 placeholder-slate-400"
              placeholder="Paste your meeting notes, discussion points, or rough transcript here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Or Upload Photos of Whiteboards/Paper</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-xl p-2" />
                  ) : (
                    <div className="text-center">
                      <svg className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-xs text-slate-500 font-medium">Click to upload image</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </div>
              </div>
              <div className="w-full md:w-auto md:self-end">
                <Button 
                  className="w-full md:w-48 h-12"
                  onClick={handleSubmit} 
                  isLoading={status === 'loading'}
                >
                  Summarize Notes
                </Button>
              </div>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Empty State */}
          {status === 'idle' && !error && (
            <div className="text-center py-12 px-4">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">No analysis yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Input your meeting notes above or upload a photo to generate a summary and task list.</p>
            </div>
          )}

          {/* Results Section */}
          {status === 'success' && result && (
            <AnalysisDisplay data={result} />
          )}
        </div>
      </main>

      {/* Loading Overlay (Optional subtle version) */}
      {status === 'loading' && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Analyzing meeting details...</h3>
            <p className="text-slate-500 mt-2">Gemini is extracting tasks and summarizing your notes.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
