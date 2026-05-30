import { PERSONAL_INFO } from "../data";
import { Github, Linkedin, Mail, MapPin, GraduationCap, FileDown } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const handleExportPDF = () => {
    window.print();
  };
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.header
      id="portfolio-header"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full mb-10 pt-8 border-b border-zinc-800 pb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Avatar Photo + Bio Block */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center max-w-3xl">

          {/* Profile Photo Wrapper - EXTREMELY EASY TO CUSTOMIZE:
              To use your own local photo, just upload it and replace the 'src' below with your file path:
              e.g., src="/src/minha_foto.jpg" or src="https://suafoto.com/link"
          */}
          <motion.div
            variants={itemVariants}
            className="relative shrink-0 select-none group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-zinc-750 bg-zinc-900 flex items-center justify-center">
              <img
                src="/profile.webp"
                alt={PERSONAL_INFO.name}
                width={112}
                height={112}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div
                id="fallback-avatar"
                className="hidden flex flex-col items-center justify-center text-center p-2"
              >
                <GraduationCap className="text-indigo-400 mb-1" size={24} />
                <span className="text-sm font-display font-black text-white">VM</span>
                <span className="text-[9px] font-mono text-zinc-500">Open Source</span>
              </div>
            </div>

            {/* Decorative Overlay Tip for user instruction */}
            <div className="absolute -bottom-1.5 right-1.5 bg-zinc-900 border border-zinc-750 text-[8px] font-mono text-zinc-400 group-hover:text-white px-1.5 py-0.5 rounded shadow-lg transition-colors cursor-help" title="Edite o arquivo '/src/components/Header.tsx' para substituir esta URL por sua foto pessoal!">
              FOTO ✎
            </div>
          </motion.div>

          {/* Texts Info Column */}
          <div className="space-y-3">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium tracking-wide text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20"
            >
              <GraduationCap size={14} className="animate-pulse" />
              <span>ADS • 4º Período • Em Desenvolvimento</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white leading-none"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg font-medium text-zinc-300 font-sans tracking-tight"
            >
              {PERSONAL_INFO.title}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-normal"
            >
              {PERSONAL_INFO.bio}
            </motion.p>
          </div>
        </div>

        {/* Right Side Info Card */}
        <motion.div
          variants={itemVariants}
          className="shrink-0"
        >
          {/* Quick contact card */}
          <div className="bg-zinc-900/50 backdrop-blur-md rounded-xl p-4 border border-zinc-800 space-y-3 min-w-[240px]">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
              <MapPin size={13} className="text-zinc-500" />
              <span>{PERSONAL_INFO.location} • Remoto / Híbrido</span>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group flex items-center gap-2 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
            >
              <Mail size={13} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              <span className="truncate">{PERSONAL_INFO.email}</span>
            </a>

            <div className="flex gap-2 pt-1 border-t border-zinc-800/60 mt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-medium bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all hover:scale-[1.02]"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-medium bg-indigo-650 hover:bg-indigo-600 text-white border border-indigo-500/30 transition-all hover:scale-[1.02]"
              >
                <Linkedin size={12} />
                <span>LinkedIn</span>
              </a>
            </div>

            <a
              href="/CV-Victor_Ferreira_Marques.pdf"
              download
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-zinc-950 hover:bg-zinc-850 text-indigo-400 border border-zinc-800 transition-all cursor-pointer no-print"
            >
              <FileDown size={14} />
              <span>Baixar Currículo (PDF)</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
    </motion.header>
  );
}
