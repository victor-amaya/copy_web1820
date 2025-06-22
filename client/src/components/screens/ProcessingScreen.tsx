import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingScreenProps {
  onComplete: () => void;
}

const processingMessages = [
  'Iniciando proceso de bloqueo...',
  'Contactando con las entidades financieras...',
  'Validando información de productos...',
  'Procesando solicitudes de bloqueo...',
  'Confirmando bloqueos exitosos...',
  'Finalizando proceso...'
];

const infoMessages = [
  'Gracias por tu paciencia. Estamos procesando tu solicitud.',
  'Estamos procesando tu solicitud, no cierres la ventana.',
  'Este proceso es 100% seguro. Respaldado por la Asociación de Bancos del Perú.',
  'Una vez realizado el bloqueo, recibirás un correo de confirmación.'
];

export default function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        const next = prev + 1;
        const newProgress = ((next) / processingMessages.length) * 100;
        setProgress(newProgress);
        
        if (next >= processingMessages.length) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return prev;
        }
        return next;
      });
    }, 2000);

    // Rotate info messages
    const infoInterval = setInterval(() => {
      setCurrentInfoIndex(prev => (prev + 1) % infoMessages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(infoInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-2xl w-full text-center">
        <Card className="shadow-xl">
          <CardContent className="p-12">
            <div className="mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>Solicitud recibida</h2>
              <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: 'Barlow, sans-serif' }}>Estamos procediendo a realizar el bloqueo solicitado.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="text-gray-700 font-medium text-lg mb-4">
                {processingMessages[currentMessageIndex]}
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>

            <div className="text-sm text-gray-500">
              <p className="fade-in">{infoMessages[currentInfoIndex]}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
