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

        <div className="flex justify-center mt-12">
          <div className="relative">
            <img 
              src={imageUrl1820} 
              alt="Web 1820 - Sistema de bloqueo de productos bancarios" 
              className="max-w-full h-auto rounded-lg shadow-2xl"
              style={{ maxWidth: '800px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
