import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const appName = import.meta.env.VITE_APP_NAME || "AutoShop PRO";

  const primaryNavItems = [
    {
      label: "Solicitar Cotización",
      path: "/quote-request-form",
      icon: "FileText",
    },
    {
      label: "Mis Solicitudes",
      path: "/customer-dashboard",
      icon: "User",
    },
    {
      label: "Cotizaciones",
      path: "/quote-details",
      icon: "Calculator",
    },
    {
      label: "Citas",
      path: "/appointment-booking",
      icon: "Calendar",
    },
  ];

  const secondaryNavItems = [
    {
      label: "Panel de Taller",
      path: "/workshop-dashboard",
      icon: "Wrench",
    },
    {
      label: "Cola de Vehículos",
      path: "/vehicle-queue-management",
      icon: "Truck",
    },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-card">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Wrench" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground">{appName}</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 ml-8">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-sm font-medium"
            >
              {item?.label}
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button variant="ghost" onClick={toggleMoreMenu} iconName="MoreHorizontal" iconPosition="left" iconSize={16} className="text-sm font-medium">
              Más
            </Button>

            {isMoreMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-3 py-2 text-sm transition-smooth hover:bg-muted ${isActivePath(item?.path) ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-2" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notification Badge */}
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">3</span>
          </div>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <select className="text-sm bg-transparent border border-border rounded-md px-2 py-1 text-foreground">
              <option value="customer">Cliente</option>
              <option value="workshop">Taller</option>
            </select>
          </div>

          {/* User Profile */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="User" size={20} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="lg:hidden">
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-smooth ${
                  isActivePath(item?.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}

            {/* Mobile Role Switcher */}
            <div className="pt-2 mt-2 border-t border-border">
              <select className="w-full text-sm bg-transparent border border-border rounded-md px-3 py-2 text-foreground">
                <option value="customer">Cliente</option>
                <option value="workshop">Taller</option>
              </select>
            </div>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
      {/* Overlay for more menu */}
      {isMoreMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsMoreMenuOpen(false)} />}
    </header>
  );
};

export default Header;
