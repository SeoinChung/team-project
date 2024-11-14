// src/components/FitnessEquipGif.js
import React, { useEffect, useState } from 'react';

function FitnessEquipGif({ equipmentName }) {
  const videoSrc = {
    "백 익스텐션": "/images/back-extension.mp4",
    "케이블 스트레이트 암 풀 다운": "/images/cable-arm-pulldown.mp4",
    "체스트 프레스": "/images/chest-press.mp4",
    "치닝디핑 (치닝)": "/images/chinning-dipping1.mp4",
    "치닝디핑 (디핑)": "/images/chinning-dipping2.mp4",
    "랫 풀 다운": "/images/lat-pull-down.mp4",
    "시티드 레그 프레스": "/images/leg-press.mp4",
    "리버스 하이퍼(백) 익스텐션": "/images/reverse-hyper-extension.mp4",
    "스텝퍼": "/images/stepper.mp4",
    "런닝머신": "/images/treadmill.mp4"
  };

  const selectedVideo = videoSrc[equipmentName];
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsVideoLoaded(false);
    const video = document.createElement('video');
    video.src = selectedVideo;
    video.onloadeddata = () => setIsVideoLoaded(true);
  }, [equipmentName]);

  return (
    <div>
      {isVideoLoaded ? (
        <video key={equipmentName} width="100%" autoPlay loop muted>
          <source src={selectedVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default FitnessEquipGif;
