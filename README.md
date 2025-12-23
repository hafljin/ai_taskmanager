

# AI要約＋タスク分解アプリ

会議後アクション自動化ツール：
会議内容をAIで要約し、タスク抽出・保存まで一括で行えるWebアプリです。

## プロジェクト概要
ユーザーのテキスト入力をAIで要約・タスク分解し、構造化して表示するWebアプリです。

## 技術構成
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Google AI Studio (Gemini 2.0 Flash)
- Function Calling

## 構造化出力仕様
- summary: テキスト要約（string）
- tasks: タスク配列（string[]）

## ディレクトリ構成
```
app/
   page.tsx
   api/
      summarize/
         route.ts
components/
   Loading.tsx
   ResultCard.tsx
lib/
   gemini.ts
   validators.ts
   parser.ts
__tests__/
   api.test.ts
   parser.test.ts
   validation.test.ts
styles/
   globals.css
```

## ローカル実行方法
1. `git clone` でリポジトリを取得
2. `cd` でプロジェクトディレクトリへ移動
3. `npm install`
4. `.env.local` に `GEMINI_API_KEY=xxx` を記載
5. `npm run dev` で起動

## デプロイ方法（Vercel）
- Vercelにリポジトリを連携し、環境変数 `GEMINI_API_KEY` を設定

## セキュリティ注意点
- APIキーは必ずサーバー側のみで管理
- `NEXT_PUBLIC_` で公開しない
- 入力・出力のバリデーションとサニタイズを徹底

## 今後の拡張
- 業界特化AI（整骨院、美容院など）
- カスタムプロンプト
- ユーザー保存・SaaS化
- Stripeによる課金
