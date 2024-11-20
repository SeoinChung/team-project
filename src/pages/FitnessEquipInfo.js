import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate 추가
import './FitnessEquipInfo.css';
import FitnessEquipGif from '../components/FitnessEquipGif';
import { equipmentDetails } from './FitnessEquipData';

function FitnessEquipInfo() {
    const [selectedEquipment, setSelectedEquipment] = useState(equipmentDetails[0]);

    const [showVideos, setShowVideos] = useState(false); // 영상 표시 여부를 관리하는 상태

    const { equipmentName } = useParams(); // URL에서 equipmentName을 추출

    const navigate = useNavigate();  // useNavigate 훅 사용

    // 컴포넌트가 마운트될 때마다 또는 equipmentName이 변경될 때마다 해당 운동기구 정보 업데이트
    useEffect(() => {
        const equipment = equipmentDetails.find(
            (equip) => equip.name.toLowerCase() === equipmentName
        );
        if (equipment) {
            setSelectedEquipment(equipment);
        }
    }, [equipmentName]); // equipmentName이 변경될 때마다 실행

    // 만약 운동기구 정보가 없으면 로딩 상태나 오류 메시지를 표시
    if (!selectedEquipment) {
        return <div>운동기구 정보를 불러오는 중...</div>;
    }

    const handleWatchViewToggle = () => {
        setShowVideos((prevShowVideos) => !prevShowVideos); // 상태를 반전시킴
    };

    const goToChinning = () => {
        const chinngEquipment = equipmentDetails.find(
            (equip) => equip.name === "chinning-dipping1"
        );
        if (chinngEquipment) {
            setSelectedEquipment(chinngEquipment);
            navigate(`/info/${chinngEquipment.name.toLowerCase()}`);  // URL 변경
        }
    };

    const goToDipping = () => {
        const dippingEquipment = equipmentDetails.find(
            (equip) => equip.name === "chinning-dipping2"
        );
        if (dippingEquipment) {
            setSelectedEquipment(dippingEquipment);
            navigate(`/info/${dippingEquipment.name.toLowerCase()}`);  // URL 변경
        }
    };
    const goToOut = () => {
        const outthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "out-thigh"
        );
        if (outthighEquipment) {
            setSelectedEquipment(outthighEquipment);
            navigate(`/info/${outthighEquipment.name.toLowerCase()}`);  // URL 변경
        }
    };

    const goToInner = () => {
        const innerthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "inner-thigh"
        );
        if (innerthighEquipment) {
            setSelectedEquipment(innerthighEquipment);
            navigate(`/info/${innerthighEquipment.name.toLowerCase()}`);  // URL 변경
        }
    };

    return (
        <div className="container">
            <h2 className="title">운동기구 상세 정보</h2>
            <div className="detail-box"
                style={{
                    border: '1px solid #84c1de',  
                    borderRadius: '10px',
                    padding: '20px',
                    width: '600px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                <h3>{selectedEquipment.name}</h3>

                {selectedEquipment.name === "chinning-dipping1" && (
                    <button className="action-button" onClick={goToDipping}>
                        치닝디핑(디핑) 운동법
                    </button>
                )}

                {selectedEquipment.name === "chinning-dipping2" && (
                    <button className="action-button" onClick={goToChinning}>
                        치닝디핑(치닝) 운동법
                    </button>
                )}

                {selectedEquipment.name === "inner-thigh" && (
                    <button className="action-button" onClick={goToOut}>
                        아웃타이 운동법
                    </button>
                )}

                {selectedEquipment.name === "out-thigh" && (
                    <button className="action-button" onClick={goToInner}>
                        이너타이 바꾸기
                    </button>
                )}

                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.description}</p>
                <FitnessEquipGif equipmentName={selectedEquipment.name} />

                <h4>운동 방법:</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.exerciseInstructions}</p>

                <h4 style={{ color: "#FF5A5A" }}>주의 사항:</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.warning}</p>

                <h4>참고 영상:</h4>
                <button
                onClick={handleWatchViewToggle}
                className="watch-view-button"
                style={{
                    backgroundColor: '',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    marginBottom: '10px'
                }}
                >
                {showVideos ? "영상 숨기기" : "영상 보기"}
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
                                style={{
                                    width: '128px',
                                    height: 'auto',
                                    margin: '5px',
                                    borderRadius: '8px'
                                }}
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
                        onClick={() => {
                            setSelectedEquipment(equip);
                            navigate(`/info/${equip.name.toLowerCase()}`);  // URL 변경
                            window.scrollTo({ // 화면을 맨 위로 스크롤
                                top: 0,
                                behavior: "smooth" // 부드러운 스크롤
                              });
                        }}
                        className={`nav-button ${selectedEquipment.name === equip.name ? 'active' : ''}`}
                    >
                        <img 
                            src={equip.images} 
                            alt={equip.name}
                            className="equipment-image-button"
                            style={{ width: '100px', height: '100px' }} 
                        />
                        <p>{equip.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FitnessEquipInfo;