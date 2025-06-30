import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";
import imageUrl1820 from "@assets/1820_1750610169459.png";
import {
  CreditCard,
  Smartphone,
  Phone,
  Car,
  ClipboardList,
  FileText,
  Info,
} from "lucide-react";
import { useLocation } from "wouter";
import asbancLogo from "@assets/Asbanc_1750611947153.png";

interface LandingScreenProps {
  onNext: () => void;
}

const services = [
  {
    icon: CreditCard,
    title: "Bloqueo de tarjetas y cuentas",
    description:
      "Protege tus productos bancarios de manera inmediata ante robos o fraudes.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Smartphone,
    title: "Bloqueo de apps",
    description:
      "Desactiva el acceso a aplicaciones bancarias móviles de forma segura.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Phone,
    title: "Bloqueo de número de teléfono",
    description:
      "Evita el uso fraudulento de tu línea telefónica para transacciones.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Car,
    title: "Denuncia policial",
    description:
      "Facilita el proceso de denuncia ante las autoridades competentes.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: ClipboardList,
    title: "Registro de reclamo",
    description:
      "Documenta y da seguimiento a tus reclamos de manera eficiente.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: FileText,
    title: "Trámite de duplicado de documentos",
    description:
      "Obtén copias de tus documentos importantes de forma rápida y segura.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Info,
    title: "Información relevante",
    description:
      "Mantente informado sobre las últimas actualizaciones y consejos de seguridad.",
    color: "bg-teal-100 text-teal-600",
  },
];

export default function LandingScreen({ onNext }: LandingScreenProps) {
  const [, setLocation] = useLocation();

  const handleServiceClick = (serviceTitle: string) => {
    switch (serviceTitle) {
      case "Bloqueo de tarjetas y cuentas": {
        /*setLocation("/coming-soon/Bloqueo de tarjetas y cuentas");*/
        onNext();
        break;
      }
      case "Bloqueo de apps": {
        setLocation("/coming-soon/Bloqueo de apps");
        break;
      }
      case "Bloqueo de número de teléfono": {
        setLocation("/coming-soon/Bloqueo de número de teléfono");
        break;
      }
      case "Denuncia policial": {
        setLocation("/coming-soon/Denuncia policial");
        break;
      }
      case "Registro de reclamo": {
        setLocation("/coming-soon/Registro de reclamo");
        break;
      }
      case "Trámite de duplicado de documentos": {
        setLocation("/coming-soon/Trámite de duplicado de documentos");
        break;
      }
      case "Información relevante": {
        setLocation("/coming-soon/Información relevante");
        break;
      }
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Protección Financiera Inmediata
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            Bloquea todas tus
            <br />
            <span className="text-primary">tarjetas y cuentas</span>
            <br />
            en un solo click
          </h1>
          <p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            Protégete contra robos y fraudes bancarios de manera rápida y segura
            con Web 1820
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: "#fbd72c",
              color: "#4b289e",
              fontFamily: "Barlow, sans-serif",
              border: "none",
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
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>

        {/* Sección ¿Cómo funciona? */}
        <div className="mt-16 md:mt-24 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            ¿Cómo funciona?
          </h2>
          <p
            className="text-lg text-gray-600 mb-8"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            Sigue estos simples pasos para bloquear tus tarjetas y productos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Paso 1 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Paso 1
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Selecciona tus tarjetas y productos que deseas bloquear.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Paso 2
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Ingresa tus datos personales.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Paso 3
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Espera la confirmación de tu bloqueo.
              </p>
            </div>

            {/* Paso 4 */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Paso 4
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Crea tu cuenta y conoce más sobre nuestros productos.
              </p>
            </div>
          </div>
        </div>

        {/* Sección Servicios */}
        <div
          className="min-h-screen bg-gray-50 py-12"
          style={{ fontFamily: "Barlow, sans-serif" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Nuestros servicios
              </h1>
              <p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Ofrecemos diversas opciones para la seguridad financiera.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleServiceClick(service.title)}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Servicio diseñado y ofrecido por Asbanc
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={asbancLogo}
                      alt="Asociación de Bancos del Perú"
                      className="w-auto h-auto max-w-full object-contain"
                      style={{ zoom: "100%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
