"use client"

import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { WhyMe } from "@/components/why-me"
import { Servers } from "@/components/servers"
import { About, Contact } from "@/components/about-contact"

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border/60 px-5 py-8 text-center text-sm text-muted-foreground">
      {t.footer}
    </footer>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <SiteNav />
        <Hero />
        <Projects />
        <Skills />
        <WhyMe />
        <Servers />
        <About />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
