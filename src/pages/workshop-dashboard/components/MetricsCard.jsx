import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = "primary", className = "" }) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  const trendColors = {
    up: "text-success",
    down: "text-error",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-card transition-smooth hover:shadow-modal ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center text-sm ${trendColors?.[trend]}`}>
            <Icon name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"} size={16} className="mr-1" />
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default MetricsCard;
