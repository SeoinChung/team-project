import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);

    const userId = 'seoin'; // 로그인된 사용자 ID

    useEffect(() => {
        updateWeightHistory();  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
    }, []);
    
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(2)));
        
            const today = new Date();
            today.setHours(today.getHours() + 9); // 한국 시간으로 변환
        
            const formattedDate = today.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS' 형식
        
            const newEntry = { date: formattedDate, weight: parseFloat(weight), userId };
        
            // API 호출을 통해 체중 데이터를 서버에 추가
            fetch("http://223.194.154.149:5001/api/bmi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("체중 데이터 추가 성공!");
                    updateWeightHistory();  // 새로운 체중 데이터 반영
                    setWeight("");  // 입력값 초기화
                    setBmi(null);    // BMI 상태 초기화
                    window.location.reload();
                } else {
                    console.error("체중 데이터 추가 실패:", data.message);
                }
            })
            .catch(error => {
                console.error("체중 데이터 추가 중 오류 발생:", error);
            });
        }
    };    
    
    const updateWeightHistory = async () => {
        try {
            const response = await axios.get("http://223.194.154.149:5001/api/bmi");
            const data = response.data.map(entry => {
                const utcTime = new Date(entry.date); // UTC로 저장된 시간
                const korTime = new Date(utcTime);
                korTime.setHours(korTime.getHours() + 9); // 한국 시간으로 변환
    
                return {
                    ...entry,
                    date: korTime.toISOString(),  // 'YYYY-MM-DDTHH:MM:SS.sssZ' 형식
                };
            });
            setWeightHistory(data);  // 가져온 체중 데이터를 상태에 저장
        } catch (error) {
            console.error("체중 데이터 가져오기 실패:", error);
        }
    };
    
    const handleDeleteWeight = async (record) => {
        const { date, weight } = record;
    
        try {
            // ISO 형식의 날짜를 받아서 한국 시간으로 변환
            const formattedDate = new Date(date);  // ISO 형식의 날짜
            formattedDate.setHours(formattedDate.getHours() + 9);  // 한국 시간으로 변환
    
            // 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
            const deleteDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');
    
            console.log("변환된 deleteDate:", deleteDate); // 변환된 deleteDate 출력
    
            // 삭제 요청 보내기
            const response = await axios.delete("http://223.194.154.149:5001/api/bmi", {
                data: { date: deleteDate, weight, userId },  // 데이터를 data 속성에 넣어야 함
            });
    
            const data = response.data;
            if (data.success) {
                console.log(data.message); // 삭제 성공 메시지 출력
                setWeightHistory(prevHistory => prevHistory.filter(entry => entry.date !== deleteDate));
                window.location.reload();  // 강제로 새로고침
            } else {
                console.error("체중 데이터 삭제 실패:", data.message);
            }
        } catch (error) {
            console.error("체중 데이터 삭제 실패:", error.response?.data || error.message);
        }
    };    

    const getRangeStyle = (min, max) => {
        const inRange = bmi !== null && bmi >= min && bmi < max;
        let color;
        if (min === 0) color = "#a3d8f4";
        else if (min === 18.5) color = "#b8e5b5";
        else if (min === 23) color = "#f7e0a1";
        else color = "#f9c0c0";

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
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }),
        };
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

    const chartData = {
        labels: weightHistory.map(entry => entry.date),
        datasets: [
            {
                label: '몸무게 변화 추이',
                data: weightHistory.map(entry => entry.weight),
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
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

            {/* BMI 상태 그래프 복원 */}
            <div style={{ marginTop: "20px" }}>
                <h3>BMI 범위</h3>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                        position: "relative",
                    }}
                >
                    <div style={getRangeStyle(0, 18.5)}>
                        저체중(0 - 18.5)
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

            <div style={{ marginTop: "20px" }}>
                <h3>체중 기록</h3>
                <ul>
                    {weightHistory.map((record, index) => (
                        <li key={index}>
                            {record.date} - {record.weight}kg
                            <button onClick={() => handleDeleteWeight(record)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BMICalculator;