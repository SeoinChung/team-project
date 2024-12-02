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

<<<<<<< HEAD
    useEffect(() => {
        if (actualUserId) {
            console.log("userId가 actualUserId에 잘 저장됨.");
            updateWeightHistory();  // 체중 기록을 업데이트
=======
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
>>>>>>> 615c75f88cc96021130947b353af12723ddcacd4
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

            const response = await fetch(`http://223.194.152.142:5001/api/bmi`, {
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
<<<<<<< HEAD
                setWeight("");  // 입력값 초기화
                setBmi(null);    // BMI 상태 초기화
            } else {
                console.error("체중 데이터 추가 실패:", data.message);
=======
                setWeight("");
>>>>>>> 615c75f88cc96021130947b353af12723ddcacd4
            }
        } catch (error) {
            console.error("체중 데이터 추가 중 오류 발생:", error);
        }
    };

    const updateWeightHistory = async () => {
        try {
            const response = await fetch(`http://223.194.152.142:5001/api/bmi?userId=${actualUserId}`);
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
<<<<<<< HEAD
            const formattedDate = new Date(date);
            formattedDate.setHours(formattedDate.getHours());  // 한국 시간으로 변환

            const deleteDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');

=======
>>>>>>> 615c75f88cc96021130947b353af12723ddcacd4
            const response = await fetch(`http://223.194.152.142:5001/api/bmi`, {
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
<<<<<<< HEAD
            <button onClick={() => { console.log("Button clicked!"); calculateBMI(); }}>계산</button>
            {bmi && <p>당신의 BMI: {bmi}</p>}
=======
            <button onClick={calculateBMI} className="button">
                계산
            </button>
            {bmi !== null && <p>당신의 BMI: {bmi}</p>}
>>>>>>> 615c75f88cc96021130947b353af12723ddcacd4

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

            {/* 그래프와 체중 기록을 전환하는 버튼 */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setShowGraph(!showGraph)}>
                    {showGraph ? "체중 기록 보기" : "체중 기록 그래프 보기"}
                </button>
            </div>

<<<<<<< HEAD
            {/* 조건에 따라 그래프 또는 체중 기록 표시 */}
=======
>>>>>>> 615c75f88cc96021130947b353af12723ddcacd4
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginTop: "20px" }}>
                    {weightHistory.map(record => (
                        <div key={record.date} style={{ border: "1px solid #ddd", padding: "5px", borderRadius: "8px", backgroundColor: "#333", color: "white", textAlign: "center" }}>
                            <p>{new Date(record.date).toLocaleDateString()}</p>
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{record.weight} <span style={{ fontSize: "14px", color: "#4dabf7" }}>kg</span></p>
                            
                            
                            <button onClick={() => handleDeleteWeight(record)} style={{ marginTop: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px", borderRadius: "5px", cursor: "pointer" }}>삭제</button>
                        </div>
                    ))}
                    {noWeightMessage && <p>기록된 체중 데이터가 없습니다.</p>}
                </div>
            )}
        </div>
    );
}

export default BMICalculator;
