'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact'
  className?: string
  showTagline?: boolean
  lightText?: boolean // For use on dark backgrounds like footer
}

export function Logo({ variant = 'full', className = '', showTagline = true, lightText = false }: LogoProps) {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.logo_url) {
            setCustomLogoUrl(data.logo_url)
          }
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error)
      }
    }
    fetchLogo()
  }, [])

  const baseSize = variant === 'icon' ? 'h-10 w-10' : variant === 'compact' ? 'h-11 w-11' : 'h-14 w-14'

  // If custom logo is uploaded, use it
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={`relative flex items-center justify-center bg-white p-1.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] ${variant === 'icon' ? 'h-10' : variant === 'compact' ? 'h-11' : 'h-16'} w-auto transition-transform hover:scale-105`}>
          <img
            src={customLogoUrl}
            alt="Satya Ganita Advisor Logo"
            className="h-full w-auto object-contain max-w-[240px] rounded-md"
          />
        </div>
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
              <span className={`text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mt-1 ${
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

  // Default SVG logo
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${baseSize} overflow-hidden rounded-tr-[1.25rem] rounded-bl-[1.25rem] rounded-tl-md rounded-br-md bg-gradient-to-br from-primary via-primary to-accent shadow-[0_0_15px_rgba(var(--primary),0.3)] flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield/Protection base */}
          <path
            d="M50 5 L90 20 L90 50 C90 75 50 95 50 95 C50 95 10 75 10 50 L10 20 Z"
            fill="currentColor"
            className="text-white"
            opacity="0.2"
          />
          <path
            d="M50 10 L85 23 L85 50 C85 72 50 90 50 90 C50 90 15 72 15 50 L15 23 Z"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
            fill="none"
          />

          {/* SG Monogram */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            className="text-white font-bold"
            fontSize="28"
            fontFamily="system-ui"
            fontWeight="800"
          >
            SG
          </text>

          {/* Decorative dots */}
          <circle cx="50" cy="75" r="3" fill="currentColor" className="text-accent" />
          <circle cx="40" cy="75" r="2" fill="currentColor" className="text-accent" opacity="0.6" />
          <circle cx="60" cy="75" r="2" fill="currentColor" className="text-accent" opacity="0.6" />
        </svg>
      </div>

      {/* Logo Text */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <span className={`text-lg md:text-xl font-bold tracking-tight leading-none ${
            lightText
              ? 'text-white'
              : 'bg-gradient-to-r from-[oklch(0.22_0.04_255)] to-[oklch(0.75_0.12_85)] bg-clip-text text-transparent'
          }`}>
            SATYA GANITA
          </span>
          {showTagline && (
            <span className={`text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mt-1 ${
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
