import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./Button";

const RoleSwitcher = ({ currentRole = "customer", onRoleChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const roles = [
    {
      value: "customer",
      label: "Cliente",
      icon: "User",
      description: "Vista de cliente",
    },
    {
      value: "workshop",
      label: "Taller",
      icon: "Wrench",
      description: "Vista de taller",
    },
    {
      value: "admin",
      label: "Administrador",
      icon: "Shield",
      description: "Vista administrativa",
    },
  ];

  const currentRoleData = roles?.find((role) => role?.value === selectedRole);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  const handleRoleSelect = (roleValue) => {
    setSelectedRole(roleValue);
    setIsOpen(false);
    if (onRoleChange) {
      onRoleChange(roleValue);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <Button variant="outline" onClick={toggleDropdown} iconName={currentRoleData?.icon} iconPosition="left" iconSize={16} className="text-sm font-medium min-w-[120px] justify-between">
          <span>{currentRoleData?.label}</span>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={14} className="ml-2" />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
            <div className="py-1">
              {roles?.map((role) => (
                <button
                  key={role?.value}
                  onClick={() => handleRoleSelect(role?.value)}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-smooth hover:bg-muted ${selectedRole === role?.value ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                >
                  <Icon name={role?.icon} size={16} className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{role?.label}</span>
                    <span className="text-xs opacity-75">{role?.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Mobile Version */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleDropdown} className="rounded-full">
          <Icon name={currentRoleData?.icon} size={20} />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-modal z-50">
            <div className="py-1">
              {roles?.map((role) => (
                <button
                  key={role?.value}
                  onClick={() => handleRoleSelect(role?.value)}
                  className={`w-full flex items-center px-4 py-3 text-sm transition-smooth hover:bg-muted ${selectedRole === role?.value ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                >
                  <Icon name={role?.icon} size={18} className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{role?.label}</span>
                    <span className="text-xs opacity-75">{role?.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default RoleSwitcher;
