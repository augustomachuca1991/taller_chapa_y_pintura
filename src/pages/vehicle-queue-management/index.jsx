import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import QueueFilters from "./components/QueueFilters";
import VehicleQueueTable from "./components/VehicleQueueTable";
import QueueStats from "./components/QueueStats";
import WorkshopCapacity from "./components/WorkshopCapacity";
import QuickActions from "./components/QuickActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const VehicleQueueManagement = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    serviceType: "all",
    technician: "all",
    priority: "all",
    dateFrom: "",
    dateTo: "",
  });

  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // table, capacity, analytics

  // Mock vehicle data
  const mockVehicles = [
    {
      id: "v001",
      licensePlate: "ABC-123",
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      customer: "María González",
      phone: "+34 666 123 456",
      serviceType: "Mantenimiento",
      status: "waiting",
      priority: "normal",
      technician: "Carlos Martínez",
      arrivalDate: "2025-10-21T08:30:00",
      estimatedCompletion: "2 horas",
      image: "https://images.unsplash.com/photo-1652396945295-a7f267be4c78",
      imageAlt: "Toyota Corolla blanco estacionado en el taller mecánico",
    },
    {
      id: "v002",
      licensePlate: "XYZ-789",
      make: "BMW",
      model: "Serie 3",
      year: 2019,
      customer: "Juan Pérez",
      phone: "+34 677 234 567",
      serviceType: "Reparación",
      status: "in-progress",
      priority: "high",
      technician: "Ana Rodríguez",
      arrivalDate: "2025-10-21T09:15:00",
      estimatedCompletion: "4 horas",
      image: "https://images.unsplash.com/photo-1657197582523-b7adea0b8217",
      imageAlt: "BMW Serie 3 azul oscuro en proceso de reparación en el taller",
    },
    {
      id: "v003",
      licensePlate: "DEF-456",
      make: "Mercedes",
      model: "Clase A",
      year: 2021,
      customer: "Carmen López",
      phone: "+34 688 345 678",
      serviceType: "Diagnóstico",
      status: "diagnosis",
      priority: "urgent",
      technician: "Miguel López",
      arrivalDate: "2025-10-21T10:00:00",
      estimatedCompletion: "1.5 horas",
      image: "https://images.unsplash.com/photo-1638133243677-9289a091d292",
      imageAlt: "Mercedes Clase A plateado siendo diagnosticado con equipo especializado",
    },
    {
      id: "v004",
      licensePlate: "GHI-321",
      make: "Volkswagen",
      model: "Golf",
      year: 2018,
      customer: "Pedro Martín",
      phone: "+34 699 456 789",
      serviceType: "Inspección",
      status: "quality-check",
      priority: "normal",
      technician: "Sofía García",
      arrivalDate: "2025-10-21T11:30:00",
      estimatedCompletion: "30 min",
      image: "https://images.unsplash.com/photo-1576508122774-abc9c2a6dc44",
      imageAlt: "Volkswagen Golf gris en proceso de inspección técnica",
    },
    {
      id: "v005",
      licensePlate: "JKL-654",
      make: "Ford",
      model: "Focus",
      year: 2017,
      customer: "Ana Sánchez",
      phone: "+34 610 567 890",
      serviceType: "Carrocería",
      status: "repair",
      priority: "high",
      technician: "David Hernández",
      arrivalDate: "2025-10-20T14:45:00",
      estimatedCompletion: "6 horas",
      image: "https://images.unsplash.com/photo-1683628297700-1a166bdb76d9",
      imageAlt: "Ford Focus rojo en reparación de carrocería con herramientas especializadas",
    },
    {
      id: "v006",
      licensePlate: "MNO-987",
      make: "Seat",
      model: "León",
      year: 2022,
      customer: "Roberto García",
      phone: "+34 621 678 901",
      serviceType: "Eléctrico",
      status: "ready",
      priority: "normal",
      technician: "Carlos Martínez",
      arrivalDate: "2025-10-20T16:20:00",
      estimatedCompletion: "Completado",
      image: "https://images.unsplash.com/photo-1610933494565-76f82aed300c",
      imageAlt: "Seat León blanco completamente reparado y listo para entrega",
    },
  ];

  // Mock stats data
  const mockStats = {
    total: mockVehicles?.length,
    waiting: mockVehicles?.filter((v) => v?.status === "waiting")?.length,
    inProgress: mockVehicles?.filter((v) => ["in-progress", "diagnosis", "repair", "quality-check"]?.includes(v?.status))?.length,
    completed: mockVehicles?.filter((v) => v?.status === "ready")?.length,
    capacityUsed: 75,
    avgCompletionTime: "3.2h",
  };

  // Filter vehicles based on current filters
  const filteredVehicles = mockVehicles?.filter((vehicle) => {
    const matchesSearch =
      !filters?.search ||
      vehicle?.licensePlate?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vehicle?.customer?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vehicle?.serviceType?.toLowerCase()?.includes(filters?.search?.toLowerCase());

    const matchesStatus = filters?.status === "all" || vehicle?.status === filters?.status;
    const matchesServiceType = filters?.serviceType === "all" || vehicle?.serviceType?.toLowerCase()?.includes(filters?.serviceType?.toLowerCase());
    const matchesTechnician = filters?.technician === "all" || vehicle?.technician?.toLowerCase()?.includes(filters?.technician?.toLowerCase());
    const matchesPriority = filters?.priority === "all" || vehicle?.priority === filters?.priority;

    return matchesSearch && matchesStatus && matchesServiceType && matchesTechnician && matchesPriority;
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      serviceType: "all",
      technician: "all",
      priority: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleStatusChange = (vehicleId, newStatus) => {
    console.log("Changing status for vehicle:", vehicleId, "to:", newStatus);
    // Implementation would update vehicle status
  };

  const handleVehicleSelect = (vehicleIds) => {
    setSelectedVehicles(vehicleIds);
  };

  const handleBulkAction = (action) => {
    console.log("Bulk action:", action, "for vehicles:", selectedVehicles);
    // Implementation would handle bulk actions
  };

  const handleQuickAction = (actionId, selectedVehicles) => {
    console.log("Quick action:", actionId, "for vehicles:", selectedVehicles);

    switch (actionId) {
      case "add-vehicle":
        window.location.href = "/quote-request-form";
        break;
      case "generate-report":
        console.log("Generating workshop report...");
        break;
      default:
        console.log("Handling action:", actionId);
    }
  };

  const handleCapacityUpdate = () => {
    console.log("Updating workshop capacity...");
    // Implementation would refresh capacity data
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Cola de Vehículos</h1>
            <p className="text-muted-foreground mt-1">Supervisa y gestiona todos los vehículos en el taller</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} iconName="Table" iconPosition="left" iconSize={16}>
                Cola
              </Button>
              <Button variant={viewMode === "capacity" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("capacity")} iconName="Building" iconPosition="left" iconSize={16}>
                Capacidad
              </Button>
            </div>

            <Button variant="default" onClick={() => (window.location.href = "/quote-request-form")} iconName="Plus" iconPosition="left" iconSize={16}>
              Agregar Vehículo
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <QueueStats stats={mockStats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Filters and Quick Actions */}
          <div className="xl:col-span-1 space-y-6">
            <QueueFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />

            <QuickActions onQuickAction={handleQuickAction} selectedVehicles={selectedVehicles} />
          </div>

          {/* Right Column - Main Content */}
          <div className="xl:col-span-3">
            {viewMode === "table" && (
              <VehicleQueueTable
                vehicles={filteredVehicles}
                onStatusChange={handleStatusChange}
                onVehicleSelect={handleVehicleSelect}
                selectedVehicles={selectedVehicles}
                onBulkAction={handleBulkAction}
              />
            )}

            {viewMode === "capacity" && <WorkshopCapacity capacityData={mockStats} onCapacityUpdate={handleCapacityUpdate} />}
          </div>
        </div>

        {/* Results Summary */}
        {filteredVehicles?.length !== mockVehicles?.length && (
          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Mostrando {filteredVehicles?.length} de {mockVehicles?.length} vehículos
                </span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleClearFilters} iconName="X" iconPosition="left" iconSize={14}>
                Limpiar filtros
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VehicleQueueManagement;
