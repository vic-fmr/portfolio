import { useState } from "react";
import { SKILLS } from "../data";
import { SkillItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Layout, Database, Terminal, Settings, Code2, Star, Zap } from "lucide-react";

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "language" | "frontend" | "backend" | "database" | "tools">("all");

  const categories = [
    { id: "all", label: "Todos", icon: null },
    { id: "language", label: "Linguagens", icon: Code2 },
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend", icon: Terminal },
    { id: "database", label: "Banco de Dados", icon: Database },
    { id: "tools", label: "Ferramentas", icon: Settings },
  ] as const;

  const featuredSkills = SKILLS.filter(s => s.isFeatured && (activeTab === "all" || s.category === activeTab));
  const otherSkills = SKILLS.filter(s => !s.isFeatured && (activeTab === "all" || s.category === activeTab));

  return (
    <div id="skills-grid-section" className="space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-zinc-800 pb-6 gap-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Terminal size={20} className="text-indigo-400" />
            <span>Stack Tecnológico</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono">Competências fundamentais e ecossistemas dominados.</p>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-zinc-905 rounded-xl border border-zinc-800 text-xs font-mono">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-900/20"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                {Icon && <Icon size={12} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        {/* Featured Skills Section */}
        {featuredSkills.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Tecnologias de Foco</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {featuredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-indigo-500/30 transition-all shadow-xl"
                  >
                    <div className="absolute top-4 right-4">
                      <Zap size={14} className="text-indigo-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-white text-lg tracking-tight">{skill.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {skill.description}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 uppercase font-bold">
                          Core Stack
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Other Skills Section */}
        {otherSkills.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Code2 size={14} className="text-zinc-500" />
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Conhecimentos Complementares</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {otherSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-850 hover:bg-zinc-850 transition-colors group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-[10px] text-zinc-500 line-clamp-1 group-hover:line-clamp-none transition-all">
                        {skill.description.split('.')[0]}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Philosophy Box */}
      <div className="mt-4 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex gap-4 items-start">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
          <CheckCircle2 size={20} />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-sm font-bold text-white">Especialização e Versatilidade</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Foco profundo no ecossistema **Java/Spring** e no desenvolvimento moderno com **TypeScript/Next.js**. A utilização de ferramentas como **Docker** e **Git** é integrada nativamente ao fluxo de desenvolvimento, garantindo entregas padronizadas, seguras e versionadas.
          </p>
        </div>
      </div>
    </div>
  );
}
