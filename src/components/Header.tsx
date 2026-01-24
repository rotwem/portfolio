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
    <>
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

      {/* Mobile Hamburger Menu - Outside the grid */}
      <div className="mobile-menu-container">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <img 
            src={isMenuOpen ? "./hamburger_menu/exit.png" : "./hamburger_menu/menu.png"}
            alt={isMenuOpen ? "Close menu" : "Open menu"}
            className="hamburger-icon"
          />
        </button>
        
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <a 
              href="#about" 
              className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
              style={{ color: textColor }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('about')
              }}
            >
              About
            </a>
            <a 
              href="#cv" 
              className={`mobile-nav-link ${currentPage === 'cv' ? 'active' : ''}`}
              style={{ color: textColor }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('cv')
              }}
            >
              CV
            </a>
            <a 
              href="#projects" 
              className={`mobile-nav-link ${currentPage === 'projects' ? 'active' : ''}`}
              style={{ color: textColor }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('projects')
              }}
            >
              Projects
            </a>
            
            <div className="mobile-contact">
              <div className="mobile-email" style={{ color: textColor }}>rotwem@gmail.com</div>
              <div className="mobile-social-icons">
                <a href="https://www.instagram.com/rotwem/" target="_blank" rel="noopener noreferrer">
                  <img src="./instagrm_logo.png" alt="Instagram" className="mobile-social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/rotem-shadur-6b0628175/" target="_blank" rel="noopener noreferrer">
                  <img src="./linkedin_logo.png" alt="LinkedIn" className="mobile-social-icon" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header 