/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import ProjectsShowcase from "./components/ProjectsShowcase";
import SkillsGrid from "./components/SkillsGrid";
import AcademicTimeline from "./components/AcademicTimeline";
import TwinChatbot from "./components/TwinChatbot";
import GitHubIntegration from "./components/GitHubIntegration";
import { Sparkles, Terminal, Cpu } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-150 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <Header />

        {/* Main Interface Core Layout: Bento Grid or Two Column on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Academic Projects, Skills, and Curriculum Schedule */}
          <div className="lg:col-span-7 space-y-12">

            {/* Academic Projects Showcase Section */}
            <section id="academic-projects" className="scroll-mt-6">
              <ProjectsShowcase />
            </section>

            {/* GitHub Profile Integration Section */}
            <section id="github-sync" className="scroll-mt-6">
              <GitHubIntegration />
            </section>

            {/* Curriculum Timeline & Courses Grade Section */}
            <section id="curriculum-timeline" className="scroll-mt-6">
              <AcademicTimeline />
            </section>

            {/* Technical Skills and Competencies Section */}
            <section id="dev-skills" className="scroll-mt-6">
              <SkillsGrid />
            </section>

          </div>

          {/* Right Column: Virtual Twin AI Chatbot Companion */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Faça uma Entrevista Virtual</h2>
              </div>
              <p className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                <Terminal size={12} className="text-zinc-500" />
                <span>Digite suas perguntas e obtenha respostas instantâneas!</span>
              </p>

            </div>

            <TwinChatbot />

          </div>

        </div>

        {/* Humble Footer */}
        <footer className="pt-12 mt-16 border-t border-zinc-900 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <Cpu size={12} className="text-zinc-650" />
            <span>Victor Marques • Estudante de ADS (4º Período)</span>
          </div>
          <div>
            <span>© 2026 • Portfólio IA Interativo</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

