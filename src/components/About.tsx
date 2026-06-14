import React from "react";
import { Clock, Eye, MessageSquare, LucideIcon, Shield, Verified, User, Binary } from "lucide-react";
import { AboutConfig } from "../types";

const iconMap: Record<string, LucideIcon> = {
  Clock: Clock,
  Eye: Eye,
  MessageSquare: MessageSquare,
};

interface AboutProps {
  config: AboutConfig;
}

export default function About({ config }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[#030014]/93 border-t border-indigo-950/20 relative overflow-hidden">
      {/* Background glow behind portrait */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group max-w-sm w-full">
              {/* Outer glowing border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-purple via-indigo-500 to-brand-cyan rounded-3xl blur-[10px] opacity-40 group-hover:opacity-75 transition-all duration-500" />
              
              {/* Image Frame */}
              <div className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-indigo-950/40 border border-white/10 shadow-2xl">
                {config.portraitUrl ? (
                  <img
                    src={config.portraitUrl}
                    alt={config.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image if paths have issues
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-indigo-300 p-6">
                    <User className="w-16 h-16 opacity-30 mb-4 text-brand-purple" />
                    <span className="font-mono text-xs text-gray-500">Avatar not uploaded</span>
                  </div>
                )}
                
                {/* Visual Overlay Grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-40" />
                
                {/* Tech Badge tag on image */}
                <div className="absolute bottom-4 left-4 right-4 bg-indigo-950/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a5b4fc]">DEVELOPER ACTIVE</span>
                  </div>
                  <Binary className="w-4 h-4 text-brand-cyan animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-tight mb-6 bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              {config.title}
            </h2>
            
            <p className="font-sans text-gray-400 text-lg leading-relaxed mb-10 select-none max-w-2xl">
              {config.description}
            </p>

            {/* Three Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {config.valueCards.map((card) => {
                const Icon = iconMap[card.iconName] || Shield;
                return (
                  <div
                    key={card.id}
                    className="group/card relative p-5 rounded-2xl bg-indigo-950/15 border border-indigo-950/40 hover:bg-indigo-950/35 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-brand-purple/5 group-hover/card:bg-brand-purple/10 rounded-full blur-xl transition-colors duration-500" />
                    
                    <div>
                      {/* Icon Container */}
                      <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                        <Icon className={`w-5 h-5 ${
                          card.iconName === 'Clock' ? 'text-brand-cyan shadow-md shadow-brand-cyan/20' :
                          card.iconName === 'Eye' ? 'text-indigo-400' : 'text-fuchsia-400'
                        }`} />
                      </div>
                      
                      {/* Caption Text */}
                      <p className="font-sans text-xs text-gray-400 leading-normal mb-8 select-none group-hover/card:text-gray-300">
                        {card.text}
                      </p>
                    </div>

                    {/* Badge / Pill */}
                    <div>
                      <span className="inline-block px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-gray-400 bg-white/5 border border-white/10 rounded-lg group-hover/card:border-brand-purple/30 group-hover/card:text-brand-purple transition-all">
                        {card.badgeText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
