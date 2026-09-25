import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

function Home({ settings }) {
  const { homepage } = settings;

  return (
    <>
      <Navbar siteName={settings.siteName} homepage={homepage} />
      <main>
        {homepage.hero && (
          <Hero
            siteName={settings.siteName}
            professionalTitle={settings.professionalTitle}
            description={settings.description}
          />
        )}
        {homepage.about && <About location={settings.location} />}
        {homepage.skills && <Skills />}
        {homepage.projects && <Projects />}
        {homepage.contact && <Contact settings={settings} />}
      </main>
      {homepage.footer && <Footer settings={settings} />}
    </>
  );
}

export default Home;
