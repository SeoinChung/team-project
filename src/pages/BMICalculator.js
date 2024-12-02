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
                        <div
                        className="bmi-pointer"
                        style={{
                            left: `${Math.min((bmi / 30) * 100, 100)}%`,
                        }}
                        >
                            <span role="img" aria-label="pointer" style={{ fontSize: '24px' }}>📍</span>
                        </div>
                    )}
                </div>
                <div className="bmi-range-labels">
                    <span>저체중</span>
                    <span>정상</span>
                    <span>과체중</span>
                    <span>비만</span>
                    <span>고도비만</span>
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
