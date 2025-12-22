
export interface ActionItem {
  task: string;
  assignee?: string;
  dueDate?: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface MeetingAnalysis {
  title: string;
  summary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
}

export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GeminiResponse {
  summary: string;
  tasks: string[];
}

export interface TaskResult {
  summary: string;
  tasks: string[];
}
