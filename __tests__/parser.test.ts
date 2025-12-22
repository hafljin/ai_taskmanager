import { parseGeminiResponse } from '../lib/parser';

describe('parseGeminiResponse', () => {
  it('should parse valid response', () => {
    const data = { summary: '要約', tasks: ['a', 'b'] };
    const result = parseGeminiResponse(data);
    expect(result.summary).toBe('要約');
    expect(result.tasks).toEqual(['a', 'b']);
  });
  it('should handle invalid response', () => {
    const result = parseGeminiResponse({} as any);
    expect(result.summary).toBe('');
    expect(result.tasks).toEqual([]);
  });
});
