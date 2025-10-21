import React from "react";
import Icon from "../../../components/AppIcon";

const WorkshopCapacity = ({ totalBays = 8, occupiedBays = 5, availableBays = 3, className = "" }) => {
  const occupancyPercentage = (occupiedBays / totalBays) * 100;

  const getCapacityStatus = () => {
    if (occupancyPercentage >= 90) return { status: "critical", color: "error", icon: "AlertTriangle" };
    if (occupancyPercentage >= 75) return { status: "high", color: "warning", icon: "AlertCircle" };
    if (occupancyPercentage >= 50) return { status: "moderate", color: "accent", icon: "Info" };
    return { status: "low", color: "success", icon: "CheckCircle" };
  };

  const capacityInfo = getCapacityStatus();

  const bayStatuses = [
    { id: 1, status: "occupied", vehicle: "Toyota Corolla", service: "Mantenimiento" },
    { id: 2, status: "occupied", vehicle: "Honda Civic", service: "Reparación" },
    { id: 3, status: "occupied", vehicle: "Ford Focus", service: "Diagnóstico" },
    { id: 4, status: "occupied", vehicle: "Nissan Sentra", service: "Cambio de aceite" },
    { id: 5, status: "occupied", vehicle: "Chevrolet Aveo", service: "Frenos" },
    { id: 6, status: "available" },
    { id: 7, status: "available" },
    { id: 8, status: "available" },
  ];

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Capacidad del Taller</h2>
        <div className={`flex items-center gap-2 text-${capacityInfo?.color}`}>
          <Icon name={capacityInfo?.icon} size={20} />
          <span className="text-sm font-medium capitalize">{capacityInfo?.status}</span>
        </div>
      </div>
      {/* Capacity overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Ocupación</span>
          <span className="text-sm font-medium text-foreground">
            {occupiedBays}/{totalBays} bahías
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div className={`h-3 rounded-full transition-all duration-300 bg-${capacityInfo?.color}`} style={{ width: `${occupancyPercentage}%` }} />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-lg font-bold text-foreground">{occupiedBays}</div>
            <div className="text-xs text-muted-foreground">Ocupadas</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-lg font-bold text-success">{availableBays}</div>
            <div className="text-xs text-muted-foreground">Disponibles</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-lg font-bold text-foreground">{Math.round(occupancyPercentage)}%</div>
            <div className="text-xs text-muted-foreground">Utilización</div>
          </div>
        </div>
      </div>
      {/* Bay status grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Estado de Bahías</h3>
        <div className="grid grid-cols-2 gap-2">
          {bayStatuses?.map((bay) => (
            <div
              key={bay?.id}
              className={`p-3 rounded-lg border transition-smooth ${bay?.status === "occupied" ? "bg-error/10 border-error/20 text-error" : "bg-success/10 border-success/20 text-success"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Bahía {bay?.id}</span>
                <Icon name={bay?.status === "occupied" ? "Car" : "Square"} size={16} />
              </div>
              {bay?.status === "occupied" ? (
                <div className="text-xs">
                  <div className="font-medium">{bay?.vehicle}</div>
                  <div className="opacity-75">{bay?.service}</div>
                </div>
              ) : (
                <div className="text-xs opacity-75">Disponible</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopCapacity;
