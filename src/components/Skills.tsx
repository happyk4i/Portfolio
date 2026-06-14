import React from "react";
import { Layers, Database, Cpu, LucideIcon, HelpCircle } from "lucide-react";
import { SkillGroup } from "../types";

const categoryIconMap: Record<string, LucideIcon> = {
  "Front-End": Layers,
  "Back-End": Database,
  DevOps: Cpu,
};

interface SkillsProps {
  groups: SkillGroup[];
}

export default function Skills({ groups }: SkillsProps) {
  return (
    <section id="skills" className="py-24 bg-[#030014]/90 border-t border-indigo-950/20 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute right-10 top-1/4 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
            Specializations
          </h2>
          <p className="font-sans text-gray-400 text-base sm:text-lg max-w-2xl select-none leading-relaxed">
            The technical foundations of my digital alchemy, forged through years of rigorous experimentation.
          </p>
        </div>

        {/* Three Columns of Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => {
            const Icon = categoryIconMap[group.category] || HelpCircle;
            
            return (
              <div
                key={group.id}
                className="group relative p-8 rounded-2xl bg-indigo-950/10 border border-indigo-950/30 hover:bg-indigo-950/25 hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between shadow-lg overflow-hidden"
              >
                {/* Visual grid accent on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 group-hover:bg-brand-purple/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:text-brand-purple transition-all shadow-md shadow-black/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-white tracking-wide">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-8">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="space-y-2.5">
                        {/* Name and percentage inline */}
                        <div className="flex justify-between items-center text-xs font-mono tracking-wider font-semibold select-none">
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-brand-purple group-hover:text-brand-cyan transition-colors">
                            {skill.percent}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-indigo-950/60 rounded-full overflow-hidden border border-white/[0.03]">
                          {/* Colored portion with glow bar */}
                          <div
                            className="h-full bg-gradient-to-r from-brand-purple to-indigo-400 group-hover:from-indigo-500 group-hover:to-brand-cyan transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret runes line decoration on bottom card border */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
