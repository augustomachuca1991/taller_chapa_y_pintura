import React from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";

import { Checkbox } from "../../../components/ui/Checkbox";

const ContactPreferencesSection = ({ formData, onInputChange, errors = {} }) => {
  const timeSlots = [
    { value: "09:00-12:00", label: "09:00 - 12:00 (Mañana)" },
    { value: "12:00-15:00", label: "12:00 - 15:00 (Mediodía)" },
    { value: "15:00-18:00", label: "15:00 - 18:00 (Tarde)" },
    { value: "18:00-21:00", label: "18:00 - 21:00 (Noche)" },
  ];

  const contactMethods = [
    { id: "phone", label: "Teléfono", icon: "Phone" },
    { id: "email", label: "Correo Electrónico", icon: "Mail" },
    { id: "whatsapp", label: "WhatsApp", icon: "MessageCircle" },
    { id: "sms", label: "SMS", icon: "MessageSquare" },
  ];

  const handleContactMethodChange = (methodId, checked) => {
    const currentMethods = formData?.contactMethods || [];
    let updatedMethods;

    if (checked) {
      updatedMethods = [...currentMethods, methodId];
    } else {
      updatedMethods = currentMethods?.filter((id) => id !== methodId);
    }

    onInputChange("contactMethods", updatedMethods);
  };

  const handleAvailabilityChange = (day, timeSlot, checked) => {
    const currentAvailability = formData?.availability || {};
    const dayAvailability = currentAvailability?.[day] || [];

    let updatedDayAvailability;
    if (checked) {
      updatedDayAvailability = [...dayAvailability, timeSlot];
    } else {
      updatedDayAvailability = dayAvailability?.filter((slot) => slot !== timeSlot);
    }

    onInputChange("availability", {
      ...currentAvailability,
      [day]: updatedDayAvailability,
    });
  };

  const weekDays = [
    { id: "lunes", label: "Lunes" },
    { id: "martes", label: "Martes" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
    { id: "sabado", label: "Sábado" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-foreground font-bold text-sm">4</span>
        </div>
        Información de Contacto
      </h2>
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          label="Nombre Completo"
          type="text"
          placeholder="Tu nombre completo"
          value={formData?.fullName || ""}
          onChange={(e) => onInputChange("fullName", e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input label="Teléfono" type="tel" placeholder="Ej: +34 600 123 456" value={formData?.phone || ""} onChange={(e) => onInputChange("phone", e?.target?.value)} error={errors?.phone} required />

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@email.com"
          value={formData?.email || ""}
          onChange={(e) => onInputChange("email", e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Dirección (Opcional)"
          type="text"
          placeholder="Dirección para recogida/entrega"
          value={formData?.address || ""}
          onChange={(e) => onInputChange("address", e?.target?.value)}
          error={errors?.address}
        />
      </div>
      {/* Contact Methods */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Métodos de Contacto Preferidos</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contactMethods?.map((method) => (
            <Checkbox
              key={method?.id}
              label={
                <div className="flex items-center">
                  <Icon name={method?.icon} size={16} className="mr-2 text-primary" />
                  {method?.label}
                </div>
              }
              checked={formData?.contactMethods?.includes(method?.id) || false}
              onChange={(e) => handleContactMethodChange(method?.id, e?.target?.checked)}
            />
          ))}
        </div>

        {errors?.contactMethods && <p className="mt-2 text-sm text-error">{errors?.contactMethods}</p>}
      </div>
      {/* Availability Schedule */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Disponibilidad para Contacto</h3>

        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-medium text-foreground border-b border-border">Día</th>
                {timeSlots?.map((slot) => (
                  <th key={slot?.value} className="text-center p-3 font-medium text-foreground border-b border-border min-w-[120px]">
                    {slot?.label?.split(" ")?.[0]} - {slot?.label?.split(" ")?.[2]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDays?.map((day) => (
                <tr key={day?.id} className="border-b border-border last:border-b-0">
                  <td className="p-3 font-medium text-foreground">{day?.label}</td>
                  {timeSlots?.map((slot) => (
                    <td key={slot?.value} className="p-3 text-center">
                      <Checkbox checked={formData?.availability?.[day?.id]?.includes(slot?.value) || false} onChange={(e) => handleAvailabilityChange(day?.id, slot?.value, e?.target?.checked)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">Selecciona los horarios en los que prefieres que te contactemos</p>
      </div>
      {/* Additional Notes */}
      <div>
        <Input
          label="Notas Adicionales (Opcional)"
          type="text"
          placeholder="Cualquier información adicional que consideres importante"
          value={formData?.additionalNotes || ""}
          onChange={(e) => onInputChange("additionalNotes", e?.target?.value)}
          error={errors?.additionalNotes}
          description="Ej: Mejor horario para llamar, ubicación específica, etc."
        />
      </div>
      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start">
          <Icon name="Shield" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-primary mb-2">Protección de Datos</h4>
            <p className="text-sm text-primary/80">
              Tus datos personales serán utilizados únicamente para procesar tu solicitud de cotización y contactarte sobre el servicio. No compartimos tu información con terceros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPreferencesSection;
