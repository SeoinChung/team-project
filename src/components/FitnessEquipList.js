// src/components/FitnessEquipList.js
import React from 'react';
import { Link } from 'react-router-dom';

const equipment = [
    "랫 풀 다운",
    "케이블 스트레이트 암 풀 다운",
    "체스트 프레스",
    "백 익스텐션",
    "리버스 하이퍼(백) 익스텐션",
    "치닝디핑 (치닝)",
    "치닝디핑 (디핑)",
    "시티드 레그 프레스",
    "스텝퍼",
    "런닝머신"
];

function FitnessEquipList() {
    return (
        <div>
            <ul>
                {equipment.map((equip, index) => (
                    <li key={index}>
                        <Link to={`/info`}>{equip}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessEquipList;
