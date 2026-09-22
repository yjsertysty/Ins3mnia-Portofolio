"use client"

import { Code2, Puzzle, LayoutGrid, Settings2, Gauge, Boxes } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const icons = [Code2, Puzzle, LayoutGrid, Settings2, Gauge, Boxes]

export function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.skills.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.skills.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={item.name}
                className="group rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/50 hover:glow-red"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
