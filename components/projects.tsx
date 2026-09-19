"use client"

import { ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/github-icon"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.projects.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.projects.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {t.projects.items.map((project) => (
            <article
              key={project.name}
              className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/50 hover:glow-red"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <GithubIcon className="size-5" />
                </div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {t.projects.freeBadge}
                </span>
              </div>

              <h3 className="text-lg font-bold leading-snug">{project.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button asChild className="mt-6 w-full glow-red">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" />
                  {t.projects.viewCta}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
