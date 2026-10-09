import { useEffect, type ReactNode } from "react"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import Lenis from "lenis"
import css from "../styles.css?url"

const title = "Rakshith Raj M · MLOps & AI Engineer"
const description = "Rakshith Raj M (Asura) builds end-to-end ML and LLM systems, from training runs to monitored production. Based in Bengaluru."

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#07050d" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "/apple-touch-icon.png" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: css },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preload", href: "/fonts/clash-600.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/satoshi-400.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: Shell,
})

function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -64 } })
    return () => lenis.destroy()
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gem focus:px-4 focus:py-2 focus:text-gem-ink">
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
