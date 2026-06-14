import React from "react";
import { Briefcase, Calendar, Star, Milestone } from "lucide-react";
import { ExperienceItem } from "../types";

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-[#030014]/90 border-t border-indigo-950/20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
            Career Journey
          </h2>
          <p className="font-sans text-gray-400 text-base sm:text-lg max-w-xl mx-auto select-none leading-relaxed">
            My professional odyssey through the ever-shifting tech wilderness.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Connecting Vertical Line (only visible on md+) */}
          <div className="absolute left-[21px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-purple via-indigo-800 to-brand-cyan/20 opacity-40" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 z-20 flex items-center justify-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan border border-brand-purple shadow-[0_0_8px_#14b8a6]"></span>
                    </span>
                  </div>

                  {/* Empty item spacer for desktop alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card Side */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pl-12" : "md:pr-12"
                  }`}>
                    <div className="group relative p-8 rounded-2xl bg-indigo-950/15 border border-indigo-950/40 hover:bg-indigo-950/30 hover:border-brand-purple/35 transition-all duration-300 shadow-lg">
                      
                      {/* Floating hover brand glow */}
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-brand-purple to-brand-cyan rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity blur-[1px] pointer-events-none" />

                      {/* Header Title inside card */}
                      <div className="flex flex-col mb-4">
                        <h3 className="font-display font-medium text-2xl text-white group-hover:text-brand-purple transition-all duration-300">
                          {item.role}
                        </h3>
                        
                        {/* Company Pill Tag - exact look of the screenshot */}
                        <div className="mt-2.5 self-start">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                            isEven 
                              ? "bg-teal-950/30 border border-teal-500/20 text-brand-cyan" 
                              : "bg-indigo-950/40 border border-indigo-500/20 text-brand-purple"
                          }`}>
                            <Milestone className="w-3 h-3" />
                            {item.company}
                          </span>
                        </div>
                      </div>

                      {/* Job Description (Bullets or Paragraph) */}
                      <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed select-none group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
