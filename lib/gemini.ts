import { TaskResult } from '../types';

const useDummy = process.env.USE_DUMMY_AI === 'true';

export async function summarizeAndExtractTasks(text: string): Promise<TaskResult> {
  if (useDummy) {
    // ダミー値を返す
    return {
      summary: 'これはダミーの要約です。',
      tasks: ['ダミータスク1', 'ダミータスク2', 'ダミータスク3']
    };
  }
  // 本番API呼び出し（仮実装: 必要に応じて修正）
  // ここでGoogle Gemini APIを呼び出す処理を記述
  // 例: fetchや@google/genaiを利用
  // 今はダミーAPIキーでもOK
  return {
    summary: '（本番API未実装: ここに要約が入ります）',
    tasks: ['本番タスク1', '本番タスク2']
  };
}
