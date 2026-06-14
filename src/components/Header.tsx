import React, { useState, useEffect } from "react";
import { Settings, Shield, Sparkles } from "lucide-react";

interface HeaderProps {
  logoText: string;
  onOpenControlPanel: () => void;
  hasMessages: boolean;
}

export default function Header({ logoText, onOpenControlPanel, hasMessages }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = ["home", "about", "skills", "portfolio", "experience", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Experience", id: "experience" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030014]/85 backdrop-blur-md border-b border-indigo-950/40 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-display font-bold text-lg tracking-[0.2em] text-white hover:text-indigo-400 transition-colors duration-300">
            {logoText}
          </span>
          <Sparkles className="w-4 h-4 text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-sans text-sm tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer hover:text-white ${
                activeSection === link.id
                  ? "text-brand-purple font-medium"
                  : "text-gray-400"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple rounded-full shadow-[0_0_8px_#8b5cf6]" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Alchemy Panel / Live indicator) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenControlPanel}
            className="relative px-3.5 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/20 hover:bg-brand-purple/20 hover:border-brand-purple hover:scale-105 transition-all text-xs font-mono font-medium tracking-wider text-indigo-300 hover:text-white flex items-center gap-2 cursor-pointer shadow-indigo-950/20 shadow-md"
            title="Open Control Panel"
          >
            <Settings className="w-3.5 h-3.5 text-brand-purple animate-spin-slow" />
            <span>CONTROL PANEL</span>
            {hasMessages && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 transform ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 transform ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#030014]/98 border-b border-indigo-950/80 px-6 py-6 space-y-4 absolute top-full left-0 right-0 shadow-2xl backdrop-blur-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left font-sans text-sm tracking-widest uppercase py-2 border-b border-indigo-950/40 last:border-0 ${
                activeSection === link.id ? "text-brand-purple" : "text-gray-400"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
