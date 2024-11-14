import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipmentDetails } from './FitnessEquipInfo';
import './FitnessEquipDetail.css';
import FitnessEquipGif from '../components/FitnessEquipGif';

function FitnessEquipDetail() {
    const { equipmentName } = useParams();
    const [equipment, setEquipment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (equipmentName) {
            const selectedEquipment = equipmentDetails.find(equip => equip.name === decodeURIComponent(equipmentName));
            if (selectedEquipment) {
                setEquipment(selectedEquipment);
            } else {
                navigate('/');
            }
        }
    }, [equipmentName, navigate]);

    if (!equipment) {
        return <div>운동 기구 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container">
            <h1 className="title">운동 기구 상세 정보</h1>
            <div className="detail-box">
                <h3>{equipment.name}</h3>
                <p>{equipment.description}</p>
                <FitnessEquipGif equipmentName={equipment.name} />

                <h4>운동 방법:</h4>
                <p>{equipment.exerciseInstructions}</p>

                <h4 style={{ color: "#FF5A5A" }}>주의 사항:</h4>
                <p>{equipment.warning}</p>

                <h4>참고 영상:</h4>
                <div className="video-thumbnails">
                    {(equipment.videos || []).map((video, index) => (
                        <a key={index} href={video.videoLink} target="_blank" rel="noopener noreferrer">
                            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                        </a>
                    ))}
                </div>
            </div>
            <h4>다른 운동기구 선택하기:</h4>
            <div className="button-group">
                {equipmentDetails.map((equip, index) => (
                    <button
                        key={index}
                        onClick={() => setEquipment(equip)}
                        className={`nav-button ${equipment.name === equip.name ? 'active' : ''}`}
                    >
                        <img src={equip.images} alt={equip.name} className="equipment-image-button" style={{ width: '100px', height: '100px' }} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FitnessEquipDetail;
