'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  src: string
  alt: string
  children?: React.ReactNode
}

export default function ParallaxHero({ src, alt, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] flex items-end overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-olive-deep/5 via-olive-deep/20 to-olive-deep/75" />
      <div className="relative container-main pb-20 md:pb-28 lg:pb-36">{children}</div>
    </section>
  )
}
