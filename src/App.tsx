// Root component: the one-page Erilaiset Ystävät site, put together from its sections.
import "./App.css";
import { LangProvider } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pilot from "./components/Pilot";
import Episodes from "./components/Episodes";
import Cast from "./components/Cast";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

function App() {
  return (
    <LangProvider>
      <Header />
      <main id="main">
        <Hero />
        <Pilot />
        <Episodes />
        <Cast />
        <Newsletter />
      </main>
      <Footer />
    </LangProvider>
  );
}

export default App;
