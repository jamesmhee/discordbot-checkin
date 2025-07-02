export function isToday(dateString: string): boolean {
    const input = new Date(dateString);
    const now = new Date();
    return input.toDateString() === now.toDateString();
  }
  