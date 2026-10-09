import { defineConfig, loadEnv } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

export default defineConfig(({ mode }) => {
  // server functions read process.env; Vite only exposes .env to import.meta.env by default
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
  return { plugins: [tailwindcss(), tanstackStart(), nitro(), viteReact()] }
})
