import React, { useEffect, useState } from 'react';
import './FitnessEquipGif.css';

function FitnessEquipGif({ equipmentName }) {
    const videoSrc = {
        "back-extension": "/images/back-extension.mp4",
        "cable-arm-pulldown": "/images/cable-arm-pulldown.mp4",
        "chest-press": "/images/chest-press.mp4",
        "chinning-dipping1": "/images/chinning-dipping1.mp4",
        "chinning-dipping2": "/images/chinning_dipping2.mp4",
        "lat-pull-down": "/images/lat-pull-down.mp4",
        "leg-press": "/images/leg-press.mp4",
        "reverse-hyper-extension": "/images/reverse-hyper-extension.mp4",
        "stepper": "/images/stepper.mp4",
        "treadmill": "/images/treadmill.mp4",
        "elliptical-machine": "/images/elliptical_machine.mp4",
        "cycle": "/images/cycle.mp4",
        "inner-thigh": "/images/inner_thigh.mp4",
        "out-thigh": "/images/out_thigh.mp4",
        "leg-extension": "/images/leg_extension.mp4"
    };

    const selectedVideo = videoSrc[equipmentName];
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        setIsVideoLoaded(false);

        if (selectedVideo) {
            const video = document.createElement('video');
            video.src = selectedVideo;
            video.onloadeddata = () => setIsVideoLoaded(true);
        }
    }, [selectedVideo]);

    return (
        <div>
            {isVideoLoaded && Array.isArray(selectedVideo) ? (
                <div className="video-container">
                    {selectedVideo.map((src, index) => (
                        <video key={`${equipmentName}-${index}`} loop muted autoPlay>
                            <source src={src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>
            ) : isVideoLoaded ? (
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
