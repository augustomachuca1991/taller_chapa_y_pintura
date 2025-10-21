import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const QueueFilters = ({ filters, onFiltersChange, onClearFilters, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: "all", label: "Todos los estados" },
    { value: "waiting", label: "En espera" },
    { value: "diagnosis", label: "Diagnóstico" },
    { value: "in-progress", label: "En progreso" },
    { value: "repair", label: "Reparación" },
    { value: "quality-check", label: "Control de calidad" },
    { value: "ready", label: "Listo" },
    { value: "waiting-parts", label: "Esperando piezas" },
  ];

  const serviceTypeOptions = [
    { value: "all", label: "Todos los servicios" },
    { value: "maintenance", label: "Mantenimiento" },
    { value: "repair", label: "Reparación" },
    { value: "diagnosis", label: "Diagnóstico" },
    { value: "inspection", label: "Inspección" },
    { value: "bodywork", label: "Carrocería" },
    { value: "electrical", label: "Eléctrico" },
    { value: "engine", label: "Motor" },
  ];

  const technicianOptions = [
    { value: "all", label: "Todos los técnicos" },
    { value: "carlos-martinez", label: "Carlos Martínez" },
    { value: "ana-rodriguez", label: "Ana Rodríguez" },
    { value: "miguel-lopez", label: "Miguel López" },
    { value: "sofia-garcia", label: "Sofía García" },
    { value: "david-hernandez", label: "David Hernández" },
  ];

  const priorityOptions = [
    { value: "all", label: "Todas las prioridades" },
    { value: "urgent", label: "Urgente" },
    { value: "high", label: "Alta" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Baja" },
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const hasActiveFilters = Object.values(filters)?.some((value) => value && value !== "all" && value !== "");

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filtros de Cola</h3>
          {hasActiveFilters && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Activos</span>}
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} iconName="X" iconPosition="left" iconSize={14}>
              Limpiar
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={toggleExpanded} className="lg:hidden">
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filters Content */}
      <div className={`p-4 space-y-4 ${isExpanded ? "block" : "hidden lg:block"}`}>
        {/* Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Buscar"
            type="search"
            placeholder="Matrícula, cliente, servicio..."
            value={filters?.search || ""}
            onChange={(e) => handleFilterChange("search", e?.target?.value)}
            className="w-full"
          />

          <Select label="Estado" options={statusOptions} value={filters?.status || "all"} onChange={(value) => handleFilterChange("status", value)} />
        </div>

        {/* Service and Technician */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Tipo de Servicio" options={serviceTypeOptions} value={filters?.serviceType || "all"} onChange={(value) => handleFilterChange("serviceType", value)} />

          <Select label="Técnico Asignado" options={technicianOptions} value={filters?.technician || "all"} onChange={(value) => handleFilterChange("technician", value)} />
        </div>

        {/* Priority and Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="Prioridad" options={priorityOptions} value={filters?.priority || "all"} onChange={(value) => handleFilterChange("priority", value)} />

          <Input label="Fecha Desde" type="date" value={filters?.dateFrom || ""} onChange={(e) => handleFilterChange("dateFrom", e?.target?.value)} />

          <Input label="Fecha Hasta" type="date" value={filters?.dateTo || ""} onChange={(e) => handleFilterChange("dateTo", e?.target?.value)} />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button variant={filters?.status === "waiting" ? "default" : "outline"} size="sm" onClick={() => handleFilterChange("status", filters?.status === "waiting" ? "all" : "waiting")}>
            En Espera
          </Button>
          <Button variant={filters?.status === "in-progress" ? "default" : "outline"} size="sm" onClick={() => handleFilterChange("status", filters?.status === "in-progress" ? "all" : "in-progress")}>
            En Progreso
          </Button>
          <Button variant={filters?.priority === "urgent" ? "default" : "outline"} size="sm" onClick={() => handleFilterChange("priority", filters?.priority === "urgent" ? "all" : "urgent")}>
            Urgentes
          </Button>
          <Button variant={filters?.serviceType === "repair" ? "default" : "outline"} size="sm" onClick={() => handleFilterChange("serviceType", filters?.serviceType === "repair" ? "all" : "repair")}>
            Reparaciones
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QueueFilters;
