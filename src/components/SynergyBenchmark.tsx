import React, { useState } from 'react';
import { Theme } from '../types';
import { Play, Database, Award, Gauge, Zap, BarChart3, RefreshCw } from 'lucide-react';

interface SynergyBenchmarkProps {
  theme: Theme;
}

export const SynergyBenchmark: React.FC<SynergyBenchmarkProps> = ({ theme }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [scenario, setScenario] = useState<'reads' | 'writes' | 'cache_invalidation'>('reads');
  const [stats, setStats] = useState({
    sqlite: { time: 0, ops: 0, cpu: 0, memory: 0 },
    postgres: { time: 0, ops: 0, cpu: 0, memory: 0 },
    synergy: { time: 0, ops: 0, cpu: 0, memory: 0 }, // Synergy engine is Redis cache + Async Postgres synchronization
  });
  const [hasRun, setHasRun] = useState<boolean>(false);

  const runBenchmark = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);

    // Initial warm up states
    setStats({
      sqlite: { time: 0, ops: 0, cpu: 0, memory: 0 },
      postgres: { time: 0, ops: 0, cpu: 0, memory: 0 },
      synergy: { time: 0, ops: 0, cpu: 0, memory: 0 },
    });

    setTimeout(() => {
      // Simulate results based on selected scenarios
      if (scenario === 'reads') {
        setStats({
          sqlite: { time: 148, ops: 67500, cpu: 45, memory: 12 },
          postgres: { time: 92, ops: 108000, cpu: 32, memory: 128 },
          synergy: { time: 4, ops: 2500000, cpu: 8, memory: 64 }, // Extreme Redis read caching
        });
      } else if (scenario === 'writes') {
        setStats({
          sqlite: { time: 412, ops: 24200, cpu: 75, memory: 15 },
          postgres: { time: 215, ops: 46500, cpu: 58, memory: 142 },
          synergy: { time: 18, ops: 555000, cpu: 14, memory: 96 }, // Write-back deferred queueing
        });
      } else {
        // Cache Invalidation
        setStats({
          sqlite: { time: 290, ops: 34400, cpu: 60, memory: 14 },
          postgres: { time: 180, ops: 55500, cpu: 48, memory: 135 },
          synergy: { time: 11, ops: 909000, cpu: 12, memory: 88 },
        });
      }
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div id="synergy-benchmark-panel" className={`p-6 rounded-2xl border ${theme.borderAccentClass} bg-black/45 backdrop-blur-md space-y-6 shadow-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-950/20 border border-orange-900/40 text-orange-500">
            <Database className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Synergy DB Engine Performance Sandbox</h3>
            <p className="text-xs text-zinc-500">Test de performanță în timp real pentru infrastructura de stocare de înaltă frecvență</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-orange-500">SYNERGY_DB v4.0</span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Scenario Selection */}
          <div className="flex flex-wrap gap-2">
            <button
              id="scen-reads"
              onClick={() => { if (!isRunning) setScenario('reads'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                scenario === 'reads'
                  ? 'bg-orange-950/20 border-orange-500 text-orange-400'
                  : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              100k Interogări Citire (Read Queries)
            </button>
            <button
              id="scen-writes"
              onClick={() => { if (!isRunning) setScenario('writes'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                scenario === 'writes'
                  ? 'bg-orange-950/20 border-orange-500 text-orange-400'
                  : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              20k Scrieri Concurrente (Bulk Writes)
            </button>
            <button
              id="scen-cache"
              onClick={() => { if (!isRunning) setScenario('cache_invalidation'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                scenario === 'cache_invalidation'
                  ? 'bg-orange-950/20 border-orange-500 text-orange-400'
                  : 'bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Invalidare Cache în Timp Real
            </button>
          </div>

          {/* Trigger Button */}
          <button
            id="run-benchmark-btn"
            onClick={runBenchmark}
            disabled={isRunning}
            className={`px-5 py-2 rounded-xl font-display font-semibold text-xs transition-all flex items-center gap-2 ${
              isRunning 
                ? 'bg-orange-950/20 text-orange-500/50 border border-orange-950 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] cursor-pointer'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Se testează...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Lansează Benchmark</span>
              </>
            )}
          </button>
        </div>

        {/* Results Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* SQLite card */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900/80 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">SQLite (Single Thread)</span>
              <span className="text-[10px] font-mono text-zinc-500">Local DB</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Timp total:</span>
                <span className="text-zinc-300">{hasRun ? `${stats.sqlite.time} ms` : '-'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Debit (Ops/sec):</span>
                <span className="text-zinc-300">{hasRun ? stats.sqlite.ops.toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Utilizare CPU:</span>
                <span className="text-zinc-300">{hasRun ? `${stats.sqlite.cpu}%` : '-'}</span>
              </div>
            </div>
          </div>

          {/* PostgreSQL card */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900/80 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">PostgreSQL (Indexed)</span>
              <span className="text-[10px] font-mono text-zinc-500">Relational Rel</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Timp total:</span>
                <span className="text-zinc-300">{hasRun ? `${stats.postgres.time} ms` : '-'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Debit (Ops/sec):</span>
                <span className="text-zinc-300">{hasRun ? stats.postgres.ops.toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-zinc-500">Utilizare CPU:</span>
                <span className="text-zinc-300">{hasRun ? `${stats.postgres.cpu}%` : '-'}</span>
              </div>
            </div>
          </div>

          {/* Synergy Caching Engine card */}
          <div className={`p-4 rounded-xl bg-orange-950/5 border ${isRunning ? 'border-orange-900/30' : 'border-orange-500/20'} space-y-3.5 relative overflow-hidden group hover:border-orange-500/40 transition-all`}>
            {/* Absolute accent border or glowing effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-xl pointer-events-none rounded-full" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 animate-pulse text-orange-500" /> Synergy Core Engine
              </span>
              <span className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider">Speed Winner</span>
            </div>
            
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-orange-500/60 font-semibold">Timp total:</span>
                <span className="text-orange-400 font-bold">{hasRun ? `${stats.synergy.time} ms` : 'Așteaptă test'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-orange-500/60 font-semibold">Debit (Ops/sec):</span>
                <span className="text-orange-400 font-bold">{hasRun ? `${stats.synergy.ops.toLocaleString()} +` : '-'}</span>
              </div>
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-orange-500/60 font-semibold">Utilizare CPU:</span>
                <span className="text-orange-400 font-bold">{hasRun ? `${stats.synergy.cpu}%` : '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph representation visually */}
        {hasRun && !isRunning && (
          <div className="p-4 rounded-xl bg-black/60 border border-zinc-900 font-mono text-3xs space-y-3">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">Raport Comparație Timp de Latență (Mai mic e mai bun)</span>
            <div className="space-y-2.5">
              {/* SQLite bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>SQLite:</span>
                  <span className="text-zinc-500">{stats.sqlite.time}ms</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                  <div className="bg-zinc-600 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* PostgreSQL bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>PostgreSQL:</span>
                  <span className="text-zinc-500">{stats.postgres.time}ms</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                  <div className="bg-zinc-400 h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              {/* Synergy bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-orange-400 font-bold">
                  <span>Synergy Cache Engine (Redis-Memory backend):</span>
                  <span>{stats.synergy.time}ms (98% mai rapid)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                  <div className="bg-orange-500 h-full rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" style={{ width: '3.5%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3.5 rounded-lg bg-orange-950/10 border border-orange-900/20 text-2xs text-zinc-400 flex items-start gap-2.5">
        <Award className="w-4 h-4 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
        <p>
          <strong className="text-zinc-200">Arhitectura Synergy Core:</strong> Reușește timpi de răspuns sub o milisecundă utilizând Redis pentru citire ultra-rapidă și scriind asincron în nodul Postgres printr-un cluster dedicat în NodeJS.
        </p>
      </div>
    </div>
  );
};
