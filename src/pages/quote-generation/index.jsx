import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

import Header from "../../components/ui/Header";
import CustomerInfoCard from "./components/CustomerInfoCard";
import VehicleInfoCard from "./components/VehicleInfoCard";
import WorkBreakdownSection from "./components/WorkBreakdownSection";
import PricingCalculator from "./components/PricingCalculator";
import PartsLookup from "./components/PartsLookup";
import ImageAnnotation from "./components/ImageAnnotation";
import QuoteTemplates from "./components/QuoteTemplates";
import QuotePreview from "./components/QuotePreview";

const QuoteGeneration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("customer");
  const [quoteData, setQuoteData] = useState({
    customer: {
      name: "María García Fernández",
      email: "maria.garcia@email.com",
      phone: "+34 600 123 456",
      address: "Calle Mayor 123, 28001 Madrid",
    },
    vehicle: {
      make: "Toyota",
      model: "Corolla",
      year: 2019,
      licensePlate: "ABC-1234",
      mileage: 45000,
      vin: "JTDBR32E340123456",
      color: "Plata Metalizado",
    },
    services: [],
    parts: [],
    laborRates: {
      standard: 45.0,
      specialist: 65.0,
      diagnostic: 85.0,
    },
    discounts: {
      percentage: 0,
      amount: 0,
      reason: "",
    },
    taxes: {
      iva: 21,
    },
    validity: {
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()?.split("T")?.[0],
      terms: "Cotización válida por 30 días. Precios sujetos a disponibilidad de repuestos.",
    },
  });

  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1691994877641-36e673ad4236",
      alt: "Toyota Corolla plateado completo vista lateral",
      annotations: [],
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1663969084880-8633d399d74d",
      alt: "Interior del vehículo mostrando dashboard y volante",
      annotations: [],
    },
  ]);

  // Mock service templates
  const serviceTemplates = [
    {
      id: "cambio_aceite",
      name: "Cambio de Aceite y Filtros",
      description: "Cambio de aceite de motor, filtro de aceite, filtro de aire y revisión general",
      services: [
        { name: "Cambio de aceite de motor", hours: 0.5, rate: 45, description: "Aceite sintético 5W-30" },
        { name: "Cambio de filtro de aceite", hours: 0.25, rate: 45, description: "Filtro original" },
      ],

      parts: [
        { name: "Aceite de motor 5W-30", quantity: 4, unitPrice: 8.5, partNumber: "OIL-5W30-4L" },
        { name: "Filtro de aceite", quantity: 1, unitPrice: 12.9, partNumber: "FLT-OIL-TOY19" },
      ],

      estimatedTotal: 125.6,
    },
    {
      id: "revision_frenos",
      name: "Revisión Completa de Frenos",
      description: "Inspección, cambio de pastillas y discos si es necesario",
      services: [
        { name: "Inspección sistema de frenos", hours: 1, rate: 65, description: "Diagnóstico completo" },
        { name: "Cambio pastillas delanteras", hours: 1.5, rate: 45, description: "Instalación y ajuste" },
      ],

      parts: [
        { name: "Pastillas de freno delanteras", quantity: 1, unitPrice: 45.9, partNumber: "BRK-PAD-TOY19F" },
        { name: "Líquido de frenos DOT 4", quantity: 1, unitPrice: 8.9, partNumber: "BRK-FLD-DOT4" },
      ],

      estimatedTotal: 222.3,
    },
  ];

  // Mock parts database
  const partsDatabase = [
    { id: 1, name: "Pastillas de freno delanteras", partNumber: "BRK-PAD-TOY19F", price: 45.9, availability: "En stock", category: "Frenos" },
    { id: 2, name: "Filtro de aceite", partNumber: "FLT-OIL-TOY19", price: 12.9, availability: "En stock", category: "Motor" },
    { id: 3, name: "Aceite de motor 5W-30", partNumber: "OIL-5W30-4L", price: 8.5, availability: "En stock", category: "Lubricantes" },
    { id: 4, name: "Amortiguadores delanteros", partNumber: "SHK-FRT-TOY19", price: 89.9, availability: "Bajo pedido", category: "Suspensión" },
    { id: 5, name: "Bujías (juego 4 unidades)", partNumber: "SPK-SET-TOY19", price: 32.9, availability: "En stock", category: "Encendido" },
  ];

  useEffect(() => {
    // Load initial data based on URL params if available
    const serviceRequestId = searchParams?.get("request");
    if (serviceRequestId) {
      // Mock loading service request data
      console.log("Loading service request:", serviceRequestId);
    }
  }, [searchParams]);

  const addService = (service) => {
    const newService = {
      id: Date.now(),
      ...service,
      total: service?.hours * service?.rate,
    };
    setQuoteData((prev) => ({
      ...prev,
      services: [...prev?.services, newService],
    }));
  };

  const addPart = (part) => {
    const newPart = {
      id: Date.now(),
      ...part,
      total: part?.quantity * part?.unitPrice,
    };
    setQuoteData((prev) => ({
      ...prev,
      parts: [...prev?.parts, newPart],
    }));
  };

  const removeService = (serviceId) => {
    setQuoteData((prev) => ({
      ...prev,
      services: prev?.services?.filter((s) => s?.id !== serviceId),
    }));
  };

  const removePart = (partId) => {
    setQuoteData((prev) => ({
      ...prev,
      parts: prev?.parts?.filter((p) => p?.id !== partId),
    }));
  };

  const updateCustomerInfo = (customerData) => {
    setQuoteData((prev) => ({
      ...prev,
      customer: { ...prev?.customer, ...customerData },
    }));
  };

  const updateVehicleInfo = (vehicleData) => {
    setQuoteData((prev) => ({
      ...prev,
      vehicle: { ...prev?.vehicle, ...vehicleData },
    }));
  };

  const applyTemplate = (template) => {
    setQuoteData((prev) => ({
      ...prev,
      services: template?.services?.map((s) => ({
        id: Date.now() + Math.random(),
        ...s,
        total: s?.hours * s?.rate,
      })),
      parts: template?.parts?.map((p) => ({
        id: Date.now() + Math.random(),
        ...p,
        total: p?.quantity * p?.unitPrice,
      })),
    }));
  };

  const calculateTotals = () => {
    const servicesTotal = quoteData?.services?.reduce((sum, service) => sum + service?.total, 0) || 0;
    const partsTotal = quoteData?.parts?.reduce((sum, part) => sum + part?.total, 0) || 0;
    const subtotal = servicesTotal + partsTotal;
    const discountAmount = quoteData?.discounts?.percentage ? (subtotal * quoteData?.discounts?.percentage) / 100 : quoteData?.discounts?.amount || 0;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * (quoteData?.taxes?.iva || 21)) / 100;
    const total = afterDiscount + taxAmount;

    return {
      servicesTotal,
      partsTotal,
      subtotal,
      discountAmount,
      afterDiscount,
      taxAmount,
      total,
    };
  };

  const handleSaveQuote = () => {
    // Mock save functionality
    const quoteId = "QUO-" + Date.now()?.toString()?.slice(-6);
    console.log("Saving quote:", quoteId, quoteData);

    // Navigate to quote details
    navigate(`/quote-details?quote=${quoteId}`, {
      state: { quoteData, totals: calculateTotals() },
    });
  };

  const handleSendQuote = () => {
    // Mock send functionality
    console.log("Sending quote to customer:", quoteData?.customer?.email);
    alert(`Cotización enviada por correo a ${quoteData?.customer?.email}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Generación de Cotización</h1>
            <p className="text-muted-foreground">Crea cotizaciones detalladas con precios precisos y profesionales</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/workshop-dashboard")} iconName="ArrowLeft" iconPosition="left">
              Volver al Taller
            </Button>
            <Button variant="success" onClick={handleSaveQuote} iconName="Save" iconPosition="left">
              Guardar Cotización
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border border-border rounded-lg p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { id: "customer", label: "Cliente y Vehículo", icon: "User" },
              { id: "services", label: "Servicios y Trabajos", icon: "Wrench" },
              { id: "parts", label: "Repuestos y Precios", icon: "Package" },
              { id: "images", label: "Imágenes y Anotaciones", icon: "Image" },
              { id: "preview", label: "Vista Previa", icon: "Eye" },
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-smooth ${
                  activeTab === tab?.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "customer" && (
              <div className="space-y-6">
                <CustomerInfoCard customer={quoteData?.customer} onUpdate={updateCustomerInfo} />

                <VehicleInfoCard vehicle={quoteData?.vehicle} onUpdate={updateVehicleInfo} />
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-6">
                <WorkBreakdownSection services={quoteData?.services} laborRates={quoteData?.laborRates} onAddService={addService} onRemoveService={removeService} />

                <QuoteTemplates templates={serviceTemplates} onApplyTemplate={applyTemplate} />
              </div>
            )}

            {activeTab === "parts" && (
              <div className="space-y-6">
                <PartsLookup parts={partsDatabase} selectedParts={quoteData?.parts} onAddPart={addPart} onRemovePart={removePart} />
              </div>
            )}

            {activeTab === "images" && <ImageAnnotation images={images} onUpdateImages={setImages} />}

            {activeTab === "preview" && <QuotePreview quoteData={quoteData} totals={calculateTotals()} images={images} />}
          </div>

          {/* Sidebar - Pricing Calculator */}
          <div className="space-y-6">
            <PricingCalculator
              quoteData={quoteData}
              totals={calculateTotals()}
              onUpdateDiscounts={(discounts) => setQuoteData((prev) => ({ ...prev, discounts }))}
              onUpdateTaxes={(taxes) => setQuoteData((prev) => ({ ...prev, taxes }))}
              onUpdateValidity={(validity) => setQuoteData((prev) => ({ ...prev, validity }))}
            />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Button variant="primary" fullWidth onClick={handleSendQuote} iconName="Send" iconPosition="left">
                  Enviar por Email
                </Button>
                <Button variant="outline" fullWidth onClick={() => window.print()} iconName="Printer" iconPosition="left">
                  Imprimir Cotización
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      services: [],
                      parts: [],
                    }))
                  }
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Limpiar Servicios
                </Button>
              </div>
            </div>

            {/* Quote Info */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Información de Cotización</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="text-foreground">{new Date()?.toLocaleDateString("es-ES")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Válida hasta:</span>
                  <span className="text-foreground">{new Date(quoteData.validity?.expirationDate)?.toLocaleDateString("es-ES")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Servicios:</span>
                  <span className="text-foreground">{quoteData?.services?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Repuestos:</span>
                  <span className="text-foreground">{quoteData?.parts?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGeneration;
