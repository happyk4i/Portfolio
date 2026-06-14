import React, { useState, useEffect } from "react";
import { PortfolioData, ContactMessage } from "./types";
import { INITIAL_PORTFOLIO_DATA } from "./defaultData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ControlPanel from "./components/ControlPanel";
import { Sparkles, Sliders } from "lucide-react";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  // Load state on mount
  useEffect(() => {
    const savedData = localStorage.getItem("alchemist_portfolio_data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as PortfolioData;
        let hasChanges = false;

        // Sanitize legacy or nested/duplicate-nested portrait image paths
        if (
          parsed.about &&
          (!parsed.about.portraitUrl ||
            parsed.about.portraitUrl.includes("1781372352842") ||
            parsed.about.portraitUrl.includes("WhatsApp") ||
            parsed.about.portraitUrl.includes("/src/assets/images/src/assets/images") ||
            parsed.about.portraitUrl === "")
        ) {
          parsed.about.portraitUrl = INITIAL_PORTFOLIO_DATA.about.portraitUrl;
          hasChanges = true;
        }

        // Auto-sync testimonials with defaultData.ts if changes are made to source defaults
        if (parsed.testimonials) {
          parsed.testimonials = parsed.testimonials.map((savedTestimonial) => {
            const initialTestimonial = INITIAL_PORTFOLIO_DATA.testimonials.find(t => t.id === savedTestimonial.id);
            if (initialTestimonial && (
              initialTestimonial.text !== savedTestimonial.text || 
              initialTestimonial.author !== savedTestimonial.author || 
              initialTestimonial.role !== savedTestimonial.role ||
              initialTestimonial.initials !== savedTestimonial.initials
            )) {
              hasChanges = true;
              return { ...savedTestimonial, ...initialTestimonial };
            }
            return savedTestimonial;
          });
        }

        // Auto-sync experience with defaultData.ts if role, company, period, or description has updated
        if (parsed.experience) {
          parsed.experience = parsed.experience.map((savedExp) => {
            const initialExp = INITIAL_PORTFOLIO_DATA.experience.find(e => e.id === savedExp.id);
            if (initialExp && (
              initialExp.description !== savedExp.description || 
              initialExp.company !== savedExp.company || 
              initialExp.role !== savedExp.role ||
              initialExp.period !== savedExp.period
            )) {
              hasChanges = true;
              return { ...savedExp, ...initialExp };
            }
            return savedExp;
          });
        }

        // Auto-sync content of projects with defaultData.ts
        if (parsed.projects) {
          parsed.projects = parsed.projects.map((savedProj) => {
            const initialProj = INITIAL_PORTFOLIO_DATA.projects.find(p => p.id === savedProj.id);
            if (initialProj && (
              initialProj.title !== savedProj.title || 
              initialProj.description !== savedProj.description ||
              initialProj.category !== savedProj.category ||
              initialProj.imageUrl !== savedProj.imageUrl ||
              initialProj.situation !== savedProj.situation ||
              initialProj.task !== savedProj.task ||
              initialProj.action !== savedProj.action ||
              initialProj.result !== savedProj.result
            )) {
              hasChanges = true;
              return { ...savedProj, ...initialProj };
            }
            return savedProj;
          });
        }

        if (hasChanges) {
          localStorage.setItem("alchemist_portfolio_data", JSON.stringify(parsed));
        }

        setPortfolioData(parsed);
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }

    const savedMessages = localStorage.getItem("alchemist_contact_messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved contract messages", e);
      }
    }
  }, []);

  // Save portfolio state to both localStorage and defaultData.ts on server
  const handleSavePortfolioData = async (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem("alchemist_portfolio_data", JSON.stringify(newData));

    try {
      const response = await fetch("/api/save-portfolio-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        console.log("Successfully saved portfolio changes to defaultData.ts on the server!");
      } else {
        console.error("Failed to persist changes to server-side defaultData.ts");
      }
    } catch (e) {
      console.error("Error connecting to save API server:", e);
    }
  };

  // Add a new message
  const handleAddNewMessage = (newMsg: Omit<ContactMessage, "id" | "timestamp">) => {
    const messageItem: ContactMessage = {
      ...newMsg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleDateString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const updatedMessages = [messageItem, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem("alchemist_contact_messages", JSON.stringify(updatedMessages));
  };

  // Delete individual messages
  const handleDeleteMessage = (id: string) => {
    const remaining = messages.filter((msg) => msg.id !== id);
    setMessages(remaining);
    localStorage.setItem("alchemist_contact_messages", JSON.stringify(remaining));
  };

  // Clear all messages
  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem("alchemist_contact_messages");
  };

  // Scroll to customized sections helper
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#030014] text-gray-100 min-h-screen font-sans alchemy-grid-bg relative selection:bg-brand-purple/30 selection:text-white">
      {/* Dynamic ambient particles overlays */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-purple/5 via-indigo-950/0 to-transparent pointer-events-none" />

      {/* Header Sticky Navigation */}
      <Header
        logoText={portfolioData.logoText}
        onOpenControlPanel={() => setIsControlPanelOpen(true)}
        hasMessages={messages.length > 0}
      />

      {/* Hero Entrance Banner */}
      <Hero
        config={portfolioData.hero}
        onExploreClick={() => handleScrollToSection("about")}
        onContactClick={() => handleScrollToSection("contact")}
      />

      {/* Main Sections Wrapper */}
      <main className="relative z-10">
        {/* About Profile */}
        <About config={portfolioData.about} />

        {/* Skills Specializations */}
        <Skills groups={portfolioData.skills} />

        {/* Portfolio Showcases */}
        <Portfolio projects={portfolioData.projects} />

        {/* Experiences (Chronicles of Mastery) */}
        <Experience items={portfolioData.experience} />

        {/* Testimonials (Echoes of Success) */}
        <Testimonials testimonials={portfolioData.testimonials} />

        {/* Contact Submission Node */}
        <Contact
          email="naufalyasir751@gmail.com"
          githubUrl={portfolioData.socials.github}
          linkedinUrl={portfolioData.socials.linkedin}
          twitterUrl={portfolioData.socials.twitter}
          onSendMessage={handleAddNewMessage}
        />
      </main>

      {/* Modern Footnotes block */}
      <Footer
        logoText={portfolioData.logoText}
        githubUrl={portfolioData.socials.github}
        linkedinUrl={portfolioData.socials.linkedin}
        twitterUrl={portfolioData.socials.twitter}
      />

      {/* Hidden Control Panel Drawer */}
      <ControlPanel
        isOpen={isControlPanelOpen}
        onClose={() => setIsControlPanelOpen(false)}
        data={portfolioData}
        onSave={handleSavePortfolioData}
        messages={messages}
        onClearMessages={handleClearMessages}
        onDeleteMessage={handleDeleteMessage}
      />

      {/* Floating Control Panel Button (bottom corner cue) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsControlPanelOpen(true)}
          className="p-3.5 rounded-full bg-indigo-600 hover:bg-brand-purple hover:scale-110 active:scale-95 text-white transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-brand-purple/40 border border-indigo-500/30 cursor-pointer group relative flex items-center justify-center"
          title="Open Control Panel"
        >
          <Sliders className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-3.5 bg-[#0b0a1d] border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md shadow-black/40 break-keep whitespace-nowrap">
            Control Panel
          </span>
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan shadow-[0_0_8px_#14b8a6]"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
