import React, { useState, useEffect } from 'react';
import { Theme, GuestbookComment } from '../types';
import { MessageSquare, Send, Calendar, User, Sparkles, Check } from 'lucide-react';

interface GuestbookProps {
  theme: Theme;
}

const INITIAL_COMMENTS: GuestbookComment[] = [
  {
    id: 'seed-1',
    username: 'alex_synergy',
    role: 'Staff',
    badgeColor: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
    message: 'Nodul de sincronizare Redis pe care l-ai configurat pentru clusterul Synergy funcționează perfect. Am atins 1.2M de operațiuni pe secundă fără packet loss!',
    timestamp: '11 Iulie 2026, 14:32',
    avatarSeed: 'alex'
  },
  {
    id: 'seed-2',
    username: 'lucas_lunariss',
    role: 'Developer',
    badgeColor: 'text-red-400 border-red-500/20 bg-red-500/5',
    message: 'Proxy-ul Velocity pe care l-ai optimizat a oprit un atac de tip layer-7 ieri de 40 Gbps. Jucătorii nici măcar nu au avut ping mărit. Ești geniu pe infra!',
    timestamp: '10 Iulie 2026, 09:15',
    avatarSeed: 'lucas'
  },
  {
    id: 'seed-3',
    username: 'mango_lead',
    role: 'Sponsor',
    badgeColor: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5',
    message: 'Integrarea bazei de date în dashboard-ul Mango este incredibil de rapidă. Excelentă colaborare la API-ul de statistică.',
    timestamp: '08 Iulie 2026, 18:40',
    avatarSeed: 'mango'
  }
];

export const Guestbook: React.FC<GuestbookProps> = ({ theme }) => {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'Developer' | 'Friend' | 'Visitor'>('Visitor');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('insomnia_portfolio_guestbook');
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(INITIAL_COMMENTS);
      }
    } else {
      setComments(INITIAL_COMMENTS);
      localStorage.setItem('insomnia_portfolio_guestbook', JSON.stringify(INITIAL_COMMENTS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !message.trim()) return;

    let badgeColor = 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    if (selectedRole === 'Developer') badgeColor = 'text-purple-400 border-purple-500/20 bg-purple-500/5';
    if (selectedRole === 'Friend') badgeColor = 'text-pink-400 border-pink-500/20 bg-pink-500/5';

    const newComment: GuestbookComment = {
      id: `comment-${Date.now()}`,
      username: username.trim(),
      role: selectedRole,
      badgeColor,
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      avatarSeed: username.trim().toLowerCase()
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem('insomnia_portfolio_guestbook', JSON.stringify(updated));

    setMessage('');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const deleteComment = (id: string) => {
    // Hidden internal testing utility
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem('insomnia_portfolio_guestbook', JSON.stringify(updated));
  };

  return (
    <div id="guestbook-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Add comment form */}
      <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900/80 backdrop-blur-md space-y-6">
        <div>
          <h3 className="text-lg font-bold font-display text-white">Semnează în Guestbook</h3>
          <p className="text-xs text-zinc-500 mt-1">Lasă un mesaj pe portofoliul lui edi_9864. Gânduri, recenzii sau feedback pe servere.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Nume Utilizator / Nickname</label>
            <input
              type="text"
              id="gb-input-name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-zinc-800 focus:outline-none text-xs text-white"
              placeholder="Ex: madalin_p"
            />
          </div>

          <div>
            <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Rolul Tău</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Visitor', 'Friend', 'Developer'] as const).map((role) => (
                <button
                  type="button"
                  key={role}
                  id={`gb-role-${role.toLowerCase()}`}
                  onClick={() => setSelectedRole(role)}
                  className={`py-2 text-3xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                    selectedRole === role
                      ? 'bg-red-950/20 border-red-500/50 text-red-400'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {role === 'Developer' ? '💻 Dev' : role === 'Friend' ? '🤝 Amic' : '👤 Vizitator'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Mesaj</label>
            <textarea
              id="gb-input-msg"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-zinc-800 focus:outline-none text-xs text-white resize-none"
              placeholder="Scrie mesajul tău aici..."
            />
          </div>

          <button
            type="submit"
            id="gb-submit-btn"
            className={`w-full py-2.5 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              theme.id === 'crimson' ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
              theme.id === 'sunset' ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.2)]' :
              theme.id === 'amethyst' ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' :
              'bg-zinc-800 hover:bg-zinc-700 text-white'
            }`}
          >
            {formSubmitted ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mesaj Trimis!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Trimite Mesaj</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Feed */}
      <div className="lg:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-zinc-950/20 rounded-xl border border-zinc-900/40">
            <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-zinc-500">Niciun mesaj încă. Fii primul care semnează!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900/60 hover:border-zinc-850/85 transition-all flex gap-3 items-start relative group"
            >
              {/* Fake avatar generator */}
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center text-xs font-bold text-zinc-400 select-none uppercase font-mono">
                {comment.username.slice(0, 2)}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-200">{comment.username}</span>
                    <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider border ${comment.badgeColor}`}>
                      {comment.role}
                    </span>
                  </div>
                  <span className="text-3xs text-zinc-600 font-mono flex items-center gap-1 shrink-0">
                    <Calendar className="w-2.5 h-2.5" /> {comment.timestamp}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{comment.message}</p>
              </div>

              {/* Delete button only visible on hover for personal/developer cleanup */}
              {comment.id.startsWith('comment-') && (
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="absolute top-3 right-3 text-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-3xs font-mono"
                  title="Șterge mesajul"
                >
                  [șterge]
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
