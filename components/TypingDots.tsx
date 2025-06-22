"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingDotsProps {
  text: string
  className?: string
}

const TypingDots = ({ text, className = "" }: TypingDotsProps) => {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4) // 0, 1, 2, 3 dots
    }, 500) // Change every 500ms

    return () => clearInterval(interval)
  }, [])

  const dotsString = '.'.repeat(dots)

  return (
    <span className={className}>
      {text}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        {dotsString}
      </motion.span>
    </span>
  )
}

export default TypingDots 