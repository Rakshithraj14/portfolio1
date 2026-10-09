import { useEffect, useState, type FormEvent, type PointerEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowDown, ArrowUpRight, Check, CircleNotch, Copy, DownloadSimple, PaperPlaneTilt } from "@phosphor-icons/react"
import { AWARDS, CATEGORIES, CERTIFICATIONS, EXPERIENCE, PROFILE, PROJECTS, SOCIALS, STACK, type Category } from "../lib/content"
import { sendMessage } from "../lib/contact"

const ease = [0.16, 1, 0.3, 1] as const

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ index, title, aside }: { index: string; title: string; aside?: ReactNode }) {
  return (
    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6 md:mb-16">
      <div>
        <p className="label mb-3">{index}</p>
        <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.95] font-semibold tracking-[-0.025em]">{title}</h2>
      </div>
      {aside}
    </Reveal>
  )
}

function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`)
}

function Clock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: PROFILE.timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time ?? "--:--"} IST</span>
}

export function LiveDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-gem opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex size-2 rounded-full bg-gem" />
    </span>
  )
}

const pill = "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-[transform,background-color,color] duration-300 active:scale-[0.97]"

/* ---------------- Hero ---------------- */

export function Hero({ sceneReady, introDelay }: { sceneReady: boolean; introDelay: number }) {
  const lines = ["Models in", "production,", "not notebooks."]
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end lg:items-center">
      {/* static crest: shown until the particle crest takes over, and for reduced motion / no WebGL */}
      <img
        src="/logo-720.webp"
        alt=""
        width={720}
        height={720}
        className={`pointer-events-none absolute top-[11svh] left-1/2 w-[min(62vw,340px)] -translate-x-1/2 drop-shadow-[0_0_60px_rgb(97_52_191/0.6)] transition-opacity duration-1000 lg:top-1/2 lg:left-auto lg:right-[8vw] lg:w-[min(38vw,560px)] lg:translate-x-0 lg:-translate-y-1/2 ${sceneReady ? "opacity-0" : "opacity-100"}`}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-[44svh] pb-16 sm:px-8 lg:pt-0 lg:pb-0">
        <div className="lg:w-[58%]">
          <p className="fade-up label mb-6 flex flex-wrap items-center gap-x-3 gap-y-1" style={{ animationDelay: `${introDelay}s` }}>
            <LiveDot />
            <span>
              {PROFILE.now.title.split(" (")[0]} at {PROFILE.now.company}
            </span>
            <span aria-hidden>·</span>
            <span>Bengaluru</span>
            <span aria-hidden>·</span>
            <Clock />
          </p>
          <h1 className="font-display text-[clamp(3.1rem,9vw,8rem)] leading-[0.9] font-semibold tracking-[-0.035em]">
            <span className="sr-only">Models in production, not notebooks.</span>
            {lines.map((line, i) => (
              <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span className={`rise block ${i === 2 ? "text-violet" : ""}`} style={{ animationDelay: `${introDelay + i * 0.09}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="fade-up" style={{ animationDelay: `${introDelay + 0.35}s` }}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              I'm <span className="text-ink">{PROFILE.name}</span>, an MLOps and AI engineer. I take ML and LLM systems from the first training run to
              monitored production, and build the full-stack parts people actually touch.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className={`${pill} bg-gem text-gem-ink hover:-translate-y-0.5`}>
                See the work <ArrowDown weight="bold" />
              </a>
              <a href={PROFILE.resume} target="_blank" rel="noreferrer" className={`${pill} border border-line bg-surface/40 backdrop-blur hover:border-violet`}>
                Resume <DownloadSimple weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#work"
        aria-label="Scroll to work"
        className="fade-up label absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 lg:flex"
        style={{ animationDelay: `${introDelay + 1}s` }}
      >
        Scroll <ArrowDown className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  )
}

/* ---------------- Marquee ---------------- */

