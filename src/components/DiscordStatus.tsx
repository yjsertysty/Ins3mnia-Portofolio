import React, { useState, useEffect } from 'react';
import { ThemeId, Theme } from '../types';
import { THEMES } from './ThemeToggle';
import { Copy, Check, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

interface DiscordStatusProps {
  themeId: ThemeId;
}

export const DiscordStatus: React.FC<DiscordStatusProps> = ({ themeId }) => {
  const currentTheme = THEMES[themeId];
  
  // State-uri pentru Simulatorul Rich Presence
  const [copied, setCopied] = useState(false);
  const [appName, setAppName] = useState('Visual Studio Code');
  const [details, setDetails] = useState('Dezvoltare Backend Lunariss Network');
  const [stateText, setStateText] = useState('Optimizare module de rețea proxy');
  const [btnText, setBtnText] = useState('Alătură-te pe Lunariss');
  const [elapsed, setElapsed] = useState(4820); // ~1h 20m 20s

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatElapsed = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyDiscordId = () => {
    navigator.clipboard.writeText('edi_9864');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pre-seturi speciale pentru proiectele utilizatorului
  const applyPreset = (preset: 'lunariss' | 'synergy' | 'mango' | 'gaming') => {
    if (preset === 'lunariss') {
      setAppName('Velocity Proxy Engine v3.4');
      setDetails('Configurare Rețea Lunariss Hub');
      setStateText('Activ: 184 jucători conectați');
      setBtnText('Server Discord Lunariss');
    } else if (preset === 'synergy') {
      setAppName('IntelliJ IDEA Ultimate');
      setDetails('Sincronizare Baze de Date Synergy');
      setStateText('Implementare arhitectură microservicii');
      setBtnText('Vizitează Synergy Core');
    } else if (preset === 'mango') {
      setAppName('Docker Desktop Enterprise');
      setDetails('Găzduire Servicii Mango API');
      setStateText('Deploy pe noduri Kubernetes de producție');
      setBtnText('Mango Repo Github');
    } else {
      setAppName('Counter-Strike 2');
      setDetails('Meci Competitiv pe FaceIT');
      setStateText('Scor: 14 - 11 (Ultima rundă)');
      setBtnText('Profil Steam Oficial');
    }
  };

  const getThemeAccentClass = () => {
    if (themeId === 'crimson') return 'text-red-500 border-red-500/20 bg-red-500/5';
    if (themeId === 'sunset') return 'text-orange-500 border-orange-500/20 bg-orange-500/5';
    if (themeId === 'amethyst') return 'text-purple-500 border-purple-500/20 bg-purple-500/5';
    return 'text-zinc-300 border-zinc-850 bg-zinc-800/15';
  };

  const getThemeGlowDot = () => {
    if (themeId === 'crimson') return 'bg-red-500 shadow-[0_0_10px_#ef4444]';
    if (themeId === 'sunset') return 'bg-orange-500 shadow-[0_0_10px_#f97316]';
    if (themeId === 'amethyst') return 'bg-purple-500 shadow-[0_0_10px_#a855f7]';
    return 'bg-green-500 shadow-[0_0_10px_#22c55e]';
  };

  return (
    <div id="discord-main-block" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Profil Discord Stilizat */}
      <div id="discord-card-panel" className="lg:col-span-5 flex flex-col rounded-2xl bg-[#0b0c0f] border border-zinc-850 shadow-2xl overflow-hidden font-sans">
        {/* Banner Discord */}
        <div 
          className="h-24 w-full relative transition-all duration-500" 
          style={{ 
            background: themeId === 'crimson' ? 'linear-gradient(135deg, #5c0f12 0%, #110002 100%)' :
                        themeId === 'sunset' ? 'linear-gradient(135deg, #5c250f 0%, #0c0400 100%)' :
                        themeId === 'amethyst' ? 'linear-gradient(135deg, #3b0764 0%, #05000a 100%)' :
                        'linear-gradient(135deg, #1f1f23 0%, #09090b 100%)'
          }}
        >
          {/* Insigne Badge */}
          <div className="absolute bottom-2.5 right-3.5 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5">
            <span title="Dezvoltator Activ" className="text-sm cursor-pointer select-none">🛠️</span>
            <span title="HypeSquad Balance" className="text-sm cursor-pointer select-none">🛡️</span>
            <span title="Server Booster" className="text-sm cursor-pointer select-none">💎</span>
            <span title="Discord Nitro" className="text-sm cursor-pointer select-none">🚀</span>
          </div>
        </div>

        {/* Informații Utilizator */}
        <div className="px-5 pb-5 relative">
          {/* Avatarul Cyber-Anime generat anterior */}
          <div className="absolute -top-10 left-5">
            <div className="relative">
              <img 
                src="/src/assets/images/insomnia_avatar_1783870420132.jpg" 
                alt="edi_9864" 
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full border-4 border-[#0b0c0f] object-cover bg-zinc-950 shadow-lg"
              />
              <div className={`absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full border-3 border-[#0b0c0f] ${getThemeGlowDot()}`} />
            </div>
          </div>

          <div className="pt-11 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  ins3mnia_yu
                  <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded font-mono font-medium">SYSTEM DEV</span>
                </h3>
                <p className="text-xs text-zinc-500 font-mono">@edi_9864</p>
              </div>

              {/* Buton copiere */}
              <button 
                id="copy-tag-button-rom"
                onClick={copyDiscordId}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-3xs text-zinc-300 font-semibold transition-colors border border-zinc-800"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copiat' : 'Copiază'}
              </button>
            </div>

            {/* Custom Status */}
            <div className="mt-3.5 p-2 rounded bg-zinc-900/50 border border-zinc-850 text-xs text-zinc-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="leading-tight">&ldquo;Nu fac pluginuri custom. În rest, orice e posibil.&rdquo;</span>
            </div>

            <hr className="border-zinc-800/60 my-3.5" />

            {/* Rich Presence actual */}
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 font-mono">ACTIVITATE CURENTĂ</p>
              
              <div className="flex gap-3">
                {/* Pictogramă */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                    {appName.includes('Visual Studio Code') ? (
                      <span className="text-2xl">💻</span>
                    ) : appName.includes('Proxy') || appName.includes('Velocity') ? (
                      <span className="text-2xl">⚡</span>
                    ) : appName.includes('IntelliJ') ? (
                      <span className="text-2xl">☕</span>
                    ) : appName.includes('Docker') ? (
                      <span className="text-2xl">🐳</span>
                    ) : (
                      <span className="text-2xl">🎮</span>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center text-[10px] shadow">
                    🔴
                  </div>
                </div>

                {/* Detalii activitate */}
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-zinc-200 truncate">{appName}</h4>
                  <p className="text-zinc-400 truncate mt-0.5">{details}</p>
                  <p className="text-zinc-400 truncate mt-0.5">{stateText}</p>
                  <p className="text-zinc-500 mt-1 font-mono text-[10px]">
                    timp scurs: <span className="text-zinc-400 font-medium">{formatElapsed(elapsed)}</span>
                  </p>
                </div>
              </div>

              {/* Link Buton în RPC */}
              <div className="mt-3.5">
                <button 
                  id="discord-rich-presence-link-btn"
                  className="w-full py-1.5 rounded bg-[#1e2229] hover:bg-[#282e37] text-white/95 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-zinc-800"
                >
                  <span>{btnText}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controler Simulator Rich Presence */}
      <div id="discord-rpc-editor-panel" className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-zinc-950/40 border border-zinc-850 p-6 backdrop-blur-md">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getThemeAccentClass()}`}>
                Simulator Interactiv RPC
              </span>
              <h3 className="text-lg font-bold font-display text-white mt-1.5">Configurează Statusul de Discord</h3>
            </div>
            <button
              id="reset-status-btn"
              onClick={() => {
                setAppName('Visual Studio Code');
                setDetails('Dezvoltare Backend Lunariss Network');
                setStateText('Optimizare module de rețea proxy');
                setBtnText('Alătură-te pe Lunariss');
              }}
              title="Resetează Simulatorul"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
            Personalizează starea live de mai stânga a lui <span className="text-zinc-200 font-medium">edi_9864</span>. Alege un șablon rapid sau editează direct parametrii de mai jos pentru a simula fluxul de lucru în direct!
          </p>

          {/* Preseturi rapide */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 font-mono">Încarcă Proiect</label>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <button
                id="preset-lunariss-rom"
                onClick={() => applyPreset('lunariss')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-xs border border-zinc-800 text-zinc-300 transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
              >
                🔴 Lunariss Node
              </button>
              <button
                id="preset-synergy-rom"
                onClick={() => applyPreset('synergy')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-xs border border-zinc-800 text-zinc-300 transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
              >
                🍊 Synergy Core
              </button>
              <button
                id="preset-mango-rom"
                onClick={() => applyPreset('mango')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-xs border border-zinc-800 text-zinc-300 transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
              >
                🥭 Mango API
              </button>
              <button
                id="preset-gaming-rom"
                onClick={() => applyPreset('gaming')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-xs border border-zinc-800 text-zinc-300 transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer"
              >
                🎮 Counter-Strike 2
              </button>
            </div>
          </div>

          {/* Formular de Editare */}
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Nume Aplicație / Joc</label>
                <input
                  type="text"
                  id="discord-app-input"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white"
                  placeholder="Ex: Visual Studio Code"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Text Buton</label>
                <input
                  type="text"
                  id="discord-btn-input"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white"
                  placeholder="Ex: Alătură-te pe Lunariss"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Detalii (Rândul 1)</label>
                <input
                  type="text"
                  id="discord-details-input"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white"
                  placeholder="Ex: Dezvoltare Backend"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Stare (Rândul 2)</label>
                <input
                  type="text"
                  id="discord-state-input"
                  value={stateText}
                  onChange={(e) => setStateText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white"
                  placeholder="Ex: Rezolvare buguri"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 p-3 rounded-xl bg-black/40 border border-zinc-900 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
          <span>COMPATIBILITATE DISCORD RPC: ONLINE</span>
          <span className="animate-pulse text-green-500">⬤ STABIL</span>
        </div>
      </div>
    </div>
  );
};
