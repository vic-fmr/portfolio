import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChatMessage } from "../types";
import { Sparkles, Send, Bot, User, CornerDownLeft, Terminal, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TwinChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Olá! Sou o **Gêmeo Virtual do Victor**, uma IA integrada ao seu portfólio. \n\nVocê pode me perguntar sobre meus **projetos acadêmicos de ADS**, minhas **habilidades técnicas em desenvolvimento web** ou se estou disponível para **vagas e projetos**. Como posso te ajudar hoje?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggested questions for visitors to quickly interact
  const preDefinedPrompts = [
    { label: "O que é o KaraQ?", text: "Me fale detalhes sobre o projeto KaraQ de gerenciamento de Karaoke." },
    { label: "Como funciona o Jira AI?", text: "Explique como você automatizou a criação de HUs no Jira com IA." },
    { label: "O que é o projeto Trail?", text: "Fale sobre a plataforma Trail e como a IA personaliza os cursos." },
    { label: "Quais são suas tecnologias?", text: "Quais são as principais linguagens e frameworks que você domina?" },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        throw new Error("Erro de rede no servidor");
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "Ops! Não consegui formular uma resposta no momento. Pode perguntar novamente?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "Desculpe, ocorreu uma instabilidade de comunicação com o meu cérebro de IA externo. Mas posso adiantar que adoro TypeScript, React, Spring Boot, Java e C#! Vamos falar por email? (victorfmarques12@gmail.com)",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyboardSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputText);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Memória reiniciada! Pode me fazer novas perguntas sobre as competências, projetos do Victor no 4º período do curso de ADS ou outros temas de web dev.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Safe and clean custom formatter to render basic markdown patterns like Bold, Lists, and Code blocks
  const parseMarkdownText = (text: string) => {
    if (!text) return "";

    // Split text into line groups
    const lines = text.split("\n");

    return lines.map((line, lineIdx) => {
      let trimmed = line.trim();

      // Handle Code Block start/end or single lines
      if (trimmed.startsWith("```")) {
        return (
          <div key={lineIdx} className="my-2 p-3 font-mono text-xs bg-zinc-950 text-indigo-300 rounded-lg overflow-x-auto border border-zinc-805">
            {line.replace(/```[a-zA-Z]*/g, "")}
          </div>
        );
      }

      // Handle Bullet Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const content = trimmed.substring(2);
        return (
          <li key={lineIdx} className="ml-4 list-disc text-sm text-zinc-350 my-1 py-0.5">
            {renderBoldText(content)}
          </li>
        );
      }

      // Handle numbered patterns like '1. '
      if (/^\u0031\d*\.\s/.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s+/, "");
        return (
          <li key={lineIdx} className="ml-4 list-decimal text-sm text-zinc-350 my-1 py-0.5">
            {renderBoldText(content)}
          </li>
        );
      }

      // Standard Line of paragraph
      return (
        <p key={lineIdx} className="text-sm text-zinc-300 leading-relaxed min-h-[0.5rem] my-1">
          {renderBoldText(line)}
        </p>
      );
    });
  };

  // Helper inside formatter to render double asterisks as <strong>
  const renderBoldText = (txt: string) => {
    const parts = txt.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-white text-semibold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="twin-chatbot-container" className="flex flex-col h-[600px] md:h-[650px] bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl relative">
      {/* Bot Chat Header */}
      <div className="flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-505/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Bot size={22} className="animate-pulse" />
            </div>
            {/* Status dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white leading-tight">Gêmeo Virtual do Victor</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/15 uppercase tracking-wider">IA Ativa</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono leading-none">Powered by Gemini 3.5 Flash</p>
          </div>
        </div>

        {/* Action Header Tools */}
        <button
          onClick={clearChat}
          title="Limpar Conversa"
          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-850 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Bubble Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/20 select-text">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-lg border shrink-0 flex items-center justify-center ${isBot
                    ? "bg-indigo-501/10 border-indigo-500/20 text-indigo-400"
                    : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}>
                  {isBot ? <Bot size={15} /> : <User size={15} />}
                </div>

                {/* Message body */}
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl tracking-normal ${isBot
                      ? "bg-zinc-950 text-zinc-200 border border-zinc-850/60 rounded-tl-sm"
                      : "bg-indigo-600 text-white rounded-tr-sm"
                    }`}>
                    {isBot ? parseMarkdownText(msg.text) : <p className="text-sm leading-relaxed">{msg.text}</p>}
                  </div>

                  <span className={`text-[9px] font-mono text-zinc-500 block ${!isBot && "text-right"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[80%] mr-auto"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Bot size={15} />
              </div>
              <div className="p-3.5 bg-zinc-950 text-zinc-400 rounded-2xl rounded-tl-sm border border-zinc-85c/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-505 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-indigo-505 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-indigo-505 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Recommended Prompt suggestions container */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-805 space-y-2">
        <span className="text-[10px] font-mono text-zinc-500 block px-1 flex items-center gap-1">
          <Sparkles size={10} className="text-indigo-400" />
          <span>Sugestões de Perguntas:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {preDefinedPrompts.map((prompt) => (
            <button
              key={prompt.label}
              onClick={() => handleSendMessage(prompt.text)}
              disabled={isLoading}
              className="text-[11px] font-sans font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-850 px-2.5 py-1 rounded-lg transition-all text-left flex items-center gap-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <span>{prompt.label}</span>
              <ArrowRight size={10} className="text-zinc-500 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form area */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyboardSubmit}
            placeholder="Pergunte ao Victor Virtual..."
            disabled={isLoading}
            className="w-full bg-zinc-900 text-sm text-white placeholder-zinc-500 pl-3.5 pr-10 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <div className="absolute right-3 top-3.5 flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] pointer-events-none hidden sm:flex">
            <span>Enter</span>
            <CornerDownLeft size={10} />
          </div>
        </div>

        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isLoading}
          className="p-3 rounded-xl justify-center items-center bg-indigo-650 hover:bg-indigo-600 disabled:bg-zinc-850 text-white disabled:text-zinc-650 transition-all select-none cursor-pointer"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
