import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CalendarView = ({ selectedDate, onDateSelect, availableSlots = [], selectedSlot, onSlotSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const hasAvailableSlots = (date) => {
    if (!date) return false;
    const dateStr = date?.toISOString()?.split("T")?.[0];
    return availableSlots?.some((slot) => slot?.date === dateStr);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Seleccionar Fecha</h3>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
            <Icon name="ChevronLeft" size={16} />
          </Button>

          <span className="text-lg font-medium text-foreground min-w-[180px] text-center">
            {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </span>

          <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Week day headers */}
        {weekDays?.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days?.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2 h-10" />;
          }

          const isDateSelected = isSelected(date);
          const isDateToday = isToday(date);
          const isDatePast = isPastDate(date);
          const hasSlots = hasAvailableSlots(date);

          return (
            <button
              key={index}
              onClick={() => !isDatePast && onDateSelect(date)}
              disabled={isDatePast}
              className={`
                p-2 h-10 text-sm rounded-md transition-smooth relative
                ${isDatePast ? "text-muted-foreground cursor-not-allowed opacity-50" : "hover:bg-muted cursor-pointer"}
                ${isDateSelected ? "bg-primary text-primary-foreground" : "text-foreground"}
                ${isDateToday && !isDateSelected ? "bg-accent text-accent-foreground font-semibold" : ""}
              `}
            >
              {date?.getDate()}
              {hasSlots && !isDatePast && <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-success rounded-full" />}
            </button>
          );
        })}
      </div>
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">Fecha seleccionada:</p>
          <p className="font-medium text-foreground">{formatDate(selectedDate)}</p>
        </div>
      )}
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span>Hoy</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span>Seleccionado</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
