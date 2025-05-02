import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import HomePageLayout from "./ui/HomePageLayout";
import Home from "./pages/Home";
import HotCoffee from "./pages/HotCoffee";
import IceCoffee from "./pages/IceCoffee";
import AdminPageLayout from "./ui/AdminPageLayout";
import ItemsPageLayout from "./ui/ItemsPageLayout";
import HotDrinks from "./pages/HotDrinks";
import Cakes from "./pages/Cakes";
import Mocktail from "./pages/Mocktail";
import Smoothie from "./pages/Smoothie";
import Frappe from "./pages/Frappe";
import FitBar from "./pages/FitBar";
import MilkShake from "./pages/MilkShake";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminDashboard from "./features/admin/AdminDashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="items" element={<ItemsPageLayout />}>
            <Route path="hot-coffee" element={<HotCoffee />} />
            <Route path="ice-coffee" element={<IceCoffee />} />
            <Route path="hot-drinks" element={<HotDrinks />} />
            <Route path="milkshake" element={<MilkShake />} />
            <Route path="fit-bar" element={<FitBar />} />
            <Route path="frappe" element={<Frappe />} />
            <Route path="smoothie" element={<Smoothie />} />
            <Route path="mocktail" element={<Mocktail />} />
            <Route path="cake" element={<Cakes />} />
          </Route>
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPageLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
