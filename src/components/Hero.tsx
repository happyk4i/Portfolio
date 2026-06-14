import React from "react";
import { ArrowDown, Flame, Sparkles } from "lucide-react";
import { HeroConfig } from "../types";

interface HeroProps {
  config: HeroConfig;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ config, onExploreClick, onContactClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#030014]/90"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a3e_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.12] pointer-events-none" />

      {/* Ambient particles (CSS animated) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/30 blur-[1px] animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateY(${Math.random() * 20 - 10}px)`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.3em] mb-10 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
          <Flame className="w-3 h-3 text-brand-purple animate-pulse" />
          <span>{config.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white flex flex-col items-center mb-8">
          <span className="opacity-90 select-none pb-2">{config.titlePart1}</span>
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-[#c8abff] bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(167,139,250,0.3)] animate-pulse">
            {config.titlePart2}
          </span>
          {config.titlePart3 && (
            <span className="opacity-95 text-xl font-mono tracking-[0.4em] text-cyan-400/80 uppercase pt-2">
              {config.titlePart3}
            </span>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="font-sans text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-12 select-none">
          {config.subtitle}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-sans font-medium tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 cursor-pointer text-sm flex items-center justify-center gap-2"
          >
            <span>{config.viewPortfolioText}</span>
            <Sparkles className="w-4 h-4 text-indigo-200" />
          </button>
          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-sans font-medium tracking-wide text-brand-cyan hover:text-white border border-brand-cyan hover:bg-brand-cyan/20 active:scale-95 transition-all duration-300 cursor-pointer text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_20px_rgba(20,184,166,0.25)]"
          >
            <span>{config.contactMeText}</span>
          </button>
        </div>

        {/* Animated bounce chevron down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-gray-500">NAUFAL WEBSITE</span>
          <button
            onClick={onExploreClick}
            className="p-1 rounded-full border border-indigo-950/80 bg-indigo-950/20 text-gray-400 hover:text-brand-purple cursor-pointer animate-bounce transition-colors"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
