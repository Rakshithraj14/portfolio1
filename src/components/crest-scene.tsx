import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"

// The Asura crest, rebuilt from its own pixels. Each opaque pixel of the logo becomes a particle.
// Scroll: crest -> starfield behind the page -> crest again at #contact.

type Cloud = { crest: Float32Array; scatter: Float32Array; color: Float32Array; size: Float32Array; seed: Float32Array }

async function sampleCrest(stride: number): Promise<Cloud> {
  const img = new Image()
  img.src = "/crest-sample.png"
  await img.decode()
  const c = document.createElement("canvas")
  c.width = img.width
  c.height = img.height
  const ctx = c.getContext("2d")!
  ctx.drawImage(img, 0, 0)
  const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height)

  const crest: number[] = [], color: number[] = [], size: number[] = []
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const i = (y * width + x) * 4
      if (data[i + 3] < 140) continue
      const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255
      const lum = 0.3 * r + 0.59 * g + 0.11 * b
      // crest spans 3 units tall, brighter pixels sit closer to the camera
      crest.push((x / width - 0.5) * 3, -(y / height - 0.5) * 3, lum * 0.5 + (Math.random() - 0.5) * 0.06)
      // additive blending would make the black silhouette vanish, so dark mode lifts it to a deep violet
      if (lum < 0.12) color.push(0.035, 0.02, 0.09)
      else color.push(r, g, b)
      size.push(lum > 0.5 ? 1.6 + Math.random() : 0.8 + Math.random() * 0.6)
    }
  }
  const n = crest.length / 3
  const scatter = new Float32Array(n * 3)
  const seed = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    scatter[i * 3] = (Math.random() - 0.5) * 16
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 10
    scatter[i * 3 + 2] = -Math.random() * 8 + 1.5
    seed[i] = Math.random()
  }
  return { crest: new Float32Array(crest), scatter, color: new Float32Array(color), size: new Float32Array(size), seed }
}

const vertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime, uMorph, uIntro, uPR;
  uniform vec3 uMouse;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // staggered assembly: each particle has its own window inside 0..1
    float form = uIntro * (1.0 - uMorph);
    float t = smoothstep(aSeed * 0.45, aSeed * 0.45 + 0.55, form);
    t = t * t * (3.0 - 2.0 * t);

    float a = uTime * 0.03;
    vec3 star = aScatter;
    star.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * star.xz;

    vec3 p = mix(star, position, t);
    p += 0.015 * vec3(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 30.0), 0.0) * t;

    vec2 d = p.xy - uMouse.xy;
    float f = smoothstep(0.55, 0.0, length(d)) * t;
    p.xy += normalize(d + 1e-4) * f * 0.3;
    p.z += f * 0.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPR * mix(16.0, 24.0, t) / -mv.z;
    vColor = aColor;
    vAlpha = mix(0.55, 1.0, t) * (0.6 + 0.4 * sin(uTime * 2.0 + aSeed * 60.0) * (1.0 - t) + 0.4 * t);
  }
`

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`

function scrollProgress() {
  const vh = window.innerHeight
  const heroOut = Math.min(1, window.scrollY / (vh * 0.8))
  const contact = document.getElementById("contact")
  const contactIn = contact ? Math.min(1, Math.max(0, (vh * 0.85 - contact.getBoundingClientRect().top) / (vh * 0.6))) : 0
  return { morph: Math.max(0, heroOut - contactIn), atContact: contactIn > 0 || window.scrollY > document.body.scrollHeight / 2 }
}

function Crest({ cloud, playIntro }: { cloud: Cloud; playIntro: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const { viewport, pointer, gl } = useThree()
  const start = useRef<number | null>(null)

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(cloud.crest, 3))
    g.setAttribute("aScatter", new THREE.BufferAttribute(cloud.scatter, 3))
    g.setAttribute("aColor", new THREE.BufferAttribute(cloud.color, 3))
    g.setAttribute("aSize", new THREE.BufferAttribute(cloud.size, 1))
    g.setAttribute("aSeed", new THREE.BufferAttribute(cloud.seed, 1))
    return g
  }, [cloud])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uIntro: { value: playIntro ? 0 : 1 },
          uPR: { value: gl.getPixelRatio() },
          uMouse: { value: new THREE.Vector3(99, 99, 0) },
        },
      }),
    [playIntro, gl],
  )

  useFrame((state, dt) => {
    const u = material.uniforms
    u.uTime.value = state.clock.elapsedTime
    if (start.current === null) start.current = state.clock.elapsedTime
    if (u.uIntro.value < 1) u.uIntro.value = Math.min(1, (state.clock.elapsedTime - start.current) / 1.8)

    const { morph, atContact } = scrollProgress()
    u.uMorph.value = THREE.MathUtils.damp(u.uMorph.value, morph, 6, dt)

    // layout: crest beside the copy on wide screens, above it on narrow ones
    const wide = viewport.aspect > 1
    const scale = wide ? 0.9 : Math.min(1, viewport.width / 4)
    const x = wide ? (atContact ? -1 : 1) * viewport.width * 0.25 : 0
    const y = wide ? 0 : viewport.height * 0.25
    group.current.position.set(x, y, 0)
    group.current.scale.setScalar(scale)

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.25, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.15, 3, dt)

    // pointer into the crest's local space for the repel effect
    const mx = (pointer.x * viewport.width) / 2, my = (pointer.y * viewport.height) / 2
    u.uMouse.value.set((mx - x) / scale, (my - y) / scale, 0)
  })

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} />
    </group>
  )
}

export default function CrestScene({ onReady }: { onReady: () => void }) {
  const [cloud, setCloud] = useState<Cloud | null>(null)
  const mobile = useMemo(() => window.matchMedia("(max-width: 768px)").matches, [])
  const playIntro = useMemo(() => {
    try {
      if (sessionStorage.getItem("asura-intro")) return false
      sessionStorage.setItem("asura-intro", "1")
    } catch {}
    return true
  }, [])

  useEffect(() => {
    sampleCrest(mobile ? 2 : 1).then((c) => {
      setCloud(c)
      onReady()
    })
  }, [mobile, onReady])

  if (!cloud) return null
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Crest cloud={cloud} playIntro={playIntro} />
      {!mobile && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.3} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
