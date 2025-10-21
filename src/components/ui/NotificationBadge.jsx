import React from "react";

const NotificationBadge = ({ count = 0, maxCount = 99, showZero = false, variant = "default", size = "default", className = "" }) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = showZero || count > 0;

  const variants = {
    default: "bg-accent text-accent-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    error: "bg-error text-error-foreground",
    primary: "bg-primary text-primary-foreground",
  };

  const sizes = {
    sm: "h-3 w-3 text-xs min-w-[12px]",
    default: "h-4 w-4 text-xs min-w-[16px]",
    lg: "h-5 w-5 text-sm min-w-[20px]",
  };

  if (!shouldShow) return null;

  return (
    <span
      className={`
        absolute -top-1 -right-1 
        ${sizes?.[size]} 
        ${variants?.[variant]} 
        rounded-full 
        flex items-center justify-center 
        font-medium 
        transition-smooth
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;
