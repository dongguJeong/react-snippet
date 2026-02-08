import { useState, useRef, useEffect, useMemo } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../Icon/Icon";

interface DateRangeValue {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangeProps {
  value?: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DateRange({
  value,
  onChange,
  label,
  error,
  helperText,
  disabled = false,
  minDate,
  maxDate,
  className = "",
}: DateRangeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* -------------------- state -------------------- */

  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);

  /* -------------------- derived values -------------------- */

  const startDate = value?.startDate ?? null;
  const endDate = value?.endDate ?? null;

  // 파생 상태 (state 아님)
  const selectingStart = !startDate || !!endDate;

  // 실제 달력에 표시할 월
  const displayMonth = currentMonth ?? startDate ?? new Date();

  /* -------------------- effects (외부 시스템만) -------------------- */

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  /* -------------------- utils -------------------- */

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) =>
    (startDate && isSameDay(date, startDate)) ||
    (endDate && isSameDay(date, endDate));

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isInHoverRange = (date: Date) => {
    if (!startDate || !hoverDate || selectingStart) return false;
    const [from, to] =
      hoverDate < startDate ? [hoverDate, startDate] : [startDate, hoverDate];
    return date >= from && date <= to;
  };

  const formatDate = (date: Date | null) =>
    date
      ? date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";

  const displayText = useMemo(() => {
    if (!startDate && !endDate) return "날짜 범위를 선택하세요";
    if (startDate && !endDate) return `${formatDate(startDate)} ~`;
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  }, [startDate, endDate]);

  const getDaysInMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const days: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      days.push(new Date(y, m, d));
    }
    return days;
  };

  const days = getDaysInMonth(displayMonth);

  /* -------------------- handlers -------------------- */

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (selectingStart) {
      onChange({ startDate: date, endDate: null });
    } else {
      if (startDate && date < startDate) {
        onChange({ startDate: date, endDate: startDate });
      } else {
        onChange({ startDate, endDate: date });
      }
      setIsOpen(false);
    }
  };

  const clear = () => {
    onChange({ startDate: null, endDate: null });
    setCurrentMonth(null);
  };

  const hasError = Boolean(error);

  /* -------------------- render -------------------- */

  return (
    <div ref={wrapperRef} className={`daterange-wrapper ${className}`}>
      {label && <label className="daterange-label">{label}</label>}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`daterange-trigger ${isOpen ? "open" : ""} ${
          hasError ? "error" : ""
        } ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen((v) => !v)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen((v) => !v);
          }
        }}
      >
        <CalendarIcon size={20} />
        <span
          className={`daterange-value ${
            !startDate && !endDate ? "placeholder" : ""
          }`}
        >
          {displayText}
        </span>

        {(startDate || endDate) && !disabled && (
          <button
            type="button"
            className="daterange-clear"
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="daterange-dropdown">
          <div className="calendar-header">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    displayMonth.getFullYear(),
                    displayMonth.getMonth() - 1,
                  ),
                )
              }
            >
              <ChevronLeftIcon size={18} />
            </button>

            <div>
              {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    displayMonth.getFullYear(),
                    displayMonth.getMonth() + 1,
                  ),
                )
              }
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>

          <div className="calendar-weekdays">
            {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="calendar-days">
            {days.map((day, i) =>
              day ? (
                <button
                  key={i}
                  type="button"
                  disabled={isDateDisabled(day)}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => !selectingStart && setHoverDate(day)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={`calendar-day
                    ${isDateSelected(day) ? "selected" : ""}
                    ${isDateInRange(day) ? "in-range" : ""}
                    ${isInHoverRange(day) ? "hover-range" : ""}
                  `}
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={i} />
              ),
            )}
          </div>

          <div className="calendar-footer">
            {selectingStart
              ? "시작 날짜를 선택하세요"
              : "종료 날짜를 선택하세요"}
          </div>
        </div>
      )}

      {error && <span className="daterange-message error">{error}</span>}
      {!error && helperText && (
        <span className="daterange-message helper">{helperText}</span>
      )}
    </div>
  );
}
