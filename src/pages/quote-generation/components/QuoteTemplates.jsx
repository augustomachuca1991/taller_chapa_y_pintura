import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuoteTemplates = ({ templates, onApplyTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    })?.format(amount || 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-2 rounded-lg">
          <Icon name="FileTemplate" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Plantillas de Cotización</h3>
          <p className="text-sm text-muted-foreground">Cotizaciones preconfiguradas para servicios comunes</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className={`border rounded-lg p-4 transition-colors cursor-pointer ${
              selectedTemplate?.id === template?.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{template?.name}</h4>
              <span className="text-lg font-bold text-primary">{formatCurrency(template?.estimatedTotal)}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{template?.description}</p>

            <div className="space-y-2">
              <div className="text-xs font-medium text-foreground">Servicios incluidos:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {template?.services?.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-success" />
                    {service?.name} ({service?.hours}h)
                  </li>
                ))}
              </ul>

              <div className="text-xs font-medium text-foreground mt-3">Repuestos incluidos:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {template?.parts?.map((part, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icon name="Package" size={12} className="text-accent" />
                    {part?.name} (x{part?.quantity})
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={selectedTemplate?.id === template?.id ? "primary" : "outline"}
              size="sm"
              fullWidth
              className="mt-4"
              onClick={(e) => {
                e?.stopPropagation();
                onApplyTemplate(template);
              }}
              iconName="Download"
              iconPosition="left"
            >
              Aplicar Plantilla
            </Button>
          </div>
        ))}
      </div>
      {/* Quick Service Templates */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Servicios Rápidos</h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: "Cambio Aceite", icon: "Droplets", price: 45.9 },
            { name: "Revisión Frenos", icon: "Disc", price: 89.9 },
            { name: "Filtro Aire", icon: "Wind", price: 25.9 },
            { name: "Bujías", icon: "Zap", price: 65.9 },
          ]?.map((service, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-auto flex-col p-3"
              onClick={() => {
                // Mock quick service addition
                console.log("Adding quick service:", service?.name);
              }}
            >
              <Icon name={service?.icon} size={20} className="text-muted-foreground mb-2" />
              <span className="text-xs font-medium text-foreground">{service?.name}</span>
              <span className="text-xs text-muted-foreground">desde {formatCurrency(service?.price)}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Template Details Modal */}
      {selectedTemplate && (
        <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">{selectedTemplate?.name} - Detalles</h4>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)} iconName="X" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Breakdown */}
            <div>
              <h5 className="font-medium text-foreground mb-3">Servicios</h5>
              <div className="space-y-2">
                {selectedTemplate?.services?.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <div className="text-foreground">{service?.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {service?.hours}h × €{service?.rate}/h
                      </div>
                    </div>
                    <div className="font-medium text-foreground">€{(service?.hours * service?.rate)?.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parts Breakdown */}
            <div>
              <h5 className="font-medium text-foreground mb-3">Repuestos</h5>
              <div className="space-y-2">
                {selectedTemplate?.parts?.map((part, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <div className="text-foreground">{part?.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {part?.quantity} × €{part?.unitPrice}
                      </div>
                    </div>
                    <div className="font-medium text-foreground">€{(part?.quantity * part?.unitPrice)?.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
            <span className="text-lg font-semibold text-foreground">Total Estimado:</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(selectedTemplate?.estimatedTotal)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteTemplates;
