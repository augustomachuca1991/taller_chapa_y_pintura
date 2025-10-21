import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ImageUploadSection = ({ images = [], onImagesChange, maxImages = 6, errors = {} }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter((file) => file?.type?.startsWith("image/"));

    if (images?.length + imageFiles?.length > maxImages) {
      alert(`Solo puedes subir un máximo de ${maxImages} imágenes`);
      return;
    }

    const newImages = [];
    let processedCount = 0;

    imageFiles?.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages?.push({
          id: Date.now() + Math.random(),
          file: file,
          url: e?.target?.result,
          name: file?.name,
          size: file?.size,
        });

        processedCount++;
        if (processedCount === imageFiles?.length) {
          onImagesChange([...images, ...newImages]);
        }
      };
      reader?.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    const updatedImages = images?.filter((img) => img?.id !== imageId);
    onImagesChange(updatedImages);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + " " + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-foreground font-bold text-sm">2</span>
        </div>
        Imágenes del Vehículo
      </h2>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Sube fotos de tu vehículo</h3>
            <p className="text-muted-foreground mb-4">Arrastra y suelta las imágenes aquí o haz clic para seleccionar</p>

            <Button variant="outline" onClick={openFileDialog} iconName="Camera" iconPosition="left">
              Seleccionar Imágenes
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Máximo {maxImages} imágenes • JPG, PNG • Máximo 5MB por imagen</p>
          <p className="mt-1">Incluye fotos del problema, daños externos e internos del vehículo</p>
        </div>
      </div>
      {errors?.images && <p className="mt-2 text-sm text-error">{errors?.images}</p>}
      {/* Image Preview Grid */}
      {images?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Imágenes Subidas ({images?.length}/{maxImages})
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images?.map((image) => (
              <div key={image?.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                  <Image src={image?.url} alt={`Imagen del vehículo ${image?.name}`} className="w-full h-full object-cover" />
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeImage(image?.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </Button>

                <div className="mt-2">
                  <p className="text-xs text-muted-foreground truncate">{image?.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(image?.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <h4 className="font-medium text-accent mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Consejos para mejores fotos
        </h4>
        <ul className="text-sm text-accent space-y-1">
          <li>• Toma fotos con buena iluminación natural</li>
          <li>• Incluye diferentes ángulos del problema</li>
          <li>• Muestra el contexto general del vehículo</li>
          <li>• Enfoca claramente las áreas dañadas</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploadSection;
