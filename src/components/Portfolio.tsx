import React, { useState } from "react";
import { 
  ExternalLink, 
  X, 
  Layers, 
  Flame, 
  ArrowUpRight,
  Compass, 
  Target, 
  Zap, 
  Award
} from "lucide-react";
import { ProjectItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

// Types for local filters & components
type ProjectFilterType = "ALL" | "FRONT-END" | "FULL-STACK" | "MOBILE";

interface PortfolioProps {
  projects: ProjectItem[];
}

interface CategoryFilterProps {
  availableCategories: ProjectFilterType[];
  currentCategoryFilter: ProjectFilterType;
  onSelectCategory: (category: ProjectFilterType) => void;
}

interface ProjectCardProps {
  key?: React.Key;
  projectData: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onLaunchDemo: (project: ProjectItem) => void;
}

interface ProjectDetailModalProps {
  activeModalProject: ProjectItem;
  onCloseModal: () => void;
  onLaunchDemo: (project: ProjectItem) => void;
}

/**
 * 1. CategoryFilter Component (SRP: Handles rendering filter tags)
 */
function CategoryFilter({
  availableCategories,
  currentCategoryFilter,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-indigo-950/25 border border-indigo-950/40 p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-inner shadow-black/40">
      {availableCategories.map((category) => (
        <button
          key={category}
          id={`filter-btn-${category.toLowerCase()}`}
          onClick={() => onSelectCategory(category)}
          className={`px-4.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 relative cursor-pointer ${
            currentCategoryFilter === category
              ? "text-white bg-indigo-600 shadow-md shadow-indigo-600/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

/**
 * 2. ProjectCard Component (SRP: Handles rendering a single project item card)
 */
function ProjectCard({
  projectData,
  onSelectProject,
  onLaunchDemo,
}: ProjectCardProps) {
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case "FRONT-END":
        return "text-fuchsia-400";
      case "FULL-STACK":
        return "text-indigo-300";
      default:
        return "text-cyan-400";
    }
  };

  return (
    <motion.article
      layout
      id={`project-card-${projectData.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col h-full rounded-2xl bg-[#080717]/50 border border-indigo-950/35 overflow-hidden shadow-lg hover:border-indigo-500/25 hover:bg-indigo-950/15 transition-all duration-300"
    >
      {/* Visual Thumbnail Frame */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-indigo-950/50 cursor-pointer"
        onClick={() => onSelectProject(projectData)}
      >
        <img
          src={projectData.imageUrl}
          alt={projectData.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={(event) => {
            (event.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400";
          }}
        />
        {/* Category Pill Tag Overlay */}
        <span className={`absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest bg-indigo-950/90 backdrop-blur-md border border-white/10 ${getCategoryColorClass(projectData.category)}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {projectData.category}
        </span>
      </div>

      {/* Structured Portfolio Details Area */}
      <div className="p-6.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Portfolio Title */}
          <h3 
            onClick={() => onSelectProject(projectData)}
            className="font-display font-medium text-xl text-white mb-3 hover:text-brand-purple transition-colors cursor-pointer"
          >
            {projectData.title}
          </h3>

          {/* Technology Tags Cluster */}
          <div className="flex flex-wrap gap-1.5 mb-5 select-none">
            {projectData.tags.map((technologyTag, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium text-[#c8abff] bg-white/5 border border-white/15"
              >
                {technologyTag}
              </span>
            ))}
          </div>

          {/* Core Descriptive Text */}
          <p className="font-sans text-xs text-gray-400 leading-relaxed mb-6 block line-clamp-2">
            {projectData.description}
          </p>
        </div>

        {/* Reactive Button Row Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-indigo-950/30 mt-auto">
          <button
            onClick={() => onSelectProject(projectData)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer group/btn bg-indigo-950/30 hover:bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-500/10"
          >
            <span>VIEW DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onLaunchDemo(projectData)}
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-purple hover:text-brand-cyan transition-colors cursor-pointer"
          >
            <span>LIVE PREVIEW</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * 3. ProjectDetailModal Component (SRP: Handles detailed overlay of project using STAR methodology)
 */
function ProjectDetailModal({
  activeModalProject,
  onCloseModal,
  onLaunchDemo,
}: ProjectDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-[#0b0a1d] border border-indigo-500/25 rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[88vh] xs:max-h-[90vh] sm:max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
      >
        {/* Decorative Neon Top Rim */}
        <div className="w-full h-1 bg-gradient-to-r from-brand-purple via-indigo-505 to-brand-cyan shrink-0" />
        
        {/* Header Ribbon Row */}
        <div className="p-3 sm:p-5 md:p-6 border-b border-indigo-950/80 flex items-center justify-between bg-indigo-950/15 shrink-0 gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-indigo-550/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] sm:text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block truncate">STAR PROJECT BREAKDOWN</span>
              <h2 className="font-display font-bold text-sm sm:text-lg md:text-2xl text-white tracking-wide mt-0.5 truncate sm:whitespace-normal">
                {activeModalProject.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onCloseModal}
            className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-indigo-950/40 text-gray-400 hover:text-white border border-indigo-950/80 hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-3.5 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 bg-[#060515]/95 scrollbar-thin">
          
          {/* Grid: Image and basic description summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start pb-4 sm:pb-5 border-b border-indigo-950/80">
            <div className="md:col-span-8 space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-mono text-[9px] sm:text-xs font-bold text-brand-purple uppercase tracking-wider mb-1.5 sm:mb-2">PROJECT SUMMARY</h3>
                <p className="font-sans text-[11px] sm:text-sm text-indigo-200/80 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {activeModalProject.tags.map((tagItem, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/25"
                    >
                      {tagItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 rounded-xl overflow-hidden aspect-[16/10] max-h-[110px] xs:max-h-[140px] sm:max-h-[220px] md:max-h-none bg-indigo-950 border border-indigo-500/10 shadow-lg relative shrink-0">
              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(event) => {
                  (event.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400";
                }}
              />
              <span className="absolute top-2 right-2 text-[8px] sm:text-[8.5px] font-mono font-bold text-indigo-300 bg-[#070614]/90 border border-indigo-500/15 px-1.5 py-0.5 rounded uppercase">
                {activeModalProject.category}
              </span>
            </div>
          </div>

          {/* STAR Architectural Breakdown Grid */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-400 shrink-0" />
              <h4 className="font-display font-bold text-xs sm:text-sm md:text-base text-white uppercase tracking-wider">PROJECT METHODOLOGY DETAILS (STAR)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Situation */}
              <div className="p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-indigo-950/20 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors flex flex-col space-y-1.5 h-auto md:min-h-[160px]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold text-indigo-300 tracking-wider uppercase border-b border-indigo-950/60 pb-1 sm:pb-1.5 shrink-0">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>SITUATION</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                  {activeModalProject.situation || "Background situation details not yet transmutated. Review general project description above for primary business objectives."}
                </p>
              </div>

              {/* Task */}
              <div className="p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-indigo-950/20 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors flex flex-col space-y-1.5 h-auto md:min-h-[160px]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold text-brand-purple tracking-wider uppercase border-b border-indigo-950/60 pb-1 sm:pb-1.5 shrink-0">
                  <Target className="w-3.5 h-3.5 text-brand-purple" />
                  <span>TASK</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                  {activeModalProject.task || "Engineering task expectations not yet transmutated. Target focused on robust structure implementation and system interoperability."}
                </p>
              </div>

              {/* Action */}
              <div className="p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-indigo-950/20 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors flex flex-col space-y-1.5 h-auto md:min-h-[160px]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold text-brand-cyan tracking-wider uppercase border-b border-indigo-950/60 pb-1 sm:pb-1.5 shrink-0">
                  <Zap className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>ACTION</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                  {activeModalProject.action || "Active implementation protocols not yet transmutated. Follow framework setup guides for details on deployment scripting."}
                </p>
              </div>

              {/* Result */}
              <div className="p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-indigo-950/30 border border-indigo-500/15 hover:border-indigo-500/25 transition-colors flex flex-col space-y-1.5 h-auto md:min-h-[160px] shadow-lg shadow-brand-purple/5">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold text-emerald-400 tracking-wider uppercase border-b border-indigo-950/60 pb-1 sm:pb-1.5 shrink-0">
                  <Award className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>RESULT</span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                  {activeModalProject.result || "Strategic outcomes and metric enhancements not yet transmutated. Built securely and ready for real-time traffic benchmarks."}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Navigation Bar */}
        <div className="p-3.5 sm:p-5 md:p-6 border-t border-indigo-950/80 bg-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
          <span className="text-[8px] sm:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block sm:inline text-center sm:text-left">VALIDATED INTEGRATION: SUCCESS</span>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={onCloseModal}
              className="px-3.5 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold text-[#94a3b8] hover:text-white transition-colors cursor-pointer border border-[#1d1b32] hover:bg-[#151325] flex-1 sm:flex-initial text-center"
            >
              CLOSE VIEW
            </button>
            <button
              onClick={() => onLaunchDemo(activeModalProject)}
              className="px-3.5 py-2 sm:px-6 sm:py-3 bg-brand-purple hover:bg-brand-purple/80 text-white text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 shadow-md transition-all cursor-pointer active:scale-95 flex-1 sm:flex-initial text-center"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>DEMONSTRATION</span>
            </button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

/**
 * 4. Main Portfolio Section Composition Component
 */
export default function Portfolio({ projects: portfolioProjects }: PortfolioProps) {
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<ProjectFilterType>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const availableCategories: ProjectFilterType[] = [
    "ALL",
    "FRONT-END",
    "FULL-STACK",
    "MOBILE",
  ];

  // Filters visible list based on category state selection
  const displayedProjects = currentCategoryFilter === "ALL"
    ? portfolioProjects
    : portfolioProjects.filter((singleProject) => singleProject.category === currentCategoryFilter);

  // Opens a live demo or smoothly scrolls to contact section fallback
  const handleLaunchProjectDemo = (projectData: ProjectItem) => {
    if (projectData.demoUrl) {
      window.open(projectData.demoUrl, "_blank");
    } else {
      // Close project modal if active before smoothly scrolling
      setActiveModalProject(null);
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSelectModalProject = (projectData: ProjectItem) => {
    setActiveModalProject(projectData);
  };

  const handleCloseProjectModal = () => {
    setActiveModalProject(null);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#030014]/93 border-t border-indigo-950/20 relative overflow-hidden">
      {/* Background radial atmosphere layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Dynamic Header Block with Subtitles & Pill Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 gap-8">
          <div>
            <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="font-sans text-gray-400 text-base sm:text-lg max-w-xl select-none leading-relaxed">
              A curated collection of my most complex transmutations and digital explorations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CategoryFilter 
              availableCategories={availableCategories} 
              currentCategoryFilter={currentCategoryFilter} 
              onSelectCategory={setCurrentCategoryFilter} 
            />
          </div>
        </div>

        {/* Portfolio Cards layout stream */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((singleProject) => (
              <ProjectCard 
                key={singleProject.id}
                projectData={singleProject}
                onSelectProject={handleSelectModalProject}
                onLaunchDemo={handleLaunchProjectDemo}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Big Interactive Detailed STAR Modal Overlay */}
        <AnimatePresence>
          {activeModalProject && (
            <ProjectDetailModal 
              activeModalProject={activeModalProject}
              onCloseModal={handleCloseProjectModal}
              onLaunchDemo={handleLaunchProjectDemo}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
