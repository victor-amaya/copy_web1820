import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowRight } from "lucide-react";
import { UserData } from "@/lib/types";

interface PersonalDataScreenProps {
  userData: UserData;
  onUserDataChange: (data: Partial<UserData>) => void;
  onNext: () => void;
}

export default function PersonalDataScreen({
  userData,
  onUserDataChange,
  onNext
}: PersonalDataScreenProps) {
  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';

    if (!value.trim()) {
      error = 'Este campo es obligatorio';
    } else {
      switch (name) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Ingresa un correo válido';
          }
          break;
        case 'dni':
          if (!/^\d{8}$/.test(value)) {
            error = 'El DNI debe tener 8 dígitos';
          }
          break;
        case 'celular':
          if (!/^\d{9}$/.test(value)) {
            error = 'El celular debe tener 9 dígitos';
          }
          break;
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    const requiredFields = ['nombres', 'apellidos', 'dni', 'celular', 'email'];
    const allValid = requiredFields.every(field => {
      const value = formData[field as keyof UserData] || '';
      return value.trim() && !errors[field];
    });
    setIsValid(allValid);
  }, [formData, errors]);

  const handleNext = () => {
    onUserDataChange(formData);
    onNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>Deja tus datos</h2>
              <p className="text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Para proceder con el bloqueo de tus productos seleccionados</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="nombres" className="text-sm font-medium text-gray-700">
                  Nombres *
                </Label>
                <Input
                  id="nombres"
                  type="text"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                  placeholder="Ingresa tus nombres"
                  className={`mt-1 ${errors.nombres ? 'border-red-500' : formData.nombres ? 'border-green-500' : ''}`}
                />
                {errors.nombres && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombres}</p>
                )}
              </div>

              <div>
                <Label htmlFor="apellidos" className="text-sm font-medium text-gray-700">
                  Apellidos *
                </Label>
                <Input
                  id="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="Ingresa tus apellidos"
                  className={`mt-1 ${errors.apellidos ? 'border-red-500' : formData.apellidos ? 'border-green-500' : ''}`}
                />
                {errors.apellidos && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dni" className="text-sm font-medium text-gray-700">
                  DNI *
                </Label>
                <Input
                  id="dni"
                  type="text"
                  value={formData.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  placeholder="########"
                  maxLength={8}
                  className={`mt-1 ${errors.dni ? 'border-red-500' : formData.dni ? 'border-green-500' : ''}`}
                />
                {errors.dni && (
                  <p className="text-red-500 text-sm mt-1">{errors.dni}</p>
                )}
              </div>

              <div>
                <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
                  Celular *
                </Label>
                <Input
                  id="celular"
                  type="tel"
                  value={formData.celular}
                  onChange={(e) => handleInputChange('celular', e.target.value)}
                  placeholder="#########"
                  maxLength={9}
                  className={`mt-1 ${errors.celular ? 'border-red-500' : formData.celular ? 'border-green-500' : ''}`}
                />
                {errors.celular && (
                  <p className="text-red-500 text-sm mt-1">{errors.celular}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="xxx@xxxmail.com"
                  className={`mt-1 ${errors.email ? 'border-red-500' : formData.email ? 'border-green-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                disabled={!isValid}
                size="lg"
                className={`px-8 py-3 font-semibold transition-all duration-200 ${
                  !isValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
                }`}
                style={isValid ? { 
                  backgroundColor: '#4b289e', 
                  color: '#fbd72c', 
                  fontFamily: 'Barlow, sans-serif',
                  border: 'none'
                } : { fontFamily: 'Barlow, sans-serif' }}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Siguiente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
