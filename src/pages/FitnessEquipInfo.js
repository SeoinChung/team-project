// src/pages/FitnessEquipInfo.js
import React, { useState } from 'react';
import './FitnessEquipInfo.css';

const equipmentDetails = [
    { name: "레그프레스", description: "하체 근력 강화에 도움을 주는 기구입니다.\n다리와 허벅지 근육을 효과적으로 단련할 수 있습니다." },
    { name: "케이블 암 풀 다운", description: "상체 근력 운동으로 팔과 등 근육을 단련하는 데 효과적입니다." },
    { name: "랫풀다운", description: "등 근육을 집중적으로 발달시키며 상체 안정성을 향상시킵니다." },
    { name: "체스트프레스", description: "가슴 근육을 강화하는 운동기구로, 상체 힘을 기르는 데 도움이 됩니다." },
    { name: "리버스 백익스텐션", description: "허리와 엉덩이 근육을 강화하는 데 도움을 주며, 허리 부상 방지에 좋습니다." },
    { name: "백 익스텐션", description: "허리 근육을 효과적으로 단련하여 허리 건강에 도움을 줍니다." },
    { name: "스텝퍼", description: "심폐 지구력을 향상시키고 하체 근력을 강화하는 유산소 운동 기구입니다." },
    { name: "치닝디핑", description: "팔과 등 근육을 강화하는 풀업 및 딥스 운동을 지원하는 기구입니다." },
    { name: "바디 인버전", description: "거꾸로 매달려 척추를 이완시키고 허리 건강을 개선하는 데 도움을 줍니다." },
    { name: "런닝머신", description: "유산소 운동 기구로 심폐 지구력 향상과 체지방 감량에 효과적입니다.\n다양한 속도와 경사 조절 기능을 통해 맞춤형 워크아웃이 가능합니다."}
];

function FitnessEquipInfo() {
    const [selectedEquipment, setSelectedEquipment] = useState(equipmentDetails[0]);

    return (
        <div className="container">
            <h2 className="title">운동기구 상세 정보</h2>
            <div className="detail-box">
                <h3>{selectedEquipment.name}</h3>
                <p>{selectedEquipment.description}</p>
            </div>
            <h4>다른 운동기구 선택하기:</h4>
            <ul className="equipment-list">
                {equipmentDetails.map((equip, index) => (
                    <li 
                        key={index} 
                        onClick={() => setSelectedEquipment(equip)} 
                        className="equipment-item"
                    >
                        {equip.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessEquipInfo;
