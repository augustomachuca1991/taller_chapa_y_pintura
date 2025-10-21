import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const FormSummary = ({ formData, images = [] }) => {
  const getServiceTypeLabel = (serviceId) => {
    const serviceTypes = {
      motor: "Motor y Mecánica",
      frenos: "Sistema de Frenos",
      transmision: "Transmisión",
      electrico: "Sistema Eléctrico",
      suspension: "Suspensión",
      neumaticos: "Neumáticos y Llantas",
      carroceria: "Carrocería y Pintura",
      climatizacion: "Aire Acondicionado",
      mantenimiento: "Mantenimiento General",
      otros: "Otros Servicios",
    };
    return serviceTypes?.[serviceId] || serviceId;
  };

  const getUrgencyLabel = (urgency) => {
    const urgencyLabels = {
      low: "Baja",
      medium: "Media",
      high: "Alta",
    };
    return urgencyLabels?.[urgency] || urgency;
  };

  const getContactMethodLabel = (method) => {
    const methodLabels = {
      phone: "Teléfono",
      email: "Correo Electrónico",
      whatsapp: "WhatsApp",
      sms: "SMS",
    };
    return methodLabels?.[method] || method;
  };

  const formatAvailability = (availability) => {
    if (!availability) return "No especificada";

    const days = Object.keys(availability)?.filter((day) => availability?.[day] && availability?.[day]?.length > 0);

    if (days?.length === 0) return "No especificada";

    return days
      ?.map((day) => {
        const dayLabels = {
          lunes: "Lun",
          martes: "Mar",
          miercoles: "Mié",
          jueves: "Jue",
          viernes: "Vie",
          sabado: "Sáb",
        };
        return dayLabels?.[day] || day;
      })
      ?.join(", ");
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center mr-3">
          <Icon name="CheckCircle" size={20} color="white" />
        </div>
        Resumen de la Solicitud
      </h2>
      <div className="space-y-6">
        {/* Vehicle Information */}
        <div className="border-b border-border pb-4">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="Car" size={18} className="mr-2 text-primary" />
            Información del Vehículo
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Matrícula:</span>
              <p className="font-medium text-foreground">{formData?.licensePlate || "No especificada"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Marca:</span>
              <p className="font-medium text-foreground">{formData?.brand || "No especificada"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Modelo:</span>
              <p className="font-medium text-foreground">{formData?.model || "No especificado"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Año:</span>
              <p className="font-medium text-foreground">{formData?.year || "No especificado"}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Kilometraje:</span>
              <p className="font-medium text-foreground">{formData?.mileage ? `${parseInt(formData?.mileage)?.toLocaleString("es-ES")} km` : "No especificado"}</p>
            </div>
          </div>
        </div>

        {/* Images */}
        {images?.length > 0 && (
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
              <Icon name="Camera" size={18} className="mr-2 text-primary" />
              Imágenes ({images?.length})
            </h3>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {images?.slice(0, 6)?.map((image, index) => (
                <div key={image?.id} className="aspect-square rounded-lg overflow-hidden border border-border">
                  <Image src={image?.url} alt={`Imagen del vehículo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {images?.length > 6 && (
                <div className="aspect-square rounded-lg border border-border bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{images?.length - 6}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Service Description */}
        <div className="border-b border-border pb-4">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={18} className="mr-2 text-primary" />
            Descripción del Servicio
          </h3>

          <div className="space-y-3">
            {formData?.serviceTypes && formData?.serviceTypes?.length > 0 && (
              <div>
                <span className="text-sm text-muted-foreground">Tipos de servicio:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData?.serviceTypes?.map((serviceId) => (
                    <span key={serviceId} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                      {getServiceTypeLabel(serviceId)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData?.description && (
              <div>
                <span className="text-sm text-muted-foreground">Descripción:</span>
                <p className="text-sm text-foreground mt-1 bg-muted p-3 rounded-lg">{formData?.description}</p>
              </div>
            )}

            {formData?.urgency && (
              <div>
                <span className="text-sm text-muted-foreground">Urgencia:</span>
                <div className="mt-1">
                  <StatusIndicator status={formData?.urgency === "low" ? "pending" : formData?.urgency === "medium" ? "in-review" : "approved"} variant="default" size="sm" showLabel={false} />
                  <span className="ml-2 text-sm font-medium text-foreground">{getUrgencyLabel(formData?.urgency)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="User" size={18} className="mr-2 text-primary" />
            Información de Contacto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nombre:</span>
              <p className="font-medium text-foreground">{formData?.fullName || "No especificado"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Teléfono:</span>
              <p className="font-medium text-foreground">{formData?.phone || "No especificado"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium text-foreground">{formData?.email || "No especificado"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Dirección:</span>
              <p className="font-medium text-foreground">{formData?.address || "No especificada"}</p>
            </div>

            {formData?.contactMethods && formData?.contactMethods?.length > 0 && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Métodos de contacto preferidos:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData?.contactMethods?.map((method) => (
                    <span key={method} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                      {getContactMethodLabel(method)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <span className="text-muted-foreground">Disponibilidad:</span>
              <p className="font-medium text-foreground">{formatAvailability(formData?.availability)}</p>
            </div>

            {formData?.additionalNotes && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Notas adicionales:</span>
                <p className="text-sm text-foreground mt-1 bg-muted p-3 rounded-lg">{formData?.additionalNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
        <h4 className="font-medium text-success mb-2 flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Próximos Pasos
        </h4>
        <ul className="text-sm text-success/80 space-y-1">
          <li>• Recibirás una confirmación por email en los próximos minutos</li>
          <li>• Nuestro equipo revisará tu solicitud en 2-4 horas laborables</li>
          <li>• Te contactaremos para confirmar detalles y programar inspección</li>
          <li>• Recibirás la cotización detallada en 24-48 horas</li>
        </ul>
      </div>
    </div>
  );
};

export default FormSummary;
