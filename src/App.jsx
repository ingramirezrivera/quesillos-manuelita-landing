import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./features/hero/Hero";
import Products from "./features/products/Products";
import About from "./features/about/About";
import Contact from "./features/contact/contact";
import Footer from "./features/footer/Footer";
import OrderPage from "./features/order/OrderPage";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Creamos un componente para la página de inicio que agrupa la vista principal
function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const { pathname } = useLocation();
  const showWhatsAppFloat = pathname !== "/pedir";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedir" element={<OrderPage />} />
      </Routes>
      {showWhatsAppFloat && <WhatsAppFloat />}
    </>
  );
}

export default App;
