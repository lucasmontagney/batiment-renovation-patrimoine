'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel: string
  afterLabel: string
}

export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)
  const dragging = useRef(false)

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.max(0, Math.min(100, next)))
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      move(e.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[3/2] overflow-hidden select-none cursor-ew-resize bg-pierre/20"
      onPointerDown={(e) => {
        dragging.current = true
        move(e.clientX)
      }}
    >
      <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />
      </div>

      <span className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-widest text-bone bg-olive-deep/65 backdrop-blur-sm px-3 py-1.5">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 font-sans text-[10px] uppercase tracking-widest text-bone bg-olive-deep/65 backdrop-blur-sm px-3 py-1.5">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-px bg-bone pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bone shadow-lg flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-olive-deep"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
