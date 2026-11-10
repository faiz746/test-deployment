// App.js
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  User,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRefs = useRef([]);

  const sections = ["home", "about", "projects", "skills", "contact"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.6, // Triggers when 60% of section is visible
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Global Styles: Hide Scrollbar + Enable Snap */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        #root {
          height: 100vh;
          overflow-y: scroll;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scrollbar-width: none;
        }
        #root::-webkit-scrollbar {
          display: none;
        }
        section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
      `}</style>

      {/* Fixed Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            YourName
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {sections.map((sec) => (
              <motion.button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="relative capitalize text-lg font-medium transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <span
                  className={
                    activeSection === sec ? "text-purple-600" : "text-gray-700"
                  }
                >
                  {sec}
                </span>
                {activeSection === sec && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50"
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-8"
          >
            <div className="mt-24 space-y-6">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`block w-full text-left text-2xl font-medium capitalize py-4 border-b ${
                    activeSection === sec
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-700"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Full Screen Sections */}
      <main>
        {/* Home */}
        <section
          id="home"
          data-section="home"
          ref={(el) => (sectionRefs.current[0] = el)}
          className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white"
        >
          <div className="text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                John Doe
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-4xl text-purple-200"
            >
              Full Stack Developer
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-6 mt-10"
            >
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  href="#"
                  className="p-5 bg-white/10 backdrop-blur rounded-full"
                >
                  <Icon size={32} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          data-section="about"
          ref={(el) => (sectionRefs.current[1] = el)}
          className="h-screen flex items-center bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8">About Me</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Passionate full-stack developer with 5+ years building
                beautiful, performant web apps...
              </p>
            </motion.div>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <Code2 size={48} className="text-purple-600" />
                <div>
                  <h3 className="text-2xl font-bold">Clean Code</h3>
                  <p className="text-gray-600">
                    Scalable & maintainable architecture
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Briefcase size={48} className="text-purple-600" />
                <div>
                  <h3 className="text-2xl font-bold">50+ Projects</h3>
                  <p className="text-gray-600">Delivered worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          data-section="projects"
          ref={(el) => (sectionRefs.current[2] = el)}
          className="h-screen flex items-center bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((p) => (
                <motion.div
                  key={p}
                  whileHover={{ y: -20 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-1"
                >
                  <div className="bg-white rounded-3xl p-8 h-full">
                    <h3 className="text-2xl font-bold mb-4">Project {p}</h3>
                    <p className="text-gray-600 mb-6">
                      Modern web app with React & Node.js
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-purple-600 font-medium flex items-center gap-2"
                      >
                        <Github /> Code
                      </a>
                      <a
                        href="#"
                        className="text-purple-600 font-medium flex items-center gap-2"
                      >
                        <ExternalLink /> Live
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          data-section="skills"
          ref={(el) => (sectionRefs.current[3] = el)}
          className="h-screen flex items-center bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-16">Skills & Tech</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Tailwind",
                "MongoDB",
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  className="bg-white py-8 px-6 rounded-2xl shadow-xl font-bold text-xl"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          data-section="contact"
          ref={(el) => (sectionRefs.current[4] = el)}
          className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900 text-white"
        >
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-8">Let's Build Together</h2>
            <p className="text-2xl mb-12 text-purple-200">
              Available for freelance & full-time roles
            </p>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:hello@yourname.com"
              className="inline-block px-16 py-8 bg-white text-purple-800 text-2xl font-bold rounded-full shadow-2xl"
            >
              Say Hello
            </motion.a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
