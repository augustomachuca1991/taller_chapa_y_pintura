import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

import Input from "../../../components/ui/Input";

const PricingCalculator = ({ quoteData, totals, onUpdateDiscounts, onUpdateTaxes, onUpdateValidity }) => {
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(quoteData?.discounts?.percentage || 0);
  const [discountReason, setDiscountReason] = useState(quoteData?.discounts?.reason || "");

  const handleDiscountChange = (value) => {
    setDiscountValue(value);
    const discountData = discountType === "percentage" ? { percentage: value, amount: 0, reason: discountReason } : { percentage: 0, amount: value, reason: discountReason };

    onUpdateDiscounts(discountData);
  };

  const handleDiscountTypeChange = (type) => {
    setDiscountType(type);
    setDiscountValue(0);
    onUpdateDiscounts({
      percentage: 0,
      amount: 0,
      reason: discountReason,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    })?.format(amount || 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-success/10 p-2 rounded-lg">
          <Icon name="Calculator" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Calculadora de Precios</h3>
          <p className="text-sm text-muted-foreground">Resumen automático de costos</p>
        </div>
      </div>
      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Mano de Obra:</span>
          <span className="font-medium text-foreground">{formatCurrency(totals?.servicesTotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Repuestos:</span>
          <span className="font-medium text-foreground">{formatCurrency(totals?.partsTotal)}</span>
        </div>

        <div className="border-t border-border pt-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">Subtotal:</span>
            <span className="font-semibold text-foreground">{formatCurrency(totals?.subtotal)}</span>
          </div>
        </div>
      </div>
      {/* Discount Section */}
      <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="Percent" size={16} />
          Descuentos
        </h4>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => handleDiscountTypeChange("percentage")}
              className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                discountType === "percentage" ? "bg-primary text-primary-foreground" : "bg-background text-foreground border border-input"
              }`}
            >
              Porcentaje
            </button>
            <button
              onClick={() => handleDiscountTypeChange("fixed")}
              className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                discountType === "fixed" ? "bg-primary text-primary-foreground" : "bg-background text-foreground border border-input"
              }`}
            >
              Cantidad Fija
            </button>
          </div>

          <Input
            type="number"
            value={discountValue}
            onChange={(e) => handleDiscountChange(parseFloat(e?.target?.value) || 0)}
            placeholder={discountType === "percentage" ? "10" : "50.00"}
            label={discountType === "percentage" ? "Porcentaje (%)" : "Cantidad (€)"}
            min="0"
            step={discountType === "percentage" ? "1" : "0.01"}
          />

          <Input
            type="text"
            value={discountReason}
            onChange={(e) => {
              setDiscountReason(e?.target?.value);
              onUpdateDiscounts({
                ...quoteData?.discounts,
                reason: e?.target?.value,
              });
            }}
            placeholder="Motivo del descuento (opcional)"
            label="Motivo"
          />

          {totals?.discountAmount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Descuento aplicado:</span>
              <span className="font-medium text-success">-{formatCurrency(totals?.discountAmount)}</span>
            </div>
          )}
        </div>
      </div>
      {/* Tax Section */}
      <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="Receipt" size={16} />
          Impuestos
        </h4>

        <Input type="number" value={quoteData?.taxes?.iva || 21} onChange={(e) => onUpdateTaxes({ iva: parseFloat(e?.target?.value) || 21 })} label="IVA (%)" min="0" max="100" step="0.1" />

        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-muted-foreground">IVA aplicado:</span>
          <span className="font-medium text-foreground">{formatCurrency(totals?.taxAmount)}</span>
        </div>
      </div>
      {/* Final Total */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total Final:</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(totals?.total)}</span>
        </div>
      </div>
      {/* Validity Section */}
      <div className="p-4 bg-muted/50 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="Calendar" size={16} />
          Validez de la Cotización
        </h4>

        <Input
          type="date"
          value={quoteData?.validity?.expirationDate}
          onChange={(e) =>
            onUpdateValidity({
              ...quoteData?.validity,
              expirationDate: e?.target?.value,
            })
          }
          label="Válida hasta"
          min={new Date()?.toISOString()?.split("T")?.[0]}
        />

        <Input
          type="text"
          value={quoteData?.validity?.terms}
          onChange={(e) =>
            onUpdateValidity({
              ...quoteData?.validity,
              terms: e?.target?.value,
            })
          }
          placeholder="Términos y condiciones"
          label="Términos"
          className="mt-3"
        />

        <div className="mt-3 p-3 bg-background border border-border rounded-md">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Clock" size={14} className="text-warning" />
            <span className="text-muted-foreground">Cotización válida por {Math.ceil((new Date(quoteData?.validity?.expirationDate) - new Date()) / (1000 * 60 * 60 * 24))} días</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