export function Marquee() {
  const items = STACK.flatMap((s) => s.items)
  return (
    <div className="relative z-10 overflow-hidden border-y border-line bg-surface/50 py-5 backdrop-blur-md" aria-hidden>
      <div className="marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 font-display text-2xl font-medium whitespace-nowrap text-muted md:text-3xl">
            {t} <span className="text-violet">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Work ---------------- */

export function Work() {
  const [filter, setFilter] = useState<Category | "all">("all")
  const [showAll, setShowAll] = useState(false)
  const filtered = PROJECTS.filter((p) => filter === "all" || p.categories.includes(filter))
  const visible = showAll || filter !== "all" ? filtered : filtered.slice(0, 6)

  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHead
        index="01 / Work"
        title="Selected work"
        aside={
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const count = c.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(c.id as Category)).length
              const active = filter === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  aria-pressed={active}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {active && <motion.span layoutId="chip" className="absolute inset-0 rounded-full border border-violet/60 bg-violet/15" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                  <span className="relative">
                    {c.label} <span className="text-muted tabular-nums">{count}</span>
                  </span>
                </button>
              )
            })}
          </div>
        }
      />

      <motion.ul layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onPointerMove={spotlight}
                className="spotlight group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface/70 p-7 backdrop-blur-md transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-violet/50 md:p-9"
              >
                <div className="label flex items-center justify-between">
                  <span>
                    {String(PROJECTS.indexOf(p) + 1).padStart(2, "0")} · {p.year}
                  </span>
                  <span className={`flex items-center gap-2 ${p.status === "Live" ? "text-gem" : ""}`}>
                    {p.status === "Live" && <LiveDot />}
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-10 flex items-start justify-between gap-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                  {p.title}
                  <ArrowUpRight className="mt-1 size-7 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet" />
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filter === "all" && filtered.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setShowAll((v) => !v)} className={`${pill} border border-line hover:border-violet`}>
            {showAll ? "Show fewer" : `Show all ${filtered.length} projects`}
          </button>
        </div>
      )}
      <p className="label mt-8 text-center">
        Every project has a write-up on{" "}
        <a href={PROFILE.blog} target="_blank" rel="noreferrer" className="text-ink underline decoration-violet underline-offset-4">
          Shiplog
        </a>
      </p>
    </section>
  )
}

/* ---------------- Experience ---------------- */

export function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHead index="02 / Experience" title="Where I've shipped" />
      <ol className="relative">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.05}>
            <li className="grid gap-4 border-b border-line py-10 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <p className="label flex items-center gap-2">
                  {e.current && <LiveDot />}
                  {e.period}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em]">
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noreferrer" className="hover:text-violet">
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </p>
                <p className="mt-1 text-muted">
                  {e.role} · {e.type}
                </p>
              </div>
              <div>
                <ul className="space-y-3 text-lg leading-relaxed">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-violet" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {e.skills.map((s) => (
                    <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ---------------- Stack ---------------- */

