import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { PROFILE } from "./content"

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name").max(80, "Keep it under 80 characters"),
  email: z.email("That email doesn't look right"),
  message: z.string().trim().min(10, "A little more detail please, at least 10 characters").max(4000, "Keep it under 4000 characters"),
  company: z.string().optional(), // honeypot
})

type Result = { ok: true } | { ok: false; errors?: Partial<Record<"name" | "email" | "message", string[]>>; error?: string }

export const sendMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as Record<string, string>)
  .handler(async ({ data }): Promise<Result> => {
    const parsed = schema.safeParse(data)
    if (!parsed.success) return { ok: false, errors: z.flattenError(parsed.error).fieldErrors }
    const { name, email, message, company } = parsed.data
    if (company) return { ok: true } // bot filled the hidden field, pretend it worked

    const key = process.env.RESEND_API_KEY
    if (!key) return { ok: false, error: `The form isn't wired up yet. Email me at ${PROFILE.email} instead.` }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? PROFILE.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
    })
    if (!res.ok) {
      console.error("Resend failed", res.status, await res.text())
      return { ok: false, error: `Couldn't send right now. Email me at ${PROFILE.email} instead.` }
    }
    return { ok: true }
  })
