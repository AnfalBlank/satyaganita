'use client'

import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneNumber = '6281120192076'
  const message = 'Halo Satya Ganita Advisor, saya ingin berkonsultasi mengenai solusi bisnis saya.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative p-4 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-7 w-7" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-7 w-7" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.button>

        {/* Expanded Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Satya Ganita</h3>
                    <p className="text-xs text-white/80">Biasanya membalas dalam 1 jam</p>
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    👋 Halo! Ada yang bisa kami bantu?
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Konsultasi gratis untuk solusi pajak & manajemen bisnis Anda.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-4">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-center py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mulai Chat di WhatsApp
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
