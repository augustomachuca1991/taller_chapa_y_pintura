import React from "react";
import Icon from "../../../components/AppIcon";

const PricingBreakdown = ({ pricing }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="Calculator" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Desglose de Precios</h3>
          <p className="text-sm text-muted-foreground">Cotización detallada del servicio</p>
        </div>
      </div>
      <div className="space-y-4">
        {/* Labor Costs */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <Icon name="Wrench" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground">Mano de Obra</span>
          </div>
          <span className="font-medium text-foreground">{formatCurrency(pricing?.labor)}</span>
        </div>

        {/* Parts Costs */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <Icon name="Settings" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground">Repuestos y Materiales</span>
          </div>
          <span className="font-medium text-foreground">{formatCurrency(pricing?.parts)}</span>
        </div>

        {/* Additional Services */}
        {pricing?.additionalServices && pricing?.additionalServices?.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Plus" size={16} />
              <span className="text-sm font-medium">Servicios Adicionales</span>
            </div>
            {pricing?.additionalServices?.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-1 pl-6">
                <span className="text-sm text-foreground">{service?.name}</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(service?.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal */}
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-foreground">Subtotal</span>
            <span className="font-medium text-foreground">{formatCurrency(pricing?.subtotal)}</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">IVA ({pricing?.taxRate}%)</span>
            <span className="text-muted-foreground">{formatCurrency(pricing?.tax)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(pricing?.total)}</span>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-muted/50 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Condiciones de Pago</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Pago del 50% al aceptar la cotización</li>
            <li>• Saldo restante al completar el servicio</li>
            <li>• Garantía de 6 meses en mano de obra</li>
            <li>• Garantía del fabricante en repuestos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingBreakdown;
