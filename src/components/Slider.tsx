import React, { useRef, useEffect } from 'react'

interface SliderProps {
  sliderValue: number
  setSliderValue: (value: number) => void
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

const Slider: React.FC<SliderProps> = ({ 
  sliderValue, 
  setSliderValue, 
  isDragging, 
  setIsDragging 
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const lastTapRef = useRef<number>(0)

  const calculateValue = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const sliderWidth = rect.width
      const clickPosition = clientX - rect.left
      
      // Calculate percentage (0 to 1)
      const percentage = Math.max(0, Math.min(1, clickPosition / sliderWidth))
      
      // Map to -90 to +90 range
      const value = (percentage * 180) - 90
      
      return Math.round(value)
    }
    return 0
  }

  const updateSliderPosition = (value: number) => {
    if (arrowRef.current) {
      // Convert value back to percentage
      const percentage = (value + 90) / 180
      // Use the full range (0-100%) to match the actual slider line
      const positionPercentage = percentage * 100
      arrowRef.current.style.left = `${positionPercentage}%`
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const value = calculateValue(e.clientX)
    setSliderValue(value)
    updateSliderPosition(value)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const value = calculateValue(e.clientX)
      setSliderValue(value)
      updateSliderPosition(value)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    const value = calculateValue(touch.clientX)
    setSliderValue(value)
    updateSliderPosition(value)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault()
      const touch = e.touches[0]
      const value = calculateValue(touch.clientX)
      setSliderValue(value)
      updateSliderPosition(value)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleDoubleClick = () => {
    setSliderValue(0)
    updateSliderPosition(0)
  }

  const handleDoubleTap = () => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300 // milliseconds
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      setSliderValue(0)
      updateSliderPosition(0)
      lastTapRef.current = 0 // Reset to prevent triple tap
    } else {
      lastTapRef.current = now
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging])

  useEffect(() => {
    // Initialize arrow position
    updateSliderPosition(0)
  }, [])

  return (
    <div className="portfolio-grid">
      <div className="slide-bar-container">
        <div 
          className="slide-bar" 
          ref={sliderRef} 
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slide-bar-labels">
            <div className="label-design">Design</div>
            <div className="label-technology">Technology</div>
          </div>
          <div className="slide-bar-line"></div>
          <div 
            className="slide-bar-position-indicator" 
            ref={arrowRef} 
            onDoubleClick={handleDoubleClick}
            onTouchEnd={handleDoubleTap}
          >
            <div className="position-line"></div>
            <div className="slide-bar-arrow">
              <div className="arrow-left">◀</div>
              <div className="arrow-right">▶</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider 