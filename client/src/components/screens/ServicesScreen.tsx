import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  Smartphone, 
  Phone, 
  Car, 
  ClipboardList, 
  FileText, 
  Info, 
  Home 
} from "lucide-react";

interface ServicesScreenProps {
  onGoHome: () => void;
}

const services = [
  {
    icon: CreditCard,
    title: "Bloqueo de tarjetas y cuentas",
    description: "Protege tus productos bancarios de manera inmediata ante robos o fraudes.",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Smartphone,
    title: "Bloqueo de apps",
    description: "Desactiva el acceso a aplicaciones bancarias móviles de forma segura.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Phone,
    title: "Bloqueo de número de teléfono",
    description: "Evita el uso fraudulento de tu línea telefónica para transacciones.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Car,
    title: "Denuncia policial",
    description: "Facilita el proceso de denuncia ante las autoridades competentes.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: ClipboardList,
    title: "Registro de reclamo",
    description: "Documenta y da seguimiento a tus reclamos de manera eficiente.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: FileText,
    title: "Trámite de duplicado de documentos",
    description: "Obtén copias de tus documentos importantes de forma rápida y segura.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Info,
    title: "Información relevante",
    description: "Mantente informado sobre las últimas actualizaciones y consejos de seguridad.",
    color: "bg-teal-100 text-teal-600"
  }
];

export default function ServicesScreen({ onGoHome }: ServicesScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros servicios</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos diversas opciones para la seguridad financiera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Servicio diseñado y ofrecido por Asbanc</p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AB</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Asociación de</div>
                  <div className="font-semibold text-primary">Bancos del Perú</div>
                </div>
              </div>
            </div>

            <Button
              onClick={onGoHome}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
