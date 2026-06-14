import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  logoText: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export default function Footer({ logoText, githubUrl, linkedinUrl, twitterUrl }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#02000e] border-t border-indigo-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Scroll To Top Indicator Floating inside Footer */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleScrollToTop}
            className="p-3 rounded-full border border-indigo-950 bg-indigo-950/20 hover:bg-brand-purple/20 hover:border-brand-purple hover:-translate-y-1 transition-all text-gray-500 hover:text-white cursor-pointer shadow-md group"
            title="Return to the heavens (Scroll to Top)"
          >
            <ArrowUp className="w-4 h-4 group-hover:animate-pulse" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-indigo-950/20 pb-8 text-center md:text-left">
          {/* Left branded text */}
          <span className="font-display font-semibold text-sm tracking-[0.2em] text-white">
            {logoText}
          </span>

          {/* Social connections */}
          <div className="flex items-center gap-6 font-mono text-[10px] md:text-xs font-bold tracking-widest text-gray-500">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors"
            >
              GITHUB
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors"
            >
              TWITTER
            </a>
          </div>
        </div>

        {/* Brand Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono tracking-wider text-gray-500 text-center">
          <span>
            © {new Date().getFullYear()} FULL-STACK DEVELOPER. CODING VIBE
          </span>
          <span className="text-gray-600">
            NAUFAL WEBSITE • ESTD 2024
          </span>
        </div>

      </div>
    </footer>
  );
}
