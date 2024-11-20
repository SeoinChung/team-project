import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './BMICalculator.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(2)));

            const today = new Date().toLocaleDateString();
            setWeightHistory((prevHistory) => [...prevHistory, { date: today, weight: parseFloat(weight) }]);
        }
    };

    const chartData = {
        labels: weightHistory.map(entry => entry.date),
        datasets: [
            {
                label: '몸무게 변화 추이',
                data: weightHistory.map(entry => entry.weight),
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>BMI 계산기</h2>
            <input
                type="number"
                placeholder="몸무게 (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bmi-input"
            />
            <input
                type="number"
                placeholder="키 (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bmi-input"
            />
            <button onClick={calculateBMI} className="bmi-button">계산</button>
            {bmi && <p>당신의 BMI: {bmi}</p>}

            <div className="bmi-range-container">
                <div className="bmi-range-box">저체중 (0 - 18.5)</div>
                <div className="bmi-range-box">정상 (18.5 - 23)</div>
                <div className="bmi-range-box">과체중 (23 - 25)</div>
                <div className="bmi-range-box">비만 (25 이상)</div>
            </div>

            <div>
                <h3>몸무게 변화 추이</h3>
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default BMICalculator;
