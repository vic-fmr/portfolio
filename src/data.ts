import { Project, SkillItem, AcademicMilestone } from "./types";

export const PERSONAL_INFO = {
  name: "Victor F. Marques",
  title: "Desenvolvedor Full-Stack & Estudante de ADS",
  location: "Brasil",
  period: "4º Período",
  currentInstitution: "Faculdade de Tecnologia",
  bio: "Estudante de Análise e Desenvolvimento de Sistemas (ADS) focado no desenvolvimento Full-Stack com experiência em ecossistemas modernos como TypeScript (React/Next.js/Angular), Java (Spring Boot, Security, Data JPA, AI).",
  email: "victorfmarques12@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

export const PROJECTS: Project[] = [
  {
    id: "karaq",
    title: "KaraQ - Fila de Gerenciamento de Karaoke",
    description: "Sistema de gerenciamento de filas e sessões de Karaoke em tempo real.",
    longDescription: "O KaraQ é uma plataforma robusta para gestão de filas de Karaoke. O sistema permite a entrada de usuários em sessões, escolha de músicas via API do YouTube e o gerenciamento dinâmico da fila de espera em tempo real através de WebSockets.",
    objectives: "Automatizar o gerenciamento de filas em estabelecimentos de Karaoke, proporcionando uma experiência fluida tanto para os clientes quanto para os operadores.",
    stack: ["Angular", "Spring Boot", "Spring Security", "WebSocket", "JPA", "PostgreSQL", "YouTube API"],
    role: "Desenvolvedor Full-Stack",
    period: "4º Período",
    type: "academic",
    challenges: "Sincronização em tempo real da fila entre múltiplos clientes e o servidor.",
    solutions: "Implementação de WebSockets para comunicação bidirecional e Spring Security para garantir a integridade das sessões.",
    results: "Interface altamente responsiva com atualizações instantâneas, eliminando a necessidade de recarregamento de página.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "jira-ai",
    title: "Jira AI Integration",
    description: "Automatização de criação de Histórias de Usuário no Jira utilizando Inteligência Artificial.",
    longDescription: "Desenvolvido para a Residência do Porto Digital, este sistema utiliza SpringAI para interpretar documentos técnicos e gerar automaticamente Histórias de Usuário (HUs) estruturadas diretamente no Jira através de sua API REST.",
    objectives: "Reduzir o tempo gasto por Product Owners e analistas na criação manual de tarefas no Jira, garantindo padronização através de IA.",
    stack: ["Spring Boot", "SpringAI", "Jira API", "Java", "JSON"],
    role: "Desenvolvedor de Backend & IA",
    period: "4º Período",
    type: "academic",
    challenges: "Mapear de forma precisa o conteúdo de documentos diversos para o formato aceito pela API do Jira.",
    solutions: "Uso de prompts estruturados no SpringAI para extrair campos específicos e validação de schema antes do envio à API.",
    results: "Aumento na produtividade da equipe de gestão, com criação de HUs em segundos a partir de especificações brutas.",
    githubUrl: "https://github.com"
  },
  {
    id: "trail",
    title: "Trail",
    description: "Plataforma de cursos personalizada com IA e foco em métricas de desenvolvimento.",
    longDescription: "Projeto da Residência do Porto Digital que utiliza Next.js e C# para oferecer uma plataforma de ensino adaptativa. A IA personaliza as trilhas de aprendizado com base no desempenho e interesses do aluno, fornecendo métricas detalhadas de evolução.",
    objectives: "Criar um ecossistema de aprendizado focado no desenvolvedor, onde a tecnologia auxilia na identificação de lacunas de conhecimento.",
    stack: ["Next.js", "C#", ".NET", "PostgreSQL", "AI Integration"],
    role: "Desenvolvedor Frontend",
    period: "4º Período",
    type: "academic",
    challenges: "Integrar um backend robusto em C# com um frontend dinâmico em Next.js mantendo alta performance.",
    solutions: "Arquitetura baseada em APIs RESTful bem definidas e otimização de queries para as métricas de desenvolvimento.",
    results: "Plataforma escalável capaz de gerar relatórios de progresso detalhados e trilhas de estudo sob medida.",
    githubUrl: "https://github.com"
  },
  {
    id: "gerador-orcamentos",
    title: "Gerador de Orçamentos",
    description: "CRUD completo para gerenciamento de orçamentos, clientes e serviços.",
    longDescription: "Uma solução prática desenvolvida com Next.js e Java para automatizar o processo de orçamentação. O sistema permite o cadastro completo de clientes, catálogo de serviços e a geração dinâmica de propostas comerciais.",
    objectives: "Centralizar a gestão de vendas e orçamentos para pequenos prestadores de serviço e empresas.",
    stack: ["Next.js", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    role: "Desenvolvedor Full-Stack",
    period: "3º Período",
    type: "personal",
    challenges: "Gerar documentos formatados de forma consistente a partir dos dados do sistema.",
    solutions: "Implementação de templates dinâmicos no frontend para visualização e exportação de orçamentos.",
    results: "Simplificação do fluxo de trabalho administrativo e melhor organização da base de clientes.",
    githubUrl: "https://github.com"
  },
  {
    id: "focusflow",
    title: "FocusFlow",
    description: "Aplicação para gerenciamento de tempo e tarefas com persistência em nuvem.",
    longDescription: "Gerenciador de tarefas (To-Do) e tempo desenvolvido para maximizar a produtividade. Utiliza Next.js para uma interface rápida e Supabase para autenticação e banco de dados em tempo real.",
    objectives: "Oferecer uma ferramenta simples e poderosa para organização pessoal e foco em tarefas críticas.",
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    role: "Desenvolvedor Full-Stack",
    period: "3º Período",
    type: "academic",
    challenges: "Implementar autenticação segura e sincronização de dados entre dispositivos.",
    solutions: "Uso do Supabase Auth e PostgreSQL Realtime para garantir que os dados estejam sempre atualizados.",
    results: "Interface limpa e intuitiva que facilita o gerenciamento diário de atividades.",
    githubUrl: "https://github.com"
  }
];

export const SKILLS: SkillItem[] = [
  // Linguagens de Programação
  { name: "Java", level: 90, description: "Especialista no ecossistema Spring (Boot, Security, Data JPA, AI) para APIs robustas e escaláveis.", category: "language", isFeatured: true },
  { name: "TypeScript / JS", level: 88, description: "Desenvolvimento avançado com tipos estritos, ES6+ e integração de ecossistemas modernos.", category: "language", isFeatured: true },
  { name: "C#", level: 65, description: "Desenvolvimento de backends escaláveis com .NET para plataformas de ensino.", category: "language" },

  // Frameworks/Bibliotecas Frontend
  { name: "React / Next.js", level: 90, description: "Construção de interfaces performáticas com Server Components, Hooks e renderização híbrida.", category: "frontend", isFeatured: true },
  { name: "Angular", level: 75, description: "Desenvolvimento de aplicações complexas com injeção de dependência e gerenciamento de estado.", category: "frontend" },
  { name: "Tailwind CSS", level: 92, description: "Estilização responsiva mobile-first com utilities personalizadas.", category: "frontend" },

  // Frameworks/Bibliotecas Backend
  { name: "Spring Boot", level: 85, description: "Domínio completo de Spring Security para autenticação, SpringAI para integrações e JPA para persistência.", category: "backend", isFeatured: true },
  { name: "Node.js / Express", level: 83, description: "Execução assíncrona no servidor e roteamentos modulares.", category: "backend" },
  { name: "Supabase", level: 75, description: "Backend-as-a-Service, autenticação e banco de dados em tempo real.", category: "backend" },

  // Banco de Dados
  { name: "PostgreSQL", level: 80, description: "Modelagem de dados (DER/MER), chaves estrangeiras e otimização de consultas.", category: "database" },

  // Ferramentas
  { name: "Git & GitHub", level: 90, description: "Controle de versão avançado, fluxos de trabalho colaborativos e Git Flow.", category: "tools", isFeatured: true },
  { name: "Docker", level: 80, description: "Conteinerização de aplicações, gerenciamento de imagens e ambientes isolados para portabilidade.", category: "tools", isFeatured: true },
  { name: "WebSocket", level: 70, description: "Comunicação em tempo real para sistemas de fila e sessões interativas.", category: "tools" }
];

export const ACADEMIC_TIMELINE: AcademicMilestone[] = [
  {
    period: "1º Período",
    semesterName: "Programação & Fundamentos",
    status: "completed",
    description: "Introdução à lógica e fundamentos da computação, focando em bases matemáticas e gestão de pessoas.",
    courses: ["Introdução à Computação", "Matemática para Computação", "Sistemas Digitais", "Fundamentos de Programação", "Projeto 1", "FP1: Gestão de Pessoas"]
  },
  {
    period: "2º Período",
    semesterName: "Problemas Computacionais",
    status: "completed",
    description: "Exploração de diferentes paradigmas de programação, lógica avançada e design de interfaces humano-computador.",
    courses: ["Programação Imperativa e Funcional", "Interfaces Humano Computador", "Lógica para Computação", "Fundamentos e Desenvolvimento de Softwares", "Projeto 2", "FP2: Gestão de Projetos"]
  },
  {
    period: "3º Período",
    semesterName: "Infraestruturas Computacionais",
    status: "completed",
    description: "Foco em infraestrutura básica de hardware e rede, algoritmos estruturados e programação orientada a objetos.",
    courses: ["Programação Orientada a Objetos", "Infraestrutura de Software (SO)", "Infraestrutura de Comunicação (RSD)", "Algoritmo e Estrutura de Dados", "Estatística e Probabilidade", "Projeto 3"]
  },
  {
    period: "4º Período",
    semesterName: "Métodos e Técnicas (Atual)",
    status: "current",
    description: "Aprofundamento em bancos de dados, engenharia de software, sistemas distribuídos e desenvolvimento web avançado.",
    courses: ["Modelagem e Projeto de BD", "Requisitos, Projeto de Software e Validação", "Computação Concorrente, Paralela e Distribuída", "Desenvolvimento Web", "Engenharia de Software e IA", "Projeto 4"]
  },
  {
    period: "5º Período",
    semesterName: "Sistemas & Negócios",
    status: "future",
    description: "Consolidação com foco em segurança da informação, desenvolvimento mobile e visão de negócios na internet.",
    courses: ["Segurança da Informação", "Desenvolvimento Mobile", "Eletiva 2", "Eletiva 3", "Negócios na Internet", "Projeto 5"]
  }
];
