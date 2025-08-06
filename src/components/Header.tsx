import React, { useState } from 'react'

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setIsMenuOpen(false) // Close menu when a link is clicked
  }

  return (
    <>
      <div className="portfolio-grid">
        {/* Column 1 */}
        <div className="column">
          <div className="name">Rotem Shadur</div>
        </div>

        {/* Column 2 - Desktop nav */}
        <div className="column desktop-nav">
          <nav className="nav-links">
            <a 
              href="#about" 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage('about')
              }}
            >
              About
            </a>
          </nav>
        </div>

        {/* Column 3 - Desktop nav */}
        <div className="column desktop-nav">
          <nav className="nav-links">
            <a 
              href="#work" 
              className={`nav-link ${currentPage === 'work' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage('work')
              }}
            >
              Work
            </a>
          </nav>
        </div>

        {/* Column 4 */}
        <div className="column">
          <div className="contact">
            <div className="email">rotwem@gmail.com</div>
            <div className="social-icons">
              <img src="/instagrm_logo.png" alt="Instagram" className="social-icon" />
              <img src="/linkedin_logo.png" alt="LinkedIn" className="social-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu - Outside the grid */}
      <div className="mobile-menu-container">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <img 
            src={isMenuOpen ? "/hamburger_menu/exit.png" : "/hamburger_menu/menu.png"}
            alt={isMenuOpen ? "Close menu" : "Open menu"}
            className="hamburger-icon"
          />
        </button>
        
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
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
              href="#work" 
              className={`mobile-nav-link ${currentPage === 'work' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('work')
              }}
            >
              Work
            </a>
            
            <div className="mobile-contact">
              <div className="mobile-email">rotwem@gmail.com</div>
              <div className="mobile-social-icons">
                <img src="/instagrm_logo.png" alt="Instagram" className="mobile-social-icon" />
                <img src="/linkedin_logo.png" alt="LinkedIn" className="mobile-social-icon" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header 