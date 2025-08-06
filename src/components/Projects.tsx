import React from 'react'

interface ProjectsProps {
  sliderValue: number
  calculateOpacity: (tag: string) => number
}

const Projects: React.FC<ProjectsProps> = ({ sliderValue: _sliderValue, calculateOpacity }) => {
  // Projects items data based on the files in work_covers folder
  const projectsItems = [
    {
      id: 1,
      title: "Present Progressive",
      filename: "01_present_progressive.mp4",
      type: "video",
      tag: "NEUTRAL"
    },
    {
      id: 2,
      title: "The Cognitive Archive",
      filename: "02_cognitive_archive.mp4",
      type: "video",
      tag: "DES"
    },
    {
      id: 3,
      title: "Spectrums",
      filename: "03_spectrums.mp4",
      type: "video",
      tag: "NEUTRAL"
    },
    {
      id: 4,
      title: "Corno",
      filename: "04_corno.mp4",
      type: "video",
      tag: "DES"
    },
    {
      id: 5,
      title: "Evolution",
      filename: "05_evolution.mp4",
      type: "video",
      tag: "NEUTRAL"
    },
    {
      id: 6,
      title: "Jiao",
      filename: "06_jiao.png",
      type: "image",
      tag: "DES"
    },
    {
      id: 7,
      title: "Chime",
      filename: "07_chime.png",
      type: "image",
      tag: "TECH"
    }
  ]

  return (
    <>
      {projectsItems.map((item) => (
        <div key={item.id} className="portfolio-grid">
          {/* Empty column 1 */}
          <div className="column"></div>
          
          {/* Title in column 2 */}
          <div className="work-item-title" style={{ opacity: calculateOpacity(item.tag) }}>
            <h3 className="section-title">[ {item.title} ]</h3>
          </div>
          
          {/* Cover image/video in column 3 */}
          <div className="work-item-cover" style={{ opacity: calculateOpacity(item.tag) }}>
            {item.type === "video" ? (
              <video 
                src={`./work_covers/${item.filename}`}
                className="work-cover-media"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img 
                src={`./work_covers/${item.filename}`}
                alt={item.title}
                className="work-cover-media"
              />
            )}
          </div>
          
          {/* Empty column 4 */}
          <div className="column"></div>
        </div>
      ))}
    </>
  )
}

export default Projects 