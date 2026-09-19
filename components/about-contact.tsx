"use client"

import { useState } from "react"
import { Check, Copy, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/github-icon"
import { useLanguage } from "@/components/language-provider"
import { DISCORD, GITHUB } from "@/lib/content"
import { Button } from "@/components/ui/button"

export function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="px-5 py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/60 p-8 sm:p-10">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.about.title}</h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{t.about.body}</p>
      </div>
    </section>
  )
}

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.contact.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.contact.subtitle}</p>

        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/70 p-4 pl-5 glow-red">
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t.contact.discordLabel}
              </p>
              <p className="font-mono text-lg font-bold">{DISCORD}</p>
            </div>
            <Button onClick={copy} variant={copied ? "secondary" : "default"} className="shrink-0">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t.contact.copied : t.contact.copy}
            </Button>
          </div>

          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/70 p-4 pl-5 transition-all hover:border-primary/50 hover:glow-red"
          >
            <div className="flex items-center gap-3 text-left">
              <GithubIcon className="size-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t.contact.githubLabel}
                </p>
                <p className="font-mono text-lg font-bold">yjsertysty</p>
              </div>
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  )
}
