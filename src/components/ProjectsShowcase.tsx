import { useState } from "react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Calendar, FileText, Award, X, ExternalLink, ShieldAlert, Cpu } from "lucide-react";

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState<"all" | "academic" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <div id="projects-showcase" className="space-y-6">
      {/* Category Picker */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Code2 size={20} className="text-indigo-400" />
          <span>Projetos em Destaque</span>
        </h2>
        
        <div className="flex gap-1.5 p-1 bg-zinc-905 rounded-xl border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("academic")}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "academic"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Acadêmicos
          </button>
          <button
            onClick={() => setFilter("personal")}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "personal"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Pessoais
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 rounded-xl border border-dotted border-zinc-800">
          <p className="text-sm text-zinc-500 font-mono">Nenhum projeto registrado nesta categoria.</p>
        </div>
      ) : (
        /* Bento-like Grid */
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              key={project.id}
              className="group relative flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-900 to-zinc-900/60 rounded-xl border border-zinc-850 hover:border-zinc-700 transition-all shadow-md hover:shadow-indigo-950/20"
            >
              <div className="space-y-4">
                {/* Card Top */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-medium">
                    {project.period}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    project.type === "academic" 
                      ? "text-indigo-400 border border-indigo-505/20 bg-indigo-500/5" 
                      : "text-emerald-400 border border-emerald-505/20 bg-emerald-500/5"
                  }`}>
                    {project.type === "academic" ? "Acadêmico" : "Pessoal"}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded">
                      +{project.stack.length - 4} mais
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono italic">
                  Cargo: {project.role}
                </span>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-400 group-hover:text-indigo-350 hover:underline transition-all cursor-pointer"
                >
                  <FileText size={12} />
                  <span>Ver Detalhes</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Dynamic Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Core Header */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                      {selectedProject.period}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 font-medium">
                      PROJETO INTERDISCIPLINAR
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 space-y-6 flex-1 text-sm leading-relaxed text-zinc-300">
                
                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="flex items-center gap-1.5 font-bold text-white text-xs uppercase tracking-wide font-mono text-zinc-400">
                    <FileText size={13} className="text-indigo-400" />
                    <span>Descrição Completa</span>
                  </h4>
                  <p className="text-zinc-300 text-sm">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Objectives */}
                {selectedProject.objectives && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 font-bold text-white text-xs uppercase tracking-wide font-mono text-indigo-400">
                      <Award size={13} />
                      <span>Objetivos do Projeto</span>
                    </h4>
                    <p className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-850 text-zinc-300 text-xs font-mono">
                      {selectedProject.objectives}
                    </p>
                  </div>
                )}

                {/* Team Role & Technology Segment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-950/40 rounded-xl border border-zinc-850">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Papel no Time</span>
                    <span className="font-semibold text-white">{selectedProject.role}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Tipo de Iniciativa</span>
                    <span className="font-semibold text-indigo-300 capitalize">{selectedProject.type}</span>
                  </div>
                </div>

                {/* Academic Challenge (Strictly focused on academic details) */}
                {selectedProject.challenges && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 font-bold text-white text-xs uppercase tracking-wide font-mono text-red-400">
                      <ShieldAlert size={13} />
                      <span>Desafio Técnico Encontrado</span>
                    </h4>
                    <p className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-zinc-300 text-xs font-mono">
                      {selectedProject.challenges}
                    </p>
                  </div>
                )}

                {/* Technical Solution */}
                {selectedProject.solutions && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 font-bold text-white text-xs uppercase tracking-wide font-mono text-emerald-400">
                      <Cpu size={13} />
                      <span>Solução Arquitetural Implementada</span>
                    </h4>
                    <p className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-zinc-300 text-xs font-mono">
                      {selectedProject.solutions}
                    </p>
                  </div>
                )}

                {/* Results / Performance Metrics */}
                {selectedProject.results && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/25 to-purple-950/15 border border-indigo-500/10 flex items-start gap-3">
                    <Award className="text-amber-400 shrink-0 mt-0.5" size={20} />
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider text-indigo-300">Resultado Alcançado</h4>
                      <p className="text-zinc-300 text-xs">
                        {selectedProject.results}
                      </p>
                    </div>
                  </div>
                )}

                {/* Technology listing */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500">Tecnologias Utilizadas</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-zinc-300 bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-750"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer (Action links) */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Victor Marques • ADS</span>
                
                <div className="flex gap-2">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-medium hover:bg-zinc-850 text-zinc-300 transition-colors"
                    >
                      <Code2 size={13} />
                      <span>Repositório</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-mono font-medium bg-indigo-650 hover:bg-indigo-600 text-white transition-colors"
                    >
                      <ExternalLink size={12} />
                      <span>Demonstração</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
