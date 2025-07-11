import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, UserPlus, ArrowLeft } from "lucide-react";
import { SelectedProduct } from "@/lib/types";

interface SuccessScreenProps {
  selectedProducts: SelectedProduct[];
  onCreateAccount: () => void;
  onViewServices: () => void;
  onBackToSelection: () => void;
}

export default function SuccessScreen({
  selectedProducts,
  onCreateAccount,
  onViewServices,
  onBackToSelection,
}: SuccessScreenProps) {
  const groupedProducts = selectedProducts.reduce(
    (acc, product) => {
      if (!acc[product.bank]) {
        acc[product.bank] = [];
      }
      acc[product.bank].push(product.product);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      <div className="max-w-3xl w-full">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2
                className="text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Bloqueo exitoso
              </h2>
              <p
                className="text-xl text-gray-600 mb-2"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Gracias por usar el servicio de Web 1820.
              </p>
              <p className="text-lg sm:text-sm text-gray-600 mb-2">
                * Para volver a tener acceso a tus productos, deberás contactar
                a tu entidad financiera.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Productos bloqueados exitosamente:
              </h3>
              <div className="space-y-3">
                {Object.keys(groupedProducts).length > 0 ? (
                  Object.entries(groupedProducts).map(([bank, products]) => (
                    <div
                      key={bank}
                      className="flex items-start p-3 bg-white rounded-lg border border-green-200"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {bank}
                        </div>
                        <div className="text-sm text-gray-600">
                          {products.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No hay productos seleccionados.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Crea una cuenta para conocer más de tu registro
              </h3>
              <p className="text-gray-600 mb-4">
                Si aún no creaste una cuenta, puedes hacerlo ahora y tener
                acceso detallado de tus solicitudes cuando lo necesites.
              </p>
              <Button
                onClick={onCreateAccount}
                className="font-semibold px-6 py-3"
                style={{
                  backgroundColor: "#4b289e",
                  color: "#fbd72c",
                  fontFamily: "Barlow, sans-serif",
                  border: "none",
                }}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Crea una cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
