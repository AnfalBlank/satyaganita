'use client'

import { useEffect, useState } from 'react'

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact' | 'hero'
  className?: string
  showTagline?: boolean
  lightText?: boolean
}

export function Logo({ variant = 'full', className = '', showTagline = true, lightText = false }: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>('/logo-v2.png')

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.logo_url) {
            setLogoUrl(data.logo_url)
          }
        }
      } catch {
        // fallback to default logo.png
      }
    }
    fetchLogo()
  }, [])

  // Hero variant — logo besar + nama perusahaan
  if (variant === 'hero') {
    return (
      <div className={`flex items-center gap-5 ${className}`}>
        <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-2 shadow-2xl">
          <img
            src={logoUrl}
            alt="Satya Ganita Advisor"
            className="h-20 md:h-28 w-auto object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-4xl font-bold tracking-tight leading-none text-white drop-shadow-lg">
            SATYA GANITA
          </span>
          {showTagline && (
            <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase mt-2 text-white/70">
              Advisor Solution
            </span>
          )}
        </div>
      </div>
    )
  }

  // Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`rounded-xl overflow-hidden ${className}`}>
        <img
          src={logoUrl}
          alt="Satya Ganita Advisor"
          className="h-9 w-9 object-contain"
        />
      </div>
    )
  }

  // Compact (navbar) & Full (footer) variants
  const imgSize = variant === 'compact' ? 'h-10' : 'h-12'
  const nameSize = variant === 'compact' ? 'text-base md:text-lg' : 'text-lg md:text-xl'
  // Frame style: subtle rounded container
  const frameClass = lightText
    ? 'rounded-xl overflow-hidden bg-white/10 p-1'
    : 'rounded-xl overflow-hidden bg-muted/40 p-1'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={frameClass}>
        <img
          src={logoUrl}
          alt="Satya Ganita Advisor"
          className={`${imgSize} w-auto object-contain`}
        />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight leading-none ${
          lightText
            ? 'text-white'
            : 'bg-gradient-to-r from-[oklch(0.22_0.04_255)] to-[oklch(0.75_0.12_85)] bg-clip-text text-transparent'
        } ${nameSize}`}>
          SATYA GANITA
        </span>
        {showTagline && (
          <span className={`text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mt-0.5 ${
            lightText ? 'text-white/70' : 'text-muted-foreground'
          }`}>
            {variant === 'compact' ? 'Advisor' : 'Advisor Solution'}
          </span>
        )}
      </div>
    </div>
  )
}
