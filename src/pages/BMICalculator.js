// src/pages/BMICalculator.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);

    // BMI 계산
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(2)));

            // 몸무게 기록 추가 (날짜와 몸무게)
            const today = new Date().toLocaleDateString();
            setWeightHistory((prevHistory) => [...prevHistory, { date: today, weight: parseFloat(weight) }]);
        }
    };

    // BMI 범위 스타일 설정 함수
    const getRangeStyle = (min, max) => {
        const inRange = bmi !== null && bmi >= min && bmi < max;
        let color;
        if (min === 0) color = "blue";          // 저체중
        else if (min === 18.5) color = "green";  // 정상
        else if (min === 23) color = "orange";   // 과체중
        else color = "red";                      // 비만

        return {
            backgroundColor: color,
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 0",
            flexGrow: 1,
            textAlign: "center",
            position: "relative",
            ...(inRange && { border: "2px solid black" }) // BMI가 속한 범위에 검은색 선
        };
    };

    // 차트 데이터 설정
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
        <div style={{ padding: "20px" }}>
            <h2>BMI 계산기</h2>

            {/* BMI 입력 섹션 */}
            <input
                type="number"
                placeholder="몸무게 (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <input
                type="number"
                placeholder="키 (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={calculateBMI}>계산</button>
            {bmi && <p>당신의 BMI: {bmi}</p>}

            {/* BMI 범위 표 */}
            <div style={{ marginTop: "20px" }}>
                <h3>BMI 범위</h3>
                <div style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #ddd"
                }}>
                    <div style={getRangeStyle(0, 18.5)}>저체중 (0 - 18.5)</div>
                    <div style={getRangeStyle(18.5, 23)}>정상 (18.5 - 23)</div>
                    <div style={getRangeStyle(23, 25)}>과체중 (23 - 25)</div>
                    <div style={getRangeStyle(25, Infinity)}>비만 (25 이상)</div>
                </div>
            </div>

            {/* 몸무게 변화 추이 차트 */}
            <div style={{ marginTop: "20px" }}>
                <h3>몸무게 변화 추이</h3>
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default BMICalculator;