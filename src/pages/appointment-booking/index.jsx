import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import CalendarView from "./components/CalendarView";
import TimeSlotSelector from "./components/TimeSlotSelector";
import AppointmentDetails from "./components/AppointmentDetails";
import BookingForm from "./components/BookingForm";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock data for available time slots
  const availableSlots = [
    {
      id: "slot-1",
      date: "2025-10-22",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
      serviceType: "Diagnóstico General",
      availableSpots: 3,
      status: "available",
      notes: "Incluye revisión completa del motor",
    },
    {
      id: "slot-2",
      date: "2025-10-22",
      startTime: "14:00",
      endTime: "16:30",
      duration: 150,
      serviceType: "Reparación de Frenos",
      availableSpots: 1,
      status: "limited",
      notes: "Última plaza disponible",
    },
    {
      id: "slot-3",
      date: "2025-10-23",
      startTime: "08:30",
      endTime: "10:00",
      duration: 90,
      serviceType: "Cambio de Aceite",
      availableSpots: 2,
      status: "available",
    },
    {
      id: "slot-4",
      date: "2025-10-23",
      startTime: "11:00",
      endTime: "13:00",
      duration: 120,
      serviceType: "Revisión Eléctrica",
      availableSpots: 0,
      status: "busy",
    },
    {
      id: "slot-5",
      date: "2025-10-24",
      startTime: "10:00",
      endTime: "12:30",
      duration: 150,
      serviceType: "Reparación de Transmisión",
      availableSpots: 2,
      status: "available",
    },
    {
      id: "slot-6",
      date: "2025-10-25",
      startTime: "09:00",
      endTime: "11:30",
      duration: 150,
      serviceType: "Diagnóstico General",
      availableSpots: 1,
      status: "limited",
    },
  ];

  // Mock vehicle information
  const vehicleInfo = {
    licensePlate: "ABC-1234",
    make: "Toyota",
    model: "Corolla",
    year: 2019,
    mileage: 85000,
    color: "Blanco",
    vin: "JT2BF28K123456789",
  };

  // Mock quote information
  const quoteInfo = {
    id: "quote-001",
    totalAmount: "450.00",
    description: "Reparación del sistema de frenos delanteros incluyendo pastillas, discos y líquido de frenos. Revisión completa del sistema de frenado.",
    estimatedHours: 3,
    partsIncluded: ["Pastillas de freno", "Discos de freno", "Líquido de frenos"],
    laborCost: "180.00",
    partsCost: "270.00",
  };

  // Mock workshop information
  const workshopInfo = {
    name: "Taller AutoExperto Madrid",
    address: "Calle de la Mecánica, 45, 28001 Madrid, España",
    phone: "+34 91 123 4567",
    email: "info@autoexperto.es",
    rating: 4.8,
    coordinates: {
      lat: 40.4168,
      lng: -3.7038,
    },
    businessHours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Cerrado",
    },
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setCurrentStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleBookingSubmit = async (bookingData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful booking
      const bookingConfirmation = {
        bookingId: "BOOK-" + Date.now(),
        confirmationNumber: "CONF-" + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase(),
        ...bookingData,
      };

      // Store booking confirmation in localStorage for demo
      localStorage.setItem("lastBooking", JSON.stringify(bookingConfirmation));

      // Navigate to customer dashboard with success message
      navigate("/customer-dashboard", {
        state: {
          message: "Cita reservada exitosamente",
          type: "success",
          bookingId: bookingConfirmation?.bookingId,
        },
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error al crear la reserva. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, title: "Seleccionar Fecha", icon: "Calendar" },
    { number: 2, title: "Elegir Horario", icon: "Clock" },
    { number: 3, title: "Confirmar Cita", icon: "CheckCircle" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reservar Cita</h1>
              <p className="text-muted-foreground mt-2">Programa tu cita de servicio automotriz en horarios disponibles</p>
            </div>

            <Button variant="outline" onClick={() => navigate("/customer-dashboard")} iconName="ArrowLeft" iconPosition="left">
              Volver al Panel
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-6">
            {steps?.map((step, index) => (
              <React.Fragment key={step?.number}>
                <div className={`flex items-center space-x-2 ${currentStep >= step?.number ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step?.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                  `}
                  >
                    {currentStep > step?.number ? <Icon name="Check" size={16} /> : step?.number}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step?.title}</span>
                </div>

                {index < steps?.length - 1 && <div className={`h-px flex-1 ${currentStep > step?.number ? "bg-primary" : "bg-border"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Reset Button */}
          {(selectedDate || selectedSlot) && (
            <Button variant="ghost" onClick={resetSelection} iconName="RotateCcw" iconPosition="left" className="mb-4">
              Reiniciar Selección
            </Button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar and Time Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <CalendarView selectedDate={selectedDate} onDateSelect={handleDateSelect} availableSlots={availableSlots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect} />

            {/* Time Slot Selector */}
            <TimeSlotSelector selectedDate={selectedDate} availableSlots={availableSlots} selectedSlot={selectedSlot} onSlotSelect={handleSlotSelect} />

            {/* Booking Form (Mobile) */}
            <div className="lg:hidden">
              <BookingForm selectedSlot={selectedSlot} selectedDate={selectedDate} onSubmit={handleBookingSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Column - Appointment Details and Booking Form */}
          <div className="space-y-6">
            {/* Appointment Details */}
            <AppointmentDetails selectedSlot={selectedSlot} selectedDate={selectedDate} vehicleInfo={vehicleInfo} quoteInfo={quoteInfo} workshopInfo={workshopInfo} />

            {/* Booking Form (Desktop) */}
            <div className="hidden lg:block">
              <BookingForm selectedSlot={selectedSlot} selectedDate={selectedDate} onSubmit={handleBookingSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="HelpCircle" size={20} className="mr-2" />
            ¿Necesitas Ayuda?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <Icon name="Phone" size={16} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Llamar al Taller</div>
                <div className="text-muted-foreground">{workshopInfo?.phone}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Mail" size={16} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Enviar Email</div>
                <div className="text-muted-foreground">{workshopInfo?.email}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="MessageCircle" size={16} className="text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Chat en Vivo</div>
                <div className="text-muted-foreground">Disponible 9 AM - 6 PM</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;
