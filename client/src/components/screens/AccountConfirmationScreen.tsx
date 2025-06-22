import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { UserData } from "@/lib/types";

interface AccountConfirmationScreenProps {
  userData: UserData;
  onViewServices: () => void;
}

export default function AccountConfirmationScreen({
  userData,
  onViewServices
}: AccountConfirmationScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Creación de cuenta exitosa
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-sm font-medium text-gray-500">Usuario:</span>
                  <div className="font-semibold text-gray-900">{userData.dni}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Correo:</span>
                  <div className="font-semibold text-gray-900">{userData.email}</div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-gray-700 mb-4">Le enviaremos la conformidad a su correo electrónico.</p>
              <p className="text-gray-700">
                ¿Tiene consultas adicionales?<br />
                Conoce todos nuestros servicios{' '}
                <button
                  onClick={onViewServices}
                  className="text-primary font-semibold hover:underline"
                >
                  aquí
                </button>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
