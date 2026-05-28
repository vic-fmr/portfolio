import { Project, SkillItem, AcademicMilestone } from "./types";

export const PERSONAL_INFO = {
  name: "Victor F. Marques",
  title: "Desenvolvedor Full-Stack & Estudante de ADS",
  location: "Brasil",
  period: "4º Período",
  currentInstitution: "Faculdade de Tecnologia",
  bio: "Estudante de Análise e Desenvolvimento de Sistemas (ADS) focado em construir aplicações web modernas, escaláveis e centradas no usuário. Entusiasmado pelo ecossistema TypeScript (React/Node.js) e apaixonado por arquitetura de software e inteligência artificial.",
  email: "victorfmarques12@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

export const PROJECTS: Project[] = [
  {
    id: "fictional-restaurant",
    title: "SaborTech (Fictício - Exemplo de Estruturação)",
    description: "Sistema completo de pedidos online e agendamento de reservas para pequenos restaurantes comunitários.",
    longDescription: "Este projeto exemplifica a estrutura acadêmica ideal de portfólio de ADS para demonstrar competências interdisciplinares. Trata-se de uma plataforma que ajuda restaurantes locais a receberem pedidos digitais para entrega ou retirada, além de gerenciar a ocupação de mesas em tempo real.",
    objectives: "Desenvolver uma SPA interativa e responsiva integrada a uma API escalável de persistência relacional. O objetivo principal é automatizar o fluxo de despacho de pedidos do restaurante, minimizando em até 35% o atraso no envio de notificações de confirmação ao cliente.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6)", "React", "Node.js", "Express", "PostgreSQL"],
    role: "Arquiteto de Software e Desenvolvedor Full-Stack Solo. Responsável pelo levantamento de requisitos utilizando UML, desenho do modelo lógico de dados, codificação do backend RESTful e design do dashboard de pedidos no front-end.",
    period: "Exemplo Acadêmico",
    type: "fictional-example",
    challenges: "Sincronizar a fila de pedidos em tempo real na tela do operador de caixa sem precisar recarregar a visualização constantemente.",
    solutions: "Implementação de consultas em pooling periódico inteligente no front-end React acopladas a transações com isolamento READ COMMITTED no PostgreSQL para evitar leitura suja de reservas concorrentes.",
    results: "Redução teórica de 40% no tempo de feedback operacional. O projeto serve como um modelo exemplar de documentação acadêmica detalhada em nosso currículo de ADS.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "edutrack",
    title: "EduTrack",
    description: "Plataforma de gestão acadêmica e análise de desempenho para instituições de ensino técnico.",
    longDescription: "O EduTrack é um sistema completo de gestão escolar desenvolvido como projeto interdisciplinar no 4º período de ADS. A plataforma ajuda coordenadores a gerenciarem turmas, professores a lançarem notas/presenças e alunos a acompanharem seu rendimento por meio de dashboards visuais de desempenho.",
    objectives: "Garantir o acompanhamento ágil de notas por alunos e centralizar o controle de frequência acadêmica, gerando alertas preditivos de evasão escolar baseado na frequência acumulada.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    role: "Desenvolvedor Full-Stack Líder. Responsável pelo design do banco de dados relacional, encapsulamento de rotas de segurança na API Express, implementação de gráficos dinâmicos no React.",
    period: "4º Período (Atual)",
    type: "academic",
    challenges: "Implementar um sistema de cálculo de notas automatizado e relatórios em tempo real que pudesse lidar com diferentes regras acadêmicas de aprovação sem degradar a performance do banco.",
    solutions: "Desenvolvemos stored procedures no PostgreSQL para centralizar a lógica matemática de aprovação diretamente no banco de dados e expusemos rotas otimizadas no backend Express com cache em memória para leituras repetitivas dos alunos.",
    results: "Redução de 60% no tempo gasto pelos professores para consolidar notas de fim de semestre, com visualizações gráficas que aumentaram a retenção de alunos ao alertar preventivamente sobre riscos de reprovação.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "greenroute",
    title: "GreenRoute Logística",
    description: "Algoritmo e interface de roteirização eco-friendly para otimização de entregas de pequenos negócios locais.",
    longDescription: "Desenvolvido como projeto de Estrutura de Dados e Programação Orientada a Objetos no 3º período. Trata-se de um protótipo de software de logística de entregas urbanas que calcula a rota de menor distância utilizando grafos, visando menor consumo de combustível e emissão reduzida de CO2.",
    objectives: "Modelar caminhos de entrega eficientes combinando múltiplos pontos geográficos em menor custo computacional possível, demonstrando aplicação prática da Teoria dos Grafos.",
    stack: ["TypeScript", "React", "Leaflet Maps", "Express", "SQLite"],
    role: "Desenvolvedor Front-End & Algoritmos. Modelou a estrutura de dados de grafos ponderados na linguagem TypeScript, integrou o mapa geográfico iterativo com Leaflet e calibrou a filtragem de nós no cliente.",
    period: "3º Período",
    type: "academic",
    challenges: "Calcular rotas de entrega dinâmicas combinando múltiplos pontos de parada de forma eficiente na interface, sem travar a renderização do mapa.",
    solutions: "Implementação de um algoritmo de vizinho mais próximo otimizado no backend para resolver o problema do caixeiro viajante simplificado e uso de Web Workers no React para processar a malha geográfica sem impactar a Thread principal do navegador.",
    results: "Tempo de carregamento e cálculo instantâneos para até 20 pontos de entrega coordenados, apresentando uma estimativa ecológica que mostrava as gramas de carbono poupadas em relação à rota padrão.",
    githubUrl: "https://github.com"
  },
  {
    id: "devminder",
    title: "DevMinder Board",
    description: "Kanban minimalista para desenvolvedores com integração de focus timers e estatísticas de sprint.",
    longDescription: "Criado como projeto integrador de Front-end no 2º período de ADS, o DevMinder vai além de um quadro de tarefas comum. Ele unifica a metodologia Kanban tradicional a técnicas de produtividade (como Pomodoro Timer) e gera relatórios automáticos de tempo gasto por atividade.",
    objectives: "Oferecer uma interface offline responsiva que ajude programadores iniciantes a manterem o foco enquanto gerenciam suas subtarefas sem requisições de rede lentas.",
    stack: ["React", "Tailwind CSS", "LocalStorage", "Context API"],
    role: "Desenvolvedor UI/UX & Componentização React. Definiu o fluxo de alteração de coluna por arrastar de cartões, mapeamento do ciclo do cronômetro de trabalho e persistência nativa em navegador.",
    period: "2º Período",
    type: "academic",
    challenges: "Gerenciar os estados complexos de arrastar e soltar (drag-and-drop) das tarefas garantindo persistência sem utilizar bibliotecas externas grandes e incompatíveis com dispositivos móveis.",
    solutions: "Criação de manipuladores de eventos nativos da Pointer API, abstraindo o estado global das listas usando React Context API e localStorage para uma experiência de persistência offline fluida.",
    results: "Nota máxima no quesito usabilidade acadêmica, servindo como modelo de projeto front-end para as turmas seguintes.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "ecocatalog",
    title: "EcoCatalog",
    description: "Portal geolocalizado de coleta de lixo eletrônico e conscientização socioambiental.",
    longDescription: "O primeiro projeto do curso, desenvolvido no 1º período. Um website focado em mapear pontos de coleta autorizados para recebimento de descarte tecnológico (computadores velhos, baterias, cabos) no município, resolvendo a desinformação comunitária.",
    objectives: "Apresentar uma solução estática de layout responsivo acessível para disseminação de ecopontos oficiais na cidade natal dos alunos.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6)", "Grid & Flexbox"],
    role: "Desenvolvedor Frontend Solo. Conduziu o design responsivo, redação dos artigos informativos e testes básicos de tags WCAG de acessibilidade.",
    period: "1º Período",
    type: "academic",
    challenges: "Projetar uma interface que fosse perfeitamente responsiva e acessível para pessoas idosas sem usar frameworks pré-prontos.",
    solutions: "Estudo aprofundado de tags semânticas e Grid/Flexbox puro com folha de estilos responsiva focada em proporções 'rem' e testes de leitores de tela.",
    results: "Apresentado na feira regional de tecnologia da faculdade com grande interesse comunitário de moradores locais e validação prática de usabilidade.",
    githubUrl: "https://github.com"
  }
];

