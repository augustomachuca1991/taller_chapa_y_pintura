import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const TodayAppointments = ({ appointments, onReschedule, onViewDetails, className = "" }) => {
  const getTimeStatus = (time) => {
    const now = new Date();
    const appointmentTime = new Date(`${now.toDateString()} ${time}`);
    const diffMinutes = (appointmentTime - now) / (1000 * 60);

    if (diffMinutes < -30) return "overdue";
    if (diffMinutes < 0) return "current";
    if (diffMinutes < 60) return "upcoming";
    return "scheduled";
  };

  const getTimeStatusColor = (status) => {
    switch (status) {
      case "overdue":
        return "text-error";
      case "current":
        return "text-warning";
      case "upcoming":
        return "text-accent";
      default:
        return "text-foreground";
    }
  };

  const sortedAppointments = [...appointments]?.sort((a, b) => {
    return a?.time?.localeCompare(b?.time);
  });

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Citas de Hoy</h2>
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            Ver Calendario
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date()?.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="p-6">
        {sortedAppointments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CalendarX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay citas programadas para hoy</p>
            <Button variant="outline" size="sm" className="mt-4" iconName="Plus" iconPosition="left">
              Programar Cita
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAppointments?.map((appointment) => {
              const timeStatus = getTimeStatus(appointment?.time);
              return (
                <div key={appointment?.id} className="flex items-start gap-4 p-4 bg-background border border-border rounded-lg hover:shadow-card transition-smooth">
                  {/* Time indicator */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`text-lg font-bold ${getTimeStatusColor(timeStatus)}`}>{appointment?.time}</div>
                    <div className="text-xs text-muted-foreground">{appointment?.duration}</div>
                  </div>
                  {/* Appointment details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-foreground">{appointment?.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment?.phone}</p>
                      </div>
                      <StatusIndicator status={appointment?.status} size="sm" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Car" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">
                          {appointment?.vehicle?.make} {appointment?.vehicle?.model} ({appointment?.vehicle?.year})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Wrench" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{appointment?.serviceType}</span>
                      </div>

                      {appointment?.estimatedCompletion && (
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Estimado: {appointment?.estimatedCompletion}</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="ghost" size="sm" onClick={() => onViewDetails(appointment)} iconName="Eye" iconPosition="left">
                        Ver
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => onReschedule(appointment)} iconName="Calendar" iconPosition="left">
                        Reprogramar
                      </Button>

                      {appointment?.status === "scheduled" && (
                        <Button variant="default" size="sm" iconName="Play" iconPosition="left">
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayAppointments;
