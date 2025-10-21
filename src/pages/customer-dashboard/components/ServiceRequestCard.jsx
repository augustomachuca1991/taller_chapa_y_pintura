import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const ServiceRequestCard = ({ request, onViewDetails, onAcceptQuote, onRejectQuote }) => {
  const getStatusAction = () => {
    switch (request?.status) {
      case "pending":
        return <div className="text-sm text-muted-foreground">Esperando cotización del taller</div>;
      case "quoted":
        return (
          <div className="flex gap-2">
            <Button variant="success" size="sm" onClick={() => onAcceptQuote(request?.id)} iconName="Check" iconPosition="left" iconSize={14}>
              Aceptar
            </Button>
            <Button variant="outline" size="sm" onClick={() => onRejectQuote(request?.id)} iconName="X" iconPosition="left" iconSize={14}>
              Rechazar
            </Button>
          </div>
        );
      case "approved":
        return (
          <Button variant="primary" size="sm" onClick={() => (window.location.href = "/appointment-booking")} iconName="Calendar" iconPosition="left" iconSize={14}>
            Programar Cita
          </Button>
        );
      case "in-progress":
        return <div className="text-sm text-accent font-medium">Vehículo en reparación</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-start gap-4">
        {/* Vehicle Image */}
        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
          <Image src={request?.vehicleImage} alt={request?.vehicleImageAlt} className="w-full h-full object-cover" />
        </div>

        {/* Request Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-1">
                {request?.vehicleMake} {request?.vehicleModel} {request?.vehicleYear}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Placa: {request?.licensePlate} • {request?.mileage} km
              </p>
              <StatusIndicator status={request?.status} size="sm" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => onViewDetails(request?.id)} className="flex-shrink-0">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>

          {/* Service Type */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Wrench" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{request?.serviceType}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{request?.issueDescription}</p>
          </div>

          {/* Quote Information */}
          {request?.status === "quoted" && request?.quote && (
            <div className="mb-3 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Cotización Recibida</span>
                <span className="text-lg font-bold text-primary">€{request?.quote?.total?.toLocaleString("es-ES", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="text-xs text-muted-foreground">Tiempo estimado: {request?.quote?.estimatedTime}</div>
            </div>
          )}

          {/* Request Date */}
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Solicitado: {new Date(request.requestDate)?.toLocaleDateString("es-ES")}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            {getStatusAction()}
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(request?.id)} iconName="ExternalLink" iconPosition="right" iconSize={14}>
              Ver Detalles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCard;
