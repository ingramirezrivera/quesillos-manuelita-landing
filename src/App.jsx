import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./features/hero/Hero";
import Products from "./features/products/Products";
// import Reviews from "./features/reviews/Reviews";
const About = lazy(() => import("./features/about/About"));
// import Allies from "./features/allies/Allies";
const Contact = lazy(() => import("./features/contact/contact"));
const Footer = lazy(() => import("./features/footer/Footer"));
const OrderPage = lazy(() => import("./features/order/OrderPage"));
import WhatsAppFloat from "./components/WhatsAppFloat";
const TermsPage = lazy(() => import("./features/legal/TermsPage"));
const DataPolicyPage = lazy(() => import("./features/legal/DataPolicyPage"));
const CookiesPolicyPage = lazy(() => import("./features/legal/CookiesPolicyPage"));
const FaqPage = lazy(() => import("./features/legal/FaqPage"));
import CookieConsent from "./components/CookieConsent";
import ConsentManagedTags from "./components/ConsentManagedTags";
import SeoManager from "./components/SeoManager";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      {/* <Reviews /> */}
      <Suspense fallback={null}>
        <About />
        {/* <Allies /> */}
        <Contact />
        <Footer />
      </Suspense>
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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pedir" element={<OrderPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/politica-datos" element={<DataPolicyPage />} />
          <Route path="/politica-cookies" element={<CookiesPolicyPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </Suspense>
      {showWhatsAppFloat && <WhatsAppFloat />}
      <CookieConsent />
      <ConsentManagedTags />
    </>
  );
}

export default App;
