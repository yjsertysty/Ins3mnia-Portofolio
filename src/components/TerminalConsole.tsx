import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ShieldAlert, Cpu, CheckCircle2, ChevronRight, Play, RefreshCw, XCircle } from 'lucide-react';
import { Theme } from '../types';

interface TerminalConsoleProps {
  theme: Theme;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ theme }) => {
  const [history, setHistory] = useState<Array<{ text: string; type: 'input' | 'output' | 'error' | 'success' | 'info' }>>([
    { text: 'ins3mnia_yu Systems core v1.8.9 loaded.', type: 'success' },
    { text: 'Scrie "help" sau apasă pe butoanele de mai jos pentru a interacționa cu sistemul.', type: 'info' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [scriptProgress, setScriptProgress] = useState(0);
  const [activeScript, setActiveScript] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isRunningScript, scriptProgress]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `root@ins3mnia_yu:~$ ${cmd}`, type: 'input' as const }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { text: 'Comenzi disponibile în terminal:', type: 'info' },
          { text: '  despre      - Despre edi_9864 (ins3mnia_yu)', type: 'info' },
          { text: '  lunariss    - Telemetrie rețea Lunariss', type: 'info' },
          { text: '  synergy     - Status arhitectură Synergy Core', type: 'info' },
          { text: '  skills      - Afișează toate skill-urile mele', type: 'info' },
          { text: '  status      - Verifică starea serverelor noastre', type: 'info' },
          { text: '  nebunie     - Rulează testul de stres pe proxy', type: 'info' },
          { text: '  clear       - Curăță ecranul terminalului', type: 'info' }
        );
        break;
      case 'despre':
        newHistory.push(
          { text: '--- IDENTITATE CORE ---', type: 'success' },
          { text: 'Nume: edi_9864 a.k.a ins3mnia_yu', type: 'info' },
          { text: 'Roluri active:', type: 'info' },
          { text: '  • Owner @ Lunariss (Rețea de Minecraft de înaltă performanță)', type: 'info' },
          { text: '  • Co-Fondator @ Synergy (Arhitectură backend & baze de date)', type: 'info' },
          { text: '  • Core Developer @ Mango & Flinted', type: 'info' },
          { text: 'Specializare: Server Infrastructure, Proxy Optimization, High-Concurrency Backend.', type: 'info' }
        );
        break;
      case 'lunariss':
        newHistory.push(
          { text: '--- LUNARISS NETWORK TELEMETRY ---', type: 'success' },
          { text: 'Proxy Engine: Velocity Core (Optimizat manual)', type: 'info' },
          { text: 'Uptime: 99.98% (34 de zile consecutive)', type: 'info' },
          { text: 'Protecție DDoS: Activă (TCP Shield Pro + Scrubbing)', type: 'success' },
          { text: 'Servere conectate: Hub-01, Survival-01, Skyblock-01, Practice-01', type: 'info' }
        );
        break;
      case 'synergy':
        newHistory.push(
          { text: '--- SYNERGY CORE SYSTEMS ---', type: 'success' },
          { text: 'Arhitectură: Multi-threaded Async Java & Node.js', type: 'info' },
          { text: 'Module de sincronizare baze de date: Active', type: 'success' },
          { text: 'Redis caching cluster: Operational (Hit rate 96.4%)', type: 'info' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: '--- EXPERTIZĂ TEHNICĂ ---', type: 'success' },
          { text: 'Sisteme & Proxy: Velocity Proxy, BungeeCord, PaperMC, Linux Admin, Docker', type: 'info' },
          { text: 'Backend: Java (Spring Boot, Paper API), TypeScript (Node.js, Fastify), Go', type: 'info' },
          { text: 'Baze de date: PostgreSQL, MongoDB, Redis, SQLite', type: 'info' },
          { text: 'DevOps: Docker Compose, Nginx, Actions CI/CD, SSL/TLS', type: 'info' },
          { text: '*Notă: Nu creez plugin-uri custom de la zero, ci optimizez, configurez și integrez infrastructuri complexe.*', type: 'error' }
        );
        break;
      case 'status':
        newHistory.push(
          { text: 'Verificare status rețea in progress...', type: 'info' },
          { text: '● [Velocity Proxy Engine]   ONLINE (Ping 12ms)', type: 'success' },
          { text: '● [Lunariss Survival Node]   ONLINE (TPS: 20.0)', type: 'success' },
          { text: '● [Synergy Master DB]        ONLINE (Sincronizat)', type: 'success' },
          { text: '● [Mango API Gateway]        ONLINE (Așteaptă conexiuni)', type: 'success' },
          { text: '● [Flinted Auth Node]        ONLINE (Securizat)', type: 'success' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'nebunie':
        startStressTest(newHistory);
        setInputVal('');
        return;
      default:
        newHistory.push({ text: `Comandă necunoscută: "${cmd}". Scrie "help" pentru lista completă.`, type: 'error' });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const startStressTest = (currentHistoryList: typeof history) => {
    if (isRunningScript) return;
    setIsRunningScript(true);
    setActiveScript('stres-test');
    setScriptProgress(0);

    const updatedHistory = [
      ...currentHistoryList,
      { text: '⚠ INIȚIERE TEST DE STRES PROXY (VELOCITY FLUX)...', type: 'error' as const },
      { text: 'Trimitere 10,000 pachete simulate de tip ping...', type: 'info' as const }
    ];
    setHistory(updatedHistory);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScriptProgress(progress);

      if (progress === 20) {
        setHistory(prev => [...prev, { text: '[PROCES] Trimitere pachete de la 12 IP-uri diferite (EU/US)...', type: 'info' }]);
      } else if (progress === 40) {
        setHistory(prev => [...prev, { text: '[PROCES] Velocity proxy limitează conexiunile excesive instantaneu.', type: 'info' }]);
      } else if (progress === 60) {
        setHistory(prev => [...prev, { text: '[PROCES] Detectare flood: Mitigat prin TCPShield proxy backend.', type: 'success' }]);
      } else if (progress === 80) {
        setHistory(prev => [...prev, { text: '[PROCES] CPU proxy usage: 4.2% maxim. Sincronizarea Synergy DB intactă.', type: 'success' }]);
      } else if (progress >= 100) {
        clearInterval(interval);
        setIsRunningScript(false);
        setActiveScript(null);
        setHistory(prev => [...prev, 
          { text: '✔ TEST COMPLET. Rețeaua este perfect stabilă (0% packet loss)!', type: 'success' },
          { text: 'Lunariss & Synergy funcționează perfect sub asalt.', type: 'info' }
        ]);
      }
    }, 800);
  };

  return (
    <div id="interactive-terminal" className={`rounded-xl border ${theme.borderAccentClass} bg-black/85 backdrop-blur-md overflow-hidden flex flex-col h-[480px] shadow-2xl`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d11] border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <Terminal className={`w-4 h-4 ${theme.textAccentClass}`} />
          <span className="text-xs font-mono font-medium text-zinc-400">root@ins3mnia_yu: ~ (Romanian Core UI)</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-red-800" />
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5 custom-scrollbar">
        {history.map((line, index) => {
          let textStyle = 'text-zinc-300';
          if (line.type === 'input') textStyle = 'text-white font-medium';
          if (line.type === 'error') textStyle = 'text-red-500 font-semibold';
          if (line.type === 'success') textStyle = 'text-emerald-400 font-semibold';
          if (line.type === 'info') textStyle = 'text-sky-400';

          return (
            <div key={index} className="flex items-start gap-1 leading-relaxed">
              {line.type === 'input' ? null : <span className="text-zinc-700 shrink-0">›</span>}
              <span className={textStyle}>{line.text}</span>
            </div>
          );
        })}

        {/* Dynamic script running rendering */}
        {isRunningScript && (
          <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800/80 space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-red-500 font-semibold animate-pulse flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 animate-bounce" /> TEST DE STRES: ACTIV
              </span>
              <span className="text-zinc-400">{scriptProgress}%</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-850">
              <div 
                className={`h-full transition-all duration-300 ${
                  theme.id === 'crimson' ? 'bg-red-600' :
                  theme.id === 'sunset' ? 'bg-orange-500' :
                  theme.id === 'amethyst' ? 'bg-purple-600' : 'bg-white'
                }`}
                style={{ width: `${scriptProgress}%` }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Terminal Quick Interactive Links */}
      <div className="px-4 py-2.5 bg-zinc-950/90 border-t border-zinc-900 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mr-2">Comenzi rapide:</span>
        <button
          onClick={() => handleCommand('despre')}
          className="px-2.5 py-1 text-3xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
        >
          ./despre
        </button>
        <button
          onClick={() => handleCommand('skills')}
          className="px-2.5 py-1 text-3xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
        >
          ./skills
        </button>
        <button
          onClick={() => handleCommand('status')}
          className="px-2.5 py-1 text-3xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
        >
          ./status
        </button>
        <button
          onClick={() => handleCommand('nebunie')}
          disabled={isRunningScript}
          className={`px-2.5 py-1 text-3xs font-mono rounded border text-red-400 transition-all flex items-center gap-1 ${
            isRunningScript ? 'bg-red-950/10 border-red-950/30 opacity-50' : 'bg-red-950/20 border-red-900/40 hover:bg-red-900/30'
          }`}
        >
          <Play className="w-2.5 h-2.5" /> ./nebunie (Stress)
        </button>
        <button
          onClick={() => handleCommand('clear')}
          className="ml-auto px-2 py-1 text-3xs font-mono rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-500 hover:text-zinc-300 transition-all"
        >
          clear
        </button>
      </div>

      {/* Terminal Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center px-4 py-3 bg-[#08080b] border-t border-zinc-900"
      >
        <ChevronRight className={`w-4 h-4 shrink-0 ${theme.textAccentClass}`} />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Introdu o comandă (ex: "help", "despre", "lunariss")...'
          className="flex-1 ml-2 bg-transparent focus:outline-none text-xs text-white font-mono placeholder-zinc-650"
          autoFocus
        />
        <button type="submit" className="hidden">Send</button>
      </form>
    </div>
  );
};
