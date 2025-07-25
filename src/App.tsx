import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./routes/ProtectedRoute";
import Banner from "./pages/Banner";
import Partner from "./pages/Partners";
import Department from "./pages/Department";
import DoctorsPage from "./pages/Doctor";
import DoctorDetail from "./pages/DoctorDetail";
import Article from "./pages/Article";
import GalleryPage from "./pages/Gallery";
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
            <Route path="/partners" element={<Partner />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/articles" element={<Article />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
