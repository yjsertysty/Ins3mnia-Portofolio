import React, { useState, useEffect, useRef } from 'react';
import { ThemeId, Project, Skill, GuestbookComment } from './types';
import { THEMES, ThemeToggle } from './components/ThemeToggle';
import { DiscordStatus } from './components/DiscordStatus';
import { 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Send, 
  Github, 
  MessageSquare, 
  Shield, 
  Heart, 
  Sparkles, 
  RefreshCw, 
  Play, 
  Square, 
  Flame, 
  Check, 
  Copy, 
  ExternalLink, 
  Lock, 
  Moon, 
  Code, 
  Radio, 
  Zap, 
  Workflow, 
  User, 
  Globe, 
  MapPin, 
  AlertCircle, 
  Trash2, 
  Settings,
  Code2,
  Menu,
  X,
  ChevronRight,
  Clock
} from 'lucide-react';

// Comentarii inițiale de oaspeți în limba română pentru realism sporit
const INITIAL_COMMENTS: GuestbookComment[] = [
  {
    id: 'comment-1',
    username: 'lucas_lunariss',
    role: 'Staff',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    message: 'Edi e cel mai capabil pe partea de infrastructură Velocity proxy pe care l-am întâlnit. Ne-a salvat serverele Lunariss de zeci de atacuri de tip bot join. Recomand cu încredere!',
    timestamp: '12 Iul 2026, 14:32',
    avatarSeed: 'avatar1'
  },
  {
    id: 'comment-2',
    username: 'alex_synergy',
    role: 'Developer',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    message: 'Fără edi_9864, sincronizarea asincronă a bazelor de date din Synergy ar fi fost un coșmar. Omul înțelege structurile de rețea la nivel de artă.',
    timestamp: '11 Iul 2026, 09:15',
    avatarSeed: 'avatar2'
  },
  {
    id: 'comment-3',
    username: 'vlad_mango',
    role: 'Friend',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    message: 'Configurarea API Gateway-ului pentru Mango funcționează ireproșabil de luni de zile. Un dev pe sisteme de nota 10!',
    timestamp: '09 Iul 2026, 21:04',
    avatarSeed: 'avatar3'
  },
  {
    id: 'comment-4',
    username: 'flinted_user',
    role: 'Visitor',
    badgeColor: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    message: 'Portofoliul arată genial pe nuanța asta de roșu! Felicitări pentru realizări!',
    timestamp: '08 Iul 2026, 18:47',
    avatarSeed: 'avatar4'
  }
];

// Listă de proiecte reale
const PROJECTS: Project[] = [
  {
    id: 'lunariss',
    title: 'Lunariss Network Proxy & Core',
    role: 'Owner & Lead System Architect',
    status: 'Active',
    description: 'Infrastructura de bază și sistemul de distribuție a traficului pentru rețeaua Lunariss. Configurează noduri de proxy Velocity securizate, implementează rutare optimizată la nivel regional și mitigare automată a atacurilor bot de volum mare.',
    tech: ['Velocity Proxy', 'PaperMC', 'Linux Bash', 'Anti-Bot Filter', 'Redis Cache', 'BungeeGuard'],
    features: ['Sincronizare stări sesiuni pe Redis', 'Filtrare avansată bot-join locală', 'Configurare load balancing pentru 500+ jucători simultan']
  },
  {
    id: 'synergy',
    title: 'Synergy Core Framework',
    role: 'Co-Founder & Lead DB Architect',
    status: 'Development',
    description: 'Arhitectură distribuită de microservicii pentru rețeaua Synergy. Coordonează sincronizarea bazelor de date de înaltă disponibilitate (PostgreSQL și Redis Cache) pentru a oferi latență de replicare sub 1ms.',
    tech: ['TypeScript', 'NodeJS', 'PostgreSQL', 'Redis Cluster', 'Docker', 'Microservices'],
    features: ['Algoritmi de replicare stări redundante', 'Sistem centralizat de configurare dinamică', 'Monitorizare automată latență inter-noduri']
  },
  {
    id: 'mango',
    title: 'Mango API Gateway & Firewall',
    role: 'System Developer',
    status: 'Completed',
    description: 'Gateway de securitate și API proxy de mare performanță construit pentru serviciile Mango, integrând reguli de securitate dinamice bazate pe adrese IP și limitare inteligentă de cereri (Rate Limiting).',
    tech: ['Express', 'TypeScript', 'Cloudflare APIs', 'Docker', 'IP Tables', 'UFW Security'],
    features: ['Filtru de securitate la nivel de IP', 'Rate limiting inteligent pe baze de jetoane', 'Monitorizare erori server în timp real']
  },
  {
    id: 'flinted',
    title: 'Flinted Network Infrastructure',
    role: 'Infrastructure Developer',
    status: 'Maintenance',
    description: 'Infrastructură completă de servere virtuale, optimizare masivă a performanței nucleelor sistemului de operare Linux pentru a maximiza numărul de cadre pe secundă și a asigura stabilitate absolută.',
    tech: ['Linux Debian', 'Bash Automation', 'JVM Fine-Tuning', 'Docker Containers', 'Nginx Reverse Proxy'],
    features: ['Kernel Linux custom tuning pentru baze de date', 'Scripturi de auto-restart și mentenanță automată', 'Configurare tunele securizate SSH/TCP']
  }
];

