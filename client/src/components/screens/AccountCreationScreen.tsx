import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import { UserData } from "@/lib/types";

interface AccountCreationScreenProps {
  userData: UserData;
  onUserDataChange: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AccountCreationScreen({
  userData,
  onUserDataChange,
  onNext,
  onBack
}: AccountCreationScreenProps) {
  const [formData, setFormData] = useState({
    fechaNacimiento: userData.fechaNacimiento || '',
    password: userData.password || '',
    passwordConfirm: '',
    aceptaDatos: false,
    aceptaAnuncios: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string | boolean) => {
    let error = '';

    switch (name) {
      case 'fechaNacimiento':
        if (!value) {
          error = 'Este campo es obligatorio';
        } else if (typeof value === 'string') {
          const today = new Date();
          const selectedDate = new Date(value);
          if (selectedDate > today) {
            error = 'No puedes seleccionar una fecha futura';
          }
        }
        break;
      case 'password':
        if (!value) {
          error = 'Este campo es obligatorio';
        } else if (typeof value === 'string' && value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        }
        break;
      case 'passwordConfirm':
        if (!value) {
          error = 'Este campo es obligatorio';
        } else if (value !== formData.password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const requiredFields = ['fechaNacimiento', 'password', 'passwordConfirm'];
    const allFieldsValid = requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && !errors[field];
    });
    
    const requiredCheckboxValid = formData.aceptaDatos;
    
    setIsValid(allFieldsValid && requiredCheckboxValid);
  }, [formData, errors]);

  const handleNext = () => {
    // Asegurar que los datos se pasen correctamente antes de continuar
    const updatedData = {
      fechaNacimiento: formData.fechaNacimiento,
      password: formData.password
    };
    
    console.log("Account creation data:", updatedData);
    
    onUserDataChange(updatedData);
    onNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>Creación de cuenta</h2>
              <p className="text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Completa los datos adicionales para crear tu cuenta</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Nombres</Label>
                  <Input
                    type="text"
                    value={userData.nombres}
                    readOnly
                    className="mt-1 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Apellidos</Label>
                  <Input
                    type="text"
                    value={userData.apellidos}
                    readOnly
                    className="mt-1 bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">DNI</Label>
                  <Input
                    type="text"
                    value={userData.dni}
                    readOnly
                    className="mt-1 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Celular</Label>
                  <Input
                    type="text"
                    value={userData.celular}
                    readOnly
                    className="mt-1 bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Correo</Label>
                <Input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="mt-1 bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <Label htmlFor="fechaNacimiento" className="text-sm font-medium text-gray-700">
                  Fecha de nacimiento *
                </Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  className={`mt-1 ${errors.fechaNacimiento ? 'border-red-500' : formData.fechaNacimiento ? 'border-green-500' : ''}`}
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={`mt-1 ${errors.password ? 'border-red-500' : formData.password ? 'border-green-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700">
                  Valida tu contraseña *
                </Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={`mt-1 ${errors.passwordConfirm ? 'border-red-500' : formData.passwordConfirm && !errors.passwordConfirm ? 'border-green-500' : ''}`}
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="aceptaDatos"
                    checked={formData.aceptaDatos}
                    onCheckedChange={(checked) => handleCheckboxChange('aceptaDatos', !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="aceptaDatos" className="text-sm text-gray-700">
                    Aceptas compartir tus datos personales *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="aceptaAnuncios"
                    checked={formData.aceptaAnuncios}
                    onCheckedChange={(checked) => handleCheckboxChange('aceptaAnuncios', !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="aceptaAnuncios" className="text-sm text-gray-700">
                    Aceptas recibir anuncios y comunicaciones
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={onBack}
                size="lg"
                variant="outline"
                className="font-semibold px-8 py-3"
                style={{ 
                  fontFamily: 'Barlow, sans-serif',
                  borderColor: '#4b289e',
                  color: '#4b289e'
                }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Regresar
              </Button>

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
                <UserPlus className="w-5 h-5 mr-2" />
                Crear cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
