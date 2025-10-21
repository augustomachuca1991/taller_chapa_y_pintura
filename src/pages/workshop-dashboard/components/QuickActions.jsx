import React from "react";
import Button from "../../../components/ui/Button";

const QuickActions = ({ onNewQuote, onViewQueue, onManageCalendar, className = "" }) => {
  const actions = [
    {
      id: "new-quote",
      label: "Nueva Cotización",
      description: "Crear cotización para cliente",
      icon: "Plus",
      variant: "default",
      onClick: onNewQuote,
    },
    {
      id: "view-queue",
      label: "Ver Cola Completa",
      description: "Gestionar vehículos en cola",
      icon: "Truck",
      variant: "outline",
      onClick: onViewQueue,
    },
    {
      id: "manage-calendar",
      label: "Gestionar Calendario",
      description: "Administrar citas y horarios",
      icon: "Calendar",
      variant: "outline",
      onClick: onManageCalendar,
    },
  ];

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-foreground mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            <Button variant={action?.variant} onClick={action?.onClick} iconName={action?.icon} iconPosition="left" className="w-full h-auto p-4 flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{action?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-smooth">{action?.description}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
