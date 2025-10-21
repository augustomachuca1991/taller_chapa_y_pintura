import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const QuoteActions = ({ quote, onAccept, onReject, onRequestModification, onContactWorkshop }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showModificationModal, setShowModificationModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [modificationRequest, setModificationRequest] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAccept(quote?.id);
      // Navigate to appointment booking
      window.location.href = "/appointment-booking";
    } catch (error) {
      console.error("Error accepting quote:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason?.trim()) return;

    setIsProcessing(true);
    try {
      await onReject(quote?.id, rejectReason);
      setShowRejectModal(false);
      // Navigate back to dashboard
      window.location.href = "/customer-dashboard";
    } catch (error) {
      console.error("Error rejecting quote:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModificationRequest = async () => {
    if (!modificationRequest?.trim()) return;

    setIsProcessing(true);
    try {
      await onRequestModification(quote?.id, modificationRequest);
      setShowModificationModal(false);
      alert("Solicitud de modificación enviada correctamente");
    } catch (error) {
      console.error("Error requesting modification:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const expiry = new Date(quote.expiryDate);
    const diff = expiry - now;

    if (diff <= 0) return "Expirada";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} días restantes`;
    return `${hours} horas restantes`;
  };

  const isExpired = new Date() > new Date(quote.expiryDate);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="CheckCircle" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Acciones de Cotización</h3>
          <p className="text-sm text-muted-foreground">Revisa y responde a la cotización</p>
        </div>
      </div>
      {/* Quote Validity */}
      <div className={`p-4 rounded-lg mb-6 ${isExpired ? "bg-error/10 border border-error/20" : "bg-warning/10 border border-warning/20"}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Clock" size={16} color={isExpired ? "var(--color-error)" : "var(--color-warning)"} />
          <span className={`font-medium ${isExpired ? "text-error" : "text-warning"}`}>Validez de la Cotización</span>
        </div>
        <p className="text-sm text-foreground">Válida hasta: {formatDate(quote?.expiryDate)}</p>
        <p className={`text-sm font-medium ${isExpired ? "text-error" : "text-warning"}`}>{getTimeRemaining()}</p>
      </div>
      {/* Action Buttons */}
      <div className="space-y-4">
        {!isExpired ? (
          <>
            {/* Accept Button */}
            <Button variant="default" fullWidth onClick={handleAccept} loading={isProcessing} iconName="Check" iconPosition="left" className="text-base py-3">
              Aceptar Cotización
            </Button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setShowModificationModal(true)} iconName="Edit" iconPosition="left">
                Solicitar Modificaciones
              </Button>

              <Button variant="ghost" onClick={() => setShowRejectModal(true)} iconName="X" iconPosition="left">
                Rechazar
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <Icon name="AlertTriangle" size={48} color="var(--color-error)" className="mx-auto mb-2" />
            <p className="text-error font-medium">Esta cotización ha expirado</p>
            <p className="text-sm text-muted-foreground mt-1">Contacta al taller para solicitar una nueva cotización</p>
          </div>
        )}

        {/* Contact Workshop */}
        <div className="pt-4 border-t border-border">
          <Button variant="secondary" fullWidth onClick={() => onContactWorkshop(quote?.workshopId)} iconName="Phone" iconPosition="left">
            Contactar Taller
          </Button>
        </div>
      </div>
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
              <h3 className="text-lg font-semibold text-foreground">Rechazar Cotización</h3>
            </div>

            <p className="text-muted-foreground mb-4">¿Estás seguro de que deseas rechazar esta cotización? Por favor, indica el motivo:</p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e?.target?.value)}
              placeholder="Motivo del rechazo (opcional)"
              className="w-full p-3 border border-border rounded-lg resize-none h-24 text-foreground bg-input"
            />

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowRejectModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleReject} loading={isProcessing} className="flex-1">
                Rechazar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Modification Modal */}
      {showModificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Edit" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Solicitar Modificaciones</h3>
            </div>

            <p className="text-muted-foreground mb-4">Describe los cambios que te gustaría solicitar en esta cotización:</p>

            <textarea
              value={modificationRequest}
              onChange={(e) => setModificationRequest(e?.target?.value)}
              placeholder="Describe las modificaciones que solicitas..."
              className="w-full p-3 border border-border rounded-lg resize-none h-32 text-foreground bg-input"
              required
            />

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowModificationModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button variant="default" onClick={handleModificationRequest} loading={isProcessing} disabled={!modificationRequest?.trim()} className="flex-1">
                Enviar Solicitud
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteActions;
