import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Slider from './components/Slider'

function App() {
  const [sliderValue, setSliderValue] = useState(-75)
  const [isDragging, setIsDragging] = useState(false)
  const [currentPage, setCurrentPage] = useState('about')

  const calculateOpacity = (tag: string) => {
    if (sliderValue > 0 && tag === "DES") {
      return Math.max(0.05, 1 - (sliderValue / 90))
    } else if (sliderValue < 0 && tag === "TECH") {
      return Math.max(0.05, 1 + (sliderValue / 90))
    } else {
      return 1
    }
  }

  return (
    <div className="portfolio">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="scrollable-content">
        {currentPage === 'about' ? (
          <About sliderValue={sliderValue} calculateOpacity={calculateOpacity} />
        ) : (
          <Projects sliderValue={sliderValue} calculateOpacity={calculateOpacity} />
        )}
      </div>

      <Slider 
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
    </div>
  )
}

export default App
