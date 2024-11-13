// src/pages/FitnessEquipList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FitnessEquipList.css';

function FitnessEquipList() {
    const navigate = useNavigate();

    const equipmentList = [
        { name: "랫 풀 다운" },
        { name: "케이블 스트레이트 암 풀 다운" },
        { name: "체스트 프레스" },
        { name: "백 익스텐션" },
        { name: "리버스 하이퍼(백) 익스텐션" },
        { name: "치닝디핑 (치닝)" },
        { name: "치닝디핑 (디핑)" },
        { name: "시티드 레그 프레스" },
        { name: "스텝퍼" },
        { name: "런닝머신" }
    ];

    const handleClick = (equipmentName) => {
        navigate(`/equipment/${encodeURIComponent(equipmentName)}`);
    };

    return (
        <div>
            {equipmentList.map((equipment, index) => (
                <button 
                    key={index} 
                    onClick={() => handleClick(equipment.name)}
                >
                    {equipment.name}
                </button>
            ))}
        </div>
    );
}

export default FitnessEquipList;
