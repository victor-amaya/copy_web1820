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
    email: '',
    password: '12345678',
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
    console.log("Updating user data with:", data);
    setUserData(prev => {
      const updated = { ...prev, ...data };
      console.log("User data after update:", updated);
      return updated;
    });
  };

  const updateSelectedProducts = (products: SelectedProduct[]) => {
    setSelectedProducts(products);
  };

  const handleCreateAccount = async () => {
    try {
      // Validar campos requeridos
      if (!userData.nombres || !userData.apellidos || !userData.dni || !userData.celular || !userData.email /*|| !userData.password*/) {
        const missingFields = [];
        if (!userData.nombres) missingFields.push("nombres");
        if (!userData.apellidos) missingFields.push("apellidos"); 
        if (!userData.dni) missingFields.push("DNI");
        if (!userData.celular) missingFields.push("celular");
        if (!userData.email) missingFields.push("email");
        //if (!userData.password) missingFields.push("contraseña");
        console.log("Missing fields:", missingFields);
        toast({
          title: "Campos faltantes",
          description: `Por favor completa: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        return;
      }

      console.log("Current userData state:", userData);
      console.log("Creating user with data VA:", {
        ...userData,
        password: userData.password ? "***hidden***" : "NO PASSWORD SET",
        aceptaDatos,
        aceptaAnuncios
      });

      let userExists = false;
      
      // Intentar crear usuario
      try {
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
      } catch (userError: any) {
        // Si el error es por DNI duplicado, continuar con el proceso
        if (userError.message && userError.message.includes("Ya existe un usuario con este DNI")) {
          userExists = true;
        } else {
          // Si es otro tipo de error, mostrar mensaje y salir
          console.error("Error creating account:", userError);
          toast({
            title: "Error al crear cuenta",
            description: userError.message || "Ocurrió un error al crear tu cuenta",
            variant: "destructive",
          });
          return;
        }
      }

      // Crear solicitud de bloqueo
      await createBlockRequest.mutateAsync({
        userDni: userData.dni,
        selectedProducts: selectedProducts,
      });

      // Mostrar mensaje apropiado según si la cuenta ya existía
      if (userExists) {
        toast({
          title: "Solicitud procesada",
          description: "Ya tienes una cuenta registrada. Tus productos han sido bloqueados exitosamente",
        });
      } else {
        toast({
          title: "Cuenta creada exitosamente",
          description: "Tu cuenta ha sido creada y tus productos han sido bloqueados",
        });
      }

      goToScreen(7);
    } catch (error: any) {
      console.error("Error creating block request:", error);
      toast({
        title: "Error al procesar solicitud",
        description: error.message || "Ocurrió un error al procesar tu solicitud",
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
              console.log("Account creation screen data received:", data);
              updateUserData(data);
              // Capturar datos de aceptación de la pantalla
              if (data.fechaNacimiento && data.password) {
                console.log("Setting aceptaDatos to true");
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
