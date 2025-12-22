import { GeminiResponse, TaskResult } from '../types';

export function parseGeminiResponse(data: GeminiResponse): TaskResult {
  // nullガード
  if (!data || typeof data.summary !== 'string' || !Array.isArray(data.tasks)) {
    return { summary: '', tasks: [] };
  }
  return {
    summary: data.summary,
    tasks: data.tasks
  };
}
