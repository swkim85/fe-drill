"use client";

import { useState, useRef, useEffect } from "react";

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  ) {
    return date;
  }
  return null;
}

export default function DatePicker() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [inputError, setInputError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleDayClick(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    setSelectedDate(date);
    setInputValue(formatDate(date));
    setInputError(false);
    setIsOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    setInputError(false);

    const parsed = parseDate(val);
    if (parsed) {
      setSelectedDate(parsed);
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    }
  }

  function handleInputBlur() {
    if (inputValue && !parseDate(inputValue)) {
      setInputError(true);
    }
  }

  function handleClear() {
    setSelectedDate(null);
    setInputValue("");
    setInputError(false);
  }

  function handleToday() {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    setSelectedDate(date);
    setInputValue(formatDate(date));
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
    setInputError(false);
    setIsOpen(false);
  }

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isSelected = (day: number) =>
    selectedDate !== null &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  return (
    <div className="relative w-72" ref={containerRef}>
      {/* Input field */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={() => setIsOpen(true)}
            placeholder="YYYY-MM-DD"
            className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition-all
              ${inputError
                ? "border-red-400 bg-red-50 text-red-700 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
          />
          {/* Calendar icon */}
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        {selectedDate && (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:border-red-300 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Error message */}
      {inputError && (
        <p className="mt-1 text-xs text-red-500">올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)</p>
      )}

      {/* Selected date display */}
      {selectedDate && !inputError && (
        <p className="mt-1.5 text-xs text-blue-500 font-medium">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 선택됨
        </p>
      )}

      {/* Calendar popup */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-gray-100 bg-white shadow-xl p-4">

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-800">
              {viewYear}년 {MONTHS[viewMonth]}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day of week header */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_OF_WEEK.map((day, i) => (
              <div
                key={day}
                className={`text-center text-xs font-medium py-1
                  ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-400"}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: totalCells }).map((_, idx) => {
              const day = idx - firstDay + 1;
              const isValid = day >= 1 && day <= daysInMonth;
              const colIndex = idx % 7;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!isValid}
                  onClick={() => isValid && handleDayClick(day)}
                  className={`flex h-8 w-full items-center justify-center rounded-lg text-sm transition-all
                    ${!isValid ? "invisible" : ""}
                    ${isSelected(day)
                      ? "bg-blue-500 text-white font-semibold shadow-sm"
                      : isToday(day)
                      ? "border border-blue-400 text-blue-500 font-semibold hover:bg-blue-50"
                      : isValid
                      ? colIndex === 0
                        ? "text-red-400 hover:bg-red-50"
                        : colIndex === 6
                        ? "text-blue-400 hover:bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                      : ""
                    }`}
                >
                  {isValid ? day : ""}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors"
            >
              오늘
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
