"use client"

import { useLanguage } from "@/components/language-provider"

export function WhyMe() {
  const { t } = useLanguage()
  return (
    <section id="why" className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.why.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.why.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.why.points.map((point, i) => (
            <div
              key={point.title}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6"
            >
              <span className="absolute right-4 top-3 text-5xl font-black text-primary/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative text-lg font-bold">{point.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
