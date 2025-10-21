import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import VehicleInfoCard from "./components/VehicleInfoCard";
import VehicleImageGallery from "./components/VehicleImageGallery";
import PricingBreakdown from "./components/PricingBreakdown";
import WorkshopInfo from "./components/WorkshopInfo";
import ServiceDescription from "./components/ServiceDescription";
import QuoteActions from "./components/QuoteActions";
import Icon from "../../components/AppIcon";

const QuoteDetails = () => {
  const location = useLocation();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock quote data
  const mockQuote = {
    id: "QT-2024-001",
    status: "quoted",
    createdDate: "15/10/2024",
    expiryDate: "2024-10-28T23:59:59",
    vehicle: {
      licensePlate: "1234 ABC",
      make: "Toyota",
      model: "Corolla",
      year: 2019,
      mileage: 85000,
      serviceType: "Reparación de Motor",
      requestDate: "15/10/2024",
      issueDescription: `El vehículo presenta ruidos extraños en el motor, especialmente al acelerar. También se observa una ligera pérdida de potencia en subidas pronunciadas.\n\nAdemás, hay una pequeña fuga de aceite que se nota en el suelo del garaje por las mañanas. El problema comenzó hace aproximadamente una semana y ha ido empeorando gradualmente.`,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1715567446518-1626a2a2ec79",
        alt: "Vista frontal del motor Toyota Corolla 2019 mostrando compartimento del motor abierto",
      },
      {
        url: "https://images.unsplash.com/photo-1690794246864-ec055a039f2c",
        alt: "Detalle de la fuga de aceite en el suelo del garaje bajo el vehículo",
      },
      {
        url: "https://images.unsplash.com/photo-1731919224668-41d525f2512d",
        alt: "Vista lateral del Toyota Corolla blanco estacionado en taller mecánico",
      },
      {
        url: "https://images.unsplash.com/photo-1702196665517-9d3670421443",
        alt: "Primer plano del motor mostrando área donde se detecta el ruido anormal",
      },
    ],

    pricing: {
      labor: 450.0,
      parts: 320.0,
      additionalServices: [
        { name: "Cambio de aceite y filtro", price: 65.0 },
        { name: "Revisión general del motor", price: 85.0 },
      ],

      subtotal: 920.0,
      taxRate: 21,
      tax: 193.2,
      total: 1113.2,
    },
    workshop: {
      name: "AutoTaller García",
      logo: "https://images.unsplash.com/photo-1669117804907-e2503dc20d33",
      logoAlt: "Logo del taller AutoTaller García con herramientas mecánicas cruzadas",
      rating: 4.8,
      reviewCount: 127,
      address: "Calle Mecánicos, 15, 28001 Madrid",
      phone: "+34 91 123 45 67",
      email: "info@autotallergarcia.es",
      estimatedTime: "3-4 días laborables",
      availability: "Disponible esta semana",
      certifications: "ISO 9001, Certificado Oficial Toyota",
      specialties: ["Toyota", "Honda", "Nissan", "Reparación de Motores", "Diagnóstico Electrónico"],
    },
    service: {
      mainDescription: `Después de realizar un diagnóstico completo del vehículo, hemos identificado que el ruido del motor se debe a un desgaste en los cojinetes del cigüeñal, lo que también está causando la fuga de aceite.\n\nEl trabajo incluye el desmontaje parcial del motor, reemplazo de los cojinetes dañados, revisión completa del sistema de lubricación y pruebas de funcionamiento para garantizar la correcta reparación.`,
      workItems: [
        {
          title: "Diagnóstico completo del motor",
          description: "Análisis detallado con equipos de diagnóstico para confirmar el origen del problema",
          duration: "2 horas",
        },
        {
          title: "Desmontaje parcial del motor",
          description: "Desmontaje de componentes necesarios para acceder a los cojinetes del cigüeñal",
          duration: "4 horas",
        },
        {
          title: "Reemplazo de cojinetes del cigüeñal",
          description: "Instalación de cojinetes nuevos originales Toyota con especificaciones exactas",
          duration: "6 horas",
        },
        {
          title: "Revisión del sistema de lubricación",
          description: "Limpieza completa del sistema, cambio de aceite y filtros",
          duration: "2 horas",
        },
        {
          title: "Montaje y pruebas finales",
          description: "Ensamblaje del motor y pruebas de funcionamiento en carretera",
          duration: "3 horas",
        },
      ],

      recommendations: [
        {
          text: "Recomendamos cambiar también la bomba de aceite para prevenir futuros problemas",
          priority: "medium",
        },
        {
          text: "Es aconsejable revisar el sistema de refrigeración para descartar sobrecalentamientos",
          priority: "low",
        },
        {
          text: "Realizar mantenimiento preventivo cada 10.000 km para evitar desgastes prematuros",
          priority: "low",
        },
      ],
    },
    workshopId: "WS-001",
  };

  useEffect(() => {
    // Simulate loading quote data
    const loadQuote = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuote(mockQuote);
      setLoading(false);
    };

    loadQuote();
  }, []);

  const handleAcceptQuote = async (quoteId) => {
    console.log("Accepting quote:", quoteId);
    // Mock API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleRejectQuote = async (quoteId, reason) => {
    console.log("Rejecting quote:", quoteId, "Reason:", reason);
    // Mock API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleRequestModification = async (quoteId, request) => {
    console.log("Requesting modification for quote:", quoteId, "Request:", request);
    // Mock API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleContactWorkshop = (workshopId) => {
    console.log("Contacting workshop:", workshopId);
    // Mock contact action - could open phone dialer or email client
    window.open(`tel:${quote?.workshop?.phone}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Cargando cotización...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="AlertTriangle" size={48} color="var(--color-error)" className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Cotización no encontrada</h2>
            <p className="text-muted-foreground mb-4">No se pudo cargar la información de la cotización solicitada.</p>
            <button onClick={() => (window.location.href = "/customer-dashboard")} className="text-primary hover:underline">
              Volver al panel principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <button onClick={() => (window.location.href = "/customer-dashboard")} className="hover:text-primary transition-smooth">
              Panel Principal
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Cotización {quote?.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Detalles de Cotización</h1>
          <p className="text-muted-foreground mt-2">Revisa los detalles de tu cotización y toma una decisión informada</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <VehicleInfoCard vehicle={quote?.vehicle} />
            <VehicleImageGallery images={quote?.images} />
            <ServiceDescription service={quote?.service} />
            <WorkshopInfo workshop={quote?.workshop} />
          </div>

          {/* Right Column - Pricing & Actions */}
          <div className="lg:col-span-1 space-y-8">
            <PricingBreakdown pricing={quote?.pricing} />
            <QuoteActions quote={quote} onAccept={handleAcceptQuote} onReject={handleRejectQuote} onRequestModification={handleRequestModification} onContactWorkshop={handleContactWorkshop} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteDetails;
