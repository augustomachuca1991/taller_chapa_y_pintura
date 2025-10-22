import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuotePreview = ({ quoteData, totals, images }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    })?.format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const quoteNumber = `COT-${Date.now()?.toString()?.slice(-6)}`;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">AutoShop Pro</h2>
            <p className="text-primary-foreground/80">Cotización de Servicios Automotrices</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{quoteNumber}</div>
            <div className="text-primary-foreground/80">{formatDate(new Date())}</div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Customer & Vehicle Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="User" size={20} />
              Información del Cliente
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Nombre:</strong> {quoteData?.customer?.name}
              </div>
              <div>
                <strong>Email:</strong> {quoteData?.customer?.email}
              </div>
              <div>
                <strong>Teléfono:</strong> {quoteData?.customer?.phone}
              </div>
              <div>
                <strong>Dirección:</strong> {quoteData?.customer?.address}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Car" size={20} />
              Información del Vehículo
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Vehículo:</strong> {quoteData?.vehicle?.make} {quoteData?.vehicle?.model} ({quoteData?.vehicle?.year})
              </div>
              <div>
                <strong>Matrícula:</strong> {quoteData?.vehicle?.licensePlate}
              </div>
              <div>
                <strong>Kilometraje:</strong> {quoteData?.vehicle?.mileage?.toLocaleString("es-ES")} km
              </div>
              <div>
                <strong>Color:</strong> {quoteData?.vehicle?.color}
              </div>
              <div>
                <strong>VIN:</strong> <span className="font-mono text-xs">{quoteData?.vehicle?.vin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {quoteData?.services?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Wrench" size={20} />
              Servicios de Mano de Obra
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-foreground">Servicio</th>
                    <th className="text-center p-3 font-medium text-foreground">Horas</th>
                    <th className="text-center p-3 font-medium text-foreground">Tarifa/h</th>
                    <th className="text-right p-3 font-medium text-foreground">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteData?.services?.map((service, index) => (
                    <tr key={service?.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                      <td className="p-3">
                        <div className="font-medium text-foreground">{service?.name}</div>
                        {service?.description && <div className="text-sm text-muted-foreground">{service?.description}</div>}
                      </td>
                      <td className="text-center p-3 text-foreground">{service?.hours}h</td>
                      <td className="text-center p-3 text-foreground">€{service?.rate}</td>
                      <td className="text-right p-3 font-medium text-foreground">{formatCurrency(service?.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted">
                    <td colSpan="3" className="p-3 font-semibold text-foreground text-right">
                      Total Mano de Obra:
                    </td>
                    <td className="p-3 font-bold text-foreground text-right">{formatCurrency(totals?.servicesTotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Parts Section */}
        {quoteData?.parts?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Package" size={20} />
              Repuestos y Materiales
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-foreground">Repuesto</th>
                    <th className="text-center p-3 font-medium text-foreground">Cantidad</th>
                    <th className="text-center p-3 font-medium text-foreground">Precio Unit.</th>
                    <th className="text-right p-3 font-medium text-foreground">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteData?.parts?.map((part, index) => (
                    <tr key={part?.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                      <td className="p-3">
                        <div className="font-medium text-foreground">{part?.name}</div>
                        <div className="text-sm text-muted-foreground">Código: {part?.partNumber}</div>
                      </td>
                      <td className="text-center p-3 text-foreground">{part?.quantity}</td>
                      <td className="text-center p-3 text-foreground">{formatCurrency(part?.unitPrice)}</td>
                      <td className="text-right p-3 font-medium text-foreground">{formatCurrency(part?.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted">
                    <td colSpan="3" className="p-3 font-semibold text-foreground text-right">
                      Total Repuestos:
                    </td>
                    <td className="p-3 font-bold text-foreground text-right">{formatCurrency(totals?.partsTotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Calculator" size={20} />
            Resumen de Precios
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground">Subtotal:</span>
              <span className="font-medium text-foreground">{formatCurrency(totals?.subtotal)}</span>
            </div>

            {totals?.discountAmount > 0 && (
              <div className="flex justify-between text-success">
                <span>Descuento {quoteData?.discounts?.reason && `(${quoteData?.discounts?.reason})`}:</span>
                <span className="font-medium">-{formatCurrency(totals?.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-foreground">IVA ({quoteData?.taxes?.iva || 21}%):</span>
              <span className="font-medium text-foreground">{formatCurrency(totals?.taxAmount)}</span>
            </div>

            <div className="border-t border-border pt-2 mt-4">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">{formatCurrency(totals?.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        {images?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Image" size={20} />
              Imágenes del Vehículo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images?.slice(0, 4)?.map((image) => (
                <div key={image?.id} className="relative">
                  <img src={image?.url} alt={image?.alt} className="w-full h-48 object-cover rounded-lg border border-border" />
                  {image?.annotations?.length > 0 && (
                    <div className="absolute top-2 right-2 bg-foreground text-background px-2 py-1 rounded-md text-xs">{image?.annotations?.length} anotación(es)</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms and Validity */}
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Validez de la Cotización</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <strong>Válida hasta:</strong> {formatDate(quoteData?.validity?.expirationDate)}
                </div>
                <div>
                  <strong>Términos:</strong> {quoteData?.validity?.terms}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Información del Taller</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <strong>AutoShop Pro</strong>
                </div>
                <div>Calle del Taller 123, 28001 Madrid</div>
                <div>Tel: +34 911 234 567</div>
                <div>Email: info@autoshoppro.es</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
          <p>Esta cotización es una estimación basada en la información proporcionada. Los precios finales pueden variar según las condiciones reales del vehículo.</p>
          <p className="mt-2">Gracias por confiar en AutoShop Pro para el mantenimiento de su vehículo.</p>
        </div>
      </div>
      {/* Action Buttons (Print Version Hidden) */}
      <div className="px-6 pb-6 print:hidden">
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => window.print()} iconName="Printer" iconPosition="left" className="flex-1">
            Imprimir Cotización
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Mock download functionality
              console.log("Downloading PDF...");
            }}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Descargar PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuotePreview;
