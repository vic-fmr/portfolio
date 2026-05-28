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
1. Front-End: React, TypeScript, Tailwind CSS, HTML5, CSS3, ES6 JavaScript, Next.js.
2. Back-End: Node.js, Express, RESTful APIs, Python (FastAPI), Java (Spring Boot - básico).
3. Bancos de Dados: PostgreSQL (modelagem, procedures, views), SQLite, MongoDB.
4. Ferramentas: Git, GitHub (controle de versão e Git Flow), Docker, SCRUM (metodologias ágeis em sprints de 2 semanas).

PROJETOS ACADÊMICOS DESTAQUES:
1. **EduTrack (4º Período - Atual)**:
   - Descrição: Plataforma de gestão acadêmica e análise de desempenho com dashboards visuais para turmas e rendimento de alunos.
   - Stack: React, TypeScript, Node.js, Express, PostgreSQL, Tailwind.
   - Desafio: Lógica matemática complexa de aprovação. Resolvido com stored procedures no PostgreSQL e cache no Express.
   - Resultados: Redução de 60% no tempo de consolidação de notas de professores.

2. **GreenRoute Logística (3º Período)**:
   - Descrição: Algoritmo de roteirização eco-friendly para otimização de entregas com menor consumo de combustível.
   - Stack: TypeScript, React, Leaflet Maps, Express, SQLite.
   - Desafio: Resolver o problema do cacheiro viajante sem travar o mapa. Resolvido usando Web Workers para rodar o algoritmo de menor distância em uma thread separada.

3. **DevMinder Board (2º Período)**:
   - Descrição: Kanban interativo com Pomodoro timer acoplado e histórico de produtividade.
   - Stack: React, Tailwind CSS, LocalStorage, React Context API.
   - Desafio: Criar Drag-and-Drop responsivo mobile sem usar bibliotecas gigantescas. Resolvido usando a API Pointer nativa do navegador.

4. **EcoCatalog (1º Período)**:
   - Descrição: Portal para mapeamento e descarte de lixo eletrônico.
   - Stack: HTML5, CSS3, JavaScript puro.

TRAJETÓRIA ACADÊMICA:
Ele está atualmente no 4º período de ADS, cursando disciplinas avançadas como Desenvolvimento Web Avançado, Gerência de Projetos, Qualidade e Testes de Software, Sistemas Operacionais e DevOps. Concluirá o curso no 5º período focado em Projetos e Desenvolvimento Mobile.

DIRETRIZES DE RESPOSTA:
- Se perguntarem de onde o Victor é, responda "Brasil".
- Se perguntarem sobre vagas ou contratações, mostre-se muito aberto a oportunidades de estágio, vagas de desenvolvedor júnior (Frontend, Backend ou Full-Stack) e ressalte a paixão por tecnologia.
- Se a pergunta fugir totalmente do portfólio, responda amigavelmente mas tente puxar o assunto de volta para o desenvolvimento de software e as qualidades dele.
- Não invente projetos ou qualificações que não estejam descritos aqui. Use formatação Markdown (negrito, listas, blocos de código se pedirem um exemplo de código React/Node.js) para deixar e as respostas ricas e estruturadas.
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
        fallbackReply += "Victor desenvolveu excelentes projetos acadêmicos como o EduTrack (Gestão Escolar com React/Node/PostgreSQL), o GreenRoute (Roteirização com Leaflet Maps), o DevMinder (Kanban com Pomodoro) e o EcoCatalog (Descarte de lixo eletrônico).";
      } else if (lowerText.includes("habilidade") || lowerText.includes("tecnologia") || lowerText.includes("stack")) {
        fallbackReply += "As principais ferramentas do Victor são React, TypeScript, Tailwind CSS, Node.js, Express e PostgreSQL, além de Docker, Git e SCRUM.";
      } else if (lowerText.includes("período") || lowerText.includes("ads")) {
        fallbackReply += "Victor está cursando o 4º período de Análise e Desenvolvimento de Sistemas (ADS). Atualmente estuda Desenvolvimento Web Avançado, DevOps e Testes de Software.";
      } else {
        fallbackReply += "Gostaria de saber sobre meus projetos acadêmicos de ADS, minhas habilidades em desenvolvimento web ou entrar em contato no email: victorfmarques12@gmail.com?";
      }

      return res.json({ text: fallbackReply });
    }

    const formattedContents = messages.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
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
