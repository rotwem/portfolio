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

// Media files: Evolution first, then rest in original order (videos: .webm + MP4 fallback; images: .webp)
const MEDIA_FILES = [
  'F09.webm',   // 1 – Evolution
  'F10.webp',
  'F11.webp',
  'F12.webp',
  'F13.webp',
  'F01.webm',   // 6 – The Cognitive Archive
  'F02.webm',
  'F03.webm',
  'F04.webm',
  'F05.webm',   // 10 – Present Progressive
  'F06.webm',
  'F07.webm',
  'F08.webp',
  'F14.webm',   // 14 – Corno
  'F15.webm',
  'F16.webm',
  'F17.webm',   // 17 – Spectrums
  'F18.webm',
  'F19.webp',
  'F20.webm',
  'F21.webp',
]

// Project information for each media file (default values - can be updated later)
const PROJECT_INFO: Record<string, ProjectInfo> = {
  'F01.webm': {
    projectNumber: 6,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'A speculative conversational AI app design for the Israeli antiquities authority.',
    textColor: 'white'
  },
  'F02.webm': {
    projectNumber: 7,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'What if there was a lab for preserving and reconstructing human consciousness as an archeological artifact?',
    textColor: 'white'
  },
  'F03.webm': {
    projectNumber: 8,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'You could chat with Dana International every day to get a boost of confidence and self-esteem.',
    textColor: 'white'
  },
  'F04.webm': {
    projectNumber: 9,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"The Cognitive Archive", App Design, 2025',
    description: 'Or talk to many siginificant figures from history to get their perspective on the present.',
    textColor: 'white'
  },
  'F05.webm': {
    projectNumber: 10,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'A gaze-controlled interactive experiment exploring how observation constructs reality. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F06.webm': {
    projectNumber: 11,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'An aesthetic-emotional-technological experiment. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'black'
  },
  'F07.webm': {
    projectNumber: 12,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'A dual internal dialogue - "I want and I’m trying" / "why am I trying so hard?" You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F08.webp': {
    projectNumber: 13,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Present Progressive", Interactive Experience, 2025',
    description: 'It looks like a game, but it is not a game. You can try it <a href="https://rotwem.github.io/presentprogressive/" target="_blank">here</a>.',
    textColor: 'white'
  },
  'F09.webm': {
    projectNumber: 1,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'A comparative look at biological evolution and genetic algorithms.',
    textColor: 'black'
  },
  'M09.webm': {
    projectNumber: 1,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'A comparative look at biological evolution and genetic algorithms.',
    textColor: 'black'
  },
  'F10.webp': {
    projectNumber: 2,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'Variation, repetition, selection, and optimization can produce complex forms over time, both in nature and in artificial systems.',
    textColor: 'white'
  },
  'F11.webp': {
    projectNumber: 3,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'The project highlights parallels between biological adaptation and computational decision-making.',
    textColor: 'white'
  },
  'F12.webp': {
    projectNumber: 4,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'A genetic algorithm learning to write the hebrew alphabet.',
    textColor: 'white'
  },
  'F13.webp': {
    projectNumber: 5,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Evolution", Booklet, 2023',
    description: 'Ultimately, it questions what is gained and what is lost when evolution is accelerated, automated, and abstracted into code.',
    textColor: 'white'
  },
  'F14.webm': {
    projectNumber: 14,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'A mobile app designed to support recovery from porn addiction.',
    textColor: 'white'
  },
  'F15.webm': {
    projectNumber: 15,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'Designed as a private, stigma-free space for the people of the internet.',
    textColor: 'white'
  },
  'F16.webm': {
    projectNumber: 16,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Corno", App Design, 2024',
    description: 'The app guides users from the initial decision to quit, through daily progress tracking, motivation and community support.',
    textColor: 'white'
  },
  'F17.webm': {
    projectNumber: 17,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'A data-driven, interactive exploration of identity, belief, and empathy in Jerusalem.',
    textColor: 'black'
  },
  'F18.webm': {
    projectNumber: 18,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'Participants placed themselves along faith, conservatism and love spectrums and added free-text reflections.',
    textColor: 'black'
  },
  'F19.webp': {  
    projectNumber: 19,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'The data was analyzed and mapped into a multidimensional visual space.',
    textColor: 'black'
  },
  'F20.webm': {
    projectNumber: 20,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'The result was a poetic, non-binary visualization that emphasized the space between extremes.',
    textColor: 'black'
  },
  'F21.webp': {
    projectNumber: 21,
    totalProjects: NUMBER_OF_PROJECTS,
    name: '"Spectrums", Web Design, 2024',
    description: 'Challenging rigid labels and revealing Jerusalem as a complex landscape rather than a polarized one.',
    textColor: 'black'
  },
}

const MOBILE_BREAKPOINT_PX = 768

const Projects: React.FC<ProjectsProps> = ({ onTextColorChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT_PX
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Track mobile viewport for Evolution media swap (F09 → M09) and hide custom cursor on mobile
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`)
    const update = () => {
      const mobile = mq.matches
      setIsMobile(mobile)
      if (mobile) setShowCursor(false)
    }
    mq.addEventListener('change', update)
    update()
    return () => mq.removeEventListener('change', update)
  }, [])

  // Resolved media file: on mobile, show M09.webm instead of F09.webm for Evolution (index 0)
  const currentMedia = MEDIA_FILES[currentIndex]
  const displayMedia =
    isMobile && currentMedia === 'F09.webm' ? 'M09.webm' : currentMedia

  // Handle mouse movement for custom cursor (desktop only; on mobile, cursor stays hidden)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      setShowCursor(false)
      return
    }
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

  // Reset video when index or display media (mobile F09↔M09) changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [currentIndex, displayMedia])

  // Update navbar color when project changes
  useEffect(() => {
    const projectInfo = PROJECT_INFO[displayMedia]
    if (projectInfo && onTextColorChange) {
      onTextColorChange(projectInfo.textColor)
    }
  }, [currentIndex, displayMedia, onTextColorChange])

  // Set initial navbar color on mount and when display media changes
  useEffect(() => {
    if (onTextColorChange) {
      const projectInfo = PROJECT_INFO[displayMedia]
      if (projectInfo) {
        onTextColorChange(projectInfo.textColor)
      }
    }
  }, [onTextColorChange, displayMedia])

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

  const isVideo = displayMedia.endsWith('.webm') || displayMedia.endsWith('.mp4') || displayMedia.endsWith('.mov')
  const projectInfo = PROJECT_INFO[displayMedia] || {
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
          autoPlay
          muted
          loop
          playsInline
          className="projects-media"
          src={`./projects_media/${displayMedia}`}
        />
      ) : (
        <img
          src={`./projects_media/${displayMedia}`}
          alt={`Project media ${currentIndex + 1}`}
          className="projects-media"
          decoding="async"
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
            src="./single_arrow.webp" 
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
