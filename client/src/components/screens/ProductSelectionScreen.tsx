import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ArrowRight } from "lucide-react";
import { SelectedProduct, Bank } from "@/lib/types";
import bbvaLogo from "@assets/BBVA_1750611748261.png";

interface ProductSelectionScreenProps {
  selectedProducts: SelectedProduct[];
  onProductsChange: (products: SelectedProduct[]) => void;
  onNext: () => void;
}

const banks: Bank[] = [
  { code: 'bcp', name: 'Banco de Crédito', color: 'bg-blue-600', shortName: 'BCP' },
  { code: 'bbva', name: 'BBVA', color: 'bg-blue-700', shortName: 'BBVA' },
  { code: 'interbank', name: 'Interbank', color: 'bg-teal-600', shortName: 'IB' },
  { code: 'scotiabank', name: 'Scotiabank', color: 'bg-red-600', shortName: 'SB' }
];

const productTypes = [
  { key: 'credit' as const, label: 'Todas mis Tarjetas de crédito' },
  { key: 'debit' as const, label: 'Todas mis Tarjetas de Débito' },
  { key: 'apps' as const, label: 'Todos mis aplicativos' },
  { key: 'wallet' as const, label: 'Todas mis billeteras digitales' }
];

export default function ProductSelectionScreen({
  selectedProducts,
  onProductsChange,
  onNext
}: ProductSelectionScreenProps) {
  const [localProducts, setLocalProducts] = useState<SelectedProduct[]>(selectedProducts);

  useEffect(() => {
    onProductsChange(localProducts);
  }, [localProducts, onProductsChange]);

  const isProductSelected = (bankCode: string, productType: string) => {
    return localProducts.some(p => p.bankCode === bankCode && p.productType === productType);
  };

  const toggleProduct = (bank: Bank, productType: typeof productTypes[0]) => {
    const productKey = `${bank.code}-${productType.key}`;
    const isSelected = isProductSelected(bank.code, productType.key);

    if (isSelected) {
      setLocalProducts(prev => 
        prev.filter(p => !(p.bankCode === bank.code && p.productType === productType.key))
      );
    } else {
      const newProduct: SelectedProduct = {
        bank: bank.name,
        bankCode: bank.code,
        product: productType.label,
        productType: productType.key
      };
      setLocalProducts(prev => [...prev, newProduct]);
    }
  };

  const handleNext = () => {
    if (localProducts.length === 0) {
      alert('Por favor selecciona al menos un producto para bloquear');
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-5xl w-full">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Selecciona las entidades financieras y productos que deseas bloquear
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Barlow, sans-serif' }}>Marca todas las opciones que correspondan a tus productos bancarios</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b">
                      Entidad Financiera
                    </th>
                    {productTypes.map(product => (
                      <th key={product.key} className="text-center py-4 px-4 font-semibold text-gray-900 border-b min-w-[140px]">
                        {product.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {banks.map((bank, index) => (
                    <tr key={bank.code} className="hover:bg-gray-50 transition-colors">
                      <td className={`py-4 px-6 ${index < banks.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex items-center">
                          {bank.code === 'bbva' ? (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-white">
                              <img 
                                src={bbvaLogo} 
                                alt="BBVA" 
                                className="w-8 h-auto object-contain"
                              />
                            </div>
                          ) : (
                            <div className={`w-10 h-10 ${bank.color} rounded-lg flex items-center justify-center mr-3`}>
                              <span className="text-white font-bold text-sm">{bank.shortName}</span>
                            </div>
                          )}
                          <span className="font-medium">{bank.name}</span>
                        </div>
                      </td>
                      {productTypes.map(product => (
                        <td key={`${bank.code}-${product.key}`} className={`text-center py-4 px-4 ${index < banks.length - 1 ? 'border-b' : ''}`}>
                          <div className="flex justify-center">
                            <Checkbox
                              checked={isProductSelected(bank.code, product.key)}
                              onCheckedChange={() => toggleProduct(bank, product)}
                              className="w-5 h-5"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                size="lg"
                className="font-semibold px-8 py-3"
                style={{ 
                  backgroundColor: '#4b289e', 
                  color: '#fbd72c', 
                  fontFamily: 'Barlow, sans-serif',
                  border: 'none'
                }}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Siguiente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
