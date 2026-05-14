'use client'

import { useEffect, useState } from 'react'

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact'
  className?: string
  showTagline?: boolean
  lightText?: boolean
}

export function Logo({ variant = 'full', className = '', showTagline = true, lightText = false }: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>('/logo.png')

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

  const imgHeight =
    variant === 'icon' ? 'h-9 w-9' :
    variant === 'compact' ? 'h-10' :
    'h-12'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo image */}
      <div className={`relative flex items-center justify-center ${variant === 'icon' ? 'h-9 w-9' : variant === 'compact' ? 'h-10' : 'h-12'}`}>
        <img
          src={logoUrl}
          alt="Satya Ganita Advisor"
          className={`${imgHeight} w-auto object-contain`}
        />
      </div>

      {/* Text — hidden in icon-only mode */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight leading-none ${
            lightText
              ? 'text-white'
              : 'bg-gradient-to-r from-[oklch(0.22_0.04_255)] to-[oklch(0.75_0.12_85)] bg-clip-text text-transparent'
          } ${variant === 'compact' ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
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
      )}
    </div>
  )
}
