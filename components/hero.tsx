"use client"

import { ArrowDown, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-36 sm:pt-44">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute right-10 top-40 h-40 w-40 rounded-full bg-destructive/20 blur-3xl animate-float-slow [animation-delay:2s]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
          {t.hero.role}
        </span>

        <h1 className="text-balance text-5xl font-black tracking-tight sm:text-7xl">
          <span className="text-glow bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">
            ins3mnia
          </span>
        </h1>

        <p className="mt-5 text-balance text-lg font-medium text-foreground sm:text-xl">{t.hero.tagline}</p>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">{t.hero.description}</p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="glow-red">
            <a href="#projects">
              {t.hero.cta}
              <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">
              <MessageCircle className="size-4" />
              {t.hero.contactCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
