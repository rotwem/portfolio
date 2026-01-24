import React, { useState, useEffect, useRef } from 'react'

interface ProjectsProps {
  sliderValue: number
  calculateOpacity: (tag: string) => number
  onTextColorChange?: (color: 'black' | 'white') => void
}

// Project information interface
interface ProjectInfo {
  projectNumber: number
  totalProjects: number
  name: string
  description: string
  textColor: 'black' | 'white'
}
const NUMBER_OF_PROJECTS = 21;

// Media files sorted by filename
const MEDIA_FILES = [
  'F01.mp4',
  'F02.mp4',
  'F03.mp4',
  'F04.mp4',
  'F05.mp4',
  'F06.mp4',
  'F07.mp4',
  'F08.png',
  'F09.mp4',
  'F10.png',
  'F11.png',
  'F12.png',
  'F13.png',
  'F14.mp4',
  'F15.mp4',
  'F16.mp4',
  'F17.mp4',
  'F18.mp4',
  'F19.png',
  'F20.mp4',
  'F21.png',

]

// Project information for each media file (default values - can be updated later)
const PROJECT_INFO: Record<string, ProjectInfo> = {
  'F01.mp4': {
    projectNumber: 1,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'A speculative conversational AI app design for the Israeli antiquities authority.',
    textColor: 'white'
  },
  'F02.mp4': {
    projectNumber: 2,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'What if there was a lab for preserving and reconstructing human consciousness as an archeological artifact?',
    textColor: 'white'
  },
  'F03.mp4': {
    projectNumber: 3,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'You could chat with Dana International every day to get a boost of confidence and self-esteem.',
    textColor: 'white'
  },
  'F04.mp4': {
    projectNumber: 4,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'Or talk to many siginificant figures from history to get their perspective on the present.',
    textColor: 'white'
  },
  'F05.mp4': {
    projectNumber: 5,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'A gaze-controlled interactive experiment exploring how observation constructs reality. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F06.mp4': {
    projectNumber: 6,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'An aesthetic-emotional-technological experiment. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'black'
  },
  'F07.mp4': {
    projectNumber: 7,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'A dual internal dialogue - "I want and I’m trying" / "why am I trying so hard?" You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F08.png': {
    projectNumber: 8,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'It looks like a game, but it is not a game. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F09.mp4': {
    projectNumber: 9,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'A comparative look at biological evolution and genetic algorithms.',
    textColor: 'black'
  },  
  'F10.png': {
    projectNumber: 10,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'Variation, repetition, selection, and optimization can produce complex forms over time, both in nature and in artificial systems.',
    textColor: 'white'
  },
  'F11.png': {
    projectNumber: 11,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'The project highlights parallels between biological adaptation and computational decision-making.',
    textColor: 'white'
  },
  'F12.png': {
    projectNumber: 12,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'A genetic algorithm learning to write the hebrew alphabet.',
    textColor: 'white'
  },
  'F13.png': {
    projectNumber: 13,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'Ultimately, it questions what is gained and what is lost when evolution is accelerated, automated, and abstracted into code.',
    textColor: 'white'
  },
  'F14.mp4': {
    projectNumber: 14,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'A mobile app designed to support recovery from porn addiction.',
    textColor: 'white'
  },
  'F15.mp4': {
    projectNumber: 15,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'Designed as a private, stigma-free space for the people of the internet.',
    textColor: 'white'
  },
  'F16.mp4': {
    projectNumber: 16,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'The app guides users from the initial decision to quit, through daily progress tracking, motivation and community support.',
    textColor: 'white'
  },
  'F17.mp4': {
    projectNumber: 17,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'A data-driven, interactive exploration of identity, belief, and empathy in Jerusalem.',
    textColor: 'black'
  },
  'F18.mp4': {
    projectNumber: 18,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'Participants placed themselves along faith, conservatism and love spectrums and added free-text reflections.',
    textColor: 'black'
  },
  'F19.png': {  
    projectNumber: 19,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'The data was analyzed and mapped into a multidimensional visual space.',
    textColor: 'black'
  },
  'F20.mp4': {
    projectNumber: 20,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'The result was a poetic, non-binary visualization that emphasized the space between extremes.',
    textColor: 'black'
  },
  'F21.png': {
    projectNumber: 21,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'Challenging rigid labels and revealing Jerusalem as a complex landscape rather than a polarized one.',
    textColor: 'black'
  },
}

const Projects: React.FC<ProjectsProps> = ({ onTextColorChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle mouse movement for custom cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if mouse is on navbar - hide cursor if so
    const target = e.target as HTMLElement
    const navBar = document.querySelector('.nav-bar-container')
    const mobileMenu = document.querySelector('.mobile-menu-container')
    
    if (navBar?.contains(target) || mobileMenu?.contains(target)) {
      setShowCursor(false)
      return
    }

    // Check if hovering over a link - show default cursor
    const link = (target as HTMLElement).closest('a')
    if (link) {
      setShowCursor(false)
      return
    }

    setMousePosition({ x: e.clientX, y: e.clientY })
    setShowCursor(true)
  }

  const handleMouseLeave = () => {
    setShowCursor(false)
  }

  // Handle click navigation
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    
    // Check if click is on navbar - ignore if so
    const navBar = document.querySelector('.nav-bar-container')
    const mobileMenu = document.querySelector('.mobile-menu-container')
    
    if (navBar?.contains(target) || mobileMenu?.contains(target)) {
      return
    }

    // Check if click is on a link - let it work normally
    const link = target.closest('a')
    if (link) {
      return
    }

    // Determine if click is on left or right half of viewport
    const clickX = e.clientX
    const viewportWidth = window.innerWidth
    const isRightHalf = clickX > viewportWidth / 2

    if (isRightHalf) {
      // Next media
      setCurrentIndex((prev) => (prev + 1) % MEDIA_FILES.length)
    } else {
      // Previous media
      setCurrentIndex((prev) => (prev - 1 + MEDIA_FILES.length) % MEDIA_FILES.length)
    }
  }

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [currentIndex])

  // Update navbar color when project changes
  useEffect(() => {
    const currentMedia = MEDIA_FILES[currentIndex]
    const projectInfo = PROJECT_INFO[currentMedia]
    if (projectInfo && onTextColorChange) {
      onTextColorChange(projectInfo.textColor)
    }
  }, [currentIndex, onTextColorChange])

  // Set initial navbar color on mount
  useEffect(() => {
    if (onTextColorChange) {
      const currentMedia = MEDIA_FILES[currentIndex]
      const projectInfo = PROJECT_INFO[currentMedia]
      if (projectInfo) {
        onTextColorChange(projectInfo.textColor)
      }
    }
  }, [onTextColorChange])

  // Hide default cursor globally when projects page is active
  useEffect(() => {
    // Add class to body for global cursor hiding via CSS
    document.body.classList.add('projects-cursor-hidden')
    document.documentElement.classList.add('projects-cursor-hidden')
    
    return () => {
      document.body.classList.remove('projects-cursor-hidden')
      document.documentElement.classList.remove('projects-cursor-hidden')
    }
  }, [])

  const currentMedia = MEDIA_FILES[currentIndex]
  const isVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.mov')
  const projectInfo = PROJECT_INFO[currentMedia] || {
    projectNumber: currentIndex + 1,
    totalProjects: MEDIA_FILES.length,
    name: 'Project Name, Type, Year',
    description: 'Project description goes here.',
    textColor: 'black' as const
  }
  
  // Determine which side of screen mouse is on
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0
  const isRightHalf = mousePosition.x > viewportWidth / 2

  return (
    <div 
      className="projects-page" 
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={`./projects_media/${currentMedia}`}
          autoPlay
          muted
          loop
          playsInline
          className="projects-media"
        />
      ) : (
        <img
          src={`./projects_media/${currentMedia}`}
          alt={`Project media ${currentIndex + 1}`}
          className="projects-media"
        />
      )}
      
      {/* Custom cursor arrow */}
      {showCursor && (
        <div
          className={`projects-cursor ${isRightHalf ? 'cursor-right' : 'cursor-left'}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        >
          <img 
            src="./single_arrow.png" 
            alt="Navigation arrow" 
            className="cursor-arrow"
          />
        </div>
      )}

      {/* Project info overlay */}
      <div 
        className="projects-overlay"
        style={{ color: projectInfo.textColor }}
      >
        <div className="project-number">
          ( {projectInfo.projectNumber} / {projectInfo.totalProjects} )
        </div>
        <div className="project-name">
          {projectInfo.name}
        </div>
        <div 
          className="project-description"
          dangerouslySetInnerHTML={{ __html: projectInfo.description }}
        />
      </div>
    </div>
  )
}

export default Projects
