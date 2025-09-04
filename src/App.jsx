import "./App.css";
import Home from "./components/Home";
import Info from "./components/Info";
import Menu from "./components/Menu";
import Catering from "./components/Catering";
import InfoTwo from "./components/InfoTwo";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-platinum w-full">
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <Info />
      </section>

      <section id="menu">
        <Menu />
      </section>

      <section id="catering">
        <Catering />
      </section>

      <section id="contact">
        <InfoTwo />
      </section>

      <Footer />
    </div>
  );
}

export default App;
