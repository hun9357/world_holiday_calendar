export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface CalendarDay {
  date: Date;
  day: number;
  isHoliday: boolean;
  holiday?: Holiday;
  isCurrentMonth: boolean;
}

export function getCalendarDays(year: number, month: number, holidays: Holiday[]): CalendarDay[] {
  const days: CalendarDay[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Add empty days for alignment
  const startDay = firstDay.getDay();
  for (let i = 0; i < startDay; i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift({
      date: prevDate,
      day: prevDate.getDate(),
      isHoliday: false,
      isCurrentMonth: false,
    });
  }

  // Add days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const holiday = holidays.find(h => h.date === dateStr);

    days.push({
      date,
      day,
      isHoliday: !!holiday,
      holiday,
      isCurrentMonth: true,
    });
  }

  // Add trailing days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      day: nextDate.getDate(),
      isHoliday: false,
      isCurrentMonth: false,
    });
  }

  return days;
}

export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}
