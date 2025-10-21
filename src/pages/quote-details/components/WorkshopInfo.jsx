import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const WorkshopInfo = ({ workshop }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon key={index} name="Star" size={16} color={index < Math.floor(rating) ? "var(--color-warning)" : "var(--color-border)"} className={index < Math.floor(rating) ? "fill-current" : ""} />
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image src={workshop?.logo} alt={workshop?.logoAlt} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{workshop?.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">{renderStars(workshop?.rating)}</div>
            <span className="text-sm text-muted-foreground">
              {workshop?.rating} ({workshop?.reviewCount} reseñas)
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Dirección</p>
              <p className="text-foreground">{workshop?.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="text-foreground">{workshop?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground">{workshop?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Tiempo Estimado</p>
              <p className="text-foreground font-medium">{workshop?.estimatedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Disponibilidad</p>
              <p className="text-foreground">{workshop?.availability}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="Shield" size={16} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm text-muted-foreground">Certificaciones</p>
              <p className="text-foreground">{workshop?.certifications}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Specialties */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Especialidades</p>
        <div className="flex flex-wrap gap-2">
          {workshop?.specialties?.map((specialty, index) => (
            <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopInfo;
