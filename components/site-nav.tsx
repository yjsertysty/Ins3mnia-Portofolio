"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export function SiteNav() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground glow-red">
            i3
          </span>
          <span className="text-lg font-bold tracking-tight text-glow">ins3mnia</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#projects" className="transition-colors hover:text-foreground">
            {t.nav.projects}
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            {t.nav.about}
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            {t.nav.contact}
          </a>
        </nav>

        <div className="flex items-center rounded-full border border-border bg-secondary/60 p-0.5 text-xs font-semibold">
          <button
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              lang === "es" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  )
}