// Abilități reale, respectând cerința: FĂRĂ PLUGINURI CUSTOM JAVA
const SKILLS: Skill[] = [
  {
    name: 'Sisteme & Admin Linux',
    category: 'systems',
    level: 95,
    icon: '💻',
    description: 'Administrare Debian/Ubuntu, scripting avansat în Bash, configurare firewall iptables/ufw, tuning de nuclee kernel Linux și procese.'
  },
  {
    name: 'Infrastructură Minecraft (Velocity / Proxy)',
    category: 'minecraft',
    level: 98,
    icon: '⚡',
    description: 'Arhitectură de rețele Proxy Velocity, BungeeCord, optimizare resurse RAM/CPU, load-balancing, integrare servere Paper/Spigot, securitate BungeeGuard.'
  },
  {
    name: 'Optimizare JVM (Java Virtual Machine)',
    category: 'systems',
    level: 90,
    icon: '⚙️',
    description: 'Ajustare fină a parametrilor JVM (Garbage Collector G1GC, alocări Heap) special pentru performanțe înalte și zero stutter.'
  },
  {
    name: 'Baze de Date Distribuite',
    category: 'databases',
    level: 88,
    icon: '🗄️',
    description: 'Arhitectură PostgreSQL, replicare master-slave, caching de mare viteză cu Redis, structurare date document-oriented în MongoDB.'
  },
  {
    name: 'Backend Node.js & TypeScript',
    category: 'backend',
    level: 92,
    icon: '🚀',
    description: 'Dezvoltare API REST/Websocket ultra-rapide cu Express, structurare cod modern, asincron, robust și ușor de scalat.'
  },
  {
    name: 'Securitate Rețea & Protecție DDoS',
    category: 'systems',
    level: 90,
    icon: '🛡️',
    description: 'Filtrare atacuri de tip bot, configurare reguli Cloudflare, limitare inteligentă de rată, detectare timpurie a anomaliilor de trafic.'
  },
  {
    name: 'Frontend Modern (React & Tailwind)',
    category: 'frontend',
    level: 80,
    icon: '🎨',
    description: 'Interfețe administrative și panouri de control interactive, adaptabile pentru mobil și desktop, folosind utility classes.'
  }
];

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('crimson');
  const activeTheme = THEMES[currentThemeId];

  // State-uri pentru terminalul interactiv
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Dispozitiv conectat la terminalul securizat al lui edi_9864.',
    'Sistem de operare virtualizat: ins3mnia-OS v2.1-stable.',
    'Scrie "ajutor" sau "help" pentru a vedea lista de comenzi disponibile.'
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Sincronizare automată scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Proiecte interactive selectate și stare simulator
  const [selectedProjectId, setSelectedProjectId] = useState<string>('lunariss');
  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  // --- Stări Simulator Lunariss Network ---
  const [isProxyRunning, setIsProxyRunning] = useState(false);
  const [proxyType, setProxyType] = useState<'Velocity' | 'Bungee' | 'Waterfall'>('Velocity');
  const [proxyRam, setProxyRam] = useState<string>('4GB');
  const [proxyRegion, setProxyRegion] = useState<string>('București');
  const [proxyAntiBot, setProxyAntiBot] = useState(true);
  const [proxyLogs, setProxyLogs] = useState<string[]>([]);
  const [isBotAttackActive, setIsBotAttackActive] = useState(false);
  const [attackSpeed, setAttackSpeed] = useState(0);
  const [blockedBots, setBlockedBots] = useState(0);
  const [playersOnline, setPlayersOnline] = useState(0);
  const proxyLogTimer = useRef<NodeJS.Timeout | null>(null);
  const botAttackTimer = useRef<NodeJS.Timeout | null>(null);

  // --- Stări Simulator Synergy DB ---
  const [isSyncRunning, setIsSyncRunning] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [syncQueueSize, setSyncQueueSize] = useState(148);
  const [totalSyncedRows, setTotalSyncedRows] = useState(145028);

  // --- Stări Simulator Mango API Gateway ---
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST' | 'DELETE'>('GET');
  const [apiRoute, setApiRoute] = useState<string>('/api/v2/nodes/stats');
  const [apiResponse, setApiResponse] = useState<string>('// Selectează o metodă și o rută și apasă pe "Trimite Cerere REST API"');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiErrorSim, setApiErrorSim] = useState(false);

  // --- Stări Cartea de Oaspeți ---
  const [comments, setComments] = useState<GuestbookComment[]>(() => {
    const saved = localStorage.getItem('insomnia_portfolio_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });
  const [guestName, setGuestName] = useState('');
  const [guestRole, setGuestRole] = useState<'Vizitator' | 'Prieten' | 'Dezvoltator' | 'Sponsor' | 'Staff'>('Vizitator');
  const [guestMessage, setGuestMessage] = useState('');
  const [guestAvatar, setGuestAvatar] = useState('avatar1');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [guestbookSuccess, setGuestbookSuccess] = useState(false);

  // Ora locală în timp real
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulator Logs Proxy Lunariss
  useEffect(() => {
    if (isProxyRunning) {
      setPlayersOnline(Math.floor(Math.random() * 50) + 120);
      setProxyLogs([
        `[${new Date().toLocaleTimeString()}] [INFO] Pornire instanță proxy prin intermediul protocolului ${proxyType}...`,
        `[${new Date().toLocaleTimeString()}] [INFO] Alocare memorie RAM: ${proxyRam} heap...`,
        `[${new Date().toLocaleTimeString()}] [INFO] Configurare nod regional: ${proxyRegion} (ping redus).`,
        `[${new Date().toLocaleTimeString()}] [INFO] Încărcare BungeeGuard: DA, validare token securizat activată.`,
        `[${new Date().toLocaleTimeString()}] [INFO] Pornire listener pe portul 25565...`,
        `[${new Date().toLocaleTimeString()}] [INFO] Legătură stabilită cu serverele backend: lobby1, lobby2, survival-prod.`,
        `[${new Date().toLocaleTimeString()}] [INFO] Filtru anti-bot activat: ${proxyAntiBot ? 'DA (Monitorizare inteligentă)' : 'NU (Atenție la atacuri!)'}`,
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Nodul proxy ${proxyType} rulează stabil pe portul 25565!`
      ]);

      proxyLogTimer.current = setInterval(() => {
        const events = [
          `[INFO] Jucătorul ${['Andrei', 'Mihai', 'Vlad', 'Alex', 'Luca', 'Daria', 'Elena', 'Radu'][Math.floor(Math.random() * 8)]} s-a conectat din ${proxyRegion}.`,
          `[INFO] Replicare sesiune pentru UUID securizat în cache-ul Redis.`,
          `[DEBUG] Handshake securizat finalizat cu succes în 4ms.`,
          `[INFO] S-a deconectat un utilizator. Sincronizare stare finalizată.`
        ];
        const logLine = `[${new Date().toLocaleTimeString()}] ` + events[Math.floor(Math.random() * events.length)];
        setProxyLogs(prev => [...prev.slice(-30), logLine]);
        setPlayersOnline(prev => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(80, Math.min(450, prev + delta));
        });
      }, 3500);
    } else {
      if (proxyLogTimer.current) clearInterval(proxyLogTimer.current);
      setProxyLogs([`[${new Date().toLocaleTimeString()}] [SYSTEM] Proxy oprit de administrator.`]);
      setPlayersOnline(0);
      setIsBotAttackActive(false);
    }

    return () => {
      if (proxyLogTimer.current) clearInterval(proxyLogTimer.current);
    };
  }, [isProxyRunning, proxyType, proxyRam, proxyRegion, proxyAntiBot]);

  // Simulator Atac Boti Lunariss
  useEffect(() => {
    if (isBotAttackActive && isProxyRunning) {
      setAttackSpeed(Math.floor(Math.random() * 300) + 400); // 400-700 bots/sec
      botAttackTimer.current = setInterval(() => {
        setAttackSpeed(prev => {
          const delta = Math.floor(Math.random() * 100) - 50;
          return Math.max(300, Math.min(1000, prev + delta));
        });
        setBlockedBots(prev => prev + Math.floor(Math.random() * 12) + 22);
        
        // Adăugăm loguri de alertă în consolă
        const logLine = `[${new Date().toLocaleTimeString()}] [WARN] [Anti-Bot] Conexiune suspectă respinsă din clasa IP ${Math.floor(Math.random() * 200) + 1}.xxx.xxx.xxx`;
        setProxyLogs(prev => [...prev.slice(-30), logLine]);
      }, 800);
    } else {
      if (botAttackTimer.current) clearInterval(botAttackTimer.current);
      setAttackSpeed(0);
    }

    return () => {
      if (botAttackTimer.current) clearInterval(botAttackTimer.current);
    };
  }, [isBotAttackActive, isProxyRunning]);

  // Simulator Sincronizare Baze de date Synergy
  const handleStartDbSync = () => {
    if (isSyncRunning) return;
    setIsSyncRunning(true);
    setSyncPercentage(0);
    setSyncLogs([
      `[${new Date().toLocaleTimeString()}] Inițiere sincronizare centralizată PostgreSQL -> Redis...`,
      `[${new Date().toLocaleTimeString()}] Scanare tabele Synergy: user_profiles, server_stats, transaction_logs...`,
      `[${new Date().toLocaleTimeString()}] Găsite: ${syncQueueSize} înregistrări în coada de sincronizare.`
    ]);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setSyncPercentage(100);
        setIsSyncRunning(false);
        setSyncQueueSize(0);
        setTotalSyncedRows(prev => prev + 148);
        setSyncLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Replicare completă pe 3 noduri sclave secundare finalizată în 14ms.`,
          `[${new Date().toLocaleTimeString()}] Toate jetoanele de sesiune sunt în sync. Cache-ul Redis este cald.`,
          `[${new Date().toLocaleTimeString()}] [SUCCESS] Sincronizare încheiată cu succes. Coadă goală.`
        ]);
        clearInterval(interval);
      } else {
        setSyncPercentage(currentProgress);
        const rowsSynced = Math.floor((currentProgress / 100) * 148);
        setSyncLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [SYNC] Procesat: ${rowsSynced}/148 înregistrări (${currentProgress}%). Latență: 0.12ms`
        ]);
      }
    }, 400);
  };

  // Simulator Mango API Gateway requests
  const handleSendApiRequest = () => {
    setApiLoading(true);
    setApiResponse('// Se trimite request către server-ul Mango API Gateway...');
    
    setTimeout(() => {
      setApiLoading(false);
      if (apiErrorSim) {
        setApiResponse(JSON.stringify({
          status: 500,
          error: "Internal Server Error",
          message: "Nu s-a putut conecta la baza de date centrală Mango. Conexiune expirată.",
          timestamp: new Date().toISOString(),
          context: {
            service: "mango-gateway",
            endpoint: apiRoute,
            method: apiMethod,
            node_id: "mango-ro-01"
          }
        }, null, 2));
        return;
      }

      // Răspunsuri de succes în funcție de rută
      let data = {};
      if (apiRoute === '/api/v2/nodes/stats') {
        data = {
          gateway: "mango-gateway-v2",
          active_connections: 1450,
          memory_used: "412MB / 2048MB",
          cpu_load: "3.4%",
          status: "healthy",
          nodes: [
            { id: "node-ro-1", status: "online", ping: "4ms", load: "12%" },
            { id: "node-de-1", status: "online", ping: "26ms", load: "8%" }
          ]
        };
      } else if (apiRoute === '/api/v2/users/auth') {
        data = {
          auth_service: "mango-authenticator",
          status: "ready",
          allowed_methods: ["OAuth2", "JWT Token", "Discord Session"],
          session_duration_minutes: 1440,
          encryption: "AES-256-GCM"
        };
      } else {
        data = {
          firewall: "mango-shield-v2.1",
          active_rules_count: 1420,
          sync_interval_seconds: 60,
          blacklisted_subnets: ["185.220.101.0/24", "45.143.203.0/24"],
          integrity_hash: "sha256:7f9b88c8f000b0d3bf"
        };
      }

      setApiResponse(JSON.stringify({
        status: 200,
        statusText: "OK",
        responseTimeMs: Math.floor(Math.random() * 20) + 12,
        data: data
      }, null, 2));
    }, 600);
  };

  // Procesare comenzi Terminal Interactiv (Hero Section)
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = terminalInput.trim().toLowerCase();
    if (!cleanInput) return;

    let output: string[] = [`$ ${terminalInput}`];

    switch (cleanInput) {
      case 'help':
      case 'ajutor':
        output.push(
          'Comenzi disponibile:',
          '  despre / about   - Detalii despre mine și rolurile mele',
          '  proiecte         - Vezi proiectele mele în detaliu',
          '  lunariss         - Despre serverul Lunariss (Owner)',
          '  synergy          - Despre Synergy (Co-fondator)',
          '  mango            - Despre Mango & Flinted',
          '  skilluri / skills - Abilități tehnice (fără custom Java plugins!)',
          '  contact          - Modalități de a mă contacta',
          '  neofetch         - Specificații de sistem și profil în format ASCII',
          '  clear / curata   - Șterge istoricul terminalului'
        );
        break;
      case 'about':
      case 'despre':
        output.push(
          'Nume: edi_9864 a.k.a ins3mnia_yu',
          'Roluri active: Owner la Lunariss Network, Co-fondator Synergy, actual dezvoltator la Mango și Flinted.',
          'Specializare: Inginerie de sisteme, arhitectură rețele Minecraft securizate, optimizări JVM de mare finețe, baze de date de latență scăzută.',
          'Filozofie de lucru: Simplu, stabil, sigur. Nu mă ating de pluginuri custom Java, prefer să configurez rețelele să reziste la orice tip de stres.'
        );
        break;
      case 'proiecte':
        output.push(
          'Proiecte principale în derulare:',
          '  - Lunariss Network: Infrastructură de proxy Velocity stabilă pentru sute de jucători.',
          '  - Synergy Core: Microservicii backend cu replicare de date asincronă sub 1ms.',
          '  - Mango Gateway: API router de mare performanță cu firewall integrat.',
          '  - Flinted Core: Tuning de kernel Linux Debian pentru baze de date și rețele Minecraft.'
        );
        break;
      case 'lunariss':
        output.push(
          '🔵 LUNARISS NETWORK',
          '  Rol: Owner',
          '  Infrastructură: Velocity Proxy securizat contra atacurilor de join botting.',
          '  Sistemul este complet stabilizat și optimizat regional pentru a asigura un ping de sub 15ms pentru jucătorii din România.'
        );
        break;
      case 'synergy':
        output.push(
          '🍊 SYNERGY NETWORK',
          '  Rol: Co-fondator & Lead Database Architect',
          '  Infrastructură: Microservicii bazate pe NodeJS / TypeScript.',
          '  Sincronizare stări și profile utilizatori în timp real în Redis și PostgreSQL.'
        );
        break;
      case 'mango':
        output.push(
          '🥭 MANGO & FLINTED',
          '  Rol: Lead Systems Developer',
          '  Implementat API Gateway extrem de rapid cu Express și Docker.',
          '  Optimizări profunde de kernel Debian Linux pentru o rulare continuă de 24/7 cu uptime de 99.99%.'
        );
        break;
      case 'skills':
      case 'skilluri':
        output.push(
          'Abilități administrative & Sisteme:',
          '  - Rețele Minecraft Proxy (Velocity, Bungee): 98%',
          '  - Administrare Linux (Debian, Bash, Firewall): 95%',
          '  - Backend API (NodeJS, Express, TypeScript): 92%',
          '  - JVM Fine-tuning (G1 Garbage Collector): 90%',
          '  - Redundanță & Replicare Baze de date: 88%',
          '  * Notă importantă: NU fac pluginuri custom Java (fără dezvoltare java directă).'
        );
        break;
      case 'contact':
        output.push(
          'Contact:',
          '  - Discord Username: edi_9864',
          '  - Alias: ins3mnia_yu',
          '  - Email: contact@insomnia-yu.dev',
          '  - GitHub: github.com/edi-9864 (Simulat)'
        );
        break;
      case 'neofetch':
        output.push(
          `         /\\_/\\          edi_9864@ins3mnia-OS`,
          `        ( o.o )         --------------------`,
          `         > ^ <          OS: Debian GNU/Linux 12 (bookworm)`,
          `        /     \\         Kernel: Custom 6.1.0-insomnia-lts`,
          `       |       |        Uptime: 236 de zile, 4 ore, 12 minute`,
          `      (  || ||  )       Shell: bash 5.2.15`,
          `      _\\_\\_\\_\\_/_       Minecraft Proxy: Velocity Engine v3.4`,
          `                        CPU: AMD EPYC 7502 (4 Cores Alocate)`,
          `                        RAM: 12242MB / 16384MB`,
          `                        Theme: Dark Red Aesthetic`
        );
        break;
      case 'clear':
      case 'curata':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output.push(
          `Comanda "${terminalInput}" nu este recunoscută.`,
          'Scrie "ajutor" sau "help" pentru comenzi valide.'
        );
        break;
    }

    setTerminalHistory(prev => [...prev, ...output]);
    setTerminalInput('');
  };

  // Trimitere comentariu în Guestbook
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    setSubmittingComment(true);

    setTimeout(() => {
      let badgeStyle = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
      if (guestRole === 'Staff') badgeStyle = 'bg-red-500/10 text-red-400 border-red-500/20';
      if (guestRole === 'Dezvoltator') badgeStyle = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      if (guestRole === 'Prieten') badgeStyle = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      if (guestRole === 'Sponsor') badgeStyle = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';

      const newComment: GuestbookComment = {
        id: 'comment-' + Date.now(),
        username: guestName.trim(),
        role: guestRole,
        badgeColor: badgeStyle,
        message: guestMessage.trim(),
        timestamp: new Date().toLocaleString('ro-RO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        avatarSeed: guestAvatar
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem('insomnia_portfolio_comments', JSON.stringify(updated));
      
      // Resetare formular
      setGuestName('');
      setGuestMessage('');
      setSubmittingComment(false);
      setGuestbookSuccess(true);
      setTimeout(() => setGuestbookSuccess(false), 3000);
    }, 800);
  };

  // Ștergere comentariu local (doar pentru utilizator, facil de testat)
  const handleDeleteComment = (id: string) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem('insomnia_portfolio_comments', JSON.stringify(updated));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${activeTheme.bgClass} flex flex-col font-sans`}>
      {/* Glow Effect-uri fundal dependente de temă */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-red-950/15 filter blur-3xl pointer-events-none select-none transition-all duration-500" 
        style={{
          backgroundColor: currentThemeId === 'crimson' ? 'rgba(127, 29, 29, 0.12)' :
                           currentThemeId === 'sunset' ? 'rgba(194, 65, 12, 0.12)' :
                           currentThemeId === 'amethyst' ? 'rgba(107, 33, 168, 0.12)' :
                           'rgba(39, 39, 42, 0.08)'
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-zinc-950/20 filter blur-3xl pointer-events-none select-none transition-all duration-500" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-red-950/5 filter blur-3xl pointer-events-none select-none transition-all duration-500" />

      {/* --- BANCĂ DE NAVIGARE (HEADER) --- */}
      <header id="app-nav-header" className="sticky top-0 z-50 w-full bg-[#060000]/70 border-b border-zinc-900 backdrop-blur-md transition-colors duration-500"
        style={{
          backgroundColor: currentThemeId === 'crimson' ? 'rgba(6, 0, 0, 0.75)' :
                           currentThemeId === 'sunset' ? 'rgba(8, 2, 0, 0.75)' :
                           currentThemeId === 'amethyst' ? 'rgba(3, 0, 6, 0.75)' :
                           'rgba(7, 7, 8, 0.75)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold border text-sm transition-all duration-300 ${activeTheme.textAccentClass} ${activeTheme.borderAccentClass} bg-black/40 group-hover:scale-105`}>
              iY
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight font-display group-hover:text-zinc-300 transition-colors">
                ins3mnia_yu
              </span>
              <span className="text-[10px] block font-mono text-zinc-500 leading-none">edi_9864</span>
            </div>
          </a>

          {/* Meniu Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">Despre mine</a>
            <a href="#projects" className="hover:text-white transition-colors">Proiecte Interactive</a>
            <a href="#skills" className="hover:text-white transition-colors">Abilități</a>
            <a href="#discord" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Discord</span>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </a>
            <a href="#guestbook" className="hover:text-white transition-colors">Carte Oaspeți</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Panou Configurare Teme */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-black/30 rounded-lg border border-zinc-900 text-[10px] font-mono text-zinc-500">
              <Clock className="w-3 h-3 text-red-500" />
              <span>RO: {timeStr || '--:--:--'}</span>
            </div>
            <ThemeToggle currentThemeId={currentThemeId} onChangeTheme={setCurrentThemeId} />
          </div>
        </div>
      </header>

      {/* --- CONȚINUTUL PRINCIPAL (MAIN BODY) --- */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
        
        {/* ================= HERO SECTION & TERMINAL INTERACTIV ================= */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 pt-4">
          
          {/* Text Introducere */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag-uri Active */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-red-950/80 text-red-400 border border-red-900/30">
                👑 Owner @ Lunariss
              </span>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-orange-950/80 text-orange-400 border border-orange-900/30">
                🍊 Co-Founder @ Synergy
              </span>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
                🛠️ Systems Dev
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-4">
              Sisteme Stabile.<br />
              <span className={`transition-colors duration-500 ${activeTheme.textAccentClass}`}>
                Securitate Proxy.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg mb-6">
              Salut, sunt <span className="text-white font-semibold">edi_9864</span>, alias <span className="text-white font-semibold">ins3mnia_yu</span>. Mă ocup cu securizarea, optimizarea și arhitecturarea rețelelor de servere și infrastructuri proxy. Coordonator tehnic la <span className="text-red-400 font-medium">Lunariss Network</span> și co-fondator <span className="text-orange-400 font-medium">Synergy</span>.
            </p>

            {/* Citare faimoasă din Minecraft Admining */}
            <blockquote className="border-l-2 border-red-800 pl-4 py-1.5 mb-6 text-xs text-zinc-500 italic max-w-md">
              &ldquo;Serverele sigure nu se construiesc prin cod încărcat inutil, ci prin proxy-uri optimizate perfect, nuclee de sistem tunate și baze de date cu replicare instanta.&rdquo;
            </blockquote>

            {/* Butoane Call to Action */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="#projects" 
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${activeTheme.bgClass} border ${activeTheme.borderAccentClass} text-white shadow-lg flex items-center gap-2 hover:scale-103 cursor-pointer`}
              >
                <Zap className="w-4 h-4" />
                <span>Proiecte Interactive</span>
              </a>
              <a 
                href="#contact" 
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 font-semibold text-xs tracking-wider uppercase text-zinc-300 transition-all duration-300 flex items-center gap-2 hover:scale-103"
              >
                <Terminal className="w-4 h-4" />
                <span>Terminal Mail</span>
              </a>
            </div>
          </div>

          {/* Terminal UNIX / BASH Simulator pe dreapta */}
          <div className="lg:col-span-6">
            <div className="flex flex-col h-[380px] rounded-2xl bg-[#090a0d] border border-zinc-850 shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Header Bara Terminal */}
              <div className="bg-zinc-950 px-4 py-3 flex items-center justify-between border-b border-zinc-900 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-2xs text-zinc-500 tracking-wider font-semibold">ins3mnia-shell v2.1</span>
                <span className="text-3xs text-red-500 animate-pulse font-bold">⬤ REC_</span>
              </div>

              {/* Istoricul Consolei */}
              <div id="terminal-screen" className="flex-1 p-5 overflow-y-auto space-y-2 text-zinc-300 select-text">
                {terminalHistory.map((line, index) => {
                  if (line.startsWith('$')) {
                    return (
                      <div key={index} className="text-white font-semibold">
                        <span className="text-red-500">edi_9864@ins3mnia-OS:~$</span> {line.substring(2)}
                      </div>
                    );
                  }
                  if (line.includes('Comenzi disponibile:') || line.includes('Proiecte principale') || line.includes('Abilități administrative')) {
                    return <div key={index} className={`transition-colors duration-500 ${activeTheme.textAccentClass} font-bold mt-2`}>{line}</div>;
                  }
                  return <div key={index} className="whitespace-pre-wrap leading-relaxed">{line}</div>;
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Butoane de scurtătură rapide pentru ușurință */}
              <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-900/60 flex flex-wrap gap-1.5 shrink-0">
                {['despre', 'proiecte', 'skilluri', 'neofetch', 'contact'].map((cmd) => (
                  <button
                    key={cmd}
                    id={`terminal-btn-${cmd}`}
                    onClick={() => {
                      setTerminalInput(cmd);
                      // Auto-trimitere
                      setTimeout(() => {
                        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                        setTerminalInput(cmd);
                        // Trigger direct prin simulare valoare
                        const output = [`$ ${cmd}`];
                        if (cmd === 'despre') {
                          output.push(
                            'Nume: edi_9864 a.k.a ins3mnia_yu',
                            'Roluri active: Owner la Lunariss Network, Co-fondator Synergy, actual dezvoltator la Mango și Flinted.',
                            'Specializare: Inginerie de sisteme, rețele Minecraft proxy, optimizări JVM de mare viteză.'
                          );
                        } else if (cmd === 'proiecte') {
                          output.push(
                            'Proiecte principale în derulare:',
                            '  - Lunariss Network: Infrastructură de proxy Velocity stabilă.',
                            '  - Synergy Core: Microservicii backend de mare performanță.',
                            '  - Mango Gateway: API router cu firewall integrat.'
                          );
                        } else if (cmd === 'skilluri') {
                          output.push(
                            'Abilități administrative:',
                            '  - Rețele Minecraft Proxy (Velocity, Bungee): 98%',
                            '  - Administrare Linux (Debian, Bash, Firewall): 95%',
                            '  - Backend API (NodeJS, Express, TypeScript): 92%',
                            '  * Notă importantă: FĂRĂ custom Java plugins!'
                          );
                        } else if (cmd === 'neofetch') {
                          output.push(
                            `         /\\_/\\          edi_9864@ins3mnia-OS`,
                            `        ( o.o )         --------------------`,
                            `         > ^ <          OS: Debian GNU/Linux 12 (bookworm)`,
                            `        /     \\         Kernel: Custom 6.1.0-insomnia-lts`,
                            `       |       |        Uptime: 236 de zile`,
                            `                        Minecraft Proxy: Velocity Engine v3.4`,
                            `                        RAM: 12242MB / 16384MB`
                          );
                        } else {
                          output.push(
                            'Contact:',
                            '  - Discord Username: edi_9864',
                            '  - Email: contact@insomnia-yu.dev'
                          );
                        }
                        setTerminalHistory(prev => [...prev, ...output]);
                        setTerminalInput('');
                      }, 50);
                    }}
                    className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-400 hover:text-white transition-colors border border-zinc-850"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Caseta de Input Formular */}
              <form onSubmit={handleTerminalSubmit} className="bg-zinc-950 p-3 border-t border-zinc-900 flex gap-2 items-center shrink-0">
                <span className="text-red-500 font-bold shrink-0">edi_9864@ins3mnia-OS:~$</span>
                <input 
                  type="text"
                  id="terminal-interactive-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Scrie ajutor și apasă enter..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-zinc-600 font-mono"
                  autoComplete="off"
                />
                <button type="submit" id="terminal-submit-btn" className="p-1 rounded hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================= SECTION DISCORD STATUS INTEGRATED ================= */}
        <section id="discord" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Radio className={`w-5 h-5 text-green-500 animate-pulse`} />
            <h2 className="text-2xl font-bold font-display text-white">Status Discord în Timp Real</h2>
          </div>
          <DiscordStatus themeId={currentThemeId} />
        </section>

        {/* ================= SECTION INTERACTIVE PROJECTS ================= */}
        <section id="projects" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Server className={`w-5 h-5 transition-colors duration-500 ${activeTheme.textAccentClass}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Secțiune Interactivă</span>
              </div>
              <h2 className="text-3xl font-bold font-display text-white">Proiecte & Simulatoare Live</h2>
            </div>

            {/* Tabs Selector Proiect */}
            <div id="projects-tab-selector" className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-zinc-900 backdrop-blur-sm self-start">
              {PROJECTS.map((proj) => {
                const isActive = selectedProjectId === proj.id;
                return (
                  <button
                    key={proj.id}
                    id={`project-tab-btn-${proj.id}`}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-display transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? `${activeTheme.bgClass} text-white border ${activeTheme.borderAccentClass}` 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {proj.id === 'lunariss' ? '🔴 Lunariss' :
                     proj.id === 'synergy' ? '🍊 Synergy' :
                     proj.id === 'mango' ? '🥭 Mango' : '🛠️ Flinted'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Detalii Text Proiect */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-zinc-900 border border-zinc-800 text-zinc-400`}>
                    Status: <span className="text-green-400 font-bold">{selectedProject.status}</span>
                  </span>
                  <span className="text-3xs text-zinc-500 font-mono">ID: {selectedProject.id}</span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white tracking-tight">{selectedProject.title}</h3>
                <p className="text-xs text-red-400 font-mono font-semibold">{selectedProject.role}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{selectedProject.description}</p>

                {/* Tech Badges */}
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 font-mono">Tehnologii & Unelte</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-3xs text-zinc-400 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Caracteristici cheie */}
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 font-mono">Funcții Implementate</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900/60 hidden lg:block">
                <p className="text-3xs text-zinc-500 font-mono leading-normal">
                  * Toate simulatoarele rulează exclusiv în memoria clientului pentru siguranță și viteză instantanee.
                </p>
              </div>
            </div>

            {/* Simulator Interactiv Proiect */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-[#08090c] border border-zinc-850 p-6 min-h-[420px] flex flex-col justify-between shadow-2xl relative">
                
                {/* 1. SIMULATOR LUNARISS NETWORK NODE */}
                {selectedProjectId === 'lunariss' && (
                  <div id="sim-lunariss-block" className="flex flex-col justify-between h-full flex-grow space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <h4 className="text-xs font-bold font-mono uppercase text-zinc-300">Simulator Velocity Proxy Router</h4>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
                          <span>Port: <span className="text-white font-medium">25565</span></span>
                          <span>Jucători: <span className="text-green-400 font-bold">{playersOnline}</span></span>
                        </div>
                      </div>

                      {/* Setări Simulator */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Motor Proxy</label>
                          <select 
                            id="proxy-type-select"
                            value={proxyType} 
                            onChange={(e) => setProxyType(e.target.value as any)}
                            disabled={isProxyRunning}
                            className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none"
                          >
                            <option value="Velocity">Velocity Engine (Recomandat)</option>
                            <option value="Bungee">BungeeCord Legacy</option>
                            <option value="Waterfall">Waterfall Proxy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">RAM Alocat</label>
                          <select 
                            id="proxy-ram-select"
                            value={proxyRam} 
                            onChange={(e) => setProxyRam(e.target.value)}
                            disabled={isProxyRunning}
                            className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none"
                          >
                            <option value="2GB">2GB RAM Heap</option>
                            <option value="4GB">4GB RAM Heap</option>
                            <option value="8GB">8GB RAM Heap</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Nod Regional</label>
                          <select 
                            id="proxy-region-select"
                            value={proxyRegion} 
                            onChange={(e) => setProxyRegion(e.target.value)}
                            disabled={isProxyRunning}
                            className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none"
                          >
                            <option value="București">București, RO (4ms)</option>
                            <option value="Frankfurt">Frankfurt, DE (22ms)</option>
                            <option value="Londra">Londra, UK (31ms)</option>
                          </select>
                        </div>
                      </div>

                      {/* Toggles */}
                      <div className="flex flex-wrap items-center gap-4 py-2 border-y border-zinc-900 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                          <input 
                            type="checkbox" 
                            id="proxy-antibot-toggle"
                            checked={proxyAntiBot} 
                            onChange={(e) => setProxyAntiBot(e.target.checked)}
                            disabled={isProxyRunning}
                            className="rounded text-red-500 border-zinc-800 bg-zinc-900 focus:ring-0"
                          />
                          <span>Activare Protecție Anti-Bot</span>
                        </label>
                        <span className="text-zinc-650">|</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-blue-400" />
                          <span>BungeeGuard Token: <strong>Activ</strong></span>
                        </span>
                      </div>

                      {/* Ecran Logs Rețea */}
                      <div className="bg-[#040507] p-4 rounded-xl border border-zinc-900 h-40 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-1">
                        {proxyLogs.map((log, index) => {
                          let color = 'text-zinc-400';
                          if (log.includes('[SUCCESS]')) color = 'text-green-400 font-semibold';
                          if (log.includes('[WARN]')) color = 'text-yellow-500';
                          if (log.includes('[SYSTEM]')) color = 'text-zinc-500';
                          return <div key={index} className={color}>{log}</div>;
                        })}
                      </div>
                    </div>

                    {/* Zone de control active */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900">
                      <div className="flex items-center gap-3">
                        <button
                          id="btn-toggle-proxy"
                          onClick={() => setIsProxyRunning(!isProxyRunning)}
                          className={`px-5 py-2 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                            isProxyRunning 
                              ? 'bg-red-950 text-red-400 border border-red-900/40 hover:bg-red-900/30' 
                              : 'bg-green-950 text-green-400 border border-green-900/40 hover:bg-green-900/30'
                          }`}
                        >
                          {isProxyRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                          <span>{isProxyRunning ? 'OPREȘTE PROXY' : 'PORNEȘTE PROXY'}</span>
                        </button>

                        {isProxyRunning && (
                          <button
                            id="btn-simulate-bot-attack"
                            onClick={() => setIsBotAttackActive(!isBotAttackActive)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                              isBotAttackActive
                                ? 'bg-orange-950 text-orange-400 border-orange-900/40'
                                : 'bg-zinc-900 text-zinc-300 border-zinc-850 hover:bg-zinc-800'
                            }`}
                          >
                            <Flame className={`w-4 h-4 ${isBotAttackActive ? 'animate-bounce' : ''}`} />
                            <span>{isBotAttackActive ? 'OPREȘTE SIMULARE ATAC' : 'SIMULEAZĂ ATAC BOȚI'}</span>
                          </button>
                        )}
                      </div>

                      {/* Statistici în timp real în caz de atac */}
                      {isBotAttackActive && (
                        <div className="flex items-center gap-4 text-[10px] font-mono bg-orange-950/20 border border-orange-900/30 px-3.5 py-1.5 rounded-xl text-orange-400 animate-pulse">
                          <span>Viteză Atac: <strong>{attackSpeed} bot/s</strong></span>
                          <span>Blocați: <strong>{blockedBots}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. SIMULATOR SYNERGY DATABASE SYNC ENGINE */}
                {selectedProjectId === 'synergy' && (
                  <div id="sim-synergy-block" className="flex flex-col justify-between h-full flex-grow space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                          <h4 className="text-xs font-bold font-mono uppercase text-zinc-300">Sincronizator Baze de Date Redis & PostgreSQL</h4>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          Sincronizate total: <span className="text-orange-400 font-bold">{totalSyncedRows}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        {/* Queue Indicator */}
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850 text-center flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Coadă Așteptare</span>
                          <span className="text-2xl font-bold font-mono text-white mt-1">{syncQueueSize} profile</span>
                          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">Înregistrate local</span>
                        </div>

                        {/* Status replicare */}
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850 text-center flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Latență Replicare</span>
                          <span className="text-2xl font-bold font-mono text-green-400 mt-1">0.14ms</span>
                          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">3 noduri redundante</span>
                        </div>

                        {/* Engine health */}
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850 text-center flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Stare Conexiune DB</span>
                          <span className="text-2xl font-bold font-mono text-white mt-1 flex items-center justify-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                            <span>ACTIVĂ</span>
                          </span>
                          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">PostgreSQL SSL</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {isSyncRunning && (
                        <div className="space-y-1.5 mb-4">
                          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>Sincronizare în curs...</span>
                            <span>{syncPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${syncPercentage}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Ecran Logs Sincronizare */}
                      <div className="bg-[#040507] p-4 rounded-xl border border-zinc-900 h-32 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-1">
                        {syncLogs.length === 0 ? (
                          <div className="text-zinc-600 italic text-center pt-8">// Apasă pe "LANSEAZĂ FLUX SINCRONIZARE" pentru a porni</div>
                        ) : (
                          syncLogs.map((log, index) => {
                            let color = 'text-zinc-400';
                            if (log.includes('[SUCCESS]')) color = 'text-green-400 font-bold';
                            if (log.includes('[SYNC]')) color = 'text-orange-400';
                            return <div key={index} className={color}>{log}</div>;
                          })
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-4">
                      <button
                        id="btn-run-db-sync"
                        onClick={handleStartDbSync}
                        disabled={isSyncRunning || syncQueueSize === 0}
                        className={`px-5 py-2 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          isSyncRunning 
                            ? 'bg-orange-950 text-orange-400 border border-orange-900/40 cursor-not-allowed'
                            : syncQueueSize === 0
                            ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                            : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg'
                        }`}
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncRunning ? 'animate-spin' : ''}`} />
                        <span>{isSyncRunning ? 'Sincronizare în curs...' : syncQueueSize === 0 ? 'Coada este sincronizată' : 'Lansează Flux Sincronizare'}</span>
                      </button>

                      {syncQueueSize === 0 && (
                        <button
                          id="btn-reset-db-queue"
                          onClick={() => {
                            setSyncQueueSize(148);
                            setSyncLogs([]);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors font-mono"
                        >
                          Reset Coadă (Adaugă 148 de înregistrări)
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. SIMULATOR REST API TESTER MANGO */}
                {selectedProjectId === 'mango' && (
                  <div id="sim-mango-block" className="flex flex-col justify-between h-full flex-grow space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                          <h4 className="text-xs font-bold font-mono uppercase text-zinc-300">Mango Security REST API Tester</h4>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">
                          MANGO_API_v2.4_STABLE
                        </div>
                      </div>

                      {/* Bara Adresă API Request */}
                      <div className="bg-zinc-900/80 p-2 rounded-xl border border-zinc-850 flex items-center gap-2 mb-4">
                        <select
                          id="api-method-select"
                          value={apiMethod}
                          onChange={(e) => setApiMethod(e.target.value as any)}
                          className="bg-black border border-zinc-800 rounded-lg text-3xs font-mono font-bold px-2 py-1 focus:outline-none text-purple-400"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="DELETE">DELETE</option>
                        </select>

                        <div className="text-[10px] text-zinc-500 font-mono">https://api.mango.dev</div>

                        <select
                          id="api-route-select"
                          value={apiRoute}
                          onChange={(e) => setApiRoute(e.target.value)}
                          className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none"
                        >
                          <option value="/api/v2/nodes/stats">/api/v2/nodes/stats (Statistici gateway)</option>
                          <option value="/api/v2/users/auth">/api/v2/users/auth (Metode autentificare)</option>
                          <option value="/api/v2/firewall/blacklist">/api/v2/firewall/blacklist (Reguli firewall)</option>
                        </select>
                      </div>

                      {/* Opțiuni suplimentare / Simulare Erori */}
                      <div className="flex items-center justify-between py-2 border-b border-zinc-900 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                          <input 
                            type="checkbox" 
                            id="api-errors-toggle"
                            checked={apiErrorSim} 
                            onChange={(e) => setApiErrorSim(e.target.checked)}
                            className="rounded text-purple-500 border-zinc-800 bg-zinc-900 focus:ring-0"
                          />
                          <span className="flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                            <span>Simulează Eroare de Server (500 Internal Error)</span>
                          </span>
                        </label>
                      </div>

                      {/* Ecran Răspuns API JSON */}
                      <div className="bg-[#030406] p-4 rounded-xl border border-zinc-900 h-44 overflow-y-auto font-mono text-[10px] text-purple-300">
                        <pre className="whitespace-pre-wrap">{apiResponse}</pre>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                      <span className="text-3xs font-mono text-zinc-500">CONTENT-TYPE: APPLICATION/JSON</span>
                      <button
                        id="btn-send-api-request"
                        onClick={handleSendApiRequest}
                        disabled={apiLoading}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        {apiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        <span>{apiLoading ? 'Se trimite...' : 'Trimite Cerere REST API'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. SIMULATOR FLINTED INFRASTRUCTURE */}
                {selectedProjectId === 'flinted' && (
                  <div id="sim-flinted-block" className="flex flex-col justify-between h-full flex-grow space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse" />
                          <h4 className="text-xs font-bold font-mono uppercase text-zinc-300">Flinted System Optimization Panel</h4>
                        </div>
                        <div className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">
                          ⬤ SERVER STABIL
                        </div>
                      </div>

                      {/* Specificații */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Tuning Nucleu Linux Debian</span>
                          <div className="text-xs space-y-1 text-zinc-400 font-mono">
                            <div>Sysctl custom settings: <span className="text-green-400 font-semibold">ACTIVAT</span></div>
                            <div>Max File Descriptors: <span className="text-white">524288</span></div>
                            <div>TCP Network Queue: <span className="text-white">BBR Active</span></div>
                            <div>Kernel Swappiness: <span className="text-red-400 font-semibold">10</span></div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Optimizare Mașină Virtuală Java (JVM)</span>
                          <div className="text-xs space-y-1 text-zinc-400 font-mono">
                            <div>Garbage Collector: <span className="text-green-400 font-semibold">Aikars G1GC</span></div>
                            <div>JVM Heap Reserve: <span className="text-white">Garantat 98%</span></div>
                            <div>CPU Affinity binding: <span className="text-white">Cores 0,1,2,3</span></div>
                            <div>Log overhead suppression: <span className="text-green-400 font-semibold">DA</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Sfat important */}
                      <div className="p-4 rounded-xl bg-black/40 border border-zinc-900 flex items-start gap-2.5 text-xs text-zinc-400 leading-normal">
                        <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <strong>Filozofie Configurare:</strong> Pentru Flinted, nu utilizăm scripturi sau programe Java încărcate adițional. Tot tuning-ul se realizează exclusiv din fișierele de boot ale sistemului de operare Linux (sysctl.conf) și parametrii de startup ai JVM, maximizând performanța brută.
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-3xs text-zinc-500 font-mono">
                      <span>DEBIAN CORE COMPATIBILITY: STABLE</span>
                      <span>UPTIME: 236 ZILE</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION SKILLS ================= */}
        <section id="skills" className="mb-16">
          <div className="flex items-center gap-2.5 mb-2">
            <Cpu className={`w-5 h-5 transition-colors duration-500 ${activeTheme.textAccentClass}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Abilități Verificate</span>
          </div>
          <h2 className="text-3xl font-bold font-display text-white mb-3">Competențe & Stack Tehnologic</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-2xl leading-relaxed">
            Majoritatea competențelor mele sunt axate pe sisteme, securitate și infrastructură robustă. <span className="text-red-400 font-semibold">Notă importantă: nu mă ocup cu crearea de pluginuri custom Java (fără Java development)</span>, totul este bazat pe configurare rețele, optimizări JVM, scripting și sisteme backend în NodeJS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((sk) => (
              <div 
                key={sk.name} 
                className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-850 hover:border-zinc-700/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-2xl">{sk.icon}</span>
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">{sk.category}</span>
                  </div>
                  <h3 className="text-sm font-bold font-display text-white mb-2 tracking-tight">{sk.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{sk.description}</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                    <span>Nivel Competență</span>
                    <span className="font-bold text-zinc-300">{sk.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        currentThemeId === 'crimson' ? 'bg-red-500' :
                        currentThemeId === 'sunset' ? 'bg-orange-500' :
                        currentThemeId === 'amethyst' ? 'bg-purple-500' :
                        'bg-zinc-400'
                      }`} 
                      style={{ width: `${sk.level}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION GUESTBOOK (CARTEA DE OASPEȚI) ================= */}
        <section id="guestbook" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Formular de adăugare */}
            <div className="lg:col-span-5 rounded-2xl bg-zinc-950/40 border border-zinc-850 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className={`w-5 h-5 transition-colors duration-500 ${activeTheme.textAccentClass}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Carte de Oaspeți</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white mb-2">Lasă un Mesaj</h2>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Ai colaborat cu mine la Lunariss, Synergy sau Mango? Lasă o recenzie sau un mesaj amical aici! Comentariul tău va fi salvat local.
              </p>

              <form onSubmit={handleAddComment} className="space-y-4">
                {/* Nume */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Nume Utilizator / Nickname</label>
                  <input
                    type="text"
                    id="guest-name-input"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ex: matei_lunariss"
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white"
                  />
                </div>

                {/* Rol Badge */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Rol Badge</label>
                    <select
                      id="guest-role-select"
                      value={guestRole}
                      onChange={(e) => setGuestRole(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none text-xs text-white"
                    >
                      <option value="Vizitator">🌟 Vizitator</option>
                      <option value="Prieten">🔥 Prieten</option>
                      <option value="Dezvoltator">🛠️ Dezvoltator</option>
                      <option value="Staff">👑 Staff / Teammate</option>
                      <option value="Sponsor">💎 Sponsor</option>
                    </select>
                  </div>

                  {/* Avatar */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Avatar Seed</label>
                    <select
                      id="guest-avatar-select"
                      value={guestAvatar}
                      onChange={(e) => setGuestAvatar(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none text-xs text-white"
                    >
                      <option value="avatar1">Cyber Hacker</option>
                      <option value="avatar2">Minimalist Tech</option>
                      <option value="avatar3">Retro Game</option>
                      <option value="avatar4">Anime Girl</option>
                    </select>
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">Mesajul Tău</label>
                  <textarea
                    id="guest-message-input"
                    required
                    rows={4}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Scrie un mesaj respectuos..."
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-900/40 focus:outline-none text-xs text-white resize-none"
                  />
                </div>

                {/* Succes Notification */}
                {guestbookSuccess && (
                  <div className="p-3 bg-green-950/40 border border-green-900/30 text-green-400 rounded-xl text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Mesajul tău a fost înregistrat cu succes!</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  id="guestbook-submit-btn"
                  disabled={submittingComment}
                  className={`w-full py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    submittingComment 
                      ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                      : `${activeTheme.bgClass} border ${activeTheme.borderAccentClass} text-white hover:scale-102`
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingComment ? 'Se postează...' : 'Adaugă în Carte'}</span>
                </button>
              </form>
            </div>

            {/* Listă comentarii posted */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Recenzii și Mesaje Recente ({comments.length})</h3>
                <span className="text-3xs text-zinc-650 font-mono">Persistență locală activă</span>
              </div>

              <div id="comments-list-container" className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                  <div className="text-center p-12 rounded-2xl bg-zinc-950/20 border border-zinc-900 text-zinc-500 italic text-xs">
                    Niciun comentariu înregistrat momentan. Fii primul care adaugă unul!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div 
                      key={comment.id}
                      className="p-4.5 rounded-xl bg-[#090a0d]/60 border border-zinc-850 hover:border-zinc-800 transition-all duration-300 flex items-start gap-4 relative group"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center text-lg overflow-hidden">
                        {comment.avatarSeed === 'avatar1' ? '👤' :
                         comment.avatarSeed === 'avatar2' ? '🕶️' :
                         comment.avatarSeed === 'avatar3' ? '👾' : '🌸'}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-bold text-white text-xs tracking-tight">{comment.username}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${comment.badgeColor}`}>
                            {comment.role}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono ml-auto">{comment.timestamp}</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{comment.message}</p>
                      </div>

                      {/* Delete action button (facil de testat în browser) */}
                      <button
                        id={`delete-comment-btn-${comment.id}`}
                        onClick={() => handleDeleteComment(comment.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg absolute top-3 right-3"
                        title="Șterge mesajul meu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION CONTACT ================= */}
        <section id="contact" className="mb-8">
          <div className="rounded-2xl bg-[#050000]/60 border border-zinc-850 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden transition-colors duration-500"
            style={{
              borderColor: currentThemeId === 'crimson' ? 'rgba(153, 27, 27, 0.25)' :
                           currentThemeId === 'sunset' ? 'rgba(194, 65, 12, 0.25)' :
                           currentThemeId === 'amethyst' ? 'rgba(168, 85, 247, 0.25)' :
                           'rgba(63, 63, 70, 0.25)'
            }}
          >
            {/* Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-red-950/20 filter blur-3xl pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text contact */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Contact Oficial</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Să Colaborăm</h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Fie că dorești securizarea unei rețele întregi de Minecraft, optimizarea fină a unor mașini virtuale JVM, sau configurarea de tuneluri anti-bot persistente pe sisteme Linux, mă poți găsi oricând pe Discord sau prin intermediul mailului de contact.
                </p>

                <div className="pt-4 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <span className="w-5 text-center text-base">🏷️</span>
                    <span>Discord Username: <strong>edi_9864</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <span className="w-5 text-center text-base">📧</span>
                    <span>Email: <strong>contact@insomnia-yu.dev</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <span className="w-5 text-center text-base">📍</span>
                    <span>Locație: <strong>București, România (UTC+3)</strong></span>
                  </div>
                </div>
              </div>

              {/* Terminal contact mail draft */}
              <div className="lg:col-span-7">
                <div className="rounded-xl bg-zinc-950 p-5 border border-zinc-900 font-mono text-xs text-zinc-300 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
                    <span className="text-2xs text-zinc-500 font-bold">INSOMNIA-MAIL_AGENT v1.0</span>
                    <span className="text-green-500 text-3xs">⬤ READY</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-red-500 font-semibold">FROM:</span>
                      <span className="text-zinc-400"> vizitator@net.client</span>
                    </div>
                    <div>
                      <span className="text-red-500 font-semibold">TO:</span>
                      <span className="text-white font-medium"> contact@insomnia-yu.dev</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-red-500 font-semibold">SUBJECT:</span>
                    <span className="text-zinc-300 font-medium"> [Colaborare] Solicitare Optimizare Sisteme</span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 leading-normal text-zinc-400">
                    <p className="mb-2">Salut Edi,</p>
                    <p className="mb-2">Am dori să ne ajuți cu optimizarea arhitecturii noastre Velocity proxy pe o rețea de producție. Am aflat că ai configurat Lunariss Network să ruleze impecabil...</p>
                    <p className="text-zinc-500 italic">// Restul mesajului tău...</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-3xs text-zinc-650">SECURITY PROTOCOL: SSH_TLSv1.3</span>
                    <a 
                      href="https://discord.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-3xs border border-zinc-800 text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Deschide Discord</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* --- SUBSOL PAGINĂ (FOOTER) --- */}
      <footer id="app-footer" className="w-full bg-[#050000] border-t border-zinc-900 py-8 text-center text-xs text-zinc-500 mt-auto transition-colors duration-500"
        style={{
          backgroundColor: currentThemeId === 'crimson' ? '#060000' :
                           currentThemeId === 'sunset' ? '#080200' :
                           currentThemeId === 'amethyst' ? '#030006' :
                           '#070708'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-mono">
            ins3mnia_yu &copy; 2026. Toate drepturile rezervate.
          </p>
          <p className="text-3xs text-zinc-600 max-w-md mx-auto leading-normal">
            Arhitectură de rețea dezvoltată exclusiv pentru servere de înaltă performanță. Toate datele din simulatoare sunt persistate în memoria cache locală.
          </p>
          <div className="flex justify-center gap-4 text-zinc-600 text-3xs font-mono uppercase pt-2">
            <span>VELOCITY: v3.4_STABLE</span>
            <span>•</span>
            <span>SYSTEM_KERNEL: DEBIAN_12</span>
            <span>•</span>
            <span>uptime: 236 zile</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
