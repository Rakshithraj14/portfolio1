import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { MotionConfig } from "motion/react"
import { Contact, Experience, Footer, Hero, Marquee, Nav, Recognition, Stack, Work } from "../components/sections"

const CrestScene = lazy(() => import("../components/crest-scene"))

export const Route = createFileRoute("/")({ component: Home })

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    return !!document.createElement("canvas").getContext("webgl2")
  } catch {
    return false
  }
}

function Home() {
  const [use3D, setUse3D] = useState(false)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    setUse3D(canRender3D())
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgb(var(--glow)/0.22),transparent_55%)]" />
        {use3D && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
              <CrestScene onReady={onReady} />
            </div>
          </Suspense>
        )}
      </div>
      <Nav />
      <main>
        <Hero sceneReady={ready} introDelay={0.5} />
        <Marquee />
        <Work />
        <Experience />
        <Stack />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
