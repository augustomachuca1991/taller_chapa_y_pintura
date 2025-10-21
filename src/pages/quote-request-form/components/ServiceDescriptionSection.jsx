import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

import { Checkbox } from "../../../components/ui/Checkbox";

const ServiceDescriptionSection = ({ formData, onInputChange, errors = {} }) => {
  const [characterCount, setCharacterCount] = useState(formData?.description?.length || 0);
  const maxCharacters = 1000;
  const minCharacters = 50;

  const serviceTypes = [
    { id: "motor", label: "Motor y Mecánica", icon: "Cog" },
    { id: "frenos", label: "Sistema de Frenos", icon: "Disc" },
    { id: "transmision", label: "Transmisión", icon: "Settings" },
    { id: "electrico", label: "Sistema Eléctrico", icon: "Zap" },
    { id: "suspension", label: "Suspensión", icon: "Move" },
    { id: "neumaticos", label: "Neumáticos y Llantas", icon: "Circle" },
    { id: "carroceria", label: "Carrocería y Pintura", icon: "Palette" },
    { id: "climatizacion", label: "Aire Acondicionado", icon: "Wind" },
    { id: "mantenimiento", label: "Mantenimiento General", icon: "Wrench" },
    { id: "otros", label: "Otros Servicios", icon: "MoreHorizontal" },
  ];

  const suggestedPrompts = [
    "El vehículo hace un ruido extraño cuando...",
    "He notado que el coche vibra al...",
    "El problema comenzó hace aproximadamente...",
    "Los síntomas incluyen...",
    "El vehículo pierde potencia cuando...",
    "Se enciende una luz de advertencia en...",
  ];

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    setCharacterCount(value?.length);
    onInputChange("description", value);
  };

  const handleServiceTypeChange = (serviceId, checked) => {
    const currentServices = formData?.serviceTypes || [];
    let updatedServices;

    if (checked) {
      updatedServices = [...currentServices, serviceId];
    } else {
      updatedServices = currentServices?.filter((id) => id !== serviceId);
    }

    onInputChange("serviceTypes", updatedServices);
  };

  const insertPrompt = (prompt) => {
    const currentDescription = formData?.description || "";
    const newDescription = currentDescription + (currentDescription ? "\n\n" : "") + prompt;
    onInputChange("description", newDescription);
    setCharacterCount(newDescription?.length);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-foreground font-bold text-sm">3</span>
        </div>
        Descripción del Servicio
      </h2>
      {/* Service Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Tipo de Servicio Requerido</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceTypes?.map((service) => (
            <Checkbox
              key={service?.id}
              label={
                <div className="flex items-center">
                  <Icon name={service?.icon} size={16} className="mr-2 text-primary" />
                  {service?.label}
                </div>
              }
              checked={formData?.serviceTypes?.includes(service?.id) || false}
              onChange={(e) => handleServiceTypeChange(service?.id, e?.target?.checked)}
            />
          ))}
        </div>

        {errors?.serviceTypes && <p className="mt-2 text-sm text-error">{errors?.serviceTypes}</p>}
      </div>
      {/* Description */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">Descripción Detallada del Problema *</label>
          <span className={`text-xs ${characterCount < minCharacters ? "text-warning" : characterCount > maxCharacters ? "text-error" : "text-muted-foreground"}`}>
            {characterCount}/{maxCharacters}
          </span>
        </div>

        <textarea
          value={formData?.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Describe detalladamente el problema que presenta tu vehículo. Incluye síntomas, cuándo ocurre, frecuencia, etc."
          className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          maxLength={maxCharacters}
          required
        />

        {errors?.description && <p className="mt-2 text-sm text-error">{errors?.description}</p>}

        {characterCount < minCharacters && <p className="mt-2 text-sm text-warning">Mínimo {minCharacters} caracteres para una descripción completa</p>}
      </div>
      {/* Suggested Prompts */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Frases de Ayuda
        </h4>

        <div className="flex flex-wrap gap-2">
          {suggestedPrompts?.map((prompt, index) => (
            <button
              key={index}
              onClick={() => insertPrompt(prompt)}
              className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-smooth border border-border"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      {/* Urgency Level */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Nivel de Urgencia</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "low", label: "Baja", description: "No es urgente, puedo esperar", color: "success" },
            { value: "medium", label: "Media", description: "Prefiero solucionarlo pronto", color: "warning" },
            { value: "high", label: "Alta", description: "Necesito reparación urgente", color: "error" },
          ]?.map((urgency) => (
            <label
              key={urgency?.value}
              className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-smooth ${
                formData?.urgency === urgency?.value ? `border-${urgency?.color} bg-${urgency?.color}/5` : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={urgency?.value}
                checked={formData?.urgency === urgency?.value}
                onChange={(e) => onInputChange("urgency", e?.target?.value)}
                className="sr-only"
              />

              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${urgency?.color === "success" ? "bg-success" : urgency?.color === "warning" ? "bg-warning" : "bg-error"}`} />
                <span className="font-medium text-foreground">{urgency?.label}</span>
              </div>

              <span className="text-sm text-muted-foreground">{urgency?.description}</span>
            </label>
          ))}
        </div>

        {errors?.urgency && <p className="mt-2 text-sm text-error">{errors?.urgency}</p>}
      </div>
    </div>
  );
};

export default ServiceDescriptionSection;
