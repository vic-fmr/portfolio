export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  objectives?: string; // Título / Objetivos
  stack: string[]; // Tecnologias Utilizadas
  role: string; // Minhas Responsabilidades
  period: string; // e.g., "1º Período"
  type: "academic" | "personal" | "fictional-example";
  challenges?: string;
  solutions?: string;
  results?: string; // Resultados / Aprendizados
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100 percentage
  description: string;
  category: "language" | "frontend" | "backend" | "database" | "tools";
}

export interface AcademicMilestone {
  period: string;
  semesterName: string;
  status: "completed" | "current" | "future";
  description: string;
  courses: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
