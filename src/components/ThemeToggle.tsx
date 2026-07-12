import React from 'react';
import { ThemeId, Theme } from '../types';
import { Palette, Flame, Shield, Eye } from 'lucide-react';

export const THEMES: Record<ThemeId, Theme> = {
  crimson: {
    id: 'crimson',
    name: 'Crimson Eclipse',
    bgClass: 'bg-[#060000] text-red-500',
    cardBgClass: 'bg-[#0f0303]/90 border-[#3f0c0c]/80 hover:border-red-800/80',
    textAccentClass: 'text-red-500',
    borderAccentClass: 'border-red-900/50',
    glowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.15)] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    gradientFrom: 'from-red-650',
    gradientTo: 'to-red-950',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Shadow',
    bgClass: 'bg-[#070708] text-zinc-400',
    cardBgClass: 'bg-[#121214]/90 border-zinc-800/80 hover:border-zinc-700/80',
    textAccentClass: 'text-zinc-300',
    borderAccentClass: 'border-zinc-800',
    glowClass: 'shadow-[0_0_20px_rgba(255,255,255,0.05)] focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    gradientFrom: 'from-zinc-700',
    gradientTo: 'to-zinc-900',
  },
  sunset: {
    id: 'sunset',
    name: 'Cyber Sunset',
    bgClass: 'bg-[#080200] text-orange-500',
    cardBgClass: 'bg-[#140602]/90 border-[#4a180b]/80 hover:border-orange-800/80',
    textAccentClass: 'text-orange-500',
    borderAccentClass: 'border-orange-950/50',
    glowClass: 'shadow-[0_0_20px_rgba(249,115,22,0.15)] focus:shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-red-900',
  },
  amethyst: {
    id: 'amethyst',
    name: 'Amethyst Void',
    bgClass: 'bg-[#030006] text-purple-500',
    cardBgClass: 'bg-[#0c0312]/90 border-[#2f0c3f]/80 hover:border-purple-800/80',
    textAccentClass: 'text-purple-500',
    borderAccentClass: 'border-purple-950/50',
    glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.15)] focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-950',
  }
};

interface ThemeToggleProps {
  currentThemeId: ThemeId;
  onChangeTheme: (themeId: ThemeId) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentThemeId, onChangeTheme }) => {
  return (
    <div id="theme-panel-container" className="flex items-center gap-1.5 p-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
      {(Object.keys(THEMES) as ThemeId[]).map((id) => {
        const theme = THEMES[id];
        const isActive = currentThemeId === id;
        
        let colorDot = 'bg-red-500';
        if (id === 'obsidian') colorDot = 'bg-zinc-400';
        if (id === 'sunset') colorDot = 'bg-orange-500';
        if (id === 'amethyst') colorDot = 'bg-purple-500';

        return (
          <button
            key={id}
            id={`theme-btn-${id}`}
            onClick={() => onChangeTheme(id)}
            title={`Switch to ${theme.name}`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-display transition-all duration-300 ${
              isActive
                ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${colorDot} ${isActive ? 'animate-pulse ring-2 ring-white/20' : ''}`} />
            <span className="hidden sm:inline">{theme.name.split(' ')[1]}</span>
          </button>
        );
      })}
    </div>
  );
};
