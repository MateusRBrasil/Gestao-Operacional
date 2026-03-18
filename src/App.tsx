import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ClientesPage from "@/pages/ClientesPage";
import EquipesPage from "@/pages/EquipesPage";
import ColaboradoresPage from "@/pages/ColaboradoresPage";
import GestoresPage from "@/pages/GestoresPage";
import EscalasPage from "@/pages/EscalasPage";
import PlantoesPage from "@/pages/PlantoesPage";
import FeriasPage from "@/pages/FeriasPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><ClientesPage /></ProtectedRoute>} />
      <Route path="/equipes" element={<ProtectedRoute><EquipesPage /></ProtectedRoute>} />
      <Route path="/colaboradores" element={<ProtectedRoute><ColaboradoresPage /></ProtectedRoute>} />
      <Route path="/gestores" element={<ProtectedRoute><GestoresPage /></ProtectedRoute>} />
      <Route path="/escalas" element={<ProtectedRoute><EscalasPage /></ProtectedRoute>} />
      <Route path="/plantoes" element={<ProtectedRoute><PlantoesPage /></ProtectedRoute>} />
      <Route path="/ferias" element={<ProtectedRoute><FeriasPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
