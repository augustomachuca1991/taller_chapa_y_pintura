import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const appName = import.meta.env.VITE_APP_NAME || "AutoShop Pro";

  // Mock user data for demonstration
  const mockUsers = [
    {
      email: "correo@ejemplo.com",
      password: "password123",
      phone: "+34 600 000 000",
      name: "María García",
    },
    {
      email: "cliente@test.com",
      password: "test123",
      phone: "+34 600 111 222",
      name: "Juan Pérez",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData?.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with mock authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if user exists in mock data
      const user = mockUsers?.find((u) => u?.email === formData?.email && u?.password === formData?.password);

      if (user) {
        // Simulate storing user session
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: Math.random()?.toString(36)?.substr(2, 9),
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            loginTime: new Date()?.toISOString(),
          })
        );

        // Navigate to customer dashboard
        navigate("/customer-dashboard");
      } else {
        setErrors({
          submit: "Credenciales incorrectas. Intenta nuevamente.",
        });
      }
    } catch (error) {
      setErrors({
        submit: "Error al iniciar sesión. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userEmail) => {
    const user = mockUsers?.find((u) => u?.email === userEmail);
    if (user) {
      setFormData({
        email: user?.email,
        password: user?.password,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Icon name="Car" size={40} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{appName}</h1>
          <p className="text-muted-foreground">Inicia sesión para acceder a tu cuenta de cliente</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Iniciar Sesión</h2>
            <p className="text-sm text-muted-foreground">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Demo Credentials */}
          {/* <div className="mb-6 p-4 bg-muted/50 border border-border rounded-md">
            <p className="text-sm font-medium text-foreground mb-2">🔧 Credenciales de prueba:</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("correo@ejemplo.com")}
                className="w-full text-left text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded hover:bg-muted/50"
              >
                📧 <strong>correo@ejemplo.com</strong> / password123
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("cliente@test.com")}
                className="w-full text-left text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded hover:bg-muted/50"
              >
                📧 <strong>cliente@test.com</strong> / test123
              </button>
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <Input type="email" name="email" label="Correo Electrónico" placeholder="tu.correo@ejemplo.com" value={formData?.email} onChange={handleInputChange} error={errors?.email} required />

            {/* Password */}
            <Input type="password" name="password" label="Contraseña" placeholder="••••••••" value={formData?.password} onChange={handleInputChange} error={errors?.password} required />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e?.target?.checked)}
                  className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <span className="text-sm text-foreground">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Error */}
            {errors?.submit && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{errors?.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading} iconName="LogIn" iconPosition="left">
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">O</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link to="/customer-registration" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon name="Users" size={16} />
              Acceso Rápido
            </h3>
            <div className="space-y-2">
              <Button variant="outline" fullWidth onClick={() => navigate("/workshop-dashboard")} iconName="Wrench" iconPosition="left" iconSize={16}>
                Acceso Taller
              </Button>
              <Button variant="ghost" fullWidth onClick={() => navigate("/quote-request-form")} iconName="FileText" iconPosition="left" iconSize={16}>
                Solicitar Cotización sin Registro
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas ayuda?{" "}
              <a href="mailto:soporte@autoshoppro.es" className="text-primary hover:text-primary/80 transition-colors">
                Contacta soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
