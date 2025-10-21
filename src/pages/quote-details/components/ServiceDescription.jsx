import React from "react";
import Icon from "../../../components/AppIcon";

const ServiceDescription = ({ service }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="FileText" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Descripción del Servicio</h3>
          <p className="text-sm text-muted-foreground">Trabajos a realizar y recomendaciones</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Main Service Description */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Trabajos Necesarios</h4>
          <p className="text-foreground leading-relaxed">{service?.mainDescription}</p>
        </div>

        {/* Work Items */}
        {service?.workItems && service?.workItems?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3">Desglose de Trabajos</h4>
            <div className="space-y-3">
              {service?.workItems?.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium mt-0.5">{index + 1}</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground">{item?.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{item?.description}</p>
                    {item?.duration && (
                      <div className="flex items-center gap-1 mt-2">
                        <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">{item?.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {service?.recommendations && service?.recommendations?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3">Recomendaciones Adicionales</h4>
            <div className="space-y-2">
              {service?.recommendations?.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{recommendation?.text}</p>
                    {recommendation?.priority && (
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                          recommendation?.priority === "high" ? "bg-error/10 text-error" : recommendation?.priority === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                        }`}
                      >
                        Prioridad: {recommendation?.priority === "high" ? "Alta" : recommendation?.priority === "medium" ? "Media" : "Baja"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warranty Information */}
        <div className="bg-success/10 rounded-lg p-4 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="font-medium text-success">Garantía Incluida</span>
          </div>
          <ul className="text-sm text-foreground space-y-1">
            <li>• 6 meses de garantía en mano de obra</li>
            <li>• Garantía del fabricante en repuestos nuevos</li>
            <li>• Revisión gratuita a los 30 días</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;
