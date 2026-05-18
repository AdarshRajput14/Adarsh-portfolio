import React, { useEffect, useRef } from 'react'

export function Spotlight({ className = '', fill = 'white' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { left, top } = containerRef.current.getBoundingClientRect()

      const x = clientX - left
      const y = clientY - top

      containerRef.current.style.setProperty('--spotlight-x', `${x}px`)
      containerRef.current.style.setProperty('--spotlight-y', `${y}px`)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(600px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${fill}15 0%, transparent 80%)`,
      }}
    />
  )
}
