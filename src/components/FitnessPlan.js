// src/components/FitnessPlan.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FitnessPlan() {
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 새로운 운동 계획 추가 함수
    const handleAddPlan = () => {
        if (newPlan) {
            const formattedDate = selectedDate.toLocaleDateString();
            const newPlanItem = { text: newPlan, completed: false };
            setPlans({
                ...plans,
                [formattedDate]: [...(plans[formattedDate] || []), newPlanItem]
            });
            setNewPlan("");
        }
    };

    // 체크박스 상태 변경 함수
    const handleToggleComplete = (index) => {
        const formattedDate = selectedDate.toLocaleDateString();
        const updatedPlans = plans[formattedDate].map((plan, i) => 
            i === index ? { ...plan, completed: !plan.completed } : plan
        );

        // 완료된 항목은 목록 하단으로 이동
        const sortedPlans = [
            ...updatedPlans.filter((plan) => !plan.completed),
            ...updatedPlans.filter((plan) => plan.completed)
        ];

        setPlans({
            ...plans,
            [formattedDate]: sortedPlans
        });
    };

    // 선택된 날짜의 계획을 표시하는 함수
    const renderPlansForSelectedDate = () => {
        const formattedDate = selectedDate.toLocaleDateString();
        return plans[formattedDate] ? (
            <ul style={{ padding: "0", listStyleType: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {plans[formattedDate].map((plan, index) => (
                    <li key={index} style={{
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
