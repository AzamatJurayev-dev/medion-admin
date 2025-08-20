import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./Auth/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Banner from "./pages/Banner";
import Partner from "./pages/Partners";
import Department from "./pages/Department";
import DoctorsPage from "./pages/Doctor";
import DoctorDetail from "./pages/DoctorDetail";
import Article from "./pages/Article";
import GalleryPage from "./pages/Gallery";
import AuthPage from "./Auth";
import RegisterPage from "./Auth/RegisterPage";
import ForgotPassword from "./Auth/ForgotPassword";
import AwardsPage from "./pages/Awards";
import NewsPage from "./pages/News";
import UsersPage from "./pages/Users";
import PromotionsPage from "./pages/Promotions";
import TrainingsPage from "./pages/Training";
import TeamsPage from "./pages/Team";
import InfoPage from "./pages/Org-info";
import ActivityPage from "./pages/Activity";
import HealthPage from "./pages/Health";
import ServicePage from "./pages/Services";
import ReviewsPage from "./pages/Reviews";
import { ReduxProvider } from "./components/providers/ReduxProvider";
import AddressPage from "./pages/Address";
const queryClient = new QueryClient();
function App() {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Banner />} />
              <Route path="/partners" element={<Partner />} />
              <Route path="/departments" element={<Department />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              <Route path="/articles" element={<Article />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/trainings" element={<TrainingsPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/org-info" element={<InfoPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/address" element={<AddressPage />} />
            </Route>

            <Route element={<AuthPage />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
export default App;