export const SKILLS: SkillItem[] = [
  // Linguagens de Programação
  { name: "TypeScript", level: 85, description: "Tipagem estática estrita, interfaces genéricas, refatorações seguras e integração completa de APIs typed.", category: "language" },
  { name: "JavaScript (ES6+)", level: 90, description: "Manipulação assíncrona, promessas, desestruturação flexível de dados e manipulação ativa de DOM.", category: "language" },
  { name: "Python", level: 65, description: "Scripts de automação, manipulação de arquivos locais e estruturação de rotas de serviços leves.", category: "language" },
  { name: "Java", level: 55, description: "Fundamentos de Orientação a Objetos de nível acadêmico, herança, polimorfismo e manipulação de arquivos.", category: "language" },

  // Frameworks/Bibliotecas Frontend
  { name: "React", level: 88, description: "Criação de SPAs robustas utilizando hooks customizados, Context API, Lazy Loading e transições animadas.", category: "frontend" },
  { name: "Tailwind CSS", level: 92, description: "Estilização responsiva mobile-first com utilities personalizadas, flexibilidade e dark themes nativos.", category: "frontend" },
  { name: "HTML5/CSS3", level: 90, description: "Marcação semântica com foco em acessibilidade e flexibilidade de grids estruturais nativos.", category: "frontend" },

  // Frameworks/Bibliotecas Backend
  { name: "Node.js", level: 83, description: "Execução assíncrona no servidor, manipulação de processos, fluxos de leitura e escrita.", category: "backend" },
  { name: "Express", level: 85, description: "Criação de APIs REST robustas, roteamentos modulares, manipulação global de erros e middlewares corporativos.", category: "backend" },
  { name: "FastAPI", level: 60, description: "Estruturação rápida de APIs Python assíncronas com validação orientada a tipos via Pydantic.", category: "backend" },

  // Banco de Dados
  { name: "PostgreSQL", level: 78, description: "Modelagem de dados (DER/MER), chaves estrangeiras, stored procedures e otimização de consultas complexas.", category: "database" },
  { name: "MongoDB", level: 65, description: "Manipulação flexível de dados não estruturados via drivers nativos ou modelagem marta Mongoose.", category: "database" },
  { name: "SQLite", level: 80, description: "Armazenamento em arquivo único leve, extremamente conveniente para demonstrações integradoras ágeis.", category: "database" },

  // Ferramentas
  { name: "Git & GitHub", level: 88, description: "Versionamento de código estruturado (Git Flow), pull requests seguras e auditoria de commits.", category: "tools" },
  { name: "Docker", level: 62, description: "Imagens leves de ambiente e conteinerização de APIs para portabilidade contínua de software.", category: "tools" },
  { name: "Metodologias Ágeis", level: 75, description: "Execução ágil com SCRUM acadêmico, planejamento de boards Kanban e rotinas de acompanhamento.", category: "tools" }
];

