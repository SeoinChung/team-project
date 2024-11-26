import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FitnessPlan() {
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 서버에서 운동 계획을 가져오는 함수
    const fetchPlans = async () => {
        const response = await fetch("http://localhost:5001/api/plan");
        if (response.ok) {
            const data = await response.json();
            const plansByDate = data.reduce((acc, plan) => {
                const date = new Date(plan.date).toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push({ id: plan.id, text: plan.text, completed: plan.completed });
                return acc;
            }, {});
            setPlans(plansByDate);
        } else {
            console.error("운동 계획을 가져오는 데 오류가 발생했습니다.");
        }
    };

    // 페이지 로드 시 운동 계획을 가져옵니다.
    useEffect(() => {
        fetchPlans();
    }, []);

    const handleAddPlan = () => {
        if (newPlan) {
            // selectedDate를 'YYYY-MM-DD' 형식으로 변환
            const formattedDate = selectedDate.toISOString().split('T')[0];
        
            // 서버에 추가 요청
            fetch("http://localhost:5001/api/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: formattedDate, // 'YYYY-MM-DD' 형식으로 보내기
                    text: newPlan,
                    completed: false,
                }),
            })
            .then((response) => response.json()) 
            .then((data) => {
                // 새 운동 계획을 상태에 바로 추가
                const newPlanData = {
                    id: data.id,
                    text: newPlan,
                    completed: false,
                };
        
                setPlans((prevPlans) => ({
                    ...prevPlans,
                    [formattedDate]: [
                        ...(prevPlans[formattedDate] || []),
                        newPlanData, // 새 운동 계획 추가
                    ],
                }));
        
                setNewPlan(""); // 입력 필드 초기화
            })
            .catch((error) => {
                console.error("운동 계획 추가 요청 오류:", error);
            });
        }
    };    

    // 운동 계획 삭제 함수
    const handleDeletePlan = (index) => {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        const planToDelete = plans[formattedDate][index];

        // 서버에 삭제 요청
        fetch("http://localhost:5001/api/plan", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: planToDelete.id }),
        })
        .then((response) => {
            if (response.ok) {
                const updatedPlans = plans[formattedDate].filter((_, i) => i !== index);
                setPlans((prevPlans) => ({
                    ...prevPlans,
                    [formattedDate]: updatedPlans,
                }));
            } else {
                console.error("삭제 실패");
            }
        })
        .catch((error) => {
            console.error("삭제 요청 오류:", error);
        });
    };

    // 체크박스 상태 변경 함수
    const handleToggleComplete = (index) => {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        const planToUpdate = plans[formattedDate][index];
        const updatedCompleted = !planToUpdate.completed;

        // 서버에 상태 업데이트 요청
        fetch("http://localhost:5001/api/plan", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: planToUpdate.id,
                completed: updatedCompleted,
            }),
        })
        .then((response) => {
            if (response.ok) {
                setPlans((prevPlans) => {
                    const updatedPlans = prevPlans[formattedDate].map((plan, i) =>
                        i === index ? { ...plan, completed: updatedCompleted } : plan
                    );
                    return {
                        ...prevPlans,
                        [formattedDate]: updatedPlans,
                    };
                });
            } else {
                console.error("상태 업데이트 실패");
            }
        })
        .catch((error) => {
            console.error("상태 업데이트 요청 오류:", error);
        });
    };

    // 선택된 날짜의 계획을 표시하는 함수
    const renderPlansForSelectedDate = () => {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        return plans[formattedDate] ? (
            <ul style={{ padding: "0", listStyleType: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {plans[formattedDate].map((plan, index) => (
                    <li key={plan.id} style={{
                        textDecoration: plan.completed ? "line-through" : "none",
                        color: plan.completed ? "#888" : "#000",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                        justifyContent: "center" // 가운데 정렬
                    }}>
                        <input 
                            type="checkbox" 
                            checked={plan.completed} 
                            onChange={() => handleToggleComplete(index)} 
                            style={{ marginRight: "8px" }}
                        />
                        {plan.text}
                        <button onClick={() => handleDeletePlan(index)} style={{ marginLeft: "8px" }}>삭제</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>이 날짜에 등록된 운동 계획이 없습니다.</p>
        );
    };

    return (
        <div>
            <h2>운동 계획 관리</h2>

            {/* 운동 계획 입력과 추가 버튼 */}
            <input
                type="text"
                placeholder="운동 계획 입력"
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
            />
            <button onClick={handleAddPlan}>추가</button>

            {/* 달력 일러스트 */}
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>날짜를 선택하여 계획을 추가하세요:</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                />
            </div>

            {/* 선택한 날짜의 운동 계획 */}
            <h3>{selectedDate.toLocaleDateString()}의 운동 계획</h3>
            {renderPlansForSelectedDate()}
        </div>
    );
}

export default FitnessPlan;
