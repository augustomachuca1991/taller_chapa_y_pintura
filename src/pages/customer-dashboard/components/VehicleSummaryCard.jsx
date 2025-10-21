import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const VehicleSummaryCard = ({ vehicle, onViewHistory, onRequestQuote }) => {
  const getLastServiceDate = () => {
    if (!vehicle?.lastService) return "Sin servicios previos";
    return new Date(vehicle.lastService)?.toLocaleDateString("es-ES");
  };

  const getNextServiceDue = () => {
    if (!vehicle?.nextServiceDue) return "No programado";
    const dueDate = new Date(vehicle.nextServiceDue);
    const now = new Date();
    const diffInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
      return `Vencido hace ${Math.abs(diffInDays)} días`;
    } else if (diffInDays === 0) {
      return "Vence hoy";
    } else {
      return `En ${diffInDays} días`;
    }
  };

  const isServiceOverdue = () => {
    if (!vehicle?.nextServiceDue) return false;
    return new Date(vehicle.nextServiceDue) < new Date();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-start gap-4">
        {/* Vehicle Image */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
          <Image src={vehicle?.image} alt={vehicle?.imageAlt} className="w-full h-full object-cover" />
        </div>

        {/* Vehicle Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground text-base mb-1">
                {vehicle?.make} {vehicle?.model}
              </h4>
              <p className="text-sm text-muted-foreground">
                {vehicle?.year} • {vehicle?.licensePlate}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onViewHistory(vehicle?.id)} className="flex-shrink-0">
              <Icon name="History" size={16} />
            </Button>
          </div>

          {/* Mileage */}
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Gauge" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{vehicle?.mileage?.toLocaleString("es-ES")} km</span>
          </div>

          {/* Service Information */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Último servicio:</span>
              <span className="text-foreground">{getLastServiceDate()}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Próximo servicio:</span>
              <span className={`font-medium ${isServiceOverdue() ? "text-error" : "text-foreground"}`}>{getNextServiceDue()}</span>
            </div>
          </div>

          {/* Service Status Indicator */}
          {isServiceOverdue() && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-error/10 border border-error/20 rounded-md">
              <Icon name="AlertTriangle" size={14} className="text-error" />
              <span className="text-xs text-error font-medium">Mantenimiento vencido</span>
            </div>
          )}

          {/* Active Services Count */}
          {vehicle?.activeServices > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Wrench" size={14} className="text-accent" />
              <span className="text-sm text-accent font-medium">
                {vehicle?.activeServices} servicio{vehicle?.activeServices > 1 ? "s" : ""} activo{vehicle?.activeServices > 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => onRequestQuote(vehicle?.id)} iconName="Plus" iconPosition="left" iconSize={14}>
              Nueva Solicitud
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onViewHistory(vehicle?.id)} iconName="History" iconPosition="left" iconSize={14}>
              Historial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSummaryCard;
