import React, { useState, useEffect, useCallback } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useSearchParams } from 'react-router-dom';
import './BMICalculator.css';

function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);
    const [searchParams] = useSearchParams();
    const [actualUserId, setActualUserId] = useState(null);
    const [showGraph, setShowGraph] = useState(true);

    const userId = searchParams.get('userId') || 'default_name';

    useEffect(() => {
        setActualUserId(userId);
    }, [userId]);

    // 체중 기록을 가져오는 함수
    const updateWeightHistory = useCallback(async () => {
        try {
            const response = await fetch(`http://223.194.152.142:5001/api/bmi?userId=${actualUserId}`);
            if (!response.ok) {
                throw new Error('체중 데이터 가져오기 실패');
            }
            const data = await response.json();
            setWeightHistory(data);
        } catch (error) {
            console.error("체중 데이터 가져오기 실패:", error);
        }
    }, [actualUserId]);

    // userId가 변경될 때 체중 기록 업데이트
    useEffect(() => {
        if (actualUserId) {
            updateWeightHistory();
        }
    }, [actualUserId, updateWeightHistory]);

    const calculateBMI = async () => {
        if (!weight || !height) {
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(parseFloat(bmiValue.toFixed(2)));

        const today = new Date();
        today.setHours(today.getHours() + 9);
        const formattedDate = today.toISOString().slice(0, 19).replace('T', ' ');

        try {
            if (!actualUserId) {
                return;
            }

            const response = await fetch(`http://223.194.152.142:5001/api/bmi`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: formattedDate,
                    weight: weight,
                    userId: actualUserId,
                    bmi: bmiValue.toFixed(2)
                }),
            });

            const data = await response.json();

            if (data.success) {
                updateWeightHistory();
                setWeight("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteWeight = async (record) => {
        const { date, weight } = record;

        try {
            const response = await fetch(`http://223.194.152.142:5001/api/bmi`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date,
                    weight,
                    userId: actualUserId,
                }),
            });

            if (response.ok) {
                const updatedHistory = weightHistory.filter(
                    (item) => item.date !== record.date
                );
                setWeightHistory(updatedHistory);
            }
        } catch (error) {
            console.error(error);
        }
    };

    function getPointerPosition(bmi) {
        if (bmi <= 18.5) {
          return (bmi / 18.5) * 61.7; // 저체중 구간 (0 - 18.5) -> 0% - 61.7%
        } else if (bmi <= 23) {
          return 61.7 + ((bmi - 18.5) / (23 - 18.5)) * 15; // 정상 구간 (18.5 - 23) -> 61.7% - 76.7%
        } else if (bmi <= 25) {
          return 76.7 + ((bmi - 23) / (25 - 23)) * 6.7; // 과체중 구간 (23 - 25) -> 76.7% - 83.4%
        } else if (bmi <= 30) {
          return 83.4 + ((bmi - 25) / (30 - 25)) * 16.6; // 비만 구간 (25 - 30) -> 83.4% - 100%
        } else {
          return 100; // 고도비만 구간은 항상 100% (30 이상)
        }
      }         

    return (
        <div className="container">
            <h2 className="title">BMI 계산기</h2>
            <h3 className="subtitle">사용자: {actualUserId}</h3>
            <input
                type="number"
                placeholder="몸무게 (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input"
            />
            <input
                type="number"
                placeholder="키 (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input"
            />
            <button onClick={calculateBMI} className="button">
                계산
            </button>
            {bmi !== null && <p>당신의 BMI: {bmi}</p>}

            <div className="bmi-range-container">
                <div className="bmi-range-bar">
                    {bmi !== null && (
                        <div className="bmi-pointer" style={{
                            left: `${Math.min(getPointerPosition(bmi), 100)}%`,
                            }}
                        >
                            <span role="img" aria-label="pointer" style={{ fontSize: '24px' }}>📍</span>
                        </div>
                    )}
                </div>
                <div className="bmi-range-labels">
                    <span className="label underweight">저체중</span>
                    <span className="label normal">정상</span>
                    <span className="label overweight">과체중</span>
                    <span className="label obese">비만</span>
                    </div>
            </div>

            {/* 그래프와 체중 기록을 전환하는 버튼 */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setShowGraph(!showGraph)}>
                    {showGraph ? "체중 기록 보기" : "체중 기록 그래프 보기"}
                </button>
            </div>

            {showGraph ? (
                <div className="graph-container">
                    <ResponsiveContainer>
                        <LineChart
                            data={weightHistory.map((record) => {
                                const korDate = new Date(record.date);
                                korDate.setHours(korDate.getHours());
                                return {
                                    ...record,
                                    date: korDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                                };
                            })}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={false} />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: 'white' }} />
                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#007BFF" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="weight-history-container">
                    {weightHistory.map((record) => {
                        const korDate = new Date(record.date);
                        korDate.setHours(korDate.getHours());
                        const formattedKorDate = korDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

                        return (
                            <div className="weight-history-item" key={record.date}>
                                <p>{formattedKorDate}</p>
                                <p className="weight-value">
                                    {record.weight} <span className="weight-unit">kg</span>
                                </p>
                                <p className="bmi-value">BMI: {record.bmi}</p>
                                <button onClick={() => handleDeleteWeight(record)}>삭제</button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BMICalculator;
