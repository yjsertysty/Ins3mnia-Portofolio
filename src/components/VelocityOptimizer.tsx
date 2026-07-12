import React, { useState } from 'react';
import { Theme } from '../types';
import { Cpu, Server, Shield, Code, Check, Copy, Flame, Settings } from 'lucide-react';

interface VelocityOptimizerProps {
  theme: Theme;
}

export const VelocityOptimizer: React.FC<VelocityOptimizerProps> = ({ theme }) => {
  const [players, setPlayers] = useState<number>(500);
  const [proxyType, setProxyType] = useState<'velocity' | 'bungeecord'>('velocity');
  const [ram, setRam] = useState<number>(4);
  const [tcpShield, setTcpShield] = useState<boolean>(true);
  const [compressLevel, setCompressLevel] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const generateConfig = () => {
    if (proxyType === 'velocity') {
      return `# Fişier optimizat de ins3mnia_yu pentru Lunariss Network
# Jucători simultani recomandați: ${players}
# Alocare RAM recomandată: ${ram} GB

[general]
bind = "0.0.0.0:25565"
motd = "§r§l§4LUNARISS NETWORK §r§7- §fSleek & Optimized §r§7[1.8-1.21]\\n§eClick pentru a te alătura comunității!"
show-max-players = ${players + 100}
online-mode = false
prevent-client-proxy-connections = false
player-info-cache-size = 3000
player-info-cache-ttl = 60000

[advanced]
# Optimizare CPU thread pool pentru performanță maximă
compression-threshold = 256
compression-level = ${compressLevel}
login-limiter = 120
connection-timeout = 5000
read-timeout = 15000

[servers]
hub = "127.0.0.1:25566"
survival = "127.0.0.1:25567"
skyblock = "127.0.0.1:25568"

[query]
enabled = true
port = 25565

${tcpShield ? `[haproxy]
# Protecție TCPShield activă pentru combaterea DDoS
haproxy-protocol-client-ip = true` : '# Protecția HAProxy este dezactivată'}
`;
    } else {
      return `# BungeeCord Config - Optimizat de edi_9864
# Configurație generată automat la capacitate de ${players} Jucători
# Alocare RAM: ${ram} GB

listeners:
- query_port: 25565
  motd: '&c&lLunariss Network &7- &fBaza de date sincronizată via Synergy'
  tab_list: GLOBAL_PING
  query_enabled: true
  proxy_protocol: ${tcpShield ? 'true' : 'false'}
  forced_hosts:
    pvp.lunariss.net: pvp
  ping_passthrough: false
  priorities:
  - hub
  bind_local_address: true
  host: 0.0.0.0:25565
  max_players: ${players}
  tab_size: 60
  force_default_server: true

connection_throttle: 4000
connection_throttle_limit: 3
timeout: 30000
network_compression_threshold: 256
`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="proxy-optimizer-panel" className={`p-6 rounded-2xl border ${theme.borderAccentClass} bg-black/45 backdrop-blur-md space-y-6 shadow-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-red-950/20 border border-red-900/40 text-red-500`}>
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Velocity Proxy Config Simulator</h3>
            <p className="text-xs text-zinc-500">Optimizare în timp real pentru rețele de Minecraft de înaltă performanță</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">LUNARISS_CORE v2</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
              Tip Proxy Rețea
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="opt-proxy-velocity"
                onClick={() => setProxyType('velocity')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  proxyType === 'velocity'
                    ? 'bg-red-950/20 border-red-500 text-red-400 font-display'
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Velocity Core (Recomandat)
              </button>
              <button
                id="opt-proxy-bungee"
                onClick={() => setProxyType('bungeecord')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  proxyType === 'bungeecord'
                    ? 'bg-red-950/20 border-red-500 text-red-400 font-display'
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                BungeeCord Legacy
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-2xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Jucători Simultan (Target CCU)
              </label>
              <span className="text-xs font-bold text-red-500">{players} jucători</span>
            </div>
            <input
              type="range"
              min="50"
              max="3000"
              step="50"
              value={players}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setPlayers(val);
                // Dynamically scale RAM estimation for Minecraft architecture
                if (val <= 200) setRam(2);
                else if (val <= 600) setRam(4);
                else if (val <= 1500) setRam(8);
                else setRam(16);
              }}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                RAM Alocat (Proxy)
              </label>
              <select
                value={ram}
                onChange={(e) => setRam(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-800"
              >
                <option value={2}>2 GB (Mini network)</option>
                <option value={4}>4 GB (Mediu, standard)</option>
                <option value={8}>8 GB (High load network)</option>
                <option value={16}>16 GB (Synergy scale)</option>
              </select>
            </div>

            <div>
              <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                Compresie Rețea
              </label>
              <select
                value={compressLevel}
                onChange={(e) => setCompressLevel(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-800"
              >
                <option value={1}>Nivel 1 (Fără lag, CPU redus)</option>
                <option value={2}>Nivel 2 (Echilibrat)</option>
                <option value={3}>Nivel 3 (Lățime bandă optimizată)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={tcpShield}
                onChange={(e) => setTcpShield(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 bg-zinc-900 border-zinc-800 focus:ring-red-500 accent-red-600"
              />
              <div className="text-xs">
                <p className="font-semibold text-zinc-300 group-hover:text-white transition-colors">Integrează HAProxy & TCPShield</p>
                <p className="text-[10px] text-zinc-500">Permite forward de IP-uri reale prin firewall DDoS extern</p>
              </div>
            </label>
          </div>
        </div>

        {/* Generated Code Block */}
        <div className="relative flex flex-col h-[280px] bg-zinc-950/80 border border-zinc-900 rounded-xl overflow-hidden font-mono text-3xs text-zinc-300">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-900">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Configurație generată (.toml)</span>
            <button
              id="copy-config-btn"
              onClick={copyToClipboard}
              className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copiat!' : 'Copiază'}</span>
            </button>
          </div>
          <pre className="flex-1 p-4 overflow-auto leading-relaxed text-zinc-400 whitespace-pre scrollbar-thin selection:bg-red-950">
            <code>{generateConfig()}</code>
          </pre>
        </div>
      </div>

      {/* Info Tip block */}
      <div className="p-3.5 rounded-lg bg-red-950/10 border border-red-900/20 text-2xs text-zinc-400 flex items-start gap-2.5">
        <Flame className="w-4 h-4 text-red-500 shrink-0 mt-0.5 animate-pulse" />
        <p>
          <strong className="text-zinc-200">Recomandarea lui edi_9864:</strong> {players > 1000 ? 
            'Pentru peste 1000 de conexiuni active, asigură-te că folosești epoll de Linux în startup shell și mărește file limits (ulimit -n 65535) pe containerul tău.' :
            'Velocity procesează pachetele asincron. Setările de compresie alese echilibrează consumul de CPU cu latența în joc pentru rețeaua Lunariss.'
          }
        </p>
      </div>
    </div>
  );
};
