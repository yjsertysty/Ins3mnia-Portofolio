export type Lang = "en" | "es"

export const translations = {
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      why: "Why Me",
      servers: "Servers",
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
    skills: {
      title: "What I Can Do",
      subtitle: "The tools and systems I build for Minecraft servers.",
      items: [
        { name: "Custom Scripts", desc: "Tailored automation scripts for any server need, from events to utilities." },
        { name: "Custom Plugins", desc: "Bespoke plugins built from scratch, optimized and fit to your server." },
        { name: "Menus & GUIs", desc: "Clean, intuitive interactive menus and interfaces for your players." },
        { name: "Configs & Setups", desc: "Full server configuration, plugin setup, and fine-tuning." },
        { name: "Optimization", desc: "Performance tuning to keep servers fast and lag-free." },
        { name: "Custom Systems", desc: "Complete gameplay and management systems built to spec." },
      ],
    },
    why: {
      title: "Why Work With Me",
      subtitle: "What you get when you bring me on board.",
      points: [
        { title: "2+ Years Experience", desc: "Over two years developing plugins, scripts, and systems for live Minecraft servers." },
        { title: "What I Do", desc: "Custom plugins, scripts, menus, configs, and complete server setups tailored to your vision." },
        { title: "How I Work", desc: "Clean, well-structured code with clear communication and fast turnaround on every project." },
        { title: "Efficiency", desc: "Optimized solutions that keep your server running smoothly without unnecessary overhead." },
      ],
    },
    servers: {
      title: "Servers I've Worked On",
      subtitle: "Teams and projects I've contributed to.",
      currentLabel: "Current",
      previousLabel: "Previous",
      current: [{ name: "Crystal Developments", role: "Developer & Technician" }],
      previous: [
        { name: "Lunariss", role: "Owner" },
        { name: "Lunaria", role: "Developer & Technician" },
        { name: "MangoCraft", role: "Developer & Technician" },
        { name: "AuraMC", role: "Developer & Technician" },
        { name: "Synergi", role: "Developer & Technician" },
        { name: "HypeMc", role: "Developer & Technician" },
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
      timezoneLabel: "Timezone",
      timezone: "Romania · GMT+3",
      languagesLabel: "Languages",
      languages: "Romanian · English",
      copied: "Copied!",
      copy: "Copy",
    },
    footer: "Made by ins3mnia · Free & Open Source",
  },
  es: {
    nav: {
      projects: "Proyectos",
      skills: "Habilidades",
      why: "Por Qué Yo",
      servers: "Servidores",
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
    skills: {
      title: "Lo Que Puedo Hacer",
      subtitle: "Las herramientas y sistemas que creo para servidores de Minecraft.",
      items: [
        { name: "Scripts Personalizados", desc: "Scripts de automatización a medida para cualquier necesidad del servidor, de eventos a utilidades." },
        { name: "Plugins Personalizados", desc: "Plugins hechos desde cero, optimizados y adaptados a tu servidor." },
        { name: "Menús y GUIs", desc: "Menús e interfaces interactivas limpias e intuitivas para tus jugadores." },
        { name: "Configs y Setups", desc: "Configuración completa del servidor, instalación de plugins y ajustes finos." },
        { name: "Optimización", desc: "Ajuste de rendimiento para mantener los servidores rápidos y sin lag." },
        { name: "Sistemas a Medida", desc: "Sistemas completos de juego y gestión creados a tu especificación." },
      ],
    },
    why: {
      title: "Por Qué Trabajar Conmigo",
      subtitle: "Lo que obtienes cuando me sumas a tu equipo.",
      points: [
        { title: "2+ Años de Experiencia", desc: "Más de dos años desarrollando plugins, scripts y sistemas para servidores de Minecraft en vivo." },
        { title: "Qué Hago", desc: "Plugins, scripts, menús, configs y setups completos de servidor adaptados a tu visión." },
        { title: "Cómo Trabajo", desc: "Código limpio y bien estructurado con comunicación clara y entregas rápidas en cada proyecto." },
        { title: "Eficiencia", desc: "Soluciones optimizadas que mantienen tu servidor funcionando sin sobrecarga innecesaria." },
      ],
    },
    servers: {
      title: "Servidores en los que Trabajé",
      subtitle: "Equipos y proyectos en los que he contribuido.",
      currentLabel: "Actual",
      previousLabel: "Anteriores",
      current: [{ name: "Crystal Developments", role: "Desarrollador y Técnico" }],
      previous: [
        { name: "Lunariss", role: "Dueño" },
        { name: "Lunaria", role: "Desarrollador y Técnico" },
        { name: "MangoCraft", role: "Desarrollador y Técnico" },
        { name: "AuraMC", role: "Desarrollador y Técnico" },
        { name: "Synergi", role: "Desarrollador y Técnico" },
        { name: "HypeMc", role: "Desarrollador y Técnico" },
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
      timezoneLabel: "Zona Horaria",
      timezone: "Rumanía · GMT+3",
      languagesLabel: "Idiomas",
      languages: "Rumano · Inglés",
      copied: "¡Copiado!",
      copy: "Copiar",
    },
    footer: "Hecho por ins3mnia · Gratis y Código Abierto",
  },
} as const

export const FREE_LINK = "https://lix.li/Ndy0I"
export const DISCORD = "edi_0986"
export const GITHUB = "https://github.com/yjsertysty"
