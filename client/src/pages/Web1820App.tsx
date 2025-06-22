import { useState } from "react";
import { UserData, SelectedProduct, Screen } from "@/lib/types";
import LandingScreen from "@/components/screens/LandingScreen";
import ProductSelectionScreen from "@/components/screens/ProductSelectionScreen";
import PersonalDataScreen from "@/components/screens/PersonalDataScreen";
import ProcessingScreen from "@/components/screens/ProcessingScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import AccountCreationScreen from "@/components/screens/AccountCreationScreen";
import AccountConfirmationScreen from "@/components/screens/AccountConfirmationScreen";
import ServicesScreen from "@/components/screens/ServicesScreen";

export default function Web1820App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(1);
  const [userData, setUserData] = useState<UserData>({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    email: ''
  });
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const updateSelectedProducts = (products: SelectedProduct[]) => {
    setSelectedProducts(products);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <LandingScreen onNext={() => goToScreen(2)} />;
      case 2:
        return (
          <ProductSelectionScreen
            selectedProducts={selectedProducts}
            onProductsChange={updateSelectedProducts}
            onNext={() => goToScreen(3)}
          />
        );
      case 3:
        return (
          <PersonalDataScreen
            userData={userData}
            onUserDataChange={updateUserData}
            onNext={() => goToScreen(4)}
          />
        );
      case 4:
        return <ProcessingScreen onComplete={() => goToScreen(5)} />;
      case 5:
        return (
          <SuccessScreen
            selectedProducts={selectedProducts}
            onCreateAccount={() => goToScreen(6)}
            onViewServices={() => goToScreen(8)}
          />
        );
      case 6:
        return (
          <AccountCreationScreen
            userData={userData}
            onUserDataChange={updateUserData}
            onNext={() => goToScreen(7)}
          />
        );
      case 7:
        return (
          <AccountConfirmationScreen
            userData={userData}
            onViewServices={() => goToScreen(8)}
          />
        );
      case 8:
        return <ServicesScreen onGoHome={() => goToScreen(1)} />;
      default:
        return <LandingScreen onNext={() => goToScreen(2)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fade-in">
        {renderScreen()}
      </div>
    </div>
  );
}
