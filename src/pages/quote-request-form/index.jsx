import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import QuickActionButton from "../../components/ui/QuickActionButton";

// Import form sections
import VehicleInfoSection from "./components/VehicleInfoSection";
import ImageUploadSection from "./components/ImageUploadSection";
import ServiceDescriptionSection from "./components/ServiceDescriptionSection";
import ContactPreferencesSection from "./components/ContactPreferencesSection";
import FormSummary from "./components/FormSummary";

const QuoteRequestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Vehicle Info
    licensePlate: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",

    // Service Description
    serviceTypes: [],
    description: "",
    urgency: "",

    // Contact Info
    fullName: "",
    phone: "",
    email: "",
    address: "",
    contactMethods: [],
    availability: {},
    additionalNotes: "",
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    if (errors?.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Vehicle Info
        if (!formData?.licensePlate?.trim()) {
          newErrors.licensePlate = "La matrícula es obligatoria";
        } else if (!/^[0-9]{4}\s?[A-Z]{3}$/i?.test(formData?.licensePlate?.trim())) {
          newErrors.licensePlate = "Formato de matrícula inválido (ej: 1234 ABC)";
        }

        if (!formData?.brand) {
          newErrors.brand = "La marca es obligatoria";
        }

        if (!formData?.model?.trim()) {
          newErrors.model = "El modelo es obligatorio";
        }

        if (!formData?.year) {
          newErrors.year = "El año es obligatorio";
        }

        if (!formData?.mileage?.trim()) {
          newErrors.mileage = "El kilometraje es obligatorio";
        } else if (isNaN(formData?.mileage) || parseInt(formData?.mileage) < 0) {
          newErrors.mileage = "El kilometraje debe ser un número válido";
        }
        break;

      case 2: // Images (optional but recommended)
        if (images?.length === 0) {
          newErrors.images = "Se recomienda subir al menos una imagen del vehículo";
        }
        break;

      case 3: // Service Description
        if (!formData?.serviceTypes || formData?.serviceTypes?.length === 0) {
          newErrors.serviceTypes = "Selecciona al menos un tipo de servicio";
        }

        if (!formData?.description?.trim()) {
          newErrors.description = "La descripción del problema es obligatoria";
        } else if (formData?.description?.trim()?.length < 50) {
          newErrors.description = "La descripción debe tener al menos 50 caracteres";
        }

        if (!formData?.urgency) {
          newErrors.urgency = "Selecciona el nivel de urgencia";
        }
        break;

      case 4: // Contact Info
        if (!formData?.fullName?.trim()) {
          newErrors.fullName = "El nombre completo es obligatorio";
        }

        if (!formData?.phone?.trim()) {
          newErrors.phone = "El teléfono es obligatorio";
        } else if (!/^(\+34|0034|34)?[6789]\d{8}$/?.test(formData?.phone?.replace(/\s/g, ""))) {
          newErrors.phone = "Formato de teléfono inválido";
        }

        if (!formData?.email?.trim()) {
          newErrors.email = "El correo electrónico es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = "Formato de email inválido";
        }

        if (!formData?.contactMethods || formData?.contactMethods?.length === 0) {
          newErrors.contactMethods = "Selecciona al menos un método de contacto";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful submission
      const submissionData = {
        id: `QR-${Date.now()}`,
        timestamp: new Date()?.toISOString(),
        status: "pending",
        formData,
        images: images?.map((img) => ({
          id: img?.id,
          name: img?.name,
          size: img?.size,
          url: img?.url,
        })),
      };

      console.log("Quote request submitted:", submissionData);

      // Navigate to customer dashboard with success message
      navigate("/customer-dashboard", {
        state: {
          message: "Solicitud de cotización enviada correctamente",
          type: "success",
          requestId: submissionData?.id,
        },
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrors({ submit: "Error al enviar la solicitud. Por favor, inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = (step) => {
    const titles = {
      1: "Información del Vehículo",
      2: "Imágenes del Vehículo",
      3: "Descripción del Servicio",
      4: "Información de Contacto",
    };
    return titles?.[step];
  };

  const renderStepContent = () => {
    if (showSummary) {
      return <FormSummary formData={formData} images={images} />;
    }

    switch (currentStep) {
      case 1:
        return <VehicleInfoSection formData={formData} onInputChange={handleInputChange} errors={errors} />;
      case 2:
        return <ImageUploadSection images={images} onImagesChange={handleImagesChange} errors={errors} />;
      case 3:
        return <ServiceDescriptionSection formData={formData} onInputChange={handleInputChange} errors={errors} />;
      case 4:
        return <ContactPreferencesSection formData={formData} onInputChange={handleInputChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Solicitar Cotización</h1>
          <p className="text-muted-foreground">Completa el formulario para recibir una cotización personalizada para tu vehículo</p>
        </div>

        {/* Progress Bar */}
        {!showSummary && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4]?.map((step) => (
                <div key={step} className={`flex items-center ${step < 4 ? "flex-1" : ""}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                      step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? <Icon name="Check" size={16} /> : step}
                  </div>

                  {step < 4 && <div className={`flex-1 h-1 mx-4 transition-smooth ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">
                Paso {currentStep} de {totalSteps}: {getStepTitle(currentStep)}
              </h2>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 && !showSummary} iconName="ChevronLeft" iconPosition="left">
            {showSummary ? "Editar Información" : "Anterior"}
          </Button>

          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/customer-dashboard")}>
              Cancelar
            </Button>

            {showSummary ? (
              <Button variant="default" onClick={handleSubmit} loading={isSubmitting} iconName="Send" iconPosition="left" className="min-w-[140px]">
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            ) : (
              <Button variant="default" onClick={handleNext} iconName={currentStep === totalSteps ? "Eye" : "ChevronRight"} iconPosition="right">
                {currentStep === totalSteps ? "Revisar" : "Siguiente"}
              </Button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {errors?.submit && (
          <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} className="text-error mr-2" />
              <p className="text-error">{errors?.submit}</p>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-start">
            <Icon name="HelpCircle" size={20} className="text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-2">¿Necesitas Ayuda?</h4>
              <p className="text-sm text-muted-foreground mb-2">Si tienes problemas completando el formulario o necesitas asistencia, no dudes en contactarnos:</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center text-muted-foreground">
                  <Icon name="Phone" size={14} className="mr-1" />
                  +34 900 123 456
                </span>
                <span className="flex items-center text-muted-foreground">
                  <Icon name="Mail" size={14} className="mr-1" />
                  ayuda@autoshoppro.es
                </span>
                <span className="flex items-center text-muted-foreground">
                  <Icon name="MessageCircle" size={14} className="mr-1" />
                  WhatsApp: +34 600 789 012
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuickActionButton role="customer" onActionClick={() => {}} />
    </div>
  );
};

export default QuoteRequestForm;
