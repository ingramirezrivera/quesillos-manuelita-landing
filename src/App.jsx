import { Routes, Route } from "react-router-dom";
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
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedir" element={<OrderPage />} />
      </Routes>
      <WhatsAppFloat />
    </>
  );
}

export default App;
