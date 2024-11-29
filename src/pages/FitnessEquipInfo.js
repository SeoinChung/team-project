import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FitnessEquipInfo.css';
import FitnessEquipGif from '../components/FitnessEquipGif';
import { equipmentDetails } from './FitnessEquipData';

function FitnessEquipInfo() {
    const [selectedEquipment, setSelectedEquipment] = useState(equipmentDetails[0]);
    const [showVideos, setShowVideos] = useState(false); // 영상 보기 상태
    const { equipmentName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const equipment = equipmentDetails.find(
            (equip) => equip.name.toLowerCase() === equipmentName
        );
        if (equipment) {
            setSelectedEquipment(equipment);
        }
    }, [equipmentName]);

    if (!selectedEquipment) {
        return <div>운동기구 정보를 불러오는 중...</div>;
    }

    const handleWatchViewToggle = () => {
        setShowVideos((prevShowVideos) => !prevShowVideos);
    };
    const goToDipping = () => {
        const dippingEquipment = equipmentDetails.find(
            (equip) => equip.name === "chinning-dipping1"
        );
        if (dippingEquipment) {
            setSelectedEquipment(dippingEquipment); // "치닝디핑(디핑)" 정보를 선택
        }
    };

    const goToChinning = () => {
        const chinngEquipment = equipmentDetails.find(
            (equip) => equip.name === "chinning-dipping2"
        );
        if (chinngEquipment) {
            setSelectedEquipment(chinngEquipment); // "치닝디핑(치닝)" 정보를 선택
        }
    };

    const goToOut = () => {
        const outthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "out-thigh"
        );
        if (outthighEquipment) {
            setSelectedEquipment(outthighEquipment); // "아웃타이" 정보를 선택
        }
    };

    const goToInner = () => {
        const innerthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "inner-thigh"
        );
        if (innerthighEquipment) {
            setSelectedEquipment(innerthighEquipment); // "이너타이" 정보를 선택
        }
    };

    const handleEquipmentSelection = (equipment) => {
        setSelectedEquipment(equipment);
        navigate(`/info/${equipment.name.toLowerCase()}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const formatTextWithBoldNumbers = (text) => {
        return text.split('\n').map((line, index) => {
            const parts = line.split('. ');
            if (parts.length > 1) {
                return (
                    <li key={index}>
                        <span className="bold-number">{parts[0]}.</span>{parts.slice(1).join('. ')}
                    </li>
                );
            } else {
                return <li key={index}>{line}</li>;
            }
        });
    };

    return (
        <div className="container">
            <h2 className="title">운동기구 상세 정보</h2>
            <div className="detail-box">
                <h3>{selectedEquipment.displayName}</h3>
                <p>{selectedEquipment.description}</p>

                {/* "운동 방법 바꾸기" 버튼: "치닝디핑(치닝)"인 경우에만 표시 */}
                {selectedEquipment.name === "chinning-dipping1" && (
                    <button
                        onClick={goToChinning}
                        className="change-exercise-button"
                    >
                        운동 방법 바꾸기
                    </button>
                )}
                {selectedEquipment.name === "chinning-dipping2" && (
                    <button
                        onClick={goToDipping}
                        className="change-exercise-button"
                    >
                        운동 방법 바꾸기
                    </button>
                )}
                {selectedEquipment.name === "inner-thigh" && (
                    <button
                        onClick={goToOut}
                        className="change-exercise-button"
                    >
                        운동 방법 바꾸기
                    </button>
                )}
                {selectedEquipment.name === "out-thigh" && (
                    <button
                        onClick={goToInner}
                        className="change-exercise-button"
                    >
                        운동 방법 바꾸기
                    </button>
                )}


                <FitnessEquipGif equipmentName={selectedEquipment.name} />

                <h4>운동 방법:</h4>
                <ul className="exercise-method-description">
                    {formatTextWithBoldNumbers(selectedEquipment.exerciseInstructions)}
                </ul>

                <h4 className="warning-title">주의 사항:</h4>
                <ul className="warning-description">
                    {formatTextWithBoldNumbers(selectedEquipment.warning)}
                </ul>

                <h4>참고 영상:</h4>
                <button
                    onClick={handleWatchViewToggle}
                    className={`watch-view-button ${showVideos ? 'video-hide' : 'video-show'}`}
                >
                    {showVideos ? '영상 숨기기' : '영상 보기'}
                </button>

                {showVideos && (
                    <div className="video-thumbnails">
                        {(selectedEquipment.videos || []).map((video, index) => (
                            <a
                                key={index}
                                href={video.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-link"
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="video-thumbnail"
                                />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <h4>다른 운동기구 선택하기:</h4>
            <div className="button-group">
                {equipmentDetails.map((equip, index) => (
                    <button
                        key={index}
                        onClick={() => handleEquipmentSelection(equip)}
                        className={`nav-button ${selectedEquipment.name === equip.name ? 'active' : ''}`}
                    >
                        <img
                            src={equip.images}
                            alt={equip.name}
                            className="equipment-image-button"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <p>{equip.displayName}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FitnessEquipInfo;
