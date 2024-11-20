// components/FitnessEquipInfo.js
import React from 'react';
import { Link } from 'react-router-dom';

// 운동기구 목록
const equipment = [
    "lat-pull-down",
    "cable-arm-pulldown",
    "chest-press",
    "back-extension",
    "reverse-hyper-extension",
    "chinning-dipping1",
    "chinning-dipping2",
    "leg-press",
    "stepper",
    "treadmill",
    "elliptical-machine",
    "cycle",
    "leg-extension",
    "inner-thigh",
    "out-thigh"
];

function FitnessEquipList() {
    return (
        <div>
            <ul>
                {equipment.map((equip, index) => (
                    <li key={index}>
                        {/* equipment 이름을 URL에 동적으로 반영 */}
                        <Link to={`/info/${equip.toLowerCase()}`}>{equip}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessEquipList;