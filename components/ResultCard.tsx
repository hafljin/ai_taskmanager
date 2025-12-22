import React from 'react';

type ResultCardProps = {
  summary: string;
  tasks: string[];
};

const ResultCard: React.FC<ResultCardProps> = ({ summary, tasks }) => (
  <div className="p-4 border rounded bg-white shadow">
    <h2 className="font-bold mb-2">要約</h2>
    <p className="mb-4">{summary}</p>
    <h3 className="font-semibold mb-1">タスク</h3>
    <ul className="list-disc pl-5">
      {tasks.map((task, i) => (
        <li key={i}>
          <label>
            <input type="checkbox" className="mr-2" />
            {task}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default ResultCard;
