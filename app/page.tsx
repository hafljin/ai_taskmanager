import React, { useState } from 'react';
import Loading from '../components/Loading';
import ResultCard from '../components/ResultCard';

const HomePage: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ summary: string; tasks: string[] } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!text.trim()) {
      setError('入力が空です');
      return;
    }
    if (text.length > 5000) {
      setError('5000文字以内で入力してください');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'エラーが発生しました');
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI要約＋タスク分解</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={6}
          maxLength={5000}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="テキストを入力（最大5000文字）"
          aria-label="テキスト入力"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          送信
        </button>
      </form>
      {loading && <Loading />}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {result && <ResultCard summary={result.summary} tasks={result.tasks} />}
    </main>
  );
};

export default HomePage;
