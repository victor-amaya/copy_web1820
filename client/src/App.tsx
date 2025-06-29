import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Web1820App from "@/pages/Web1820App";
import NotFound from "@/pages/not-found";
import ComingSoon from "@/pages/coming-soon";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Web1820App} />
      <Route path="/coming-soon/:serviceType?" component={ComingSoon} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
