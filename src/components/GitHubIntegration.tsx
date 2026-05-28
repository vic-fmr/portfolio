import { useState, useEffect } from "react";
import { Github, Link2, Star, GitFork, ArrowUpRight, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { PROJECTS } from "../data";

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GitHubIntegration() {
  const username = "vic-fmr";
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"api-repos" | "curated-projects">("api-repos");
  const [profileData, setProfileData] = useState<{
    avatar_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    html_url: string;
  } | null>(null);

  // Fallback high-quality simulation if GitHub rate limit is triggered
  const fallbackRepos: GithubRepo[] = [
    {
      name: "edutrack-school-manager",
      description: "Plataforma de gestão acadêmica com stored procedures no PostgreSQL e dashboards dinâmicos no React.",
      html_url: `https://github.com/${username}/edutrack`,
      homepage: "https://example.com/edutrack-demo",
      stargazers_count: 5,
      forks_count: 1,
      language: "TypeScript",
      updated_at: "2026-05-27T22:30:00Z"
    },
    {
      name: "green-route-logistica",
      description: "Algoritmo de menor caminho eco-friendly utilizando estruturas de grafos ponderados em TypeScript.",
      html_url: `https://github.com/${username}/green-route`,
      homepage: null,
      stargazers_count: 3,
      forks_count: 0,
      language: "TypeScript",
      updated_at: "2026-05-20T10:15:00Z"
    },
    {
      name: "devminder-kanban",
      description: "Quadro de tarefas minimalista integrado a temporizadores Pomodoro e persistência offline.",
      html_url: `https://github.com/${username}/devminder`,
      homepage: "https://example.com/devminder-board",
      stargazers_count: 4,
      forks_count: 2,
      language: "React",
      updated_at: "2026-04-12T14:40:00Z"
    }
  ];

  const fetchGithubData = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Fetch Profile Info
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (profileRes.ok) {
        const uData = await profileRes.json();
        setProfileData({
          avatar_url: uData.avatar_url,
          name: uData.name || uData.login,
          bio: uData.bio || "Estudante de Análise e Desenvolvimento de Sistemas",
          public_repos: uData.public_repos,
          followers: uData.followers,
          html_url: uData.html_url
        });
      } else if (profileRes.status === 403) {
        setErrorMsg("Limite de requisições excedido. Exibindo dados locais.");
      }

      // 2. Fetch Repos
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (reposRes.status === 403) {
        throw new Error("Limite de requisições excedido.");
      } else if (reposRes.status === 404) {
        throw new Error("Usuário não encontrado.");
      }

      const rawRepos = await reposRes.json();
      if (Array.isArray(rawRepos)) {
        const formatted: GithubRepo[] = rawRepos.map((r: any) => ({
          name: r.name,
          description: r.description || "Sem descrição registrada no repositório.",
          html_url: r.html_url,
          homepage: r.homepage || null,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language || "TypeScript",
          updated_at: r.updated_at
        }));
        setRepos(formatted);
      } else {
        throw new Error("Resposta inválida.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Conexão com a API externa indisponível.");
      setRepos(fallbackRepos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  return (
    <div id="github-integration" className="space-y-6">
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
            <Github size={22} className="text-indigo-400" />
            <span>Perfil do GitHub</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Mostre os repositórios mais recentes ou os projetos selecionados, com links diretos para o código-fonte e demonstrações ao vivo, se disponíveis.
          </p>
        </div>

        {/* Reload button when repository tab is active */}
        {activeTab === "api-repos" && (
          <button
            onClick={fetchGithubData}
            disabled={loading}
            className="self-start sm:self-center px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw size={12} className={loading ? "animate-spin text-indigo-400" : ""} />
            <span>Atualizar</span>
          </button>
        )}
      </div>

      {/* Profile Bar */}
      {profileData && (
        <div className="flex items-center gap-4 p-4 bg-zinc-900/40 rounded-xl border border-zinc-850">
          <img
            src={profileData.avatar_url}
            alt={profileData.name}
            className="w-12 h-12 rounded-full border border-indigo-500/20"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{profileData.name}</h3>
            <p className="text-[11px] text-zinc-400 truncate">{profileData.bio}</p>
            <div className="flex gap-4 mt-1">
              <span className="text-[10px] font-mono text-zinc-500">
                <strong className="text-indigo-400">{profileData.public_repos}</strong> Repos públicos
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                <strong className="text-indigo-400">{profileData.followers}</strong> Seguidores
              </span>
            </div>
          </div>
          <a
            href={profileData.html_url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            title="Ir para o perfil"
          >
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      {/* Control Switcher tabs */}
      <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-850 self-start inline-flex">
        <button
          onClick={() => setActiveTab("api-repos")}
          className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
            activeTab === "api-repos"
              ? "bg-indigo-650 text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Repositórios Recentes
        </button>
        
        <button
          onClick={() => setActiveTab("curated-projects")}
          className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
            activeTab === "curated-projects"
              ? "bg-indigo-650 text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Projetos Selecionados
        </button>
      </div>

      {/* API Limits Friendly message banner */}
      {errorMsg && activeTab === "api-repos" && (
        <div className="p-3 bg-zinc-900 border border-zinc-800/80 rounded-lg flex items-start gap-2.5 text-xs text-zinc-400">
          <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-zinc-350 block">Nota técnica sobre a API</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* Main Tab Render Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeTab === "api-repos" ? (
          repos.map((repo) => (
            <div
              key={repo.name}
              className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-900/40 w-full rounded-xl border border-zinc-850/80 hover:border-zinc-700 hover:scale-[1.01] transition-all flex flex-col justify-between shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="font-mono text-sm font-bold text-white tracking-tight break-all cursor-pointer hover:text-indigo-400 transition-colors">
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </h4>
                  
                  <span className="shrink-0 text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 px-2 py-0.5 rounded">
                    {repo.language}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 min-h-[3rem]">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/40">
                <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={11} />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>

                <div className="flex gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:underline hover:text-emerald-350"
                    >
                      <span>Live Demo</span>
                      <Sparkles size={10} />
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono text-indigo-400 hover:underline hover:text-indigo-350"
                  >
                    <span>Código Fonte</span>
                    <Link2 size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Highlighting Curated Selected Projects natively from PROJECTS in src/data.ts */
          PROJECTS.filter(p => p.type !== "fictional-example").map((proj) => (
            <div
              key={proj.id}
              className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-900/40 w-full rounded-xl border border-zinc-850/80 hover:border-zinc-700 hover:scale-[1.01] transition-all flex flex-col justify-between shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="font-sans text-sm font-bold text-white tracking-tight">
                    {proj.title}
                  </h4>
                  
                  <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-750 px-2 py-0.5 rounded">
                    {proj.period}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 min-h-[3rem]">
                  {proj.description}
                </p>

                {/* Tech badget pill representation */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] bg-zinc-950 text-zinc-400 font-mono border border-zinc-800/80 px-1.5 py-0.2 rounded">
                      {tech}
                    </span>
                  ))}
                  {proj.stack.length > 3 && (
                    <span className="text-[10px] text-zinc-500 font-mono px-1">
                      +{proj.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/40">
                <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[120px]">
                  {proj.role.split(".")[0]}
                </span>

                <div className="flex gap-3">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline hover:text-emerald-350"
                    >
                      <span>Demonstração</span>
                      <Sparkles size={10} />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] font-mono text-indigo-400 hover:underline hover:text-indigo-350"
                    >
                      <span>Código</span>
                      <Link2 size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
