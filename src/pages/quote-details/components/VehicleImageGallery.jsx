import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const VehicleImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images?.length) % images?.length);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Camera" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Imágenes del Vehículo</h3>
          <p className="text-sm text-muted-foreground">{images?.length} fotografías adjuntas</p>
        </div>
      </div>
      {/* Main Image */}
      <div className="mb-4">
        <div className="relative w-full h-64 md:h-80 bg-muted rounded-lg overflow-hidden cursor-pointer group" onClick={() => openModal(selectedImage)}>
          <Image src={images?.[selectedImage]?.url} alt={images?.[selectedImage]?.alt} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-smooth flex items-center justify-center">
            <Icon name="ZoomIn" size={32} color="white" className="opacity-0 group-hover:opacity-100 transition-smooth" />
          </div>
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {selectedImage + 1} / {images?.length}
          </div>
        </div>
      </div>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`relative w-full h-16 bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-smooth ${
              selectedImage === index ? "border-primary" : "border-transparent hover:border-border"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image src={image?.url} alt={image?.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image src={images?.[selectedImage]?.url} alt={images?.[selectedImage]?.alt} className="max-w-full max-h-full object-contain" />

            {/* Navigation Buttons */}
            {images?.length > 1 && (
              <>
                <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75 w-12 h-12">
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75 w-12 h-12">
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}

            {/* Close Button */}
            <Button variant="ghost" size="icon" onClick={closeModal} className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-75 w-12 h-12">
              <Icon name="X" size={24} />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {selectedImage + 1} de {images?.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;