export function Stack() {
  return (
    <section id="stack" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHead index="03 / Stack" title="The toolbox" aside={<p className="max-w-xs text-muted">Half of it learned at 3am, all of it used in something that shipped.</p>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.06}>
            <div onPointerMove={spotlight} className="spotlight h-full rounded-[var(--radius-card)] border border-line bg-surface/70 p-7 backdrop-blur-md">
              <p className="label">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{s.group}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-bg/40 px-3 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Recognition ---------------- */

export function Recognition() {
  const [all, setAll] = useState(false)
  const certs = all ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 6)
  return (
    <section id="recognition" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHead index="04 / Recognition" title="Proof of work" />
      <div className="grid gap-4 md:grid-cols-3">
        {AWARDS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <div onPointerMove={spotlight} className="spotlight h-full rounded-[var(--radius-card)] border border-line bg-surface/70 p-7 backdrop-blur-md">
              <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-violet">{a.prize}</p>
              <h3 className="mt-6 text-lg font-medium">{a.title}</h3>
              <p className="mt-1 text-muted">{a.note}</p>
              <p className="label mt-6">{a.date}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <div className="mb-6 flex items-baseline justify-between">
          <h3 className="font-display text-2xl font-semibold">Certifications</h3>
          <p className="label">{CERTIFICATIONS.length} total</p>
        </div>
        <ul className="border-t border-line">
          {certs.map((c) => (
            <li key={c.title} className="border-b border-line">
              <a href={c.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-4 transition-colors hover:text-violet md:grid-cols-[2fr_1.2fr_auto]">
                <span className="font-medium">{c.title}</span>
                <span className="hidden text-muted md:block">{c.issuer}</span>
                <span className="label flex items-center gap-2">
                  {c.date} <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setAll((v) => !v)} className={`${pill} mt-8 border border-line hover:border-violet`}>
          {all ? "Show fewer" : `Show all ${CERTIFICATIONS.length}`}
        </button>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */

type Errors = Partial<Record<"name" | "email" | "message", string[]>>

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState("")
  const [copied, setCopied] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("sending")
    setErrors({})
    setFormError("")
    try {
      const res = await sendMessage({ data: Object.fromEntries(new FormData(e.currentTarget)) })
      if (res.ok) {
        setState("sent")
        return
      }
      setErrors(res.errors ?? {})
      setFormError(res.error ?? "")
      setState("error")
    } catch {
      setFormError(`Something broke on my side. Email me at ${PROFILE.email} instead.`)
      setState("error")
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const field = "w-full rounded-2xl border border-line bg-surface/70 px-5 py-4 backdrop-blur-md transition-colors placeholder:text-muted/70 focus:border-violet focus:outline-none aria-[invalid=true]:border-red-400"

  return (
    <section id="contact" className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl scroll-mt-0 items-center px-5 py-28 sm:px-8">
      <div className="grid w-full gap-12 lg:grid-cols-2">
        <div className="hidden lg:block" aria-hidden />
        <div>
          <Reveal>
            <p className="label mb-4">05 / Contact</p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.03em]">
              Got a model stuck <span className="text-violet text-glow">in a notebook?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">Let's get it to production. I reply within a day.</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <AnimatePresence mode="wait">
              {state === "sent" ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[var(--radius-card)] border border-violet/40 bg-violet/10 p-8" role="status">
                  <Check weight="bold" className="size-8 text-gem" />
                  <p className="mt-4 font-display text-2xl font-semibold">Message received.</p>
                  <p className="mt-2 text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-4" exit={{ opacity: 0, y: -12 }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <input name="name" autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input name="email" type="email" autoComplete="email" placeholder="you@company.com" className={field} aria-invalid={!!errors.email} />
                    </Field>
                  </div>
                  <Field label="Message" error={errors.message}>
                    <textarea name="message" rows={5} placeholder="What are you building?" className={`${field} resize-none`} aria-invalid={!!errors.message} />
                  </Field>
                  {/* honeypot for bots */}
                  <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  {formError && (
                    <p role="alert" className="text-sm text-red-400">
                      {formError}
                    </p>
                  )}
                  <button type="submit" disabled={state === "sending"} className={`${pill} bg-gem text-gem-ink hover:-translate-y-0.5 disabled:opacity-70`}>
                    {state === "sending" ? (
                      <>
                        Sending <CircleNotch className="animate-spin" weight="bold" />
                      </>
                    ) : (
                      <>
                        Send message <PaperPlaneTilt weight="bold" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
            <button onClick={copyEmail} className="group flex items-center gap-2 text-left">
              <span className="underline decoration-line underline-offset-4 group-hover:decoration-violet">{PROFILE.email}</span>
              {copied ? <Check className="text-gem" weight="bold" /> : <Copy className="text-muted" />}
              <span className="sr-only" aria-live="polite">
                {copied ? "Email copied" : ""}
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children }: { label: string; error?: string[]; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      {children}
      {error?.[0] && <span className="mt-2 block text-sm text-red-400">{error[0]}</span>}
    </label>
  )
}

/* ---------------- Nav / Footer ---------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  const links = [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["Stack", "#stack"],
    ["Blog", PROFILE.blog],
  ]
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500 ${scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo-160.webp" alt="" width={36} height={36} className="size-9" />
          <span className="font-display text-lg font-semibold tracking-[-0.01em]">
            Rakshith<span className="text-violet">.</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
          Let's talk
        </a>
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div className="flex items-start gap-4">
          <img src="/logo-160.webp" alt="Asura crest" width={56} height={56} className="size-14" />
          <div>
            <p className="font-display text-xl font-semibold">{PROFILE.name}</p>
            <p className="text-muted">
              {PROFILE.role}. Also known as {PROFILE.alias}.
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-ink">
                {s.label} <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="label mx-auto max-w-7xl px-5 pb-10 sm:px-8">© {new Date().getFullYear()} {PROFILE.name} · Built with TanStack Start and three.js</p>
    </footer>
  )
}
