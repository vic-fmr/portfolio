import { ACADEMIC_TIMELINE } from "../data";
import { motion } from "motion/react";
import { GraduationCap, CheckCircle, Clock, CalendarRange, BookOpen } from "lucide-react";

export default function AcademicTimeline() {
  return (
    <div id="academic-timeline" className="space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <GraduationCap size={20} className="text-indigo-400" />
          <span>Estrutura Curricular & Grade de ADS</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Acompanhamento semestral focado em Análise e Desenvolvimento de Sistemas.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 md:ml-6 pl-6 space-y-10 py-2">
        {ACADEMIC_TIMELINE.map((milestone, idx) => {
          const isCompleted = milestone.status === "completed";
          const isCurrent = milestone.status === "current";

          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              key={milestone.period}
              className="relative space-y-3"
            >
              {/* Point indicator in timeline path */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 flex items-center justify-center">
                {isCompleted ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-emerald-500/10 shadow-sm shadow-emerald-500/50">
                    <CheckCircle size={10} className="text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center ring-4 ring-indigo-500/20 shadow-sm shadow-indigo-500/50 animate-pulse">
                    <Clock size={11} className="text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-750 flex items-center justify-center ring-4 ring-zinc-900/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  </div>
                )}
              </div>

              {/* Box Info */}
              <div className="space-y-2 p-5 bg-zinc-900/40 rounded-xl border border-zinc-850 hover:border-zinc-800 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
                      {milestone.period}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {milestone.semesterName}
                    </h3>
                  </div>

                  {/* Period Status Badge */}
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold w-fit ${
                    isCompleted
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                      : isCurrent
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/15"
                      : "bg-zinc-850 text-zinc-500 border border-zinc-800"
                  }`}>
                    {isCompleted ? "Concluído" : isCurrent ? "Cursando Atualmente" : "Planejado"}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                  {milestone.description}
                </p>

                {/* Micro courses indicators */}
                <div className="pt-3 border-t border-zinc-805/40 mt-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                    <BookOpen size={11} />
                    <span>Disciplinas Centrais:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.courses.map((course) => (
                      <span
                        key={course}
                        className={`text-[10px] font-mono px-2 py-0.7 rounded-md ${
                          isCompleted
                            ? "bg-zinc-800/50 text-zinc-300"
                            : isCurrent
                            ? "bg-indigo-950/20 text-indigo-350 border border-indigo-500/5"
                            : "bg-zinc-900/20 text-zinc-500"
                        }`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
