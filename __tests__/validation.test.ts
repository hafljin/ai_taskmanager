import { validateInput } from '../lib/validators';

describe('validateInput', () => {
  it('should return error for empty input', () => {
    expect(validateInput('')).toBe('入力が空です');
  });
  it('should return error for over 5000 chars', () => {
    expect(validateInput('a'.repeat(5001))).toBe('5000文字以内で入力してください');
  });
  it('should return null for valid input', () => {
    expect(validateInput('テスト')).toBeNull();
  });
});
