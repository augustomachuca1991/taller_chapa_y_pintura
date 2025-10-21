import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const ServiceRequestsTable = ({ requests, onViewDetails, onUpdateStatus, className = "" }) => {
  const [sortField, setSortField] = useState("priority");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");

  const statusOptions = [
    { value: "all", label: "Todos los Estados" },
    { value: "pending", label: "Pendiente" },
    { value: "in-review", label: "En Revisión" },
    { value: "quoted", label: "Cotizado" },
    { value: "approved", label: "Aprobado" },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredRequests = requests?.filter((request) => filterStatus === "all" || request?.status === filterStatus);

  const sortedRequests = [...filteredRequests]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === "priority") {
      const priorityOrder = { alta: 3, media: 2, baja: 1 };
      aValue = priorityOrder?.[a?.priority] || 0;
      bValue = priorityOrder?.[b?.priority] || 0;
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "text-error";
      case "media":
        return "text-warning";
      case "baja":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "alta":
        return "AlertTriangle";
      case "media":
        return "Clock";
      case "baja":
        return "CheckCircle";
      default:
        return "Circle";
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header with filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Solicitudes de Servicio Activas</h2>

          <div className="flex items-center gap-3">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e?.target?.value)} className="text-sm bg-background border border-border rounded-md px-3 py-2 text-foreground">
              {statusOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>

            <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
              Filtrar
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button onClick={() => handleSort("customerName")} className="flex items-center gap-2 hover:text-primary transition-smooth">
                  Cliente
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Vehículo</th>
              <th className="text-left p-4 font-medium text-foreground">Servicio</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button onClick={() => handleSort("status")} className="flex items-center gap-2 hover:text-primary transition-smooth">
                  Estado
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button onClick={() => handleSort("priority")} className="flex items-center gap-2 hover:text-primary transition-smooth">
                  Prioridad
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Fecha</th>
              <th className="text-right p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests?.map((request) => (
              <tr key={request?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{request?.customerName}</p>
                      <p className="text-sm text-muted-foreground">{request?.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {request?.vehicle?.make} {request?.vehicle?.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request?.vehicle?.year} • {request?.vehicle?.plate}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-foreground">{request?.serviceType}</p>
                </td>
                <td className="p-4">
                  <StatusIndicator status={request?.status} size="sm" />
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-2 ${getPriorityColor(request?.priority)}`}>
                    <Icon name={getPriorityIcon(request?.priority)} size={16} />
                    <span className="text-sm font-medium capitalize">{request?.priority}</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{request?.date}</p>
                  <p className="text-xs text-muted-foreground">{request?.time}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails(request)} iconName="Eye" iconPosition="left">
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onUpdateStatus(request)} iconName="Edit" iconPosition="left">
                      Actualizar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {sortedRequests?.map((request) => (
          <div key={request?.id} className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{request?.customerName}</p>
                  <p className="text-sm text-muted-foreground">{request?.phone}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${getPriorityColor(request?.priority)}`}>
                <Icon name={getPriorityIcon(request?.priority)} size={14} />
                <span className="text-xs font-medium capitalize">{request?.priority}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Vehículo:</span>
                <span className="text-sm font-medium text-foreground">
                  {request?.vehicle?.make} {request?.vehicle?.model} ({request?.vehicle?.year})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Servicio:</span>
                <span className="text-sm text-foreground">{request?.serviceType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <StatusIndicator status={request?.status} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fecha:</span>
                <span className="text-sm text-foreground">
                  {request?.date} {request?.time}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewDetails(request)} iconName="Eye" iconPosition="left" className="flex-1">
                Ver Detalles
              </Button>
              <Button variant="default" size="sm" onClick={() => onUpdateStatus(request)} iconName="Edit" iconPosition="left" className="flex-1">
                Actualizar
              </Button>
            </div>
          </div>
        ))}
      </div>
      {sortedRequests?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay solicitudes que coincidan con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestsTable;
