import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import NotificationBadge from "../../../components/ui/NotificationBadge";

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const unreadCount = notifications?.filter((n) => !n?.isRead)?.length;
  const recentNotifications = notifications?.slice(0, 3);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "quote_received":
        return "FileText";
      case "appointment_reminder":
        return "Calendar";
      case "service_completed":
        return "CheckCircle";
      case "payment_due":
        return "CreditCard";
      case "maintenance_due":
        return "AlertTriangle";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "quote_received":
        return "text-primary";
      case "appointment_reminder":
        return "text-accent";
      case "service_completed":
        return "text-success";
      case "payment_due":
        return "text-warning";
      case "maintenance_due":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days}d`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="Bell" size={20} className="text-foreground" />
            {unreadCount > 0 && <NotificationBadge count={unreadCount} variant="accent" size="sm" />}
          </div>
          <h3 className="font-semibold text-foreground">Notificaciones</h3>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs">
              Marcar todas
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No hay notificaciones nuevas</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {(isExpanded ? notifications : recentNotifications)?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-smooth cursor-pointer ${!notification?.isRead ? "bg-primary/5" : ""}`}
                onClick={() => onMarkAsRead(notification?.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`text-sm font-medium ${!notification?.isRead ? "text-foreground" : "text-muted-foreground"}`}>{notification?.title}</h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{formatNotificationTime(notification?.timestamp)}</span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">{notification?.message}</p>

                    {!notification?.isRead && <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      {!isExpanded && notifications?.length > 3 && (
        <div className="p-3 border-t border-border">
          <Button variant="ghost" fullWidth onClick={() => setIsExpanded(true)} iconName="ChevronDown" iconPosition="right" iconSize={14} className="text-sm">
            Ver todas las notificaciones ({notifications?.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