export const ACADEMIC_TIMELINE: AcademicMilestone[] = [
  {
    period: "1º Período",
    semesterName: "Fundamentos de Sistemas",
    status: "completed",
    description: "Introdução ao raciocínio lógico, algoritmos elementares, arquitetura de computadores e design web inicial com HTML/CSS.",
    courses: ["Introdução a Algoritmos", "Design Web Responsivo", "Arquitetura de Softwares", "Matemática Discreta"]
  },
  {
    period: "2º Período",
    semesterName: "Programação & Modelagem",
    status: "completed",
    description: "Nivelamento em orientação a objetos nas linguagens principais, bancos de dados relacionais e análise de requisitos utilizando UML.",
    courses: ["Programação Orientada a Objetos", "Banco de Dados I", "Engenharia de Requisitos", "Interface Humano-Computador"]
  },
  {
    period: "3º Período",
    semesterName: "Estruturas & Redes",
    status: "completed",
    description: "Aprofundamento em algoritmos complexos, gerenciamento de dados na RAM, além de focar em redes de computadores e segurança inicial.",
    courses: ["Estruturas de Dados", "Redes de Computadores", "Banco de Dados II", "Metodologia Científica"]
  },
  {
    period: "4º Período",
    semesterName: "Arquitetura Web & DevOps (Atual)",
    status: "current",
    description: "Foco integral no desenvolvimento de sistemas web complexos (full-stack), qualidade de software, testes e infraestrutura básica em nuvem.",
    courses: ["Desenvolvimento Web Avançado", "Gerência de Projetos", "Qualidade e Testes de Software", "Sistemas Operacionais e DevOps"]
  },
  {
    period: "5º Período",
    semesterName: "Sistemas Distribuídos & Mobile",
    status: "future",
    description: "No horizonte acadêmico estão o desenvolvimento nativo ou híbrido para dispositivos móveis, além de computação paralela/distribuída.",
    courses: ["Desenvolvimento para Dispositivos Móveis", "Sistemas Distribuídos", "Projeto de Conclusão de ADS I", "Ética Tecnológica"]
  }
];
