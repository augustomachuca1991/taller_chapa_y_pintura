import React, { useEffect } from "react";
import Icon from "../../../components/AppIcon";

const PasswordStrengthIndicator = ({ password, strength, onStrengthChange }) => {
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return score;

    // Length check
    if (password?.length >= 8) score += 1;
    if (password?.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/?.test(password)) score += 1;
    if (/[A-Z]/?.test(password)) score += 1;
    if (/\d/?.test(password)) score += 1;
    if (/[^a-zA-Z\d]/?.test(password)) score += 1;

    // Bonus for very strong passwords
    if (password?.length >= 16 && score >= 5) score += 1;

    return Math.min(score, 5);
  };

  const currentStrength = calculatePasswordStrength(password);

  // Notify parent of strength change
  React.useEffect(() => {
    if (onStrengthChange) {
      onStrengthChange(currentStrength);
    }
  }, [currentStrength, onStrengthChange]);

  const getStrengthText = () => {
    const texts = ["Muy débil", "Débil", "Regular", "Buena", "Fuerte", "Muy fuerte"];
    return texts?.[currentStrength] || "Muy débil";
  };

  const getStrengthColor = () => {
    const colors = ["bg-red-500", "bg-red-400", "bg-yellow-500", "bg-blue-500", "bg-green-500", "bg-green-600"];
    return colors?.[currentStrength] || "bg-gray-300";
  };

  const getRequirements = () => {
    return [
      {
        text: "Al menos 8 caracteres",
        met: password?.length >= 8,
        icon: password?.length >= 8 ? "Check" : "X",
      },
      {
        text: "Contiene minúsculas (a-z)",
        met: /[a-z]/?.test(password),
        icon: /[a-z]/?.test(password) ? "Check" : "X",
      },
      {
        text: "Contiene mayúsculas (A-Z)",
        met: /[A-Z]/?.test(password),
        icon: /[A-Z]/?.test(password) ? "Check" : "X",
      },
      {
        text: "Contiene números (0-9)",
        met: /\d/?.test(password),
        icon: /\d/?.test(password) ? "Check" : "X",
      },
      {
        text: "Contiene símbolos (!@#$...)",
        met: /[^a-zA-Z\d]/?.test(password),
        icon: /[^a-zA-Z\d]/?.test(password) ? "Check" : "X",
      },
    ];
  };

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Seguridad de la contraseña:</span>
          <span className={`text-xs font-medium ${currentStrength >= 4 ? "text-green-600" : currentStrength >= 2 ? "text-yellow-600" : "text-red-600"}`}>{getStrengthText()}</span>
        </div>

        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4]?.map((level) => (
            <div key={level} className={`flex-1 h-2 rounded-full transition-all duration-300 ${level < currentStrength ? getStrengthColor() : "bg-muted"}`} />
          ))}
        </div>
      </div>
      {/* Requirements Checklist */}
      <div className="bg-muted/50 rounded-lg p-3">
        <p className="text-xs font-medium text-foreground mb-2">Requisitos de contraseña:</p>
        <div className="space-y-1">
          {getRequirements()?.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={req?.icon} size={12} className={`${req?.met ? "text-green-600" : "text-muted-foreground"}`} />
              <span className={`text-xs ${req?.met ? "text-foreground" : "text-muted-foreground"}`}>{req?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Tips */}
      {currentStrength < 3 && (
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <div className="flex items-start">
            <Icon name="AlertTriangle" size={16} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-1">Mejora tu contraseña</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">Una contraseña fuerte protege tu cuenta. Intenta usar una combinación de letras, números y símbolos.</p>
            </div>
          </div>
        </div>
      )}
      {/* Success Message */}
      {currentStrength >= 4 && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center">
            <Icon name="Shield" size={16} className="text-green-600 mr-2" />
            <p className="text-xs font-medium text-green-800 dark:text-green-200">¡Excelente! Tu contraseña es {currentStrength === 5 ? "muy fuerte" : "fuerte"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
