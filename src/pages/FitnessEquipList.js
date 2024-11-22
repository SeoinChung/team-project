import React from 'react';
import { Link } from 'react-router-dom';
import './FitnessEquipList.css';

const equipment = [
    "lat-pull-down",
    "cable-arm-pulldown",
    "chest-press",
    "back-extension",
    "reverse-hyper-extension",
    "chinning-dipping1",
    "chinning-dipping2",
    "leg-press",
    "leg-extension",
    "inner-thigh",
    "out-thigh",
    "treadmill",
    "stepper",
    "elliptical-machine",
    "cycle"
];

function FitnessEquipList() {
    return (
        <div>
            <ul className="equipment-list">
                {equipment.map((equip, index) => (
                    <li key={index} className="equipment-item">
                        <Link to={`/info/${equip.toLowerCase()}`}>{equip}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessEquipList;
