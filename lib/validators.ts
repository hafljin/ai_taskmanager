export function validateInput(text: string): string | null {
  if (!text || text.trim() === '') return '入力が空です';
  if (text.length > 5000) return '5000文字以内で入力してください';
  return null;
}
