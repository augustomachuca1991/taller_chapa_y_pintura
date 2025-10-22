import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const PartsLookup = ({ parts, selectedParts, onAddPart, onRemovePart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newPart, setNewPart] = useState({
    name: "",
    partNumber: "",
    quantity: 1,
    unitPrice: 0,
    availability: "En stock",
    category: "Motor",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ["Motor", "Frenos", "Suspensión", "Transmisión", "Eléctrico", "Carrocería", "Lubricantes", "Encendido"];

  const filteredParts = parts?.filter((part) => {
    const matchesSearch = part?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || part?.partNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === "all" || part?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddPart = (part, quantity = 1) => {
    onAddPart({
      ...part,
      quantity,
      total: quantity * part?.unitPrice,
    });
  };

  const handleAddCustomPart = () => {
    if (newPart?.name && newPart?.unitPrice > 0 && newPart?.quantity > 0) {
      onAddPart({
        ...newPart,
        id: Date.now(),
        total: newPart?.quantity * newPart?.unitPrice,
      });

      setNewPart({
        name: "",
        partNumber: "",
        quantity: 1,
        unitPrice: 0,
        availability: "En stock",
        category: "Motor",
      });
      setShowAddForm(false);
    }
  };

  const handleNewPartChange = (e) => {
    const { name, value, type } = e?.target;
    setNewPart((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "En stock":
        return "text-success";
      case "Bajo pedido":
        return "text-warning";
      case "Agotado":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    })?.format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* Parts Database */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Icon name="Package" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Búsqueda de Repuestos</h3>
              <p className="text-sm text-muted-foreground">Consulta precios y disponibilidad</p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)} iconName={showAddForm ? "X" : "Plus"} iconPosition="left">
            {showAddForm ? "Cancelar" : "Agregar Personalizado"}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e?.target?.value)} placeholder="Buscar por nombre o código de parte..." label="Buscar Repuesto" className="flex-1" />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">Todas las categorías</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Part Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
            <h4 className="font-medium text-foreground mb-4">Agregar Repuesto Personalizado</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="text" name="name" label="Nombre del Repuesto" value={newPart?.name} onChange={handleNewPartChange} placeholder="Filtro de aceite personalizado" required />

              <Input type="text" name="partNumber" label="Código de Parte" value={newPart?.partNumber} onChange={handleNewPartChange} placeholder="FLT-CUSTOM-001" />

              <Input type="number" name="quantity" label="Cantidad" value={newPart?.quantity} onChange={handleNewPartChange} min="1" required />

              <Input type="number" name="unitPrice" label="Precio Unitario (€)" value={newPart?.unitPrice} onChange={handleNewPartChange} min="0" step="0.01" required />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categoría</label>
                <select
                  name="category"
                  value={newPart?.category}
                  onChange={handleNewPartChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Disponibilidad</label>
                <select
                  name="availability"
                  value={newPart?.availability}
                  onChange={handleNewPartChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="En stock">En stock</option>
                  <option value="Bajo pedido">Bajo pedido</option>
                  <option value="Agotado">Agotado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddCustomPart} iconName="Plus" iconPosition="left">
                Agregar
              </Button>
            </div>
          </div>
        )}

        {/* Parts List */}
        <div className="space-y-3">
          {filteredParts?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No se encontraron repuestos</h4>
              <p className="text-muted-foreground">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          ) : (
            filteredParts?.map((part) => (
              <div key={part?.id} className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{part?.name}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{part?.category}</span>
                      <span className={`text-xs font-medium ${getAvailabilityColor(part?.availability)}`}>{part?.availability}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Código: {part?.partNumber}</span>
                      <span className="font-semibold text-foreground">{formatCurrency(part?.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input type="number" min="1" defaultValue="1" className="w-20" id={`quantity-${part?.id}`} />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const quantity = parseInt(document.getElementById(`quantity-${part?.id}`)?.value) || 1;
                        handleAddPart(part, quantity);
                      }}
                      iconName="Plus"
                      disabled={part?.availability === "Agotado"}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Selected Parts */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-success/10 p-2 rounded-lg">
            <Icon name="ShoppingCart" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Repuestos Seleccionados</h3>
            <p className="text-sm text-muted-foreground">Lista de repuestos incluidos en la cotización</p>
          </div>
        </div>

        <div className="space-y-4">
          {selectedParts?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No hay repuestos seleccionados</h4>
              <p className="text-muted-foreground">Agrega repuestos de la base de datos para incluir en la cotización</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
                <div className="col-span-4">Repuesto</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-center">Precio Unit.</div>
                <div className="col-span-2 text-center">Subtotal</div>
                <div className="col-span-2 text-center">Acciones</div>
              </div>

              {selectedParts?.map((part) => (
                <div key={part?.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 md:col-span-4">
                      <h4 className="font-medium text-foreground mb-1">{part?.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Código: {part?.partNumber}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{part?.category}</span>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className="font-medium text-foreground">{part?.quantity}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className="font-medium text-foreground">{formatCurrency(part?.unitPrice)}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className="font-semibold text-foreground">{formatCurrency(part?.total)}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <Button variant="ghost" size="sm" onClick={() => onRemovePart(part?.id)} iconName="Trash2" className="text-destructive hover:text-destructive" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-foreground">Total Repuestos:</span>
                  <span className="text-xl font-bold text-foreground">{formatCurrency(selectedParts?.reduce((sum, part) => sum + part?.total, 0))}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartsLookup;
