import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import QuickActionButton from "../../components/ui/QuickActionButton";
import ServiceRequestCard from "./components/ServiceRequestCard";
import UpcomingAppointmentCard from "./components/UpcomingAppointmentCard";
import VehicleSummaryCard from "./components/VehicleSummaryCard";
import QuickStatsCard from "./components/QuickStatsCard";
import NotificationPanel from "./components/NotificationPanel";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [notifications, setNotifications] = useState([]);

  // Mock data for service requests
  const serviceRequests = [
    {
      id: 1,
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      vehicleYear: 2019,
      licensePlate: "ABC-1234",
      mileage: 45000,
      serviceType: "Mantenimiento General",
      issueDescription: "Revisión de frenos, cambio de aceite y filtros. El vehículo presenta ruidos extraños al frenar y necesita inspección completa del sistema de frenos.",
      status: "quoted",
      requestDate: "2024-10-18T10:30:00Z",
      vehicleImage: "https://images.unsplash.com/photo-1638247305135-c23d18f1871e",
      vehicleImageAlt: "Toyota Corolla plateado estacionado en concesionario con luces encendidas",
      quote: {
        total: 285.5,
        estimatedTime: "2-3 horas",
      },
    },
    {
      id: 2,
      vehicleMake: "Ford",
      vehicleModel: "Focus",
      vehicleYear: 2020,
      licensePlate: "XYZ-5678",
      mileage: 32000,
      serviceType: "Reparación de Motor",
      issueDescription: "El motor presenta fallos de encendido y consume más combustible de lo normal. Necesita diagnóstico completo.",
      status: "pending",
      requestDate: "2024-10-19T14:15:00Z",
      vehicleImage: "https://images.unsplash.com/photo-1639928848474-6c6970cbc077",
      vehicleImageAlt: "Ford Focus azul moderno en carretera con diseño deportivo",
    },
    {
      id: 3,
      vehicleMake: "Volkswagen",
      vehicleModel: "Golf",
      vehicleYear: 2018,
      licensePlate: "DEF-9012",
      mileage: 67000,
      serviceType: "Revisión de Transmisión",
      issueDescription: "La transmisión automática presenta cambios bruscos y ruidos extraños durante la conducción.",
      status: "in-progress",
      requestDate: "2024-10-16T09:00:00Z",
      vehicleImage: "https://images.unsplash.com/photo-1697477078845-1ce34dc90800",
      vehicleImageAlt: "Volkswagen Golf blanco en taller mecánico con capó abierto",
    },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      workshopName: "Taller Mecánico Central",
      workshopLogo: "https://images.unsplash.com/photo-1669117804907-e2503dc20d33",
      workshopLogoAlt: "Logo de taller mecánico con herramientas cruzadas sobre fondo azul",
      workshopAddress: "Calle Mayor 123, Madrid",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      licensePlate: "ABC-1234",
      serviceType: "Mantenimiento General",
      dateTime: "2024-10-23T10:00:00Z",
      estimatedDuration: "2-3 horas",
      status: "scheduled",
    },
    {
      id: 2,
      workshopName: "AutoService Pro",
      workshopLogo: "https://images.unsplash.com/photo-1650513484925-d796756d3e51",
      workshopLogoAlt: "Logo moderno de taller automotriz con engranaje y llave inglesa",
      workshopAddress: "Avenida Libertad 456, Barcelona",
      vehicleMake: "BMW",
      vehicleModel: "Serie 3",
      licensePlate: "GHI-3456",
      serviceType: "Inspección Técnica",
      dateTime: "2024-10-25T15:30:00Z",
      estimatedDuration: "1 hora",
      status: "scheduled",
    },
  ];

  // Mock data for vehicles
  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      year: 2019,
      licensePlate: "ABC-1234",
      mileage: 45000,
      image: "https://images.unsplash.com/photo-1638247305135-c23d18f1871e",
      imageAlt: "Toyota Corolla plateado estacionado en concesionario con luces encendidas",
      lastService: "2024-08-15T00:00:00Z",
      nextServiceDue: "2024-11-15T00:00:00Z",
      activeServices: 1,
    },
    {
      id: 2,
      make: "Ford",
      model: "Focus",
      year: 2020,
      licensePlate: "XYZ-5678",
      mileage: 32000,
      image: "https://images.unsplash.com/photo-1639928848474-6c6970cbc077",
      imageAlt: "Ford Focus azul moderno en carretera con diseño deportivo",
      lastService: "2024-09-10T00:00:00Z",
      nextServiceDue: "2024-10-20T00:00:00Z",
      activeServices: 1,
    },
    {
      id: 3,
      make: "BMW",
      model: "Serie 3",
      year: 2021,
      licensePlate: "GHI-3456",
      mileage: 28000,
      image: "https://images.unsplash.com/photo-1657197582523-b7adea0b8217",
      imageAlt: "BMW Serie 3 negro elegante en estacionamiento urbano",
      lastService: "2024-09-25T00:00:00Z",
      nextServiceDue: "2024-12-25T00:00:00Z",
      activeServices: 0,
    },
  ];

  // Initialize notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "quote_received",
        title: "Nueva Cotización Recibida",
        message: "Taller Mecánico Central ha enviado una cotización para tu Toyota Corolla. Revisa los detalles y acepta o rechaza la propuesta.",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isRead: false,
      },
      {
        id: 2,
        type: "appointment_reminder",
        title: "Recordatorio de Cita",
        message: "Tu cita para mantenimiento está programada para mañana a las 10:00 AM en Taller Mecánico Central.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false,
      },
      {
        id: 3,
        type: "maintenance_due",
        title: "Mantenimiento Vencido",
        message: "Tu Ford Focus tiene el mantenimiento vencido desde hace 1 día. Programa una cita lo antes posible.",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true,
      },
      {
        id: 4,
        type: "service_completed",
        title: "Servicio Completado",
        message: "El mantenimiento de tu Volkswagen Golf ha sido completado exitosamente. El vehículo está listo para recoger.",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true,
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  // Quick stats data
  const quickStats = [
    {
      icon: "FileText",
      title: "Solicitudes Activas",
      value: serviceRequests?.length,
      subtitle: "2 pendientes de cotización",
      color: "primary",
    },
    {
      icon: "Calendar",
      title: "Próximas Citas",
      value: upcomingAppointments?.length,
      subtitle: "Esta semana",
      color: "accent",
    },
    {
      icon: "Car",
      title: "Vehículos",
      value: vehicles?.length,
      subtitle: "1 necesita mantenimiento",
      color: "success",
    },
    {
      icon: "Euro",
      title: "Gasto Mensual",
      value: "€342",
      subtitle: "Promedio últimos 3 meses",
      trend: -12,
      color: "warning",
    },
  ];

  // Event handlers
  const handleViewRequestDetails = (requestId) => {
    navigate(`/quote-details?request=${requestId}`);
  };

  const handleAcceptQuote = (requestId) => {
    console.log("Accepting quote for request:", requestId);
    // Here you would typically update the request status and navigate to appointment booking
    navigate("/appointment-booking");
  };

  const handleRejectQuote = (requestId) => {
    console.log("Rejecting quote for request:", requestId);
    // Here you would typically update the request status
  };

  const handleRescheduleAppointment = (appointmentId) => {
    navigate(`/appointment-booking?reschedule=${appointmentId}`);
  };

  const handleViewAppointmentDetails = (appointmentId) => {
    navigate(`/appointment-booking?view=${appointmentId}`);
  };

  const handleViewVehicleHistory = (vehicleId) => {
    console.log("Viewing history for vehicle:", vehicleId);
    // Navigate to vehicle history page (not implemented in this scope)
  };

  const handleRequestQuoteForVehicle = (vehicleId) => {
    navigate(`/quote-request-form?vehicle=${vehicleId}`);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications((prev) => prev?.map((notification) => (notification?.id === notificationId ? { ...notification, isRead: true } : notification)));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev?.map((notification) => ({ ...notification, isRead: true })));
  };

  const handleQuickAction = (action) => {
    if (action?.path) {
      navigate(action?.path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Cliente</h1>
              <p className="text-muted-foreground">Gestiona tus solicitudes de servicio y citas de manera eficiente</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={() => navigate("/quote-request-form")} iconName="Plus" iconPosition="left" iconSize={16}>
                Nueva Solicitud
              </Button>
              <Button variant="outline" onClick={() => navigate("/appointment-booking")} iconName="Calendar" iconPosition="left" iconSize={16}>
                Ver Citas
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {quickStats?.map((stat, index) => (
              <QuickStatsCard key={index} icon={stat?.icon} title={stat?.title} value={stat?.value} subtitle={stat?.subtitle} trend={stat?.trend} color={stat?.color} />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg p-1">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("requests")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === "requests" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name="FileText" size={16} />
                  Solicitudes de Servicio
                </button>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === "appointments" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name="Calendar" size={16} />
                  Próximas Citas
                </button>
                <button
                  onClick={() => setActiveTab("vehicles")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === "vehicles" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name="Car" size={16} />
                  Mis Vehículos
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "requests" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Solicitudes de Servicio</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate("/quote-request-form")} iconName="Plus" iconPosition="left" iconSize={14}>
                      Nueva Solicitud
                    </Button>
                  </div>

                  {serviceRequests?.length === 0 ? (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No hay solicitudes activas</h3>
                      <p className="text-muted-foreground mb-4">Comienza solicitando una cotización para el mantenimiento de tu vehículo</p>
                      <Button variant="primary" onClick={() => navigate("/quote-request-form")} iconName="Plus" iconPosition="left">
                        Crear Primera Solicitud
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {serviceRequests?.map((request) => (
                        <ServiceRequestCard key={request?.id} request={request} onViewDetails={handleViewRequestDetails} onAcceptQuote={handleAcceptQuote} onRejectQuote={handleRejectQuote} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "appointments" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Próximas Citas</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate("/appointment-booking")} iconName="Calendar" iconPosition="left" iconSize={14}>
                      Ver Calendario
                    </Button>
                  </div>

                  {upcomingAppointments?.length === 0 ? (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No hay citas programadas</h3>
                      <p className="text-muted-foreground mb-4">Programa una cita después de aceptar una cotización</p>
                      <Button variant="primary" onClick={() => navigate("/appointment-booking")} iconName="Calendar" iconPosition="left">
                        Ver Disponibilidad
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments?.map((appointment) => (
                        <UpcomingAppointmentCard key={appointment?.id} appointment={appointment} onReschedule={handleRescheduleAppointment} onViewDetails={handleViewAppointmentDetails} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "vehicles" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Mis Vehículos</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate("/quote-request-form")} iconName="Plus" iconPosition="left" iconSize={14}>
                      Agregar Vehículo
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {vehicles?.map((vehicle) => (
                      <VehicleSummaryCard key={vehicle?.id} vehicle={vehicle} onViewHistory={handleViewVehicleHistory} onRequestQuote={handleRequestQuoteForVehicle} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Notifications Panel */}
            <NotificationPanel notifications={notifications} onMarkAsRead={handleMarkNotificationAsRead} onMarkAllAsRead={handleMarkAllNotificationsAsRead} />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Button variant="outline" fullWidth onClick={() => navigate("/quote-request-form")} iconName="FileText" iconPosition="left" iconSize={16}>
                  Nueva Cotización
                </Button>
                <Button variant="outline" fullWidth onClick={() => navigate("/appointment-booking")} iconName="Calendar" iconPosition="left" iconSize={16}>
                  Programar Cita
                </Button>
                <Button variant="outline" fullWidth onClick={() => console.log("View history")} iconName="History" iconPosition="left" iconSize={16}>
                  Ver Historial
                </Button>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">¿Necesitas Ayuda?</h3>
              <p className="text-sm text-muted-foreground mb-4">Nuestro equipo de soporte está disponible para ayudarte</p>
              <div className="space-y-2">
                <Button variant="ghost" fullWidth iconName="Phone" iconPosition="left" iconSize={16} className="justify-start">
                  +34 900 123 456
                </Button>
                <Button variant="ghost" fullWidth iconName="Mail" iconPosition="left" iconSize={16} className="justify-start">
                  soporte@autoshoppro.es
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Action Button */}
      <QuickActionButton role="customer" onActionClick={handleQuickAction} />
    </div>
  );
};

export default CustomerDashboard;
