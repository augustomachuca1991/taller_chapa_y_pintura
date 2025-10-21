import React from "react";
import Icon from "../AppIcon";

const StatusIndicator = ({ status, variant = "default", size = "default", showIcon = true, showLabel = true, className = "" }) => {
  const statusConfig = {
    // Quote Statuses
    pending: {
      label: "Pendiente",
      icon: "Clock",
      color: "warning",
      bgColor: "bg-warning/10",
      textColor: "text-warning",
      borderColor: "border-warning/20",
    },
    "in-review": {
      label: "En Revisión",
      icon: "Eye",
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
    },
    quoted: {
      label: "Cotizado",
      icon: "FileText",
      color: "accent",
      bgColor: "bg-accent/10",
      textColor: "text-accent",
      borderColor: "border-accent/20",
    },
    approved: {
      label: "Aprobado",
      icon: "CheckCircle",
      color: "success",
      bgColor: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
    rejected: {
      label: "Rechazado",
      icon: "XCircle",
      color: "error",
      bgColor: "bg-error/10",
      textColor: "text-error",
      borderColor: "border-error/20",
    },

    // Service Statuses
    scheduled: {
      label: "Programado",
      icon: "Calendar",
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
    },
    "in-progress": {
      label: "En Progreso",
      icon: "Wrench",
      color: "accent",
      bgColor: "bg-accent/10",
      textColor: "text-accent",
      borderColor: "border-accent/20",
    },
    completed: {
      label: "Completado",
      icon: "Check",
      color: "success",
      bgColor: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
    cancelled: {
      label: "Cancelado",
      icon: "X",
      color: "error",
      bgColor: "bg-error/10",
      textColor: "text-error",
      borderColor: "border-error/20",
    },

    // Vehicle Queue Statuses
    waiting: {
      label: "Esperando",
      icon: "Clock",
      color: "warning",
      bgColor: "bg-warning/10",
      textColor: "text-warning",
      borderColor: "border-warning/20",
    },
    diagnosis: {
      label: "Diagnóstico",
      icon: "Search",
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
    },
    repair: {
      label: "Reparación",
      icon: "Tool",
      color: "accent",
      bgColor: "bg-accent/10",
      textColor: "text-accent",
      borderColor: "border-accent/20",
    },
    "quality-check": {
      label: "Control de Calidad",
      icon: "Shield",
      color: "secondary",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary",
      borderColor: "border-secondary/20",
    },
    ready: {
      label: "Listo",
      icon: "CheckCircle2",
      color: "success",
      bgColor: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
  };

  const config = statusConfig?.[status] || statusConfig?.["pending"];

  const sizes = {
    sm: {
      container: "px-2 py-1 text-xs",
      icon: 12,
      gap: "gap-1",
    },
    default: {
      container: "px-3 py-1.5 text-sm",
      icon: 14,
      gap: "gap-2",
    },
    lg: {
      container: "px-4 py-2 text-base",
      icon: 16,
      gap: "gap-2",
    },
  };

  const variants = {
    default: `${config?.bgColor} ${config?.textColor} border ${config?.borderColor}`,
    solid: `bg-${config?.color} text-${config?.color}-foreground`,
    outline: `border-2 ${config?.borderColor} ${config?.textColor} bg-transparent`,
    ghost: `${config?.textColor} hover:${config?.bgColor}`,
  };

  const sizeConfig = sizes?.[size];
  const variantClasses = variants?.[variant];

  return (
    <span
      className={`
        inline-flex items-center 
        ${sizeConfig?.gap} 
        ${sizeConfig?.container} 
        ${variantClasses}
        rounded-full 
        font-medium 
        transition-smooth
        ${className}
      `}
    >
      {showIcon && <Icon name={config?.icon} size={sizeConfig?.icon} className="flex-shrink-0" />}
      {showLabel && <span className="whitespace-nowrap">{config?.label}</span>}
    </span>
  );
};

export default StatusIndicator;
