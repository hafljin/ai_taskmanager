import { MeetingAnalysis } from '../types';

const STORAGE_KEY = 'meeting_records';

export function saveMeetingRecord(record: MeetingAnalysis) {
  const records = getMeetingRecords();
  records.unshift({ ...record, savedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getMeetingRecords(): (MeetingAnalysis & { savedAt: string })[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function deleteMeetingRecord(index: number) {
  const records = getMeetingRecords();
  records.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
