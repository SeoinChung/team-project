// src/components/FitnessEquipList.js
import React from 'react';
import { Link } from 'react-router-dom';

const equipment = [
    "레그프레스",
    "케이블 암 풀 다운",
    "랫풀다운",
    "체스트프레스",
    "리버스 백익스텐션",
    "백 익스텐션",
    "스텝퍼",
    "치닝디핑",
    "바디 인버전",
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
