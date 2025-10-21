import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

const BookingForm = ({ selectedSlot, selectedDate, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    dropOffInstructions: "",
    specialRequirements: "",
    pickupArrangement: "self",
    emergencyContact: "",
    emergencyPhone: "",
    agreedToTerms: false,
    confirmationMethod: "email",
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.contactPerson?.trim()) {
      newErrors.contactPerson = "El nombre de contacto es obligatorio";
    }

    if (!formData?.contactPhone?.trim()) {
      newErrors.contactPhone = "El teléfono de contacto es obligatorio";
    } else if (!/^\+?[\d\s-()]{9,}$/?.test(formData?.contactPhone?.trim())) {
      newErrors.contactPhone = "Formato de teléfono inválido";
    }

    if (!formData?.contactEmail?.trim()) {
      newErrors.contactEmail = "El email de contacto es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.contactEmail?.trim())) {
      newErrors.contactEmail = "Formato de email inválido";
    }

    if (!formData?.agreedToTerms) {
      newErrors.agreedToTerms = "Debe aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    const bookingData = {
      ...formData,
      selectedSlot,
      selectedDate,
      submittedAt: new Date()?.toISOString(),
    };

    onSubmit(bookingData);
  };

  if (!selectedSlot || !selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">Formulario de Reserva</h3>
          <p className="text-muted-foreground">Selecciona una fecha y horario para completar la reserva</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Completar Reserva</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Información de Contacto
          </h4>

          <div className="space-y-4">
            <Input
              label="Persona de Contacto"
              type="text"
              placeholder="Nombre completo"
              value={formData?.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e?.target?.value)}
              error={errors?.contactPerson}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Teléfono de Contacto"
                type="tel"
                placeholder="+34 600 000 000"
                value={formData?.contactPhone}
                onChange={(e) => handleInputChange("contactPhone", e?.target?.value)}
                error={errors?.contactPhone}
                required
              />

              <Input
                label="Email de Contacto"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData?.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e?.target?.value)}
                error={errors?.contactEmail}
                required
              />
            </div>
          </div>
        </div>

        {/* Service Preferences */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Preferencias del Servicio
          </h4>

          <div className="space-y-4">
            <Input
              label="Instrucciones de Entrega"
              type="text"
              placeholder="Ej: Dejar las llaves en recepción, vehículo en parking exterior..."
              value={formData?.dropOffInstructions}
              onChange={(e) => handleInputChange("dropOffInstructions", e?.target?.value)}
              description="Instrucciones especiales para la entrega del vehículo"
            />

            <Input
              label="Requisitos Especiales"
              type="text"
              placeholder="Ej: Necesito el vehículo antes de las 5 PM, coche de cortesía..."
              value={formData?.specialRequirements}
              onChange={(e) => handleInputChange("specialRequirements", e?.target?.value)}
              description="Cualquier requisito especial para el servicio"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Método de Recogida</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="pickupArrangement"
                    value="self"
                    checked={formData?.pickupArrangement === "self"}
                    onChange={(e) => handleInputChange("pickupArrangement", e?.target?.value)}
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">Recogeré el vehículo personalmente</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="pickupArrangement"
                    value="authorized"
                    checked={formData?.pickupArrangement === "authorized"}
                    onChange={(e) => handleInputChange("pickupArrangement", e?.target?.value)}
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">Persona autorizada recogerá el vehículo</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Phone" size={16} className="mr-2" />
            Contacto de Emergencia (Opcional)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre de Contacto de Emergencia"
              type="text"
              placeholder="Nombre completo"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e?.target?.value)}
            />

            <Input label="Teléfono de Emergencia" type="tel" placeholder="+34 600 000 000" value={formData?.emergencyPhone} onChange={(e) => handleInputChange("emergencyPhone", e?.target?.value)} />
          </div>
        </div>

        {/* Confirmation Preferences */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Bell" size={16} className="mr-2" />
            Preferencias de Confirmación
          </h4>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Método de Confirmación</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="confirmationMethod"
                  value="email"
                  checked={formData?.confirmationMethod === "email"}
                  onChange={(e) => handleInputChange("confirmationMethod", e?.target?.value)}
                  className="text-primary"
                />
                <span className="text-sm text-foreground">Confirmación por email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="confirmationMethod"
                  value="sms"
                  checked={formData?.confirmationMethod === "sms"}
                  onChange={(e) => handleInputChange("confirmationMethod", e?.target?.value)}
                  className="text-primary"
                />
                <span className="text-sm text-foreground">Confirmación por SMS</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="confirmationMethod"
                  value="both"
                  checked={formData?.confirmationMethod === "both"}
                  onChange={(e) => handleInputChange("confirmationMethod", e?.target?.value)}
                  className="text-primary"
                />
                <span className="text-sm text-foreground">Ambos métodos</span>
              </label>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="pt-4 border-t border-border">
          <Checkbox
            label="Acepto los términos y condiciones del servicio"
            checked={formData?.agreedToTerms}
            onChange={(e) => handleInputChange("agreedToTerms", e?.target?.checked)}
            error={errors?.agreedToTerms}
            required
          />

          <p className="mt-2 text-xs text-muted-foreground">
            Al confirmar la cita, acepta nuestros términos de servicio y política de privacidad. Recibirá una confirmación por el método seleccionado.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" variant="default" loading={isLoading} fullWidth iconName="Calendar" iconPosition="left" className="h-12">
            {isLoading ? "Procesando Reserva..." : "Confirmar Cita"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
