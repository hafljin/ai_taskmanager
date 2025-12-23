import React from 'react';

const Loading: React.FC = () => (
  <div role="status" aria-live="polite" className="p-4 text-center">
    <span>読み込み中...</span>
  </div>
);

export default Loading;
