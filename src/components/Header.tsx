import React, { useState } from 'react'

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  navbarColor?: 'black' | 'white'
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, navbarColor = 'black' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setIsMenuOpen(false) // Close menu when a link is clicked
  }

  const textColor = navbarColor === 'white' ? '#fff' : '#000'

  return (
    <header className="site-header">
      <div className="nav-bar-container" style={{ color: textColor }}>
        <div className="name" style={{ color: textColor }}>
          <span className="name-rotem" style={{ color: textColor }}>Rotem</span>
          <span className="name-shadur" style={{ color: textColor }}> Shadur</span>
        </div>
        <nav className="nav-links desktop-nav" style={{ color: textColor }}>
          <a 
            href="#about" 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            style={{ color: textColor }}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('about')
            }}
          >
            about
          </a>
          <a 
            href="#projects" 
            className={`nav-link ${currentPage === 'projects' ? 'active' : ''}`}
            style={{ color: textColor }}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('projects')
            }}
          >
            projects
          </a>
          <a 
            href="#cv" 
            className={`nav-link ${currentPage === 'cv' ? 'active' : ''}`}
            style={{ color: textColor }}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('cv')
            }}
          >
            cv
          </a>
        </nav>
      </div>

      <div className="mobile-menu-container">
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Open menu">
          <img 
            src={navbarColor === "white" ? "./new_menu/menu_w.png" : "./new_menu/menu_b.png"}
            alt="Open menu"
            className="hamburger-icon"
          />
        </button>
        
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
          <button
            className="mobile-menu-exit"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <img
              src="./new_menu/exit_b.png"
              alt=""
              className="mobile-menu-exit-icon"
            />
          </button>
          <nav className="mobile-nav">
            <a 
              href="#about" 
              className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('about')
              }}
            >
              About
            </a>
            <a 
              href="#projects" 
              className={`mobile-nav-link ${currentPage === 'projects' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('projects')
              }}
            >
              Projects
            </a>
            <a 
              href="#cv" 
              className={`mobile-nav-link ${currentPage === 'cv' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('cv')
              }}
            >
              CV
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 