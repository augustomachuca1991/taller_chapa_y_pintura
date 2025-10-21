import React from "react";

import Icon from "../../../components/AppIcon";

const VehicleInfoCard = ({ vehicle }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Car" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Información del Vehículo</h3>
          <p className="text-sm text-muted-foreground">Detalles del servicio solicitado</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Matrícula</label>
            <p className="text-foreground font-medium">{vehicle?.licensePlate}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Marca y Modelo</label>
            <p className="text-foreground font-medium">
              {vehicle?.make} {vehicle?.model}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Año</label>
            <p className="text-foreground font-medium">{vehicle?.year}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Kilometraje</label>
            <p className="text-foreground font-medium">{vehicle?.mileage?.toLocaleString("es-ES")} km</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Tipo de Servicio</label>
            <p className="text-foreground font-medium">{vehicle?.serviceType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</label>
            <p className="text-foreground font-medium">{vehicle?.requestDate}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <label className="text-sm font-medium text-muted-foreground">Descripción del Problema</label>
        <p className="text-foreground mt-1 leading-relaxed">{vehicle?.issueDescription}</p>
      </div>
    </div>
  );
};

export default VehicleInfoCard;
