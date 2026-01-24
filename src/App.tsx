import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import CV from './components/CV'
import Projects from './components/Projects'
import Slider from './components/Slider'

function App() {
  const [sliderValue, setSliderValue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [currentPage, setCurrentPage] = useState('about')
  const [navbarColor, setNavbarColor] = useState<'black' | 'white'>('black')

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
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        navbarColor={currentPage === 'projects' ? navbarColor : 'black'}
      />

      <div className={`scrollable-content ${currentPage === 'projects' ? 'projects-active' : ''}`}>
        {currentPage === 'about' ? (
          <About sliderValue={sliderValue} />
        ) : currentPage === 'cv' ? (
          <CV sliderValue={sliderValue} calculateOpacity={calculateOpacity} />
        ) : (
          <Projects 
            sliderValue={sliderValue} 
            calculateOpacity={calculateOpacity}
            onTextColorChange={setNavbarColor}
          />
        )}
      </div>

      {currentPage !== 'projects' && (
        <Slider 
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      )}
    </div>
  )
}

export default App
