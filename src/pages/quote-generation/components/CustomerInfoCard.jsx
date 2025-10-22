import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const CustomerInfoCard = ({ customer, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(customer);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(customer);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Información del Cliente</h3>
            <p className="text-sm text-muted-foreground">Datos personales y de contacto</p>
          </div>
        </div>

        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} iconName="Edit" iconPosition="left">
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} iconName="X" />
            <Button variant="primary" size="sm" onClick={handleSave} iconName="Check" />
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" name="name" label="Nombre Completo" value={formData?.name} onChange={handleInputChange} placeholder="Nombre y apellidos del cliente" required />

          <Input type="email" name="email" label="Correo Electrónico" value={formData?.email} onChange={handleInputChange} placeholder="cliente@ejemplo.com" required />

          <Input type="tel" name="phone" label="Teléfono" value={formData?.phone} onChange={handleInputChange} placeholder="+34 600 000 000" required />

          <Input type="text" name="address" label="Dirección" value={formData?.address} onChange={handleInputChange} placeholder="Calle, número, código postal, ciudad" className="md:col-span-2" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium text-foreground">{customer?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{customer?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium text-foreground">{customer?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="font-medium text-foreground">{customer?.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoCard;
