import { Button } from "@/components/ui/button";
import { Shield, Lock, CreditCard, Smartphone } from "lucide-react";

interface LandingScreenProps {
  onNext: () => void;
}

export default function LandingScreen({ onNext }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Protección Financiera Inmediata
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bloquea todas tus<br />
            <span className="text-primary">tarjetas y cuentas</span><br />
            en un solo click
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protégete contra robos y fraudes bancarios de manera rápida y segura con Web 1820
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Lock className="w-5 h-5 mr-2" />
            Bloquea aquí
          </Button>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative">
            <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                <div className="bg-primary h-24 relative">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex justify-between items-center text-white">
                      <div className="w-4 h-4 border border-white/50 rounded"></div>
                      <span className="font-semibold">Mi Banco</span>
                      <div className="w-4 h-4 border border-white/50 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Saldo disponible</div>
                    <div className="font-bold text-lg">S/ 2,450.00</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <CreditCard className="w-3 h-3 text-white" />
                        </div>
                        <div className="ml-2">
                          <div className="text-xs font-medium">Tarjeta Débito</div>
                          <div className="text-xs text-gray-500">**** 1234</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-3 h-3 text-white" />
                        </div>
                        <div className="ml-2">
                          <div className="text-xs font-medium">App Móvil</div>
                          <div className="text-xs text-gray-500">Activa</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
