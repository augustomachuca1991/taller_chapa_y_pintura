import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const VehicleInfoCard = ({ vehicle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(vehicle);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(vehicle);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-accent/10 p-2 rounded-lg">
            <Icon name="Car" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Información del Vehículo</h3>
            <p className="text-sm text-muted-foreground">Datos técnicos y de identificación</p>
          </div>
        </div>

        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} iconName="Edit" iconPosition="left">
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} iconName="X" />
            <Button variant="primary" size="sm" onClick={handleSave} iconName="Check" />
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input type="text" name="make" label="Marca" value={formData?.make} onChange={handleInputChange} placeholder="Toyota, Ford, BMW..." required />

          <Input type="text" name="model" label="Modelo" value={formData?.model} onChange={handleInputChange} placeholder="Corolla, Focus, Serie 3..." required />

          <Input type="number" name="year" label="Año" value={formData?.year} onChange={handleInputChange} placeholder="2019" min="1980" max={new Date()?.getFullYear() + 1} required />

          <Input type="text" name="licensePlate" label="Matrícula" value={formData?.licensePlate} onChange={handleInputChange} placeholder="1234-ABC" required />

          <Input type="number" name="mileage" label="Kilometraje" value={formData?.mileage} onChange={handleInputChange} placeholder="45000" min="0" required />

          <Input type="text" name="color" label="Color" value={formData?.color} onChange={handleInputChange} placeholder="Plata Metalizado" />

          <Input type="text" name="vin" label="Número de Bastidor (VIN)" value={formData?.vin} onChange={handleInputChange} placeholder="JTDBR32E340123456" className="md:col-span-3" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="Car" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Vehículo</p>
                <p className="font-medium text-foreground">
                  {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Hash" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Matrícula</p>
                <p className="font-medium text-foreground">{vehicle?.licensePlate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="Gauge" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Kilometraje</p>
                <p className="font-medium text-foreground">{vehicle?.mileage?.toLocaleString("es-ES")} km</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Palette" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium text-foreground">{vehicle?.color}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-medium text-foreground font-mono text-xs">{vehicle?.vin}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Vehicle Status Indicators */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Documentación vigente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">Mantenimiento debido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">ITV al día</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoCard;
