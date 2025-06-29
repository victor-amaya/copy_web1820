import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";
import imageUrl1820 from "@assets/1820_1750610169459.png";

interface LandingScreenProps {
  onNext: () => void;
}

export default function LandingScreen({ onNext }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Protección Financiera Inmediata
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Bloquea todas tus<br />
            <span className="text-primary">tarjetas y cuentas</span><br />
            en un solo click
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Protégete contra robos y fraudes bancarios de manera rápida y segura con Web 1820
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: '#fbd72c', 
              color: '#4b289e', 
              fontFamily: 'Barlow, sans-serif',
              border: 'none'
            }}
          >
            <Lock className="w-5 h-5 mr-2" />
            Bloquea aquí
          </Button>
        </div>

        <div className="flex justify-center mt-8 md:mt-12 px-4">
          <div className="relative w-full max-w-4xl">
            <img 
              src={imageUrl1820} 
              alt="Web 1820 - Sistema de bloqueo de productos bancarios" 
              className="w-full h-auto rounded-lg shadow-2xl object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>

        {/* Sección ¿Cómo funciona? */}
        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Sigue estos simples pasos para bloquear tus tarjetas y productos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Paso 1 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Paso 1
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Selecciona tus tarjetas...
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Paso 2
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Ingresa tus datos perso...
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Paso 3
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Espera la confirmacio...
              </p>
            </div>

            {/* Paso 4 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Paso 4
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Crea tu cuenta y co...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
