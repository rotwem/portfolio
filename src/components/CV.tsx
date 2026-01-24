import React from 'react'

interface CVProps {
  sliderValue: number
  calculateOpacity: (tag: string) => number
}

const CV: React.FC<CVProps> = ({ calculateOpacity }) => {
  return (
    <div className="cv-section">
      <div className="section">
        <h3 className="section-title">Education</h3>
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

      <div className="section">
        <h3 className="section-title">Experience</h3>
        <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
          <div className="secondary-text">Honeycomb Insurance</div>
          <div className="main-text">Data Researcher</div>
          <div className="year-text">2025–current</div>
        </div>
        <div className="section-item" style={{ opacity: calculateOpacity("TECH") }}>
          <div className="secondary-text">Nice Actimize</div>
          <div className="main-text">Student Data Scientist</div>
          <div className="year-text">2023–2025</div>
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

      <div className="section">
        <h3 className="section-title">Skills</h3>
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
  )
}

export default CV
