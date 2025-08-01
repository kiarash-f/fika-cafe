import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import HomePageLayout from "./ui/HomePageLayout";
import AdminPageLayout from "./ui/AdminPageLayout";
import ItemsPageLayout from "./ui/ItemsPageLayout";
import Home from "./pages/Home";
import AdminDashboard from "./features/admin/AdminDashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminCategories from "./features/admin/AdminCategories";
import MenuPageLayout from "./ui/MenuPageLayout";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route />
          <Route path="menu" element={<MenuPageLayout />}>
            <Route path="items/:id" element={<ItemsPageLayout />}></Route>
          </Route>
        </Route>

        {/* Admin Routes */}
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
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
