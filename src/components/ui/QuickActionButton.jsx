import React, { useState } from "react";
import Icon from "../AppIcon";
import Button from "./Button";

const QuickActionButton = ({ role = "customer", onActionClick, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const customerActions = [
    {
      id: "new-quote",
      label: "Nueva Cotización",
      icon: "Plus",
      path: "/quote-request-form",
      primary: true,
    },
    {
      id: "my-requests",
      label: "Mis Solicitudes",
      icon: "FileText",
      path: "/customer-dashboard",
    },
  ];

  const workshopActions = [
    {
      id: "new-quote",
      label: "Crear Cotización",
      icon: "Plus",
      path: "/quote-details",
      primary: true,
    },
    {
      id: "queue-management",
      label: "Gestionar Cola",
      icon: "Truck",
      path: "/vehicle-queue-management",
    },
    {
      id: "workshop-dashboard",
      label: "Panel Principal",
      icon: "BarChart3",
      path: "/workshop-dashboard",
    },
  ];

  const actions = role === "workshop" ? workshopActions : customerActions;
  const primaryAction = actions?.find((action) => action?.primary);
  const secondaryActions = actions?.filter((action) => !action?.primary);

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    } else {
      window.location.href = action?.path;
    }
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Secondary Actions (when expanded) */}
      {isExpanded && secondaryActions?.length > 0 && (
        <div className="mb-4 space-y-2">
          {secondaryActions?.map((action, index) => (
            <div
              key={action?.id}
              className="flex items-center justify-end animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <span className="mr-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-card border border-border whitespace-nowrap">{action?.label}</span>
              <Button variant="secondary" size="icon" onClick={() => handleActionClick(action)} className="h-12 w-12 rounded-full shadow-modal">
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Primary Action Button */}
      <div className="flex items-center justify-end">
        {isExpanded && (
          <span className="mr-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-card border border-border whitespace-nowrap animate-fade-in">{primaryAction?.label}</span>
        )}

        <div className="relative">
          {/* Main Action Button */}
          <Button variant="default" size="icon" onClick={() => handleActionClick(primaryAction)} className="h-14 w-14 rounded-full shadow-modal bg-primary hover:bg-primary/90">
            <Icon name={primaryAction?.icon || "Plus"} size={24} color="white" />
          </Button>

          {/* Expand/Collapse Button (only if there are secondary actions) */}
          {secondaryActions?.length > 0 && (
            <Button variant="outline" size="icon" onClick={toggleExpanded} className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-card border-2 border-primary shadow-card">
              <Icon name={isExpanded ? "X" : "MoreHorizontal"} size={14} color="var(--color-primary)" />
            </Button>
          )}
        </div>
      </div>
      {/* Overlay (when expanded) */}
      {isExpanded && <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={() => setIsExpanded(false)} />}
    </div>
  );
};

export default QuickActionButton;
