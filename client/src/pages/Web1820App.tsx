import { useState } from "react";
import { UserData, SelectedProduct, Screen } from "@/lib/types";
import { useCreateUser, useCreateBlockRequest } from "@/hooks/use-user-api";
import { useToast } from "@/hooks/use-toast";
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
  const [aceptaDatos, setAceptaDatos] = useState(false);
  const [aceptaAnuncios, setAceptaAnuncios] = useState(false);
  
  const createUser = useCreateUser();
  const createBlockRequest = useCreateBlockRequest();
  const { toast } = useToast();

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen((currentScreen - 1) as Screen);
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const updateSelectedProducts = (products: SelectedProduct[]) => {
    setSelectedProducts(products);
  };

  const handleCreateAccount = async () => {
    try {
      if (!userData.password) {
        toast({
          title: "Error",
          description: "La contraseña es requerida",
          variant: "destructive",
        });
        return;
      }

      // Crear usuario
      await createUser.mutateAsync({
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        dni: userData.dni,
        celular: userData.celular,
        email: userData.email,
        fechaNacimiento: userData.fechaNacimiento,
        password: userData.password,
        aceptaDatos,
        aceptaAnuncios,
      });

      // Crear solicitud de bloqueo
      await createBlockRequest.mutateAsync({
        userDni: userData.dni,
        selectedProducts: selectedProducts,
      });

      toast({
        title: "Cuenta creada exitosamente",
        description: "Tu cuenta ha sido creada y tus productos han sido bloqueados",
      });

      goToScreen(7);
    } catch (error: any) {
      console.error("Error creating account:", error);
      toast({
        title: "Error al crear cuenta",
        description: error.message || "Ocurrió un error al crear tu cuenta",
        variant: "destructive",
      });
    }
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
            onBack={goBack}
          />
        );
      case 3:
        return (
          <PersonalDataScreen
            userData={userData}
            onUserDataChange={updateUserData}
            onNext={() => goToScreen(4)}
            onBack={goBack}
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
            onBackToSelection={() => goToScreen(2)}
          />
        );
      case 6:
        return (
          <AccountCreationScreen
            userData={userData}
            onUserDataChange={(data) => {
              updateUserData(data);
              // Capturar datos de aceptación de la pantalla
              if (data.fechaNacimiento && data.password) {
                setAceptaDatos(true); // Por defecto true cuando completa la pantalla
              }
            }}
            onNext={handleCreateAccount}
            onBack={goBack}
          />
        );
      case 7:
        return (
          <AccountConfirmationScreen
            userData={userData}
            onViewServices={() => goToScreen(8)}
            onBack={goBack}
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
