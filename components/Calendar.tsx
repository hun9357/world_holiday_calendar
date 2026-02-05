'use client';

import { useState } from 'react';
import { CalendarDay, getMonthName } from '@/lib/holidays';

interface CalendarProps {
  year: number;
  month: number;
  days: CalendarDay[];
}

export default function Calendar({ year, month, days }: CalendarProps) {
  const [selectedHoliday, setSelectedHoliday] = useState<any>(null);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        {getMonthName(month)} {year}
      </h3>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 text-xs md:text-sm py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center text-sm md:text-base rounded-lg transition-colors ${
              !day.isCurrentMonth
                ? 'text-gray-300'
                : day.isHoliday
                ? 'bg-red-50 text-red-700 font-bold cursor-pointer hover:bg-red-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => day.holiday && setSelectedHoliday(day.holiday)}
          >
            {day.day}
          </div>
        ))}
      </div>

      {selectedHoliday && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedHoliday(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedHoliday.name}
              </h3>
              <button
                onClick={() => setSelectedHoliday(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(selectedHoliday.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {selectedHoliday.localName !== selectedHoliday.name && (
                <p>
                  <span className="font-semibold">Local Name:</span>{' '}
                  {selectedHoliday.localName}
                </p>
              )}
              <p>
                <span className="font-semibold">Type:</span>{' '}
                {selectedHoliday.global ? 'National Holiday' : 'Regional Holiday'}
              </p>
              {selectedHoliday.types && selectedHoliday.types.length > 0 && (
                <p>
                  <span className="font-semibold">Categories:</span>{' '}
                  {selectedHoliday.types.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
