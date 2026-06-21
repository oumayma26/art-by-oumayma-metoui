import { useCallback, useRef, useState } from 'react'

function Magnifier({ src, alt, zoom = 2.5, magnifierSize = 150 }) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const imgRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect()
    
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setPosition({ x, y })
    setCursorPosition({ 
      x: e.clientX - left, 
      y: e.clientY - top 
    })
  }, [])

  return (
    <div 
      className="relative inline-block overflow-hidden rounded-2xl cursor-crosshair w-full"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto block"
        draggable={false}
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-white/50 shadow-2xl"
          style={{
            width: magnifierSize,
            height: magnifierSize,
            left: cursorPosition.x - magnifierSize / 2,
            top: cursorPosition.y - magnifierSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          }}
        />
      )}
    </div>
  )
}

export default Magnifier