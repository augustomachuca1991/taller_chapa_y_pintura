import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const VehicleQueueTable = ({ vehicles, onStatusChange, onVehicleSelect, selectedVehicles, onBulkAction, className = "" }) => {
  const [sortConfig, setSortConfig] = useState({ key: "arrivalDate", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onVehicleSelect(vehicles?.map((v) => v?.id));
    } else {
      onVehicleSelect([]);
    }
  };

  const handleSelectVehicle = (vehicleId, checked) => {
    if (checked) {
      onVehicleSelect([...selectedVehicles, vehicleId]);
    } else {
      onVehicleSelect(selectedVehicles?.filter((id) => id !== vehicleId));
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "text-error",
      high: "text-warning",
      normal: "text-muted-foreground",
      low: "text-muted-foreground",
    };
    return colors?.[priority] || colors?.normal;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedVehicles = [...vehicles]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];

    if (sortConfig?.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const allSelected = selectedVehicles?.length === vehicles?.length && vehicles?.length > 0;
  const someSelected = selectedVehicles?.length > 0 && selectedVehicles?.length < vehicles?.length;

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card overflow-hidden ${className}`}>
      {/* Bulk Actions Bar */}
      {selectedVehicles?.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedVehicles?.length} vehículo{selectedVehicles?.length !== 1 ? "s" : ""} seleccionado{selectedVehicles?.length !== 1 ? "s" : ""}
            </span>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onBulkAction("update-status")} iconName="RefreshCw" iconPosition="left" iconSize={14}>
                Cambiar Estado
              </Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction("notify-customers")} iconName="Mail" iconPosition="left" iconSize={14}>
                Notificar Clientes
              </Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction("assign-technician")} iconName="User" iconPosition="left" iconSize={14}>
                Asignar Técnico
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Vehículo</th>
              <th className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-smooth" onClick={() => handleSort("customer")}>
                <div className="flex items-center space-x-1">
                  <span>Cliente</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Servicio</th>
              <th className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-smooth" onClick={() => handleSort("status")}>
                <div className="flex items-center space-x-1">
                  <span>Estado</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-smooth" onClick={() => handleSort("priority")}>
                <div className="flex items-center space-x-1">
                  <span>Prioridad</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-smooth" onClick={() => handleSort("arrivalDate")}>
                <div className="flex items-center space-x-1">
                  <span>Llegada</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Técnico</th>
              <th className="text-left p-4 font-semibold text-foreground">Estimado</th>
              <th className="w-24 p-4 font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedVehicles?.map((vehicle) => (
              <tr key={vehicle?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input type="checkbox" checked={selectedVehicles?.includes(vehicle?.id)} onChange={(e) => handleSelectVehicle(vehicle?.id, e?.target?.checked)} className="rounded border-border" />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image src={vehicle?.image} alt={vehicle?.imageAlt} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{vehicle?.licensePlate}</div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{vehicle?.customer}</div>
                    <div className="text-sm text-muted-foreground">{vehicle?.phone}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{vehicle?.serviceType}</div>
                </td>
                <td className="p-4">
                  <StatusIndicator status={vehicle?.status} size="sm" />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name={vehicle?.priority === "urgent" ? "AlertTriangle" : "Circle"} size={12} className={getPriorityColor(vehicle?.priority)} />
                    <span className="text-sm text-foreground capitalize">{vehicle?.priority}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm text-foreground">{formatDate(vehicle?.arrivalDate)}</div>
                    <div className="text-xs text-muted-foreground">{formatTime(vehicle?.arrivalDate)}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{vehicle?.technician || "Sin asignar"}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{vehicle?.estimatedCompletion}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => onStatusChange(vehicle?.id, "next-status")}>
                      <Icon name="Play" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => (window.location.href = `/vehicle-details/${vehicle?.id}`)}>
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedVehicles?.map((vehicle) => (
          <div key={vehicle?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={selectedVehicles?.includes(vehicle?.id)} onChange={(e) => handleSelectVehicle(vehicle?.id, e?.target?.checked)} className="rounded border-border" />
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <Image src={vehicle?.image} alt={vehicle?.imageAlt} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{vehicle?.licensePlate}</div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle?.make} {vehicle?.model}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <Icon name={vehicle?.priority === "urgent" ? "AlertTriangle" : "Circle"} size={12} className={getPriorityColor(vehicle?.priority)} />
                <StatusIndicator status={vehicle?.status} size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente:</span>
                <div className="font-medium text-foreground">{vehicle?.customer}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Servicio:</span>
                <div className="font-medium text-foreground">{vehicle?.serviceType}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Técnico:</span>
                <div className="font-medium text-foreground">{vehicle?.technician || "Sin asignar"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimado:</span>
                <div className="font-medium text-foreground">{vehicle?.estimatedCompletion}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                {formatDate(vehicle?.arrivalDate)} - {formatTime(vehicle?.arrivalDate)}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onStatusChange(vehicle?.id, "next-status")} iconName="Play" iconPosition="left" iconSize={14}>
                  Avanzar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => (window.location.href = `/vehicle-details/${vehicle?.id}`)}>
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {vehicles?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Truck" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No hay vehículos en cola</h3>
          <p className="text-muted-foreground">Los vehículos aparecerán aquí cuando lleguen al taller</p>
        </div>
      )}
    </div>
  );
};

export default VehicleQueueTable;
