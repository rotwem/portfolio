import React from 'react'

interface WorkProps {
  sliderValue: number
  calculateOpacity: (tag: string) => number
}

const Work: React.FC<WorkProps> = ({ sliderValue: _sliderValue, calculateOpacity }) => {
  // Work items data based on the files in work_covers folder
  const workItems = [
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
      {workItems.map((item) => (
        <div key={item.id} className="portfolio-grid">
          {/* Empty columns 1-2 */}
          <div className="column"></div>
          <div className="column"></div>
          
          {/* Work item spanning columns 3-4 */}
          <div className="work-item" style={{ opacity: calculateOpacity(item.tag) }}>
            <div className="work-item-content">
              
              {/* left column - Cover image/video */}
              <div className="work-item-cover">
                {item.type === "video" ? (
                  <video 
                    src={`/work_covers/${item.filename}`}
                    className="work-cover-media"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img 
                    src={`/work_covers/${item.filename}`}
                    alt={item.title}
                    className="work-cover-media"
                  />
                )}
              </div>

              {/* right column - Title */}
              <div className="work-item-title">
                <h3 className="section-title">[ {item.title} ]</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Work 