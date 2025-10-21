import React from "react";
import Icon from "../../../components/AppIcon";

const QueueStats = ({ stats, className = "" }) => {
  const statCards = [
    {
      id: "total",
      label: "Total en Cola",
      value: stats?.total,
      icon: "Truck",
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
    },
    {
      id: "waiting",
      label: "En Espera",
      value: stats?.waiting,
      icon: "Clock",
      color: "warning",
      bgColor: "bg-warning/10",
      textColor: "text-warning",
      borderColor: "border-warning/20",
    },
    {
      id: "inProgress",
      label: "En Progreso",
      value: stats?.inProgress,
      icon: "Wrench",
      color: "accent",
      bgColor: "bg-accent/10",
      textColor: "text-accent",
      borderColor: "border-accent/20",
    },
    {
      id: "completed",
      label: "Completados Hoy",
      value: stats?.completed,
      icon: "CheckCircle",
      color: "success",
      bgColor: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
    {
      id: "capacity",
      label: "Capacidad Utilizada",
      value: `${stats?.capacityUsed}%`,
      icon: "BarChart3",
      color: stats?.capacityUsed > 80 ? "error" : "secondary",
      bgColor: stats?.capacityUsed > 80 ? "bg-error/10" : "bg-secondary/10",
      textColor: stats?.capacityUsed > 80 ? "text-error" : "text-secondary",
      borderColor: stats?.capacityUsed > 80 ? "border-error/20" : "border-secondary/20",
    },
    {
      id: "avgTime",
      label: "Tiempo Promedio",
      value: stats?.avgCompletionTime,
      icon: "Timer",
      color: "secondary",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary",
      borderColor: "border-secondary/20",
    },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {statCards?.map((stat) => (
        <div
          key={stat?.id}
          className={`
            bg-card border rounded-lg p-4 shadow-card transition-smooth hover:shadow-md
            ${stat?.borderColor}
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.textColor} />
            </div>

            {stat?.id === "capacity" && stat?.value !== "0%" && (
              <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${stats?.capacityUsed > 80 ? "bg-error" : stats?.capacityUsed > 60 ? "bg-warning" : "bg-success"}`}
                  style={{ width: `${Math.min(stats?.capacityUsed, 100)}%` }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.label}</div>
          </div>

          {/* Trend indicators for some stats */}
          {(stat?.id === "completed" || stat?.id === "avgTime") && (
            <div className="flex items-center mt-2 text-xs">
              <Icon name={stat?.id === "completed" ? "TrendingUp" : "TrendingDown"} size={12} className={stat?.id === "completed" ? "text-success" : "text-error"} />
              <span className={`ml-1 ${stat?.id === "completed" ? "text-success" : "text-error"}`}>{stat?.id === "completed" ? "+12%" : "-8%"}</span>
              <span className="ml-1 text-muted-foreground">vs ayer</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QueueStats;
