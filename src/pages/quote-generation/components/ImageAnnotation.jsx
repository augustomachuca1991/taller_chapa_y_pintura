import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ImageAnnotation = ({ images, onUpdateImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddAnnotation, setShowAddAnnotation] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState({
    x: 50,
    y: 50,
    text: "",
    type: "repair",
  });

  const annotationTypes = [
    { id: "repair", label: "Reparación Necesaria", color: "bg-destructive", icon: "AlertTriangle" },
    { id: "damage", label: "Daño Existente", color: "bg-warning", icon: "AlertCircle" },
    { id: "maintenance", label: "Mantenimiento", color: "bg-primary", icon: "Wrench" },
    { id: "inspection", label: "Inspección", color: "bg-accent", icon: "Eye" },
  ];

  const handleImageClick = (e) => {
    if (!showAddAnnotation) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;

    setNewAnnotation((prev) => ({ ...prev, x, y }));
  };

  const handleAddAnnotation = () => {
    if (newAnnotation?.text?.trim()) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = {
        ...updatedImages?.[selectedImageIndex],
        annotations: [
          ...(updatedImages?.[selectedImageIndex]?.annotations || []),
          {
            id: Date.now(),
            ...newAnnotation,
            text: newAnnotation?.text?.trim(),
          },
        ],
      };

      onUpdateImages(updatedImages);
      setNewAnnotation({ x: 50, y: 50, text: "", type: "repair" });
      setShowAddAnnotation(false);
    }
  };

  const handleRemoveAnnotation = (annotationId) => {
    const updatedImages = [...images];
    updatedImages[selectedImageIndex] = {
      ...updatedImages?.[selectedImageIndex],
      annotations: updatedImages?.[selectedImageIndex]?.annotations?.filter((ann) => ann?.id !== annotationId) || [],
    };

    onUpdateImages(updatedImages);
  };

  const handleAddImage = () => {
    // Mock adding a new image
    const newImage = {
      id: Date.now(),
      url: "https://images.unsplash.com/photo-1622322450583-43da30ea2d53",
      alt: "Nueva imagen del vehículo agregada por el usuario",
      annotations: [],
    };

    onUpdateImages([...images, newImage]);
  };

  const selectedImage = images?.[selectedImageIndex];
  const getAnnotationType = (type) => annotationTypes?.find((t) => t?.id === type) || annotationTypes?.[0];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Icon name="Image" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Imágenes y Anotaciones</h3>
              <p className="text-sm text-muted-foreground">Marca áreas específicas para ilustrar necesidades de reparación</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAddImage} iconName="Plus" iconPosition="left">
              Agregar Imagen
            </Button>
            <Button
              variant={showAddAnnotation ? "destructive" : "primary"}
              size="sm"
              onClick={() => setShowAddAnnotation(!showAddAnnotation)}
              iconName={showAddAnnotation ? "X" : "MapPin"}
              iconPosition="left"
            >
              {showAddAnnotation ? "Cancelar" : "Agregar Anotación"}
            </Button>
          </div>
        </div>

        {/* Image Selector */}
        {images?.length > 1 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {images?.map((image, index) => (
              <button
                key={image?.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-colors ${
                  selectedImageIndex === index ? "border-primary" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={image?.url} alt={image?.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main Image Display */}
        {selectedImage && (
          <div className="relative">
            <div className={`relative bg-muted rounded-lg overflow-hidden ${showAddAnnotation ? "cursor-crosshair" : "cursor-default"}`} onClick={handleImageClick}>
              <img src={selectedImage?.url} alt={selectedImage?.alt} className="w-full max-h-96 object-contain" draggable={false} />

              {/* Existing Annotations */}
              {selectedImage?.annotations?.map((annotation) => {
                const annotationType = getAnnotationType(annotation?.type);
                return (
                  <div
                    key={annotation?.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${annotation?.x}%`,
                      top: `${annotation?.y}%`,
                    }}
                  >
                    <div className={`w-4 h-4 ${annotationType?.color} rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center`}>
                      <Icon name={annotationType?.icon} size={8} className="text-white" />
                    </div>
                    {/* Annotation Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-foreground text-background text-xs rounded px-2 py-1 whitespace-nowrap max-w-48 text-center">
                        {annotation?.text}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleRemoveAnnotation(annotation?.id);
                      }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Icon name="X" size={8} />
                    </button>
                  </div>
                );
              })}

              {/* New Annotation Preview */}
              {showAddAnnotation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${newAnnotation?.x}%`,
                    top: `${newAnnotation?.y}%`,
                  }}
                >
                  <div className={`w-4 h-4 ${getAnnotationType(newAnnotation?.type)?.color} rounded-full border-2 border-white shadow-lg opacity-70`}>
                    <Icon name={getAnnotationType(newAnnotation?.type)?.icon} size={8} className="text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            {showAddAnnotation && (
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Icon name="Info" size={16} />
                  <span>Haz clic en la imagen para colocar una anotación en esa ubicación</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add Annotation Form */}
        {showAddAnnotation && (
          <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
            <h4 className="font-medium text-foreground mb-4">Nueva Anotación</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de Anotación</label>
                <select
                  value={newAnnotation?.type}
                  onChange={(e) => setNewAnnotation((prev) => ({ ...prev, type: e?.target?.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {annotationTypes?.map((type) => (
                    <option key={type?.id} value={type?.id}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                type="text"
                value={newAnnotation?.text}
                onChange={(e) => setNewAnnotation((prev) => ({ ...prev, text: e?.target?.value }))}
                placeholder="Descripción de la anotación..."
                label="Descripción"
                required
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setShowAddAnnotation(false)}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddAnnotation} iconName="MapPin" iconPosition="left" disabled={!newAnnotation?.text?.trim()}>
                Agregar Anotación
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Annotations List */}
      {selectedImage?.annotations?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Lista de Anotaciones</h3>

          <div className="space-y-3">
            {selectedImage?.annotations?.map((annotation, index) => {
              const annotationType = getAnnotationType(annotation?.type);
              return (
                <div key={annotation?.id} className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                  <div className={`w-6 h-6 ${annotationType?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon name={annotationType?.icon} size={12} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{annotationType?.label}</span>
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{annotation?.text}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveAnnotation(annotation?.id)} iconName="Trash2" className="text-destructive hover:text-destructive flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnnotation;
