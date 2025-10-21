import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const UpcomingAppointmentCard = ({ appointment, onReschedule, onViewDetails }) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const appointmentDate = new Date(appointment.dateTime);
    const diffInHours = Math.ceil((appointmentDate - now) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `En ${diffInHours}h`;
    } else {
      const diffInDays = Math.ceil(diffInHours / 24);
      return `En ${diffInDays} días`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-start gap-3">
        {/* Workshop Logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
          <Image src={appointment?.workshopLogo} alt={appointment?.workshopLogoAlt} className="w-full h-full object-cover" />
        </div>

        {/* Appointment Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground text-base mb-1">{appointment?.workshopName}</h4>
              <StatusIndicator status={appointment?.status} size="sm" />
            </div>
            <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">{getTimeRemaining()}</span>
          </div>

          {/* Vehicle Info */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              {appointment?.vehicleMake} {appointment?.vehicleModel} • {appointment?.licensePlate}
            </p>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{new Date(appointment.dateTime)?.toLocaleDateString("es-ES")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {new Date(appointment.dateTime)?.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Wrench" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{appointment?.serviceType}</span>
            </div>
            {appointment?.estimatedDuration && <p className="text-xs text-muted-foreground">Duración estimada: {appointment?.estimatedDuration}</p>}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{appointment?.workshopAddress}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onReschedule(appointment?.id)} iconName="Calendar" iconPosition="left" iconSize={14}>
              Reprogramar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(appointment?.id)} iconName="ExternalLink" iconPosition="right" iconSize={14}>
              Detalles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;
