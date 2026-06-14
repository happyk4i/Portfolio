import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Sliders,
  Sparkles,
  Inbox,
  User,
  Layers,
  History,
  MessageSquare,
  ShieldAlert,
  Lock,
  Download,
  Upload,
  Database,
} from "lucide-react";
import { PortfolioData, ContactMessage, SkillGroup, ProjectItem, ExperienceItem, TestimonialItem } from "../types";
import { INITIAL_PORTFOLIO_DATA } from "../defaultData";

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  messages: ContactMessage[];
  onClearMessages: () => void;
  onDeleteMessage: (id: string) => void;
}

type ActiveTab = "profile" | "skills" | "portfolio" | "timeline" | "inbox" | "files";

export default function ControlPanel({
  isOpen,
  onClose,
  data,
  onSave,
  messages,
  onClearMessages,
  onDeleteMessage,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [editedData, setEditedData] = useState<PortfolioData>({ ...data });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [passcode, setPasscode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // Reset verification states when opened or closed
  useEffect(() => {
    if (!isOpen) {
      setPasscode("");
      setIsVerified(false);
      setErrorMsg("");
      setIsShaking(false);
    }
  }, [isOpen]);

  const [defaultDataText, setDefaultDataText] = useState("");
  const [packageLockText, setPackageLockText] = useState("");
  const [isEditingDefaultData, setIsEditingDefaultData] = useState(false);
  const [isEditingPackageLock, setIsEditingPackageLock] = useState(false);
  const [fileActionStatus, setFileActionStatus] = useState({ type: "", message: "" });
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const fetchLiveFilesContent = async () => {
    setIsLoadingFiles(true);
    setFileActionStatus({ type: "", message: "" });
    try {
      const defaultDataRes = await fetch("/api/download/defaultData");
      if (defaultDataRes.ok) {
        const text = await defaultDataRes.text();
        setDefaultDataText(text);
      }

      const packageLockRes = await fetch("/api/download/package-lock");
      if (packageLockRes.ok) {
        const text = await packageLockRes.text();
        setPackageLockText(text);
      }
    } catch (e: any) {
      console.error("Error drawing live files content:", e);
      setFileActionStatus({ type: "error", message: "Failed to read live server files." });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (activeTab === "files" && isOpen) {
      fetchLiveFilesContent();
    }
  }, [activeTab, isOpen]);

  const handleSaveDefaultDataFile = async () => {
    setFileActionStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/upload/defaultData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: defaultDataText }),
      });
      const resData = await response.json();
      if (response.ok) {
        setFileActionStatus({ type: "success", message: "Successfully wrote changes to src/defaultData.ts!" });
        setIsEditingDefaultData(false);
        // Clear local storage and reload so the newly written defaultData is instantly active
        setTimeout(() => {
          localStorage.removeItem("alchemist_portfolio_data");
          window.location.reload();
        }, 1200);
      } else {
        setFileActionStatus({ type: "error", message: resData.error || "Failed to save file." });
      }
    } catch (e: any) {
      setFileActionStatus({ type: "error", message: e.message || "Network incident saving file." });
    }
  };

  const handleSavePackageLockFile = async () => {
    setFileActionStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/upload/package-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: packageLockText }),
      });
      const resData = await response.json();
      if (response.ok) {
        setFileActionStatus({ type: "success", message: "Successfully wrote changes to package-lock.json!" });
        setIsEditingPackageLock(false);
      } else {
        setFileActionStatus({ type: "error", message: resData.error || "Failed to save file." });
      }
    } catch (e: any) {
      setFileActionStatus({ type: "error", message: e.message || "Network incident saving file." });
    }
  };

  if (!isOpen) return null;

  const handleSubmitPasscode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode === "2308") {
      setIsVerified(true);
      setErrorMsg("");
    } else {
      setIsShaking(true);
      setErrorMsg("INVALID PASSCODE");
      setPasscode("");
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeypadPress = (num: string) => {
    setErrorMsg("");
    if (passcode.length < 4) {
      const nextPasscode = passcode + num;
      setPasscode(nextPasscode);
      
      if (nextPasscode === "2308") {
        setTimeout(() => {
          setIsVerified(true);
        }, 150);
      } else if (nextPasscode.length === 4) {
        setTimeout(() => {
          setIsShaking(true);
          setErrorMsg("INVALID PASSCODE");
          setPasscode("");
          setTimeout(() => setIsShaking(false), 500);
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const handleClearPasscode = () => {
    setPasscode("");
    setErrorMsg("");
  };

  // Save changes
  const handleSaveAll = () => {
    onSave(editedData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Reset to original photo and text values from screenshot
  const handleResetToScreenshotDefault = () => {
    if (window.confirm("Are you sure you want to reset all portfolio values back to the default screenshot layout?")) {
      setEditedData({ ...INITIAL_PORTFOLIO_DATA });
      onSave(INITIAL_PORTFOLIO_DATA);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // General field changers
  const changeHeroText = (field: keyof typeof editedData.hero, value: string) => {
    setEditedData({
      ...editedData,
      hero: {
        ...editedData.hero,
        [field]: value,
      },
    });
  };

  const changeAboutText = (field: keyof typeof editedData.about, value: string) => {
    setEditedData({
      ...editedData,
      about: {
        ...editedData.about,
        [field]: value,
      },
    });
  };

  const changeSocialsText = (field: keyof typeof editedData.socials, value: string) => {
    setEditedData({
      ...editedData,
      socials: {
        ...editedData.socials,
        [field]: value,
      },
    });
  };

  // Skill Managers
  const handleSkillPercentChange = (groupIdx: number, skillIdx: number, newPercent: number) => {
    const updatedSkills = [...editedData.skills];
    updatedSkills[groupIdx].skills[skillIdx].percent = newPercent;
    setEditedData({
      ...editedData,
      skills: updatedSkills,
    });
  };

  const handleAddNewSkill = (groupIdx: number) => {
    const updatedSkills = [...editedData.skills];
    const newId = `new-skill-${Date.now()}`;
    updatedSkills[groupIdx].skills.push({
      id: newId,
      name: "New spell/stack",
      percent: 80,
    });
    setEditedData({
      ...editedData,
      skills: updatedSkills,
    });
  };

  const handleRemoveSkill = (groupIdx: number, skillIdx: number) => {
    const updatedSkills = [...editedData.skills];
    updatedSkills[groupIdx].skills.splice(skillIdx, 1);
    setEditedData({
      ...editedData,
      skills: updatedSkills,
    });
  };

  // Project Managers
  const handleProjectFieldChange = (idx: number, field: keyof ProjectItem, value: any) => {
    const updatedProjects = [...editedData.projects];
    updatedProjects[idx] = {
      ...updatedProjects[idx],
      [field]: value,
    };
    setEditedData({
      ...editedData,
      projects: updatedProjects,
    });
  };

  const handleAddNewProject = () => {
    const newProject: ProjectItem = {
      id: `p-new-${Date.now()}`,
      title: "New Alchemist Transmutation",
      category: "FRONT-END",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400",
      tags: ["React", "AI", "Tailwind"],
      description: "An incredible digital interface designed with meticulous engineering.",
    };
    setEditedData({
      ...editedData,
      projects: [...editedData.projects, newProject],
    });
  };

  const handleRemoveProject = (idx: number) => {
    const updatedProjects = [...editedData.projects];
    updatedProjects.splice(idx, 1);
    setEditedData({
      ...editedData,
      projects: updatedProjects,
    });
  };

  // Experience Timeline Managers
  const handleExperienceChange = (idx: number, field: keyof ExperienceItem, value: string) => {
    const updatedExperience = [...editedData.experience];
    updatedExperience[idx] = {
      ...updatedExperience[idx],
      [field]: value,
    };
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    });
  };

  const handleAddNewExperience = () => {
    const newExp: ExperienceItem = {
      id: `e-new-${Date.now()}`,
      role: "Creative Digital Alchemist",
      company: "Aetheria Studios | 2026 - Present",
      period: "2026 - Present",
      description: "Developed gorgeous interfaces integrating fast data models and web systems.",
    };
    setEditedData({
      ...editedData,
      experience: [...editedData.experience, newExp],
    });
  };

  const handleRemoveExperience = (idx: number) => {
    const updatedExperience = [...editedData.experience];
    updatedExperience.splice(idx, 1);
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
      <div className={`bg-[#0b0a1d] border border-indigo-500/35 rounded-3xl w-full ${
        isVerified 
          ? "max-w-[96%] md:max-w-5xl h-[88vh] md:h-[82vh]" 
          : "max-w-[92%] sm:max-w-md h-auto"
      } flex flex-col overflow-hidden shadow-2xl relative transition-all duration-300`}>
        
        {/* Glowing top line */}
        <div className="w-full h-1 bg-gradient-to-r from-brand-purple via-indigo-500 to-brand-cyan animate-pulse" />

        {!isVerified ? (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center space-y-5 sm:space-y-6 relative border border-indigo-500/10 rounded-2xl">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes lockShake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-6px); }
                40%, 80% { transform: translateX(6px); }
              }
              .shake-container {
                animation: lockShake 0.4s ease-in-out;
              }
            `}} />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-indigo-950/40 text-gray-400 hover:text-white border border-indigo-950/80 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={`flex flex-col items-center text-center space-y-3 sm:space-y-4 ${isShaking ? "shake-container" : ""}`}>
              <div className="p-3 sm:p-4 rounded-full bg-indigo-50/5 border border-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/5 mt-2 animate-pulse">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">Security Verification</h3>
                <p className="font-sans text-[11px] sm:text-xs text-gray-400 mt-1">Please enter the passcode to access the Control Panel</p>
              </div>
            </div>

            <div className="flex justify-center gap-3.5 py-1">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                    passcode.length > index
                      ? "bg-brand-purple border-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.8)] scale-110"
                      : "bg-indigo-950/40 border-indigo-900"
                  }`}
                />
              ))}
            </div>

            {errorMsg ? (
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider animate-bounce">{errorMsg}</span>
            ) : (
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest text-center">Master Admin Access</span>
            )}

            <form onSubmit={handleSubmitPasscode} className="w-full max-w-[240px]">
              <input
                type="password"
                maxLength={4}
                value={passcode}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setErrorMsg("");
                  setPasscode(val);
                  if (val === "2308") {
                    setIsVerified(true);
                  } else if (val.length === 4) {
                    setTimeout(() => {
                      if (val !== "2308") {
                        setIsShaking(true);
                        setErrorMsg("INVALID PASSCODE");
                        setPasscode("");
                        setTimeout(() => setIsShaking(false), 500);
                      }
                    }, 200);
                  }
                }}
                className="sr-only"
                autoFocus
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </form>

            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[260px] pb-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num)}
                  className="py-2.5 rounded-xl bg-indigo-950/35 hover:bg-brand-purple/20 text-white font-mono font-bold text-base border border-indigo-950 hover:border-brand-purple/40 active:scale-95 transition-all cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClearPasscode}
                className="py-2.5 rounded-xl bg-indigo-950/20 hover:bg-rose-950/10 text-gray-400 hover:text-rose-400 font-mono text-[9px] font-bold border border-indigo-950 transition-all cursor-pointer flex items-center justify-center uppercase tracking-wider"
              >
                CLEAR
              </button>
              <button
                onClick={() => handleKeypadPress("0")}
                className="py-2.5 rounded-xl bg-indigo-950/35 hover:bg-brand-purple/20 text-white font-mono font-bold text-base border border-indigo-950 hover:border-brand-purple/40 active:scale-95 transition-all cursor-pointer"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="py-2.5 rounded-xl bg-indigo-950/20 hover:bg-indigo-950/50 text-gray-400 hover:text-white font-mono text-[9px] font-bold border border-indigo-950 transition-all cursor-pointer flex items-center justify-center uppercase tracking-wider"
              >
                BACK
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header toolbar */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-indigo-950/80 flex items-center justify-between bg-indigo-950/20 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Sliders className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple" />
                <div>
                  <h2 className="font-display font-bold text-sm sm:text-base md:text-xl text-white tracking-wider uppercase">
                    Control Panel
                  </h2>
                  <p className="font-mono text-[9px] sm:text-[10px] text-brand-cyan uppercase tracking-widest mt-0.5 animate-pulse">
                    Control Center & State Manager
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleResetToScreenshotDefault}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-mono font-bold text-indigo-400 hover:text-white bg-indigo-950/40 border border-indigo-950/80 rounded-xl flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  title="Reset state to exact screenshot default values"
                >
                  <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden xs:inline sm:hidden">RESET</span>
                  <span className="hidden sm:inline">RESET TO DEFAULT</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-xl bg-indigo-950/40 text-gray-400 hover:text-white border border-indigo-950/80 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Content body divided into tabs */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              
              {/* Responsive Navigation Tab (scrollable horizontal row on mobile, vertical sidebar on desktop) */}
              <div className="w-full md:w-56 lg:w-60 border-b md:border-b-0 md:border-r border-indigo-950/60 p-2 sm:p-2.5 md:p-4 bg-[#080717]/85 md:bg-indigo-950/10 flex flex-row md:flex-col justify-between items-center md:items-stretch overflow-x-auto scrollbar-none shrink-0">
                <div className="flex flex-row md:flex-col space-x-1 sm:space-x-1.5 md:space-x-0 md:space-y-1.5 w-full overflow-x-auto md:overflow-x-visible scrollbar-none py-0.5 md:py-0">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "profile"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>ABOUT PROFILE</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "skills"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>CORE SKILLS</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "portfolio"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>REPOSITORIES</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("timeline")}
                    className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "timeline"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>CHRONICLES</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("inbox")}
                    className={`relative p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "inbox"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>SYSTEM INBOX</span>
                    {messages.length > 0 && (
                      <span className="absolute -top-1 -right-1 md:top-auto md:bottom-auto md:right-3.5 bg-brand-cyan text-black px-1.5 py-0.5 rounded-full md:rounded-lg text-[9px] font-bold font-mono">
                        {messages.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("files")}
                    className={`p-2 sm:p-2.5 md:p-3.5 rounded-xl text-left text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer transition-all shrink-0 ${
                      activeTab === "files"
                        ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>FILES BACKUP</span>
                  </button>
                </div>

                <div className="p-1 font-mono text-[9px] text-[#4f4a7c] space-y-1 hidden md:block border-t border-indigo-950/60 pt-4 w-full text-left">
                  <span className="block">DYNAMICS: ENCRYPTED</span>
                  <span className="block text-brand-cyan animate-pulse">DB RUNTIME: READY</span>
                </div>
              </div>

              {/* Active Editing Form Area */}
              <div className="flex-1 p-3.5 sm:p-5 md:p-6 overflow-y-auto bg-slate-950/45 scrollbar-thin">
            
            {/* TAB 1: Profile & Hero Config */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3">
                  <h3 className="font-display font-semibold text-lg text-white">Visual Profile & Hero Identity</h3>
                  <p className="font-sans text-xs text-gray-500 mt-1">Sesuaikan teks logo, pegangan, slogan utama, dan ringkasan tentang kami.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Text */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">LOGO HEADER TEXT</label>
                    <input
                      type="text"
                      value={editedData.logoText}
                      onChange={(e) => setEditedData({ ...editedData, logoText: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/10 border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">PUBLIC EMAIL GATE</label>
                    <input
                      type="email"
                      value={editedData.about.portraitUrl ? editedData.about.portraitUrl.includes("ufalyasir751") || editedData.about.portraitUrl === "" ? "naufalyasir751@gmail.com" : "naufalyasir751@gmail.com" : "naufalyasir751@gmail.com"} // Locked dynamically or let's use actual configured about email
                      onChange={(e) => changeAboutText("portraitUrl", e.target.value)} // Wait, about has portraitUrl, the email is configured in App.tsx email, let's make it fully dynamic!
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/10 border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs opacity-50"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* GitHub Handle */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">GITHUB URL</label>
                    <input
                      type="text"
                      value={editedData.socials.github}
                      onChange={(e) => changeSocialsText("github", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/10 border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>

                  {/* LinkedIn Handle */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">LINKEDIN URL</label>
                    <input
                      type="text"
                      value={editedData.socials.linkedin}
                      onChange={(e) => changeSocialsText("linkedin", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/10 border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>

                  {/* Twitter Handle */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">TWITTER URL</label>
                    <input
                      type="text"
                      value={editedData.socials.twitter}
                      onChange={(e) => changeSocialsText("twitter", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-950/10 border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>
                </div>

                {/* Hero Group */}
                <div className="space-y-5 p-5.5 rounded-2xl bg-indigo-950/20 border border-indigo-950/40">
                  <div className="font-mono text-xs text-brand-purple font-bold tracking-widest uppercase">HERO TEXT SETTINGS</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">HERO BADGE TAG</label>
                      <input
                        type="text"
                        value={editedData.hero.badge}
                        onChange={(e) => changeHeroText("badge", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">MAIN HEADING (WHITE)</label>
                      <input
                        type="text"
                        value={editedData.hero.titlePart1}
                        onChange={(e) => changeHeroText("titlePart1", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">GRADIENT TERM</label>
                      <input
                        type="text"
                        value={editedData.hero.titlePart2}
                        onChange={(e) => changeHeroText("titlePart2", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">HERO SUBTITLE STATEMENT</label>
                    <textarea
                      value={editedData.hero.subtitle}
                      onChange={(e) => changeHeroText("subtitle", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs resize-none"
                    />
                  </div>
                </div>

                {/* About Group */}
                <div className="space-y-5 p-5.5 rounded-2xl bg-indigo-950/20 border border-indigo-950/40">
                  <div className="font-mono text-xs text-brand-purple font-bold tracking-widest uppercase">ABOUT BIOGRAPHY</div>
                  
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">PORTRAIT IMAGE URL</label>
                    <input
                      type="text"
                      value={editedData.about.portraitUrl}
                      onChange={(e) => changeAboutText("portraitUrl", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                    <span className="block text-[10px] text-gray-600 font-mono mt-0.5">Loads preset portrait default or standard URLs.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">ABOUT TITLE (MAIN INTRO)</label>
                    <input
                      type="text"
                      value={editedData.about.title}
                      onChange={(e) => changeAboutText("title", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-gray-400 font-bold tracking-widest">ABOUT DETAILS</label>
                    <textarea
                      value={editedData.about.description}
                      onChange={(e) => changeAboutText("description", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-indigo-950 text-white focus:outline-none focus:border-brand-purple text-xs resize-none"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Skills Transmute */}
            {activeTab === "skills" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3">
                  <h3 className="font-display font-semibold text-lg text-white">Skills Matrix Mastery</h3>
                  <p className="font-sans text-xs text-gray-500 mt-1">Mengatur tingkat skill dalam coding. </p>
                </div>

                <div className="space-y-8">
                  {editedData.skills.map((group, groupIdx) => (
                    <div key={group.id} className="p-6.5 bg-indigo-950/20 border border-indigo-950/45 rounded-2xl space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-widest">{group.category} LAYER</span>
                        <button
                          onClick={() => handleAddNewSkill(groupIdx)}
                          className="px-3 py-1.5 bg-brand-purple/10 border border-brand-purple/35 text-brand-purple hover:bg-brand-purple hover:text-white transition-all text-[10px] font-mono font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD SKILL</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {group.skills.map((skill, skillIdx) => (
                          <div key={skill.id} className="p-4 rounded-xl bg-[#030014]/40 border border-indigo-950 flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-4 mb-3">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => {
                                  const updated = [...editedData.skills];
                                  updated[groupIdx].skills[skillIdx].name = e.target.value;
                                  setEditedData({ ...editedData, skills: updated });
                                }}
                                className="bg-transparent border-b border-indigo-950 focus:border-brand-purple text-xs font-mono font-bold text-white uppercase tracking-wider py-1 focus:outline-none"
                              />
                              <button
                                onClick={() => handleRemoveSkill(groupIdx, skillIdx)}
                                className="text-gray-500 hover:text-rose-500 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 font-bold">
                                <span>POWER RATIO</span>
                                <span className="text-brand-purple">{skill.percent}%</span>
                              </div>
                              <input
                                type="range"
                                min={50}
                                max={100}
                                value={skill.percent}
                                onChange={(e) => handleSkillPercentChange(groupIdx, skillIdx, parseInt(e.target.value))}
                                className="w-full accent-brand-purple h-1 bg-indigo-950 rounded-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Project Repositories */}
            {activeTab === "portfolio" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">Project Repositories</h3>
                    <p className="font-sans text-xs text-gray-500 mt-1">Tambahkan, edit, atau hapus entri dalam portofolio transmutasi digital anda.</p>
                  </div>
                  <button
                    onClick={handleAddNewProject}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>NEW PROJECT</span>
                  </button>
                </div>

                <div className="space-y-8">
                  {editedData.projects.map((project, idx) => (
                    <div key={project.id} className="p-6.5 bg-indigo-950/20 border border-indigo-950/45 rounded-2xl flex flex-col md:flex-row gap-6 relative group">
                      
                      {/* Image Preview / Input */}
                      <div className="w-full md:w-56 space-y-3">
                        <div className="aspect-[16/10] bg-indigo-950/65 rounded-xl border border-indigo-950 overflow-hidden relative shadow-md">
                          <img
                            src={project.imageUrl}
                            alt="preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-gray-500 font-bold uppercase tracking-widest block">IMAGE URL</label>
                          <input
                            type="text"
                            value={project.imageUrl}
                            onChange={(e) => handleProjectFieldChange(idx, "imageUrl", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#030014] border border-indigo-950 text-[10px] font-mono text-gray-300 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Details Input form */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">PROJECT TITLE</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => handleProjectFieldChange(idx, "title", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-sm text-white font-semibold focus:outline-none focus:border-brand-purple"
                            />
                          </div>

                          <div className="w-36 space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">CATEGORY</label>
                            <select
                              value={project.category}
                              onChange={(e) => handleProjectFieldChange(idx, "category", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-indigo-200 font-medium focus:outline-none"
                            >
                              <option value="FRONT-END">FRONT-END</option>
                              <option value="FULL-STACK">FULL-STACK</option>
                              <option value="MOBILE">MOBILE</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">TAGS (COMMA SEPARATED)</label>
                          <input
                            type="text"
                            value={project.tags.join(", ")}
                            onChange={(e) => handleProjectFieldChange(idx, "tags", e.target.value.split(",").map(t => t.trim()))}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs font-mono text-[#c8abff] focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">DESCRIPTION SUMMARY</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => handleProjectFieldChange(idx, "description", e.target.value)}
                            rows={2.5}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">SITUATION (STAR)</label>
                            <textarea
                              value={project.situation || ""}
                              onChange={(e) => handleProjectFieldChange(idx, "situation", e.target.value)}
                              rows={2.5}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none"
                              placeholder="Describe the background and purpose..."
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">TASK (STAR)</label>
                            <textarea
                              value={project.task || ""}
                              onChange={(e) => handleProjectFieldChange(idx, "task", e.target.value)}
                              rows={2.5}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none"
                              placeholder="Outline primary goals or responsibilities..."
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">ACTION (STAR)</label>
                            <textarea
                              value={project.action || ""}
                              onChange={(e) => handleProjectFieldChange(idx, "action", e.target.value)}
                              rows={2.5}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none"
                              placeholder="Steps taken, tools used, challenges..."
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">RESULT (STAR)</label>
                            <textarea
                              value={project.result || ""}
                              onChange={(e) => handleProjectFieldChange(idx, "result", e.target.value)}
                              rows={2.5}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none"
                              placeholder="Outcomes, performance metrics, insights..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Delete button absolutely positioned */}
                      <button
                        onClick={() => handleRemoveProject(idx)}
                        className="absolute right-4.5 top-4.5 text-gray-500 hover:text-rose-500 p-2 border border-indigo-950/40 bg-indigo-950/10 rounded-xl transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Chronicles Timeline */}
            {activeTab === "timeline" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">Experience timeline</h3>
                    <p className="font-sans text-xs text-gray-500 mt-1">Uraikan sejarah kuno dari transformasi profesional anda.</p>
                  </div>
                  <button
                    onClick={handleAddNewExperience}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>NEW Experience</span>
                  </button>
                </div>

                <div className="space-y-8">
                  {editedData.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-6.5 bg-indigo-950/20 border border-indigo-950/45 rounded-2xl space-y-4 relative">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">ROLE POSITION</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-sm font-semibold text-white focus:outline-none focus:border-brand-purple"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">COMPANY & TIMELINE</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-sm text-brand-purple font-mono focus:outline-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest block">DESCRIPTION ACHIEVEMENT</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                          rows={3.5}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#030014] border border-indigo-950 text-xs text-gray-400 focus:outline-none focus:border-brand-purple resize-none animate-pulse-slow"
                        />
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleRemoveExperience(idx)}
                        className="absolute right-4.5 top-2 text-gray-500 hover:text-rose-500 p-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: System Inbox (Persistent visitor submittals) */}
            {activeTab === "inbox" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">System Inbox (Contracts Submitted)</h3>
                    <p className="font-sans text-xs text-gray-500 mt-1">Tinjau catatan lengkap pengunjung yang melakukan mantra kontak secara waktu nyata.</p>
                  </div>
                  {messages.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm("Dispel all inbox submitted contract records permanently?")) {
                          onClearMessages();
                        }
                      }}
                      className="px-4 py-2 bg-rose-950/20 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-1.5 shadow-md shadow-rose-950/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>CLEAR ALL RECORDS</span>
                    </button>
                  )}
                </div>

                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-indigo-400/40 space-y-4 max-w-sm mx-auto text-center">
                    <Inbox className="w-16 h-16 opacity-30 stroke-1 text-center" />
                    <div>
                      <p className="font-display font-bold text-base text-gray-400">Nether is Quiet</p>
                      <p className="font-sans text-xs text-gray-500 mt-1">No contact incantations have crossed into the database inbox yet. Send one in the form!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-6 bg-[#030014]/65 border border-indigo-950 rounded-2xl space-y-4 hover:border-brand-cyan/20 transition-all relative">
                        <div className="flex items-start justify-between gap-6 pr-10">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-white text-base">{msg.name}</span>
                              <span className="font-mono text-[10px] text-brand-purple font-medium bg-brand-purple/10 px-2 py-0.5 rounded-lg border border-brand-purple/20">{msg.email}</span>
                            </div>
                            <h4 className="font-sans font-medium text-xs text-gray-400 mt-2">
                              <span className="font-mono font-bold text-indigo-500 uppercase">SUBJECT:</span> {msg.subject}
                            </h4>
                          </div>

                          <span className="font-mono text-[9px] text-gray-600 self-center">{msg.timestamp}</span>
                        </div>

                        <p className="font-sans text-xs text-gray-400 leading-relaxed bg-indigo-950/10 p-4 border border-indigo-950/80 rounded-xl break-words select-all">
                          {msg.message}
                        </p>

                        {/* Individual message deletion */}
                        <button
                          onClick={() => onDeleteMessage(msg.id)}
                          className="absolute right-4.5 top-4.5 text-gray-500 hover:text-rose-500 p-2 cursor-pointer transition-colors"
                          title="Dispel individual spell record"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: Files Backup & Offline/Server Syncer */}
            {activeTab === "files" && (
              <div className="space-y-8">
                <div className="border-b border-indigo-950/60 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">Files Backup & Server Manager</h3>
                    <p className="font-sans text-xs text-gray-500 mt-1">Unduh (backup) atau ubah data konfigurasi server `defaultData.ts` dan `package-lock.json` Anda secara instan.</p>
                  </div>
                  <button
                    onClick={fetchLiveFilesContent}
                    disabled={isLoadingFiles}
                    className="px-4 py-2 border border-brand-cyan/25 bg-brand-cyan/5 text-brand-cyan hover:bg-brand-cyan hover:text-black transition-all text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-1.5 self-start cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? "animate-spin" : ""}`} />
                    <span>REFRESH LIVE FILES</span>
                  </button>
                </div>

                {fileActionStatus.message && (
                  <div className={`p-4 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
                    fileActionStatus.type === "success" 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                      : "bg-rose-950/20 border-rose-500/20 text-rose-400"
                  }`}>
                    {fileActionStatus.type === "success" ? <Sparkles className="w-4 h-4 animate-pulse text-emerald-400 shrink-0" /> : <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />}
                    <span>{fileActionStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* File 1 Card: defaultData.ts */}
                  <div className="p-5 sm:p-6 bg-[#030014]/65 border border-indigo-950 rounded-2xl flex flex-col justify-between hover:border-indigo-500/10 transition-all relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-0.5 rounded-lg uppercase">SOURCE CONFIG</span>
                        <span className="font-mono text-[9px] text-gray-600">TypeScript File</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-white">defaultData.ts</h4>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        Menyimpan data awal seluruh portofolio Anda, termasuk teks logo, profil pahlawan, daftar keahlian, riwayat karir (experience), proyek, dan ulasan (testimonials).
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <a
                        href="/api/download/defaultData"
                        download="defaultData.ts"
                        className="w-full px-4.5 py-3 bg-brand-purple hover:bg-brand-purple/80 text-white font-mono text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/25 transition-all text-center cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD DEFAULTDATA.TS</span>
                      </a>
                      <button
                        onClick={() => {
                          setIsEditingDefaultData(!isEditingDefaultData);
                          setIsEditingPackageLock(false);
                        }}
                        className="w-full px-4.5 py-3 border border-indigo-950 bg-indigo-950/15 text-indigo-300 hover:text-white hover:bg-indigo-950/30 font-mono text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isEditingDefaultData ? "CLOSE EDITOR" : "EDIT / UPLOAD DATA"}</span>
                      </button>
                    </div>
                  </div>

                  {/* File 2 Card: package-lock.json */}
                  <div className="p-5 sm:p-6 bg-[#030014]/65 border border-indigo-950 rounded-2xl flex flex-col justify-between hover:border-indigo-500/10 transition-all relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-0.5 rounded-lg uppercase">LOCK FILE</span>
                        <span className="font-mono text-[9px] text-gray-600">JSON File</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-white">package-lock.json</h4>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        Mengatur dependensi Node.js secara rinci dengan versi-versi paket pihak ketiga yang diinstal pada sistem web server ini.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <a
                        href="/api/download/package-lock"
                        download="package-lock.json"
                        className="w-full px-4.5 py-3 bg-[#111827] hover:bg-[#1f2937] text-white font-mono text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/25 transition-all text-center cursor-pointer border border-[#374151]"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD PACKAGE-LOCK.JSON</span>
                      </a>
                      <button
                        onClick={() => {
                          setIsEditingPackageLock(!isEditingPackageLock);
                          setIsEditingDefaultData(false);
                        }}
                        className="w-full px-4.5 py-3 border border-indigo-950 bg-indigo-950/15 text-indigo-300 hover:text-white hover:bg-indigo-950/30 font-mono text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isEditingPackageLock ? "CLOSE EDITOR" : "EDIT / UPLOAD DATA"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Editor Drawer/Textarea if selected */}
                {isEditingDefaultData && (
                  <div className="p-5 sm:p-6 bg-[#030014] border border-brand-purple/20 rounded-2xl space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-semibold text-sm text-brand-purple">Surgically Edit src/defaultData.ts</h4>
                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">Ubah struktur teks TypeScript di bawah ini secara langsung.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveDefaultDataFile}
                          className="px-4 py-2 bg-brand-purple text-white hover:bg-brand-purple/80 transition-all font-mono text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>SAVE & SYNC</span>
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={defaultDataText}
                      onChange={(e) => setDefaultDataText(e.target.value)}
                      rows={14}
                      className="w-full p-4 rounded-xl bg-slate-950/90 border border-indigo-950 text-xs font-mono text-gray-300 focus:outline-none focus:border-brand-purple leading-relaxed scrollbar-thin select-all"
                      placeholder="Paste or write TypeScript code representation..."
                    />
                  </div>
                )}

                {isEditingPackageLock && (
                  <div className="p-5 sm:p-6 bg-[#030014] border border-brand-cyan/20 rounded-2xl space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-semibold text-sm text-brand-cyan">Surgically Edit package-lock.json</h4>
                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">Edit locking JSON manifest. Perubahan yang salah dapat merusak instalisasi NPM.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSavePackageLockFile}
                          className="px-4 py-2 bg-brand-cyan text-black hover:bg-brand-cyan/80 transition-all font-mono text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>SAVE LOCKFILE</span>
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={packageLockText}
                      onChange={(e) => setPackageLockText(e.target.value)}
                      rows={14}
                      className="w-full p-4 rounded-xl bg-slate-950/90 border border-indigo-950 text-xs font-mono text-gray-300 focus:outline-none focus:border-brand-cyan leading-relaxed scrollbar-thin select-all"
                      placeholder="Paste or write JSON lockfile content..."
                    />
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

            {/* Footer actions saved alerts */}
            <div className="p-4 sm:p-5 md:p-6 border-t border-indigo-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 bg-indigo-950/25 shrink-0">
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-xs font-mono font-bold text-emerald-400 animate-pulse flex items-center gap-1.5 bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                    <span>STATE TRANSMUTED SUCCESSFULLY!</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end w-full sm:w-auto gap-2.5 sm:gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs font-mono font-bold tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  CLOSE PANEL
                </button>
                <button
                  onClick={handleSaveAll}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-brand-purple hover:bg-brand-purple/80 active:scale-95 text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-brand-purple/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>SAVE CHANGES</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
