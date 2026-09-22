"use client"

import { Server } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Servers() {
  const { t } = useLanguage()

  return (
    <section id="servers" className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.servers.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.servers.subtitle}</p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">{t.servers.currentLabel}</h3>
          </div>
          <div className="grid gap-3">
            {t.servers.current.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-4 rounded-2xl border border-primary/40 bg-card/70 p-5 glow-red"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Server className="size-5" />
                </div>
                <div>
                  <p className="text-lg font-bold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {t.servers.previousLabel}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.servers.previous.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <Server className="size-4" />
                </div>
                <div>
                  <p className="font-bold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
