import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { SelectedProduct, Bank } from "@/lib/types";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { useEntidadesFinancieras } from "@/hooks/use-entidades-financieras";
import { ALL } from "dns";

interface ProductSelectionScreenProps {
  selectedProducts: SelectedProduct[];
  onProductsChange: (products: SelectedProduct[]) => void;
  onNext: () => void;
  onBack: () => void;
}

// Los bancos ahora se obtienen de la API

const productTypes = [
  {
    key: "credit" as const,
    label: "Todas mis Tarjetas de crédito",
    icon: <CreditCard className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 hover:bg-blue-100",
  },
  {
    key: "debit" as const,
    label: "Todas mis Tarjetas de Débito",
    icon: <CreditCard className="w-5 h-5 text-green-600" />,
    color: "bg-green-50 hover:bg-green-100",
  },
  {
    key: "apps" as const,
    label: "Todos mis aplicativos",
    icon: <Smartphone className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 hover:bg-purple-100",
  },
  {
    key: "wallet" as const,
    label: "Todas mis billeteras digitales",
    icon: <Wallet className="w-5 h-5 text-orange-600" />,
    color: "bg-orange-50 hover:bg-orange-100",
  },
];

export default function ProductSelectionScreen({
  selectedProducts,
  onProductsChange,
  onNext,
  onBack,
}: ProductSelectionScreenProps) {
  const [localProducts, setLocalProducts] =
    useState<SelectedProduct[]>(selectedProducts);

  const { data: banks = [], isLoading, error } = useEntidadesFinancieras();

  useEffect(() => {
    onProductsChange(localProducts);
  }, [localProducts, onProductsChange]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando entidades financieras...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Error al cargar las entidades financieras
          </p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  const isProductSelected = (bankCode: string, productType: string) => {
    return localProducts.some(
      (p) => p.bankCode === bankCode && p.productType === productType,
    );
  };

  const toggleProduct = (bank: Bank, productType: (typeof productTypes)[0]) => {
    const productKey = `${bank.code}-${productType.key}`;
    const isSelected = isProductSelected(bank.code, productType.key);

    if (isSelected) {
      setLocalProducts((prev) =>
        prev.filter(
          (p) =>
            !(p.bankCode === bank.code && p.productType === productType.key),
        ),
      );
    } else {
      const newProduct: SelectedProduct = {
        bank: bank.name,
        bankCode: bank.code,
        product: productType.label,
        productType: productType.key,
      };
      setLocalProducts((prev) => [...prev, newProduct]);
    }
  };

  const handleNext = () => {
    if (localProducts.length === 0) {
      alert("Por favor selecciona al menos un producto para bloquear");
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 sm:px-8 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Selecciona las entidades financieras y productos que deseas bloquear
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Marca todas las opciones que correspondan a tus productos bancarios
          </p>
          <p className="text-lg sm:text-sm text-gray-600 mb-2">
            * Para volver a tener acceso a tus productos, deberás contactar a tu
            entidad financiera.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Desktop/Tablet Table View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="font-semibold text-gray-700 text-lg">
                Entidad Financiera
              </div>
              {productTypes.map((product, index) => (
                <div key={product.key} className="text-center">
                  <Checkbox
                    onCheckedChange={(e) => {
                      banks.map((bank) => {
                        if (isProductSelected(bank.code, product.key) != e) {
                          toggleProduct(bank, productTypes[index]);
                        }
                      });
                    }}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    {product.icon}
                    <span className="font-medium text-gray-700 text-sm leading-tight">
                      {product.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {banks.map((entity, index) => (
              <div
                key={entity.name}
                className={`p-6 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      onCheckedChange={(e) =>
                        productTypes.map((product) => {
                          if (
                            isProductSelected(entity.code, product.key) != e
                          ) {
                            toggleProduct(entity, product);
                          }
                        })
                      }
                    />
                    <img
                      src={entity.logo}
                      alt={entity.name}
                      className="w-12 h-12 object-contain rounded-lg"
                      onError={(e) => {
                        console.error(
                          `Failed to load logo for ${entity.name}:`,
                          entity.logo,
                        );
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="font-semibold text-gray-800 text-lg">
                      {entity.name}
                    </span>
                  </div>

                  {productTypes.map((product) => (
                    <div key={product.key} className="flex justify-center">
                      <div
                        className={`p-3 rounded-lg ${product.color} transition-colors`}
                      >
                        <Checkbox
                          checked={isProductSelected(entity.code, product.key)}
                          onCheckedChange={() => toggleProduct(entity, product)}
                          className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {banks.map((entity) => (
            <div
              key={entity.name}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-4"
            >
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
                <Checkbox
                  onCheckedChange={() =>
                    productTypes.map((product) =>
                      toggleProduct(entity, product),
                    )
                  }
                />
                <img
                  src={entity.logo}
                  alt={entity.name}
                  className="w-10 h-10 object-contain rounded-lg"
                  onError={(e) => {
                    console.error(
                      `Failed to load logo for ${entity.name}:`,
                      entity.logo,
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-semibold text-gray-800 text-lg">
                  {entity.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {productTypes.map((product) => (
                  <div
                    key={product.key}
                    className={`p-3 rounded-lg ${product.color} transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {product.icon}
                        <span className="font-medium text-gray-700 text-sm">
                          {product.label}
                        </span>
                      </div>
                      <Checkbox
                        checked={isProductSelected(entity.code, product.key)}
                        onCheckedChange={() => toggleProduct(entity, product)}
                        className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            onClick={onBack}
            size="lg"
            variant="outline"
            className="font-semibold px-8 py-3"
            style={{
              fontFamily: "Barlow, sans-serif",
              borderColor: "#4b289e",
              color: "#4b289e",
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Regresar
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className="font-semibold px-8 py-3"
            style={{
              backgroundColor: "#4b289e",
              color: "#fbd72c",
              fontFamily: "Barlow, sans-serif",
              border: "none",
            }}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
