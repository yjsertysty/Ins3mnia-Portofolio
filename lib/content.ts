export type Lang = "en" | "es"

export const translations = {
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      role: "Minecraft Plugin & Script Developer",
      tagline: "Building fast, reliable tools for Minecraft servers.",
      description:
        "I create free and open-source plugins and scripts that keep servers optimized, informative, and welcoming. Grab them below — no cost, no catch.",
      cta: "View Projects",
      contactCta: "Contact Me",
    },
    projects: {
      title: "Projects",
      subtitle: "Free plugins and scripts, ready to download and use.",
      freeBadge: "Free",
      github: "GitHub",
      viewCta: "Get it Free",
      items: [
        {
          name: "Rules Maintenance Optimizer & Welcome",
          desc: "An all-in-one plugin that manages server rules, maintenance mode, and player welcome messages with a lightweight, optimized footprint.",
          tags: ["Plugin", "Optimization", "Welcome"],
          github: "https://github.com/yjsertysty/Rules-Mentanance-Optimizer-Welcome",
        },
        {
          name: "Minecraft Live Announcer",
          desc: "Broadcast live, scheduled, and event-based announcements to your players automatically. Fully configurable and easy to set up.",
          tags: ["Script", "Announcements", "Automation"],
          github: "https://github.com/yjsertysty/minecraft-live-announcer",
        },
      ],
    },
    about: {
      title: "About",
      body: "Questions, requests, or just want to chat? Reach me on Discord.",
    },
    contact: {
      title: "Contact",
      subtitle: "Follow me on Discord and my GitHub.",
      discordLabel: "Discord",
      githubLabel: "GitHub",
      copied: "Copied!",
      copy: "Copy",
    },
    footer: "Made by ins3mnia · Free & Open Source",
  },
  es: {
    nav: {
      projects: "Proyectos",
      about: "Acerca",
      contact: "Contacto",
    },
    hero: {
      role: "Desarrollador de Plugins y Scripts de Minecraft",
      tagline: "Creando herramientas rápidas y confiables para servidores de Minecraft.",
      description:
        "Creo plugins y scripts gratuitos y de código abierto que mantienen los servidores optimizados, informados y acogedores. Descárgalos abajo — sin costo, sin trucos.",
      cta: "Ver Proyectos",
      contactCta: "Contáctame",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Plugins y scripts gratuitos, listos para descargar y usar.",
      freeBadge: "Gratis",
      github: "GitHub",
      viewCta: "Obtenerlo Gratis",
      items: [
        {
          name: "Rules Maintenance Optimizer & Welcome",
          desc: "Un plugin todo en uno que gestiona las reglas del servidor, el modo mantenimiento y los mensajes de bienvenida con un consumo ligero y optimizado.",
          tags: ["Plugin", "Optimización", "Bienvenida"],
          github: "https://github.com/yjsertysty/Rules-Mentanance-Optimizer-Welcome",
        },
        {
          name: "Minecraft Live Announcer",
          desc: "Envía anuncios en vivo, programados y por eventos a tus jugadores automáticamente. Totalmente configurable y fácil de instalar.",
          tags: ["Script", "Anuncios", "Automatización"],
          github: "https://github.com/yjsertysty/minecraft-live-announcer",
        },
      ],
    },
    about: {
      title: "Acerca",
      body: "¿Preguntas, pedidos o solo quieres hablar? Encuéntrame en Discord.",
    },
    contact: {
      title: "Contacto",
      subtitle: "Sígueme en Discord y en mi GitHub.",
      discordLabel: "Discord",
      githubLabel: "GitHub",
      copied: "¡Copiado!",
      copy: "Copiar",
    },
    footer: "Hecho por ins3mnia · Gratis y Código Abierto",
  },
} as const

export const FREE_LINK = "https://lix.li/Ndy0I"
export const DISCORD = "edi_0986"
export const GITHUB = "https://github.com/yjsertysty"
