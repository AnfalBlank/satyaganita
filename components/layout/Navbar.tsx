'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/layout/Logo'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Ruang Lingkup', href: '/ruang-lingkup' },
  {
    name: 'Solusi',
    href: '#',
    children: [
      { name: 'Pajak & Pelaporan', href: '/solusi/pajak' },
      { name: 'Digitalisasi Pembukuan', href: '/solusi/digitalisasi' },
      { name: 'Advisory Manajemen', href: '/solusi/advisory' },
      { name: 'Audit & Compliance', href: '/solusi/audit' },
    ],
  },
  { name: 'Paket Layanan', href: '/paket' },
  { name: 'Insights', href: '/insights' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b bg-white',
        scrolled
          ? 'py-3 shadow-md'
          : 'py-5 shadow-sm'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo variant="compact" showTagline={true} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-primary transition-colors focus:outline-none group">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-2">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href} className="w-full cursor-pointer py-2">
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Button asChild className="rounded-full px-6">
            <Link href="/konsultasi">Konsultasi Gratis</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col space-y-2">
                {item.children ? (
                  <>
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {item.name}
                    </span>
                    <div className="pl-4 flex flex-col space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="text-base font-medium py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-lg font-medium py-2 border-b border-muted last:border-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="w-full rounded-full py-6 text-lg">
              <Link href="/konsultasi" onClick={() => setIsOpen(false)}>
                Konsultasi Gratis
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
