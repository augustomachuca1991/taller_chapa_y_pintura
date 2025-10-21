import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptPrivacy: false,
    receiveNotifications: true,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const appName = import.meta.env.VITE_APP_NAME || "AutoShop Pro";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = "El nombre es obligatorio";
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = "El apellido es obligatorio";
    }

    if (!formData?.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData?.phone) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\+?[1-9]\d{8,14}$/?.test(formData?.phone?.replace(/\s/g, ""))) {
      newErrors.phone = "Ingresa un número de teléfono válido (ej: +34 600 000 000)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData?.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = "Debe contener al menos una mayúscula, una minúscula y un número";
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    if (!formData?.acceptPrivacy) {
      newErrors.acceptPrivacy = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful registration
      const newUser = {
        id: Math.random()?.toString(36)?.substr(2, 9),
        email: formData?.email,
        name: `${formData?.firstName} ${formData?.lastName}`,
        phone: formData?.phone,
        registrationDate: new Date()?.toISOString(),
        vehicles: [],
        serviceRequests: [],
      };

      // Store user data
      localStorage.setItem("user", JSON.stringify(newUser));

      // Show success message and navigate
      navigate("/customer-dashboard", {
        state: {
          message: "¡Registro exitoso! Bienvenido a AutoShop Pro.",
          type: "success",
        },
      });
    } catch (error) {
      setErrors({
        submit: "Error al registrar usuario. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={40} className="text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Únete a {appName}</h1>
          <p className="text-muted-foreground">Crea tu cuenta para gestionar tus vehículos y servicios</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                1
              </div>
              <span className="text-sm font-medium">Información Personal</span>
            </div>

            <div className="flex-1 mx-4 h-px bg-border"></div>

            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                2
              </div>
              <span className="text-sm font-medium">Seguridad y Términos</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Información Personal</h2>
                  <p className="text-sm text-muted-foreground">Completa tus datos personales para crear tu cuenta</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <Input type="text" name="firstName" label="Nombre" placeholder="Tu nombre" value={formData?.firstName} onChange={handleInputChange} error={errors?.firstName} required />

                  {/* Last Name */}
                  <Input type="text" name="lastName" label="Apellidos" placeholder="Tus apellidos" value={formData?.lastName} onChange={handleInputChange} error={errors?.lastName} required />
                </div>

                {/* Email */}
                <Input
                  type="email"
                  name="email"
                  label="Correo Electrónico"
                  placeholder="tu.correo@ejemplo.com"
                  value={formData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  description="Utilizaremos este correo para notificaciones importantes"
                  required
                />

                {/* Phone */}
                <Input
                  type="tel"
                  name="phone"
                  label="Teléfono"
                  placeholder="+34 600 000 000"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  error={errors?.phone}
                  description="Incluye el código de país (ej: +34 para España)"
                  required
                />

                <Button type="button" variant="primary" size="lg" fullWidth onClick={handleNextStep} iconName="ChevronRight" iconPosition="right">
                  Continuar
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Seguridad y Términos</h2>
                  <p className="text-sm text-muted-foreground">Configura tu contraseña y acepta nuestros términos</p>
                </div>

                {/* Password */}
                <Input
                  type="password"
                  name="password"
                  label="Contraseña"
                  placeholder="••••••••••••"
                  value={formData?.password}
                  onChange={handleInputChange}
                  error={errors?.password}
                  description="Mínimo 8 caracteres con mayúsculas, minúsculas y números"
                  required
                />

                {/* Confirm Password */}
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  placeholder="••••••••••••"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  required
                />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData?.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <div className="flex-1">
                      <label className="text-sm text-foreground">
                        Acepto los{" "}
                        <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                          términos y condiciones
                        </Link>{" "}
                        de uso de AutoShop Pro
                        <span className="text-destructive ml-1">*</span>
                      </label>
                      {errors?.acceptTerms && <p className="text-sm text-destructive mt-1">{errors?.acceptTerms}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="acceptPrivacy"
                      checked={formData?.acceptPrivacy}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <div className="flex-1">
                      <label className="text-sm text-foreground">
                        Acepto la{" "}
                        <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                          política de privacidad
                        </Link>
                        <span className="text-destructive ml-1">*</span>
                      </label>
                      {errors?.acceptPrivacy && <p className="text-sm text-destructive mt-1">{errors?.acceptPrivacy}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="receiveNotifications"
                      checked={formData?.receiveNotifications}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <label className="text-sm text-foreground">Deseo recibir notificaciones sobre el estado de mis servicios y promociones especiales</label>
                  </div>
                </div>

                {/* Submit Error */}
                {errors?.submit && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">{errors?.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={handlePreviousStep} iconName="ChevronLeft" iconPosition="left" className="flex-1">
                    Anterior
                  </Button>

                  <Button type="submit" variant="primary" size="lg" className="flex-1" loading={isLoading} iconName="UserCheck" iconPosition="left">
                    {isLoading ? "Registrando..." : "Crear Cuenta"}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              ¿Ya tienes cuenta?{" "}
              <Link to="/customer-login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Star" size={16} />
            Beneficios de tu cuenta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Icon name="FileText" size={24} className="text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Gestión de Solicitudes</p>
              <p className="text-xs text-muted-foreground">Solicita y gestiona cotizaciones fácilmente</p>
            </div>
            <div className="text-center">
              <Icon name="Calendar" size={24} className="text-success mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Citas Online</p>
              <p className="text-xs text-muted-foreground">Programa y gestiona tus citas de servicio</p>
            </div>
            <div className="text-center">
              <Icon name="History" size={24} className="text-warning mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Historial Completo</p>
              <p className="text-xs text-muted-foreground">Accede al historial de todos tus vehículos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
