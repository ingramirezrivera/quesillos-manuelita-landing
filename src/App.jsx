import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./features/hero/Hero";
import Products from "./features/products/Products";
// import Reviews from "./features/reviews/Reviews";
import About from "./features/about/About";
// import Allies from "./features/allies/Allies";
import Contact from "./features/contact/contact";
import Footer from "./features/footer/Footer";
import OrderPage from "./features/order/OrderPage";
import WhatsAppFloat from "./components/WhatsAppFloat";
import TermsPage from "./features/legal/TermsPage";
import DataPolicyPage from "./features/legal/DataPolicyPage";
import CookiesPolicyPage from "./features/legal/CookiesPolicyPage";
import FaqPage from "./features/legal/FaqPage";
import CookieConsent from "./components/CookieConsent";
import ConsentManagedTags from "./components/ConsentManagedTags";
import SeoManager from "./components/SeoManager";

// Creamos un componente para la página de inicio que agrupa la vista principal
function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      {/* <Reviews /> */}
      <About />
      {/* <Allies /> */}
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const { pathname } = useLocation();
  const showWhatsAppFloat =
    pathname !== "/pedir" &&
    pathname !== "/terminos" &&
    pathname !== "/politica-datos" &&
    pathname !== "/politica-cookies" &&
    pathname !== "/faq";

  return (
    <>
      <SeoManager pathname={pathname} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedir" element={<OrderPage />} />
        <Route path="/terminos" element={<TermsPage />} />
        <Route path="/politica-datos" element={<DataPolicyPage />} />
        <Route path="/politica-cookies" element={<CookiesPolicyPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
      {showWhatsAppFloat && <WhatsAppFloat />}
      <CookieConsent />
      <ConsentManagedTags />
    </>
  );
}

export default App;
