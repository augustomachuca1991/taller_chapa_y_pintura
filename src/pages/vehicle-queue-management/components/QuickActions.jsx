import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickActions = ({ onQuickAction, selectedVehicles = [], className = "" }) => {
  const [activeAction, setActiveAction] = useState(null);

  const quickActions = [
    {
      id: "add-vehicle",
      label: "Agregar Vehículo",
      icon: "Plus",
      color: "primary",
      description: "Registrar nuevo vehículo en cola",
    },
    {
      id: "bulk-status",
      label: "Cambiar Estados",
      icon: "RefreshCw",
      color: "accent",
      description: "Actualizar estado de múltiples vehículos",
      requiresSelection: true,
    },
    {
      id: "assign-technician",
      label: "Asignar Técnico",
      icon: "UserPlus",
      color: "secondary",
      description: "Asignar técnico a vehículos seleccionados",
      requiresSelection: true,
    },
    {
      id: "notify-customers",
      label: "Notificar Clientes",
      icon: "Mail",
      color: "warning",
      description: "Enviar notificaciones a clientes",
      requiresSelection: true,
    },
    {
      id: "generate-report",
      label: "Generar Reporte",
      icon: "FileText",
      color: "success",
      description: "Crear reporte de actividad del taller",
    },
    {
      id: "emergency-priority",
      label: "Prioridad Urgente",
      icon: "AlertTriangle",
      color: "error",
      description: "Marcar como urgente",
      requiresSelection: true,
    },
  ];

  const handleActionClick = (action) => {
    if (action?.requiresSelection && selectedVehicles?.length === 0) {
      setActiveAction(action?.id);
      setTimeout(() => setActiveAction(null), 2000);
      return;
    }

    if (onQuickAction) {
      onQuickAction(action?.id, selectedVehicles);
    }
  };

  const getActionVariant = (action) => {
    if (action?.requiresSelection && selectedVehicles?.length === 0) {
      return "outline";
    }
    return action?.color === "primary" ? "default" : "outline";
  };

  const isActionDisabled = (action) => {
    return action?.requiresSelection && selectedVehicles?.length === 0;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Acciones Rápidas</h3>
        </div>

        {selectedVehicles?.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {selectedVehicles?.length} seleccionado{selectedVehicles?.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
      {/* Actions Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {quickActions?.map((action) => {
            const isDisabled = isActionDisabled(action);
            const isActive = activeAction === action?.id;

            return (
              <div key={action?.id} className="relative">
                <Button
                  variant={getActionVariant(action)}
                  onClick={() => handleActionClick(action)}
                  disabled={isDisabled}
                  className={`
                    w-full h-auto p-4 flex flex-col items-center space-y-2 text-center
                    ${isActive ? "ring-2 ring-error animate-pulse" : ""}
                    ${isDisabled ? "opacity-50" : "hover:shadow-md"}
                  `}
                >
                  <Icon name={action?.icon} size={24} className={isDisabled ? "text-muted-foreground" : ""} />
                  <div>
                    <div className="font-medium text-sm">{action?.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">{action?.description}</div>
                  </div>
                </Button>
                {/* Selection Required Tooltip */}
                {isActive && action?.requiresSelection && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    <div className="bg-error text-error-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                      Selecciona vehículos primero
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-error"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selection Helper */}
        {selectedVehicles?.length === 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong>Consejo:</strong> Selecciona uno o más vehículos de la tabla para habilitar acciones en lote como cambiar estados, asignar técnicos o enviar notificaciones.
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-warning">5</div>
              <div className="text-xs text-muted-foreground">Pendientes</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">3</div>
              <div className="text-xs text-muted-foreground">En Progreso</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">12</div>
              <div className="text-xs text-muted-foreground">Hoy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
