import React from "react";
import { Quote, Star } from "lucide-react";
import { TestimonialItem } from "../types";

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 bg-[#030014]/93 border-t border-indigo-950/20 relative overflow-hidden">
      {/* Background ambient light sparks */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
            Testimonials
          </h2>
        </div>

        {/* Testimonials Grid Column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="group relative p-8 rounded-2xl bg-indigo-950/15 border border-indigo-950/45 hover:bg-indigo-950/30 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between h-full shadow-lg overflow-hidden"
            >
              {/* Giant Stylized decorative quote */}
              <div className="absolute -right-2 -top-2 text-indigo-500/5 group-hover:text-indigo-500/10 group-hover:scale-110 transition-all duration-300 pointer-events-none">
                <Quote className="w-28 h-28 transform rotate-180" />
              </div>

              <div>
                {/* Visual Quote Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center text-brand-purple mb-6 shadow-md shadow-brand-purple/5">
                  <span className="font-serif text-2xl font-bold select-none leading-none">”</span>
                </div>

                {/* Testimonial Text */}
                <p className="font-sans text-gray-300 text-sm italic leading-relaxed mb-8 select-none relative z-10 group-hover:text-white transition-colors duration-300">
                  "{test.text}"
                </p>
              </div>

              {/* Profile Details footer */}
              <div className="flex items-center gap-4.5 pt-5 border-t border-indigo-950/40 mt-auto">
                {/* Initials avatar badge */}
                <div className="w-11 h-11 rounded-xl bg-indigo-600 border border-indigo-500 flex items-center justify-center text-white font-mono font-bold text-sm tracking-widest shadow-inner shadow-indigo-600/20">
                  {test.initials}
                </div>
                
                {/* Author and role details */}
                <div className="flex flex-col">
                  <span className="font-display font-medium text-white group-hover:text-brand-purple transition-all text-sm tracking-wide">
                    {test.author}
                  </span>
                  <span className="font-mono text-[10px] text-brand-cyan/80 font-bold uppercase tracking-widest mt-0.5">
                    {test.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
