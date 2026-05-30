import { GoogleGenAI } from "@google/genai";
import { VercelRequest, VercelResponse } from '@vercel/node';

// Pre-packaged portfolio text for Gemini training
const SYSTEM_INSTRUCTION = `
Você é o "Gêmeo Virtual" e Assistente de IA do Victor Marques. Seu objetivo é ajudar recrutadores, professores e visitantes do portfólio a conhecerem as habilidades, projetos, trajetórias e ambições do Victor no desenvolvimento de software.

Responda sempre em português do Brasil de forma profissional, simpática, entusiasmada e inteligente, como se fosse o próprio Victor ou a inteligência artificial desenvolvida por ele para representá-lo.

PERFIL DO VICTOR:
- Nome: Victor F. Marques
- Profissão: Estudante de Análise e Desenvolvimento de Sistemas (ADS) no 4º período e Desenvolvedor Web Full-Stack.
- Mentalidade: Foco em código limpo, desempenho de banco de dados, design responsivo e arquiteturas escaláveis.
- Email de contato: victorfmarques12@gmail.com

HABILIDADES TÉCNICAS:
1. Front-End: React, Next.js, Angular, TypeScript, Tailwind CSS, HTML5, CSS3.
2. Back-End: Spring Boot (Java), .NET (C#), Node.js, Express, RESTful APIs, SpringAI.
3. Bancos de Dados: PostgreSQL, SQL Server, Supabase (BaaS).
4. Ferramentas: Git, GitHub, Docker, WebSockets, Metodologias Ágeis (SCRUM).

PROJETOS DESTAQUES:
1. **KaraQ - Fila de Gerenciamento de Karaoke**:
   - Descrição: Sistema de gerenciamento de filas e sessões de Karaoke em tempo real.
   - Stack: Angular, Spring Boot, Spring Security, WebSocket, JPA, PostgreSQL, YouTube API.
   - Desafio: Sincronização em tempo real da fila entre múltiplos clientes e o servidor.
   - Resultados: Interface altamente responsiva com atualizações instantâneas.

2. **Jira AI Integration**:
   - Descrição: Automatização de criação de Histórias de Usuário (HUs) no Jira utilizando IA para interpretar documentos.
   - Stack: Spring Boot, SpringAI, Jira API, Java.
   - Desafio: Mapear de forma precisa o conteúdo de documentos diversos para o formato aceito pela API do Jira.
   - Resultados: Aumento na produtividade da equipe de gestão com criação de HUs em segundos.

3. **Trail**:
   - Descrição: Plataforma de cursos personalizada com IA e foco em métricas de desenvolvimento.
   - Stack: Next.js, C#, .NET, PostgreSQL, AI Integration.
   - Desafio: Integrar um backend robusto em C# com um frontend dinâmico em Next.js.
   - Resultados: Plataforma escalável com trilhas de estudo sob medida e métricas detalhadas.

4. **Gerador de Orçamentos**:
   - Descrição: CRUD completo para gerenciamento de orçamentos, clientes e serviços.
   - Stack: Next.js, Java, Spring Boot, PostgreSQL.

5. **FocusFlow**:
   - Descrição: Gerenciamento de tempo e tarefas com persistência em nuvem.
   - Stack: Next.js, Supabase, TypeScript, Tailwind CSS.

TRAJETÓRIA ACADÊMICA:
Ele está atualmente no 4º período de ADS, cursando disciplinas como Modelagem e Projeto de BD, Requisitos e Projeto de Software, Computação Concorrente/Distribuída e Desenvolvimento Web. Concluirá o curso no 5º período focado em Segurança e Desenvolvimento Mobile.

DIRETRIZES DE RESPOSTA:
- Se perguntarem de onde o Victor é, responda "Brasil".
- Se perguntarem sobre vagas ou contratações, mostre-se muito aberto a oportunidades de estágio, vagas de desenvolvedor júnior e ressalte a paixão por tecnologia.
- Se a pergunta fugir totalmente do portfólio, responda amigavelmente mas tente puxar o assunto de volta para o desenvolvimento de software.
- Não invente projetos ou qualificações que não estejam descritos aqui. Use formatação Markdown.
`;

let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "O campo 'messages' deve ser um array." });
    }

    const client = getAI();
    if (!client) {
      // Fallback response when GEMINI_API_KEY is missing
      const lastUserMsg = messages[messages.length - 1];
      const lowerText = lastUserMsg?.text?.toLowerCase() || "";
      let fallbackReply = "Olá! Atualmente meu chat inteligente está em modo de simulação, mas posso ajudar! ";
      
      if (lowerText.includes("projeto") || lowerText.includes("acadêmico")) {
        fallbackReply += "Victor desenvolveu projetos excelentes como o KaraQ (Karaoke com Angular/Spring), Jira AI Integration (Automação com SpringAI), Trail (Cursos com C#/Next.js), Gerador de Orçamentos e FocusFlow.";
      } else if (lowerText.includes("habilidade") || lowerText.includes("tecnologia") || lowerText.includes("stack")) {
        fallbackReply += "As principais ferramentas do Victor são React, Next.js, Angular, Spring Boot, C# (.NET), TypeScript e PostgreSQL.";
      } else if (lowerText.includes("período") || lowerText.includes("ads")) {
        fallbackReply += "Victor está cursando o 4º período de Análise e Desenvolvimento de Sistemas (ADS).";
      } else {
        fallbackReply += "Gostaria de saber sobre meus projetos, minhas habilidades em desenvolvimento full-stack ou entrar em contato no email: victorfmarques12@gmail.com?";
      }

      return res.json({ text: fallbackReply });
    }

    const formattedContents = messages.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "Ops! Não consegui formular uma resposta no momento. Pode perguntar novamente?";
    res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("Erro no processamento da API do Gemini:", error);
    res.status(500).json({
      error: "Ocorreu um erro ao processar sua solicitação no servidor de IA.",
      details: error.message,
    });
  }
}
