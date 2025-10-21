import React from "react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const VehicleInfoSection = ({ formData, onInputChange, errors = {} }) => {
  const vehicleBrands = [
    { value: "seat", label: "SEAT" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "audi", label: "Audi" },
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes-Benz" },
    { value: "ford", label: "Ford" },
    { value: "opel", label: "Opel" },
    { value: "renault", label: "Renault" },
    { value: "peugeot", label: "Peugeot" },
    { value: "citroen", label: "Citroën" },
    { value: "toyota", label: "Toyota" },
    { value: "nissan", label: "Nissan" },
    { value: "hyundai", label: "Hyundai" },
    { value: "kia", label: "Kia" },
    { value: "fiat", label: "Fiat" },
  ];

  const currentYear = new Date()?.getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1990; year--) {
    yearOptions?.push({ value: year?.toString(), label: year?.toString() });
  }

  const handleInputChange = (field, value) => {
    onInputChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-foreground font-bold text-sm">1</span>
        </div>
        Información del Vehículo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Matrícula del Vehículo"
            type="text"
            placeholder="Ej: 1234 ABC"
            value={formData?.licensePlate || ""}
            onChange={(e) => handleInputChange("licensePlate", e?.target?.value)}
            error={errors?.licensePlate}
            required
            className="uppercase"
          />
        </div>

        <Select
          label="Marca"
          placeholder="Selecciona la marca"
          options={vehicleBrands}
          value={formData?.brand || ""}
          onChange={(value) => handleInputChange("brand", value)}
          error={errors?.brand}
          required
          searchable
        />

        <Input
          label="Modelo"
          type="text"
          placeholder="Ej: Golf, Ibiza, A4"
          value={formData?.model || ""}
          onChange={(e) => handleInputChange("model", e?.target?.value)}
          error={errors?.model}
          required
        />

        <Select
          label="Año"
          placeholder="Selecciona el año"
          options={yearOptions}
          value={formData?.year || ""}
          onChange={(value) => handleInputChange("year", value)}
          error={errors?.year}
          required
          searchable
        />

        <Input
          label="Kilometraje"
          type="number"
          placeholder="Ej: 85000"
          value={formData?.mileage || ""}
          onChange={(e) => handleInputChange("mileage", e?.target?.value)}
          error={errors?.mileage}
          required
          min="0"
          max="999999"
        />
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Nota:</strong> Asegúrate de que todos los datos del vehículo sean correctos. Esta información será utilizada para generar una cotización precisa.
        </p>
      </div>
    </div>
  );
};

export default VehicleInfoSection;
