import { useState } from "react";
import { SKILLS } from "../data";
import { SkillItem } from "../types";
import { motion } from "motion/react";
import { CheckCircle2, Layout, Database, Terminal, Settings, Code2 } from "lucide-react";

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

  const filteredSkills = SKILLS.filter((s) => {
    if (activeTab === "all") return true;
    return s.category === activeTab;
  });

  return (
    <div id="skills-grid-section" className="space-y-6">
      {/* Tab bar header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Terminal size={20} className="text-indigo-400" />
          <span>Habilidades Técnicas</span>
        </h2>

        {/* Categories toggler */}
        <div className="flex flex-wrap gap-1 p-1 bg-zinc-905 rounded-xl border border-zinc-800 text-xs font-mono">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "bg-zinc-800 text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {Icon && <Icon size={12} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            key={skill.name}
            className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-850 hover:border-zinc-800 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base font-sans">{skill.name}</span>
                <span className="text-xs font-mono text-indigo-400 font-medium">{skill.level}%</span>
              </div>
              
              <p className="text-xs text-zinc-400 leading-normal">
                {skill.description}
              </p>
            </div>

            {/* Simulated visual progress bar */}
            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden mt-4 border border-zinc-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="h-full bg-gradient-to-r from-indigo-505 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Methodology Highlight Info box */}
      <div className="p-4 rounded-xl bg-zinc-950/30 border border-zinc-805 flex gap-3.5 items-start">
        <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={18} />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-zinc-200">Abordagem Curricular de ADS</h4>
          <p className="text-xs text-zinc-400 leading-normal">
            As competências em bancos de dados relacionais e modelagem MVC são consolidadas por meio de projetos integradores práticos. As habilidades de desenvolvimento de software alinham conceitos teóricos (como padrões de projeto de engenharia de software e análise orientada a objetos) com frameworks modernos (React, Node.js).
          </p>
        </div>
      </div>
    </div>
  );
}
