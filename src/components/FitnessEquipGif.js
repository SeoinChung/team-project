import React, { useEffect } from 'react';

function FitnessEquipGif({ equipmentName }) {
  const videoSrc = {
    "백 익스텐션": "/images/back-extension.mp4",
    "케이블 암 풀 다운": "/images/cable-arm-pulldown.mp4",
    "체스트프레스": "/images/chest-press.mp4",
    "치닝디핑": ["/images/chinning-dipping(1).mp4", "/images/chinning-dipping(2).mp4"],
    "랫풀다운": "/images/lat-pull-down.mp4",
    "레그프레스": "/images/leg-press.mp4",
    "리버스 백 익스텐션": "/images/reverse-back-extension.mp4",
    "스텝퍼": "/images/stepper.mp4",
    "런닝머신": "/images/treadmill.mp4"
  };

  const selectedVideo = videoSrc[equipmentName];

  useEffect(() => {}, [equipmentName]);

  return (
    <div>
      {Array.isArray(selectedVideo) ? (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {selectedVideo.map((src, index) => (
            <video
              key={`${equipmentName}-${index}`}
              width={equipmentName === "치닝디핑" && index === 1 ? "100%" : "92%"} // 치닝디핑 영상 2개 사이즈 조정
              loop
              muted
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      ) : (
        <video key={equipmentName} width="100%" autoPlay loop muted>
          <source src={selectedVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default FitnessEquipGif;
