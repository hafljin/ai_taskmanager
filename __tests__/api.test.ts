import { summarizeAndExtractTasks } from '../lib/gemini';

describe('summarizeAndExtractTasks', () => {
  it('should return summary and tasks', async () => {
    const result = await summarizeAndExtractTasks('テスト入力');
    expect(result.summary).toBeDefined();
    expect(Array.isArray(result.tasks)).toBe(true);
  });
});
