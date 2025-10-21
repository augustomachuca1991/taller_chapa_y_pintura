import React from "react";
import Icon from "../../../components/AppIcon";

const QuickStatsCard = ({ icon, title, value, subtitle, trend, color = "primary" }) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    error: "text-error bg-error/10",
    accent: "text-accent bg-accent/10",
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return "TrendingUp";
    if (trend < 0) return "TrendingDown";
    return "Minus";
  };

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    if (trend > 0) return "text-success";
    if (trend < 0) return "text-error";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colorClasses?.[color]}`}>
              <Icon name={icon} size={20} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>

          <div className="mb-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
          </div>

          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsCard;
