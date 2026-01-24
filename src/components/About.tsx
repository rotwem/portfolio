import React from 'react'

interface AboutProps {
  sliderValue: number
}

const About: React.FC<AboutProps> = ({ sliderValue }) => {
  const about_text = ["A creative technologist with a unique dual background in computer science and design. Experienced in",
    "research, data science and analytics",
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
    "DES": [3, 5, 12, 18],
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

  const getAboutTextStyle = (index: number) => {
    // Find which tag this index belongs to
    let tag = "NEUTRAL"
    for (const [tagName, indices] of Object.entries(about_tag_dict)) {
      if (indices.includes(index)) {
        tag = tagName
        break
      }
    }
    
    // Apply typography style based on tag
    if (tag === "DES") {
      return "about-text-style-3"
    } else if (tag === "TECH") {
      return "about-text-style-2"
    } else {
      // BOTH and NEUTRAL
      return "about-text-style-1"
    }
  }

  return (
    <div className="about-section">
      <div className="about-content">
        {about_text.map((sentence, index) => {
          const nextSentence = index < about_text.length - 1 ? about_text[index + 1] : null
          const shouldAddSpace = nextSentence && !nextSentence.trim().match(/^[.,;:!?]/)
          
          return (
            <span 
              key={index} 
              className={getAboutTextStyle(index)}
              style={{ opacity: calculateAboutOpacity(index) }}
            >
              {sentence}
              {shouldAddSpace && " "}
            </span>
          )
        })}
      </div>
      <div className="contact">
        <div className="email">rotwem@gmail.com</div>
        <div className="social-icons">
          <a href="https://www.instagram.com/rotwem/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/rotem-shadur-6b0628175/" target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
        </div>
      </div>
    </div>
  )
}

export default About 