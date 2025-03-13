export function stringToListFn(value?: string): string[] {
  if (!value) return [];
  return value?.split('\n').map((item) => item.replace(/^\d+\.\s*/, '').trim());
}
