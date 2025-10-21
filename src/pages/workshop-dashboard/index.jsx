import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import MetricsCard from "./components/MetricsCard";
import ServiceRequestsTable from "./components/ServiceRequestsTable";
import TodayAppointments from "./components/TodayAppointments";
import QuickActions from "./components/QuickActions";
import WorkshopCapacity from "./components/WorkshopCapacity";

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for service requests
  const mockServiceRequests = [
    {
      id: "SR001",
      customerName: "María González",
      phone: "+34 612 345 678",
      vehicle: {
        make: "Toyota",
        model: "Corolla",
        year: "2019",
        plate: "1234 ABC",
      },
      serviceType: "Mantenimiento General",
      status: "pending",
      priority: "media",
      date: "21/10/2025",
      time: "09:30",
      estimatedCost: "€150-200",
    },
    {
      id: "SR002",
      customerName: "Carlos Rodríguez",
      phone: "+34 687 654 321",
      vehicle: {
        make: "Honda",
        model: "Civic",
        year: "2020",
        plate: "5678 DEF",
      },
      serviceType: "Reparación de Frenos",
      status: "in-review",
      priority: "alta",
      date: "21/10/2025",
      time: "11:00",
      estimatedCost: "€300-400",
    },
    {
      id: "SR003",
      customerName: "Ana Martínez",
      phone: "+34 654 987 321",
      vehicle: {
        make: "Ford",
        model: "Focus",
        year: "2018",
        plate: "9012 GHI",
      },
      serviceType: "Cambio de Aceite",
      status: "quoted",
      priority: "baja",
      date: "21/10/2025",
      time: "14:30",
      estimatedCost: "€80-120",
    },
    {
      id: "SR004",
      customerName: "José López",
      phone: "+34 698 123 456",
      vehicle: {
        make: "Nissan",
        model: "Sentra",
        year: "2021",
        plate: "3456 JKL",
      },
      serviceType: "Diagnóstico Electrónico",
      status: "approved",
      priority: "alta",
      date: "21/10/2025",
      time: "16:00",
      estimatedCost: "€120-180",
    },
    {
      id: "SR005",
      customerName: "Laura Fernández",
      phone: "+34 611 789 012",
      vehicle: {
        make: "Chevrolet",
        model: "Aveo",
        year: "2017",
        plate: "7890 MNO",
      },
      serviceType: "Revisión Pre-ITV",
      status: "pending",
      priority: "media",
      date: "22/10/2025",
      time: "10:00",
      estimatedCost: "€90-150",
    },
  ];

  // Mock data for today's appointments
  const mockTodayAppointments = [
    {
      id: "APP001",
      customerName: "Pedro Sánchez",
      phone: "+34 622 111 222",
      vehicle: {
        make: "Volkswagen",
        model: "Golf",
        year: "2019",
        plate: "1111 AAA",
      },
      serviceType: "Cambio de Neumáticos",
      status: "scheduled",
      time: "09:00",
      duration: "2h",
      estimatedCompletion: "11:00",
    },
    {
      id: "APP002",
      customerName: "Isabel Ruiz",
      phone: "+34 633 222 333",
      vehicle: {
        make: "Seat",
        model: "Ibiza",
        year: "2020",
        plate: "2222 BBB",
      },
      serviceType: "Mantenimiento 20.000km",
      status: "in-progress",
      time: "10:30",
      duration: "3h",
      estimatedCompletion: "13:30",
    },
    {
      id: "APP003",
      customerName: "Miguel Torres",
      phone: "+34 644 333 444",
      vehicle: {
        make: "Renault",
        model: "Clio",
        year: "2018",
        plate: "3333 CCC",
      },
      serviceType: "Reparación de Aire Acondicionado",
      status: "scheduled",
      time: "15:00",
      duration: "2.5h",
      estimatedCompletion: "17:30",
    },
    {
      id: "APP004",
      customerName: "Carmen Jiménez",
      phone: "+34 655 444 555",
      vehicle: {
        make: "Peugeot",
        model: "208",
        year: "2021",
        plate: "4444 DDD",
      },
      serviceType: "Cambio de Pastillas de Freno",
      status: "scheduled",
      time: "16:30",
      duration: "1.5h",
      estimatedCompletion: "18:00",
    },
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Calculate metrics
  const totalRequests = mockServiceRequests?.length;
  const pendingQuotes = mockServiceRequests?.filter((req) => req?.status === "pending")?.length;
  const todayRevenue = mockTodayAppointments?.filter((app) => app?.status === "completed")?.reduce((sum, app) => sum + 250, 0); // Mock revenue calculation

  // Navigation handlers
  const handleNewQuote = () => {
    navigate("/quote-details");
  };

  const handleViewQueue = () => {
    navigate("/vehicle-queue-management");
  };

  const handleManageCalendar = () => {
    navigate("/appointment-booking");
  };

  const handleViewRequestDetails = (request) => {
    navigate("/quote-details", { state: { requestId: request?.id } });
  };

  const handleUpdateRequestStatus = (request) => {
    navigate("/quote-details", { state: { requestId: request?.id, action: "update" } });
  };

  const handleViewAppointmentDetails = (appointment) => {
    navigate("/appointment-booking", { state: { appointmentId: appointment?.id } });
  };

  const handleRescheduleAppointment = (appointment) => {
    navigate("/appointment-booking", { state: { appointmentId: appointment?.id, action: "reschedule" } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-card border border-border rounded-lg shadow-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel de Control del Taller</h1>
              <p className="text-muted-foreground mt-1">Bienvenido de vuelta. Aquí tienes un resumen de las actividades de hoy.</p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-sm text-muted-foreground">
                {currentTime?.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {currentTime?.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard title="Ingresos de Hoy" value={`€${todayRevenue?.toLocaleString("es-ES")}`} subtitle="Servicios completados" icon="Euro" trend="up" trendValue="+12%" color="success" />

          <MetricsCard title="Cotizaciones Pendientes" value={pendingQuotes} subtitle="Requieren atención" icon="FileText" trend="neutral" trendValue="Sin cambios" color="warning" />

          <MetricsCard title="Citas de Hoy" value={mockTodayAppointments?.length} subtitle="Programadas" icon="Calendar" trend="up" trendValue="+2" color="primary" />

          <MetricsCard title="Utilización del Taller" value="63%" subtitle="5 de 8 bahías ocupadas" icon="BarChart3" trend="up" trendValue="+8%" color="accent" />
        </div>

        {/* Quick Actions */}
        <QuickActions onNewQuote={handleNewQuote} onViewQueue={handleViewQueue} onManageCalendar={handleManageCalendar} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Service Requests Table - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <ServiceRequestsTable requests={mockServiceRequests} onViewDetails={handleViewRequestDetails} onUpdateStatus={handleUpdateRequestStatus} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Appointments */}
            <TodayAppointments appointments={mockTodayAppointments} onReschedule={handleRescheduleAppointment} onViewDetails={handleViewAppointmentDetails} />

            {/* Workshop Capacity */}
            <WorkshopCapacity totalBays={8} occupiedBays={5} availableBays={3} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkshopDashboard;
