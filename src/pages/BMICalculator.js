import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSearchParams } from 'react-router-dom';

function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);
    const [searchParams] = useSearchParams();
    const [actualUserId, setActualUserId] = useState(null);
    const [noWeightMessage, setNoWeightMessage] = useState(false);
    const [showGraph, setShowGraph] = useState(true); // 그래프와 목록 전환 상태

    const userId = searchParams.get('userId') || 'default_name';

    useEffect(() => {
        setActualUserId(userId);  // URL에서 userId를 설정
        console.log('URL에서 받아온 userId 값:', userId);
    }, [userId]);

    useEffect(() => {
        if (actualUserId) {
            console.log("userId가 actualUserId에 잘 저장됨.");
            updateWeightHistory();  // 체중 기록을 업데이트
        }
    }, [actualUserId]);

    useEffect(() => {
        if (weightHistory.length === 0) {
            setNoWeightMessage(true);  // 체중 기록이 없을 경우
        } else {
            setNoWeightMessage(false);
        }
    }, [weightHistory]);

    const calculateBMI = async () => {
        if (!weight || !height) {
            setNoWeightMessage(true);  // 빈 값 경고 메시지
            console.error('체중과 키를 모두 입력해주세요!');
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(parseFloat(bmiValue.toFixed(2)));

        const today = new Date();
        today.setHours(today.getHours() + 9);  // 한국 시간으로 변환
        const formattedDate = today.toISOString().slice(0, 19).replace('T', ' ');

        try {
            if (!actualUserId) {
                console.error('User ID is missing!');
                return;
            }

            const response = await fetch(`http://223.194.154.149:5001/api/bmi`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: formattedDate,
                    weight: weight,
                    userId: actualUserId,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("체중 데이터 추가 성공!");
                updateWeightHistory();
                setWeight("");  // 입력값 초기화
                setBmi(null);    // BMI 상태 초기화
            } else {
                console.error("체중 데이터 추가 실패:", data.message);
            }
        } catch (error) {
            console.error("체중 데이터 추가 중 오류 발생:", error);
        }
    };

    const updateWeightHistory = async () => {
        try {
            const response = await fetch(`http://223.194.154.149:5001/api/bmi?userId=${actualUserId}`);
            if (!response.ok) {
                throw new Error('체중 데이터 가져오기 실패');
            }
            const data = await response.json();
            const formattedData = data.map(entry => {
                const utcTime = new Date(entry.date);  // UTC로 저장된 시간
                const korTime = new Date(utcTime);
                korTime.setHours(korTime.getHours() + 9); // 한국 시간으로 변환

                return {
                    ...entry,
                    date: korTime.toISOString(),
                };
            });
            setWeightHistory(formattedData);
        } catch (error) {
            console.error("체중 데이터 가져오기 실패:", error);
        }
    };

    const handleDeleteWeight = async (record) => {
        const { date, weight } = record;
        try {
            const formattedDate = new Date(date);
            formattedDate.setHours(formattedDate.getHours());  // 한국 시간으로 변환

            const deleteDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');

            const response = await fetch(`http://223.194.154.149:5001/api/bmi`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: deleteDate,
                    weight: weight,
                    userId: actualUserId,
                }),
            });

            if (response.ok) {
                console.log("체중 데이터 삭제 성공!");
                const updatedHistory = weightHistory.filter(item => item.date !== record.date);
                setWeightHistory(updatedHistory);
            } else {
                console.error("체중 데이터 삭제 실패");
            }
        } catch (error) {
            console.error("체중 데이터 삭제 중 오류 발생:", error);
        }
    };

    const handleAddWeight = async () => {
        if (weight && height) {
            calculateBMI();
            setWeight("");  // 입력값 초기화
        } else {
            alert("체중과 키를 모두 입력해주세요.");
        }
    };

    const getYAxisDomain = () => {
        if (weightHistory.length === 0) return [0, 'auto'];
        const weights = weightHistory.map(entry => entry.weight);
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);
        return [minWeight - 3, maxWeight + 3];
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>BMI 계산기</h2>
            <h3>사용자: {actualUserId}</h3>  {/* 사용자 ID 확인차 표시 */}
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
            <button onClick={() => { console.log("Button clicked!"); calculateBMI(); }}>계산</button>
            {bmi && <p>당신의 BMI: {bmi}</p>}

            {/* 그래프와 체중 기록을 전환하는 버튼 */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setShowGraph(!showGraph)}>
                    {showGraph ? "체중 기록 보기" : "체중 기록 그래프 보기"}
                </button>
            </div>

            {/* 조건에 따라 그래프 또는 체중 기록 표시 */}
            {showGraph ? (
                <div style={{ width: "100%", height: "300px", marginTop: "30px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={weightHistory}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" hide={true} />
                            <YAxis domain={getYAxisDomain()} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload, label }) =>
                                    active && payload && payload.length ? (
                                        <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                                            <p>{label.split('T')[0]} {label.split('T')[1]}</p>
                                            <p>체중: {payload[0].value} kg</p> {/* 체중 값 추가 */}
                                        </div>
                                    ) : null
                                }
                                isAnimationActive={false}
                                trigger="hover" // 터치나 마우스 오버 중에만 툴팁을 보이게 함
                            />

                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#007BFF" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div>
                    <h3>체중 기록</h3>
                    <ul>
                        {weightHistory.map(record => (
                            <li key={record.date}>
                                {record.date} - {record.weight}kg{" "}
                                <button onClick={() => handleDeleteWeight(record)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                    {noWeightMessage && <p>기록된 체중 데이터가 없습니다.</p>}
                </div>
            )}
        </div>
    );
}

export default BMICalculator;
