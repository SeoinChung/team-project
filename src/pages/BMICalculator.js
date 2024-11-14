import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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

    const getRangeStyle = (min, max) => {
        const inRange = bmi !== null && bmi >= min && bmi < max;
        let color;
        if (min === 0) color = "#a3d8f4";  // 파스텔 하늘색
        else if (min === 18.5) color = "#b8e5b5";  // 파스텔 초록색
        else if (min === 23) color = "#f7e0a1";  // 파스텔 노란색
        else color = "#f9c0c0";  // 파스텔 빨간색

        return {
            backgroundColor: color,
            color: "#333",
            fontWeight: "bold",
            padding: "10px 0",
            flexGrow: 1,
            textAlign: "center",
            position: "relative",
            ...(inRange && { 
                border: "3px solid black", 
                borderRadius: "3px",        
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" 
            })
        };
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

    const getArrowStyle = (min, max) => {
        const inRange = bmi !== null && bmi >= min && bmi < max;
        if (inRange) {
            return {
                position: "absolute",
                top: "-120px",  
                left: "50%",
                transform: "translateX(-50%)",
                fontWeight: "bold",
                fontSize: "120px", 
                color: "red", 
                zIndex: 10,
            };
        }
        return { display: "none" };
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>BMI 계산기</h2>
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

            <div style={{ marginTop: "20px" }}>
                <h3>BMI 범위</h3>
                <div style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    position: "relative"
                }}>
                    <div style={getRangeStyle(0, 18.5)}>
                        저체중 (0 - 18.5)
                        <div style={getArrowStyle(0, 18.5)}>&#8595;</div> 
                    </div>
                    <div style={getRangeStyle(18.5, 23)}>
                        정상 (18.5 - 23)
                        <div style={getArrowStyle(18.5, 23)}>&#8595;</div> 
                    </div>
                    <div style={getRangeStyle(23, 25)}>
                        과체중 (23 - 25)
                        <div style={getArrowStyle(23, 25)}>&#8595;</div> 
                    </div>
                    <div style={getRangeStyle(25, Infinity)}>
                        비만 (25 이상)
                        <div style={getArrowStyle(25, Infinity)}>&#8595;</div> 
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "20px" }}>
                <h3>몸무게 변화 추이</h3>
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default BMICalculator;
