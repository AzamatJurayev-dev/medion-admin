import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./routes/ProtectedRoute";
import Banner from "./pages/Banner";
import Category from "./pages/Category";
import Partner from "./pages/Partners";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Banner />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/partners" element={<Partner />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
