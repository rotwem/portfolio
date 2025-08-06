import React from 'react'

interface AboutProps {
  sliderValue: number
  calculateOpacity: (tag: string) => number
}

const About: React.FC<AboutProps> = ({ sliderValue, calculateOpacity }) => {
  const about_text = ["Creative technologist with a unique dual background in computer science and design. Experienced in",
    "data science, analytics, and intelligence research",
    ", as well as",
    "product design, UX/UI, and user-centered thinking",
    ". Skilled in applying generative AI tools to",
    " explore image making, ",
    "support research and enhance product ",
    "development and ",
    "interactive experiences.",
    " Strong",
    " analytical",
    " and", 
    " prototyping",
    " skills",
    " with a collaborative mindset for solving complex problems through",
    " both",
    " technical",
    " and" ,
    " human-centered",
    " perspectives."]

  // Create tag_dict mapping each tag to list of indices
  const about_tag_dict: { [key: string]: number[] } = {
    "TECH": [1, 7, 10, 16],
    "DES": [3, 5, 12, 18, 19],
    "NEUTRAL": [0, 4, 6, 8, 9, 13, 14, 19],
    "BOTH": [2, 11, 15, 17]
  }

  const calculateAboutOpacity = (index: number) => {
    // Find which tag this index belongs to
    let tag = "NEUTRAL"
    for (const [tagName, indices] of Object.entries(about_tag_dict)) {
      if (indices.includes(index)) {
        tag = tagName
        break
      }
    }
    
    // Apply opacity logic
    if (sliderValue > 0 && (tag === "DES" || tag === "BOTH")) {
      return Math.max(0.05, 1 - (sliderValue / 90))
    } else if (sliderValue < 0 && (tag === "TECH" || tag === "BOTH")) {
      return Math.max(0.05, 1 + (sliderValue / 90))
    } else {
      return 1
    }
  }

  return (
    <>
      <div className="portfolio-grid">
        {/* About section spanning columns 2-4 */}
        <div className="about-section">
          <div className="about-content">
            {about_text.map((sentence, index) => (
              <span key={index} style={{ opacity: calculateAboutOpacity(index) }}>
                {sentence}
                {index < about_text.length - 1 && " "}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="portfolio-grid">
        {/* Column 1 */}
        <div className="column">
        </div>

        {/* Column 2 */}
        <div className="column">
          <div className="section">
            <h3 className="section-title">[ Education ]</h3>
            <div className="section-item" style={{ opacity: calculateOpacity("NEUTRAL") }}>
              <div className="main-text">The Joint Program for</div>
              <div className="main-text">Design and Technology</div>
              <div className="year-text">2020–2025</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("DES") }}>
              <div className="secondary-text">Bezalel Academy of</div>
              <div className="secondary-text">Art and Design</div>
              <div className="main-text">Bachelor's degree</div>
              <div className="main-text">Design and Visual Communication</div>
              <div className="year-text">2023–2025</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
              <div className="secondary-text">The Hebrew University</div>
              <div className="secondary-text">of Jerusalem</div>
              <div className="main-text">Bachelor of science</div>
              <div className="main-text">Computer Science</div>
              <div className="year-text">2020–2023</div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="column">
          <div className="section">
            <h3 className="section-title">[ Experience ]</h3>
            <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
              <div className="secondary-text">Nice Actimize</div>
              <div className="main-text">Student Data Scientist</div>
              <div className="year-text">2023–current</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("NEUTRAL") }}>
              <div className="secondary-text">Consulting Company</div>
              <div className="main-text">Data analyst and</div>
              <div className="main-text">WEBINT researcher</div>
              <div className="year-text">2019–2020</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("NEUTRAL") }}>
              <div className="secondary-text">IDF 8200 unit</div>
              <div className="main-text">Intelligence Analyst</div>
              <div className="year-text">2015-2018</div>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div className="column">
          <div className="section">
            <h3 className="section-title">[ Skills ]</h3>
            <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
              <div className="main-text">AI & Data science</div>
              <div className="secondary-text">Machine Learning, Data Analysis, Data Mining, Report Writing</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("DES") }}>
              <div className="main-text">Design & Interaction</div>
              <div className="secondary-text">Design Thinking, UX/UI Design, Interaction Mapping, User Research, Copywriting, Wireframing, Prototyping</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
              <div className="main-text">Programming & Dev</div>
              <div className="secondary-text">Python, Java, C, C++, TypeScript, JavaScript, React.js, HTML, CSS</div>
            </div>
            <div className="section-item" style={{ opacity: calculateOpacity("NEUTRAL") }}>
              <div className="main-text">Tools & Software</div>
              <div className="secondary-text">Figma, Adobe Creative Suite, TouchDesigner, LLMs, Kling, Runway, ElevenLabs, etc.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About 