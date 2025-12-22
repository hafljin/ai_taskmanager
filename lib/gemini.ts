import { GeminiResponse, TaskResult } from '../types';

export async function summarizeAndExtractTasks(text: string): Promise<TaskResult> {
  // Gemini API呼び出しロジック（ダミー実装）
  // 実際はGoogle AI StudioのAPIを呼び出す
  // TODO: サーバー側のみでAPIキーを利用すること
  return {
    summary: '要約（ダミー）',
    tasks: ['タスク1', 'タスク2']
  };
}
