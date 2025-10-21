import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TimeSlotSelector = ({ selectedDate, availableSlots = [], selectedSlot, onSlotSelect }) => {
  if (!selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">Selecciona una Fecha</h3>
          <p className="text-muted-foreground">Elige una fecha en el calendario para ver los horarios disponibles</p>
        </div>
      </div>
    );
  }

  const dateStr = selectedDate?.toISOString()?.split("T")?.[0];
  const slotsForDate = availableSlots?.filter((slot) => slot?.date === dateStr);

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${period}`;
  };

  const getSlotStatusColor = (slot) => {
    switch (slot?.status) {
      case "available":
        return "border-success text-success bg-success/5 hover:bg-success/10";
      case "limited":
        return "border-warning text-warning bg-warning/5 hover:bg-warning/10";
      case "busy":
        return "border-error text-error bg-error/5 cursor-not-allowed opacity-60";
      default:
        return "border-border text-foreground bg-card hover:bg-muted";
    }
  };

  const getCapacityIcon = (slot) => {
    switch (slot?.status) {
      case "available":
        return "CheckCircle";
      case "limited":
        return "AlertCircle";
      case "busy":
        return "XCircle";
      default:
        return "Clock";
    }
  };

  if (slotsForDate?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="CalendarX" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Hay Horarios Disponibles</h3>
          <p className="text-muted-foreground mb-4">No hay citas disponibles para esta fecha. Intenta con otra fecha.</p>
          <Button variant="outline" onClick={() => window.location?.reload()}>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Actualizar Disponibilidad
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Horarios Disponibles</h3>
        <span className="text-sm text-muted-foreground">
          {selectedDate?.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </div>
      <div className="space-y-3">
        {slotsForDate?.map((slot) => (
          <button
            key={slot?.id}
            onClick={() => slot?.status !== "busy" && onSlotSelect(slot)}
            disabled={slot?.status === "busy"}
            className={`
              w-full p-4 rounded-lg border-2 transition-smooth text-left
              ${selectedSlot?.id === slot?.id ? "border-primary bg-primary/10 text-primary" : getSlotStatusColor(slot)}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={getCapacityIcon(slot)} size={20} className="flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {formatTime(slot?.startTime)} - {formatTime(slot?.endTime)}
                  </div>
                  <div className="text-sm opacity-75">
                    {slot?.serviceType} • {slot?.duration} min
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">{slot?.availableSpots} disponibles</div>
                <div className="text-xs opacity-75">
                  {slot?.status === "available" && "Disponible"}
                  {slot?.status === "limited" && "Pocas plazas"}
                  {slot?.status === "busy" && "Completo"}
                </div>
              </div>
            </div>

            {slot?.notes && (
              <div className="mt-2 text-sm opacity-75">
                <Icon name="Info" size={14} className="inline mr-1" />
                {slot?.notes}
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Time Slot Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Leyenda:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={14} className="text-warning" />
            <span className="text-muted-foreground">Pocas plazas</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="XCircle" size={14} className="text-error" />
            <span className="text-muted-foreground">Completo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
