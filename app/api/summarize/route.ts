import { NextRequest, NextResponse } from 'next/server';
import { summarizeAndExtractTasks } from '@/lib/gemini';
import { validateInput } from '@/lib/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;
    // 入力バリデーション
    const error = validateInput(text);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    const result = await summarizeAndExtractTasks(text);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
