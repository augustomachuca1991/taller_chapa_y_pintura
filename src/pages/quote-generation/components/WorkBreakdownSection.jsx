import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const WorkBreakdownSection = ({ services, laborRates, onAddService, onRemoveService }) => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    hours: 0,
    rate: laborRates?.standard || 45,
    rateType: "standard",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e?.target;
    setNewService((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleRateTypeChange = (e) => {
    const rateType = e?.target?.value;
    const rate = laborRates?.[rateType] || 45;
    setNewService((prev) => ({
      ...prev,
      rateType,
      rate,
    }));
  };

  const handleAddService = () => {
    if (newService?.name && newService?.hours > 0) {
      onAddService({
        ...newService,
        total: newService?.hours * newService?.rate,
      });

      setNewService({
        name: "",
        description: "",
        hours: 0,
        rate: laborRates?.standard || 45,
        rateType: "standard",
      });
      setShowAddForm(false);
    }
  };

  const getRateTypeLabel = (type) => {
    const labels = {
      standard: "Estándar",
      specialist: "Especialista",
      diagnostic: "Diagnóstico",
    };
    return labels?.[type] || type;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-warning/10 p-2 rounded-lg">
            <Icon name="Wrench" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Desglose de Trabajos</h3>
            <p className="text-sm text-muted-foreground">Servicios de mano de obra y tiempo estimado</p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddForm(!showAddForm)} iconName={showAddForm ? "X" : "Plus"} iconPosition="left">
          {showAddForm ? "Cancelar" : "Agregar Servicio"}
        </Button>
      </div>
      {/* Add Service Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-4">Nuevo Servicio</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="text" name="name" label="Nombre del Servicio" value={newService?.name} onChange={handleInputChange} placeholder="Cambio de pastillas de freno" required />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tipo de Trabajo</label>
              <select
                name="rateType"
                value={newService?.rateType}
                onChange={handleRateTypeChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="standard">Estándar (€{laborRates?.standard}/h)</option>
                <option value="specialist">Especialista (€{laborRates?.specialist}/h)</option>
                <option value="diagnostic">Diagnóstico (€{laborRates?.diagnostic}/h)</option>
              </select>
            </div>

            <Input type="number" name="hours" label="Horas Estimadas" value={newService?.hours} onChange={handleInputChange} placeholder="1.5" min="0" step="0.25" required />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tarifa por Hora</label>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium">€{newService?.rate}</span>
                <span className="text-sm text-muted-foreground">Total: €{(newService?.hours * newService?.rate)?.toFixed(2)}</span>
              </div>
            </div>

            <Input
              type="text"
              name="description"
              label="Descripción (opcional)"
              value={newService?.description}
              onChange={handleInputChange}
              placeholder="Detalles adicionales del servicio"
              className="md:col-span-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddService} iconName="Plus" iconPosition="left">
              Agregar
            </Button>
          </div>
        </div>
      )}
      {/* Services List */}
      <div className="space-y-4">
        {services?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Wrench" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No hay servicios agregados</h4>
            <p className="text-muted-foreground mb-4">Agrega servicios de mano de obra para completar la cotización</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
              <div className="col-span-4">Servicio</div>
              <div className="col-span-2 text-center">Horas</div>
              <div className="col-span-2 text-center">Tarifa/h</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-2 text-center">Acciones</div>
            </div>

            {services?.map((service) => (
              <div key={service?.id} className="bg-background border border-border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 md:col-span-4">
                    <h4 className="font-medium text-foreground mb-1">{service?.name}</h4>
                    {service?.description && <p className="text-sm text-muted-foreground">{service?.description}</p>}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mt-2">{getRateTypeLabel(service?.rateType)}</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-center">
                    <span className="font-medium text-foreground">{service?.hours}h</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-center">
                    <span className="font-medium text-foreground">€{service?.rate}</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-center">
                    <span className="font-semibold text-foreground">€{service?.total?.toFixed(2)}</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <Button variant="ghost" size="sm" onClick={() => onRemoveService(service?.id)} iconName="Trash2" className="text-destructive hover:text-destructive" />
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-foreground">Total Mano de Obra:</span>
                <span className="text-xl font-bold text-foreground">€{services?.reduce((sum, service) => sum + service?.total, 0)?.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Labor Rates Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Tarifas de Mano de Obra</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estándar:</span>
            <span className="text-foreground font-medium">€{laborRates?.standard}/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Especialista:</span>
            <span className="text-foreground font-medium">€{laborRates?.specialist}/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Diagnóstico:</span>
            <span className="text-foreground font-medium">€{laborRates?.diagnostic}/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkBreakdownSection;
