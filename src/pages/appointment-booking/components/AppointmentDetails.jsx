import React from "react";
import Icon from "../../../components/AppIcon";

const AppointmentDetails = ({ selectedSlot, selectedDate, vehicleInfo, quoteInfo, workshopInfo }) => {
  if (!selectedSlot || !selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">Detalles de la Cita</h3>
          <p className="text-muted-foreground">Selecciona una fecha y horario para ver los detalles</p>
        </div>
      </div>
    );
  }

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${period}`;
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Resumen de la Cita</h3>
      {/* Appointment Time */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-primary" />
          <div>
            <div className="font-medium text-foreground">{formatDate(selectedDate)}</div>
            <div className="text-sm text-muted-foreground">
              {formatTime(selectedSlot?.startTime)} - {formatTime(selectedSlot?.endTime)}
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">Duración estimada: {selectedSlot?.duration} minutos</div>
      </div>
      {/* Vehicle Information */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Car" size={16} className="mr-2" />
          Información del Vehículo
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Matrícula:</span>
            <span className="font-medium text-foreground">{vehicleInfo?.licensePlate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vehículo:</span>
            <span className="font-medium text-foreground">
              {vehicleInfo?.make} {vehicleInfo?.model} ({vehicleInfo?.year})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kilometraje:</span>
            <span className="font-medium text-foreground">{vehicleInfo?.mileage?.toLocaleString("es-ES")} km</span>
          </div>
        </div>
      </div>
      {/* Service Information */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Wrench" size={16} className="mr-2" />
          Servicio Solicitado
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo:</span>
            <span className="font-medium text-foreground">{selectedSlot?.serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cotización:</span>
            <span className="font-medium text-success">€{quoteInfo?.totalAmount}</span>
          </div>
          <div className="mt-2">
            <span className="text-muted-foreground">Descripción:</span>
            <p className="mt-1 text-foreground">{quoteInfo?.description}</p>
          </div>
        </div>
      </div>
      {/* Workshop Information */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="MapPin" size={16} className="mr-2" />
          Información del Taller
        </h4>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-foreground">{workshopInfo?.name}</div>
            <div className="text-sm text-muted-foreground">{workshopInfo?.address}</div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-foreground">{workshopInfo?.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning" />
              <span className="text-foreground">{workshopInfo?.rating}</span>
            </div>
          </div>

          {/* Map Preview */}
          <div className="mt-3 h-32 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={workshopInfo?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${workshopInfo?.coordinates?.lat},${workshopInfo?.coordinates?.lng}&z=14&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      </div>
      {/* Workshop Hours */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Horarios del Taller
        </h4>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lunes - Viernes:</span>
            <span className="text-foreground">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sábados:</span>
            <span className="text-foreground">9:00 AM - 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Domingos:</span>
            <span className="text-foreground">Cerrado</span>
          </div>
        </div>
      </div>
      {/* Preparation Instructions */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-accent" />
          Instrucciones de Preparación
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Traiga la documentación del vehículo</li>
          <li>• Retire objetos personales del interior</li>
          <li>• Llegue 10 minutos antes de la cita</li>
          <li>• Tenga preparada la forma de pago acordada</li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentDetails;
