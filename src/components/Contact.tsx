import React, { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle2, AlertCircle, Share2, Sparkles, Wand2 } from "lucide-react";
import { ContactMessage } from "../types";

interface ContactProps {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  onSendMessage: (message: Omit<ContactMessage, "id" | "timestamp">) => void;
}

export default function Contact({ email, githubUrl, linkedinUrl, twitterUrl, onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmittedState, setTransmittedState] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setTransmittedState("ERROR");
      setTimeout(() => setTransmittedState("IDLE"), 4000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate transmitting through quantum space
    setTimeout(() => {
      onSendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "No Subject",
        message: formData.message,
      });
      setIsSubmitting(false);
      setTransmittedState("SUCCESS");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset toast state after some seconds
      setTimeout(() => setTransmittedState("IDLE"), 6000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#030014]/90 border-t border-indigo-950/25 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Information */}
          <div className="lg:col-span-5">
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
              Manifest Your Project
            </h2>
            
            <p className="font-sans text-gray-400 text-base sm:text-lg select-none leading-relaxed mb-12">
              Ready to transform your vision into a digital reality? Reach out and let's start the transmutation process. I'm currently accepting select high-impact projects.
            </p>

            {/* Information Grid with Custom Icon Cards */}
            <div className="space-y-6">
              
              {/* Email Card (looks like the screenshot card with IL label) */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-indigo-950/15 border border-indigo-950/40 hover:bg-indigo-950/25 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center font-mono text-brand-purple font-bold text-sm shadow-md shadow-brand-purple/5">
                  @
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-semibold">EMAIL CONTRACT</span>
                  <a
                    href={`mailto:${email}`}
                    className="font-sans font-medium text-white hover:text-brand-purple transition-colors text-sm sm:text-base break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Social Channels (Looks like screenshot with Share/Hub logos) */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-indigo-950/15 border border-indigo-950/40 hover:bg-indigo-950/25 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center font-mono text-brand-cyan font-bold text-sm shadow-md shadow-brand-cyan/5">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-semibold">SOCIAL SPHERES</span>
                  <div className="flex items-center gap-4.5 mt-1">
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-indigo-950 select-none">|</span>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                    <span className="text-indigo-950 select-none">|</span>
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-7">
            <div className="relative p-8.5 rounded-2xl bg-indigo-950/10 border border-indigo-950/40 hover:border-indigo-500/15 transition-all shadow-xl">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Group inline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4.5 py-3.5 rounded-xl bg-[#030014]/60 border border-indigo-950 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 focus:bg-[#030014] text-sm font-sans transition-all"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="janedoe@example.com"
                      className="w-full px-4.5 py-3.5 rounded-xl bg-[#030014]/60 border border-indigo-950 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 focus:bg-[#030014] text-sm font-sans transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="w-full px-4.5 py-3.5 rounded-xl bg-[#030014]/60 border border-indigo-950 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 focus:bg-[#030014] text-sm font-sans transition-all"
                  />
                </div>

                {/* Message Input info */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision..."
                    className="w-full px-4.5 py-3.5 rounded-xl bg-[#030014]/60 border border-indigo-950 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 focus:bg-[#030014] text-sm font-sans transition-all resize-none"
                    required
                  />
                </div>

                {/* Feedback Toast Alerts inside Card */}
                {transmittedState === "SUCCESS" && (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-3 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce flex-shrink-0" />
                    <div className="text-xs font-sans">
                      <p className="font-bold">Incantation Transmitted!</p>
                      <p className="text-emerald-400/80">Your message successfully crossed the nether. Naufal will respond soon.</p>
                    </div>
                  </div>
                )}

                {transmittedState === "ERROR" && (
                  <div className="p-4 bg-rose-950/20 border border-rose-500/30 text-rose-300 rounded-xl flex items-center gap-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse flex-shrink-0" />
                    <div className="text-xs font-sans">
                      <p className="font-bold">Transmutation Interrupted</p>
                      <p className="text-rose-400/80">Please ensure all required gates (fields) are full before activating.</p>
                    </div>
                  </div>
                )}

                {/* Send Button exact looks */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-sans font-medium tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 active:scale-98 transition-all duration-300 block text-center text-sm shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Wand2 className="w-4 h-4 animate-spin text-indigo-200" />
                      <span>Casting Spell...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Incantation</span>
                      <Send className="w-4 h-4 text-indigo-300" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
