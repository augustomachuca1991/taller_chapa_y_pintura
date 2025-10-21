import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const WorkshopCapacity = ({ capacityData, onCapacityUpdate, className = "" }) => {
  const workstations = [
    {
      id: "bay-1",
      name: "Bahía 1",
      type: "Diagnóstico",
      status: "occupied",
      vehicle: "ABC-123",
      technician: "Carlos Martínez",
      estimatedCompletion: "14:30",
      progress: 75,
    },
    {
      id: "bay-2",
      name: "Bahía 2",
      type: "Reparación",
      status: "occupied",
      vehicle: "XYZ-789",
      technician: "Ana Rodríguez",
      estimatedCompletion: "16:45",
      progress: 45,
    },
    {
      id: "bay-3",
      name: "Bahía 3",
      type: "Mantenimiento",
      status: "available",
      vehicle: null,
      technician: null,
      estimatedCompletion: null,
      progress: 0,
    },
    {
      id: "bay-4",
      name: "Bahía 4",
      type: "Carrocería",
      status: "occupied",
      vehicle: "DEF-456",
      technician: "Miguel López",
      estimatedCompletion: "17:15",
      progress: 90,
    },
    {
      id: "bay-5",
      name: "Bahía 5",
      type: "Eléctrico",
      status: "maintenance",
      vehicle: null,
      technician: null,
      estimatedCompletion: null,
      progress: 0,
    },
    {
      id: "bay-6",
      name: "Bahía 6",
      type: "Inspección",
      status: "available",
      vehicle: null,
      technician: null,
      estimatedCompletion: null,
      progress: 0,
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      occupied: {
        bg: "bg-accent/10",
        border: "border-accent",
        text: "text-accent",
        icon: "Wrench",
      },
      available: {
        bg: "bg-success/10",
        border: "border-success",
        text: "text-success",
        icon: "CheckCircle",
      },
      maintenance: {
        bg: "bg-error/10",
        border: "border-error",
        text: "text-error",
        icon: "AlertTriangle",
      },
    };
    return colors?.[status] || colors?.available;
  };

  const getStatusLabel = (status) => {
    const labels = {
      occupied: "Ocupada",
      available: "Disponible",
      maintenance: "Mantenimiento",
    };
    return labels?.[status] || "Desconocido";
  };

  const occupiedBays = workstations?.filter((bay) => bay?.status === "occupied")?.length;
  const totalBays = workstations?.length;
  const utilizationRate = Math.round((occupiedBays / totalBays) * 100);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Building" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Capacidad del Taller</h3>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Utilización: <span className="font-semibold text-foreground">{utilizationRate}%</span>
          </div>

          <Button variant="outline" size="sm" onClick={() => onCapacityUpdate && onCapacityUpdate()} iconName="RefreshCw" iconPosition="left" iconSize={14}>
            Actualizar
          </Button>
        </div>
      </div>
      {/* Capacity Overview */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">{workstations?.filter((b) => b?.status === "available")?.length}</div>
            <div className="text-sm text-muted-foreground">Disponibles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{occupiedBays}</div>
            <div className="text-sm text-muted-foreground">Ocupadas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-error">{workstations?.filter((b) => b?.status === "maintenance")?.length}</div>
            <div className="text-sm text-muted-foreground">Mantenimiento</div>
          </div>
        </div>

        {/* Utilization Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Utilización del Taller</span>
            <span className="font-semibold text-foreground">{utilizationRate}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div className={`h-full transition-all duration-500 ${utilizationRate > 80 ? "bg-error" : utilizationRate > 60 ? "bg-warning" : "bg-success"}`} style={{ width: `${utilizationRate}%` }} />
          </div>
        </div>
      </div>
      {/* Workstation Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workstations?.map((bay) => {
            const statusConfig = getStatusColor(bay?.status);

            return (
              <div
                key={bay?.id}
                className={`
                  border-2 rounded-lg p-4 transition-smooth hover:shadow-md
                  ${statusConfig?.bg} ${statusConfig?.border}
                `}
              >
                {/* Bay Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{bay?.name}</h4>
                    <p className="text-sm text-muted-foreground">{bay?.type}</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Icon name={statusConfig?.icon} size={16} className={statusConfig?.text} />
                    <span className={`text-sm font-medium ${statusConfig?.text}`}>{getStatusLabel(bay?.status)}</span>
                  </div>
                </div>
                {/* Bay Content */}
                {bay?.status === "occupied" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Vehículo:</span>
                      <span className="font-medium text-foreground">{bay?.vehicle}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Técnico:</span>
                      <span className="font-medium text-foreground">{bay?.technician}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Finaliza:</span>
                      <span className="font-medium text-foreground">{bay?.estimatedCompletion}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold text-foreground">{bay?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${bay?.progress}%` }} />
                      </div>
                    </div>
                  </div>
                )}
                {bay?.status === "available" && (
                  <div className="text-center py-4">
                    <Icon name="Plus" size={24} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Bahía disponible</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => console.log("Assign vehicle to", bay?.id)}>
                      Asignar Vehículo
                    </Button>
                  </div>
                )}
                {bay?.status === "maintenance" && (
                  <div className="text-center py-4">
                    <Icon name="Tool" size={24} className="mx-auto text-error mb-2" />
                    <p className="text-sm text-error">En mantenimiento</p>
                    <p className="text-xs text-muted-foreground mt-1">No disponible</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkshopCapacity;
