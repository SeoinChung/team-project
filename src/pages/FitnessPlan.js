import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FitnessPlan.css';

function FitnessPlan() {
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleToggleComplete = (index) => {
        const formattedDate = selectedDate.toLocaleDateString();
        const updatedPlans = plans[formattedDate].map((plan, i) =>
            i === index ? { ...plan, completed: !plan.completed } : plan
        );

        const sortedPlans = [
            ...updatedPlans.filter((plan) => !plan.completed),
            ...updatedPlans.filter((plan) => plan.completed)
        ];

        setPlans({
            ...plans,
            [formattedDate]: sortedPlans
        });
    };

    const handleDeletePlan = (index) => {
        const formattedDate = selectedDate.toLocaleDateString();
        const updatedPlans = plans[formattedDate].filter((_, i) => i !== index);
        setPlans({
            ...plans,
            [formattedDate]: updatedPlans
        });
    };

    const renderPlansForSelectedDate = () => {
        const formattedDate = selectedDate.toLocaleDateString();
        return plans[formattedDate] ? (
            <ul className="plan-list">
                {plans[formattedDate].map((plan, index) => (
                    <li
                        key={index}
                        className={`plan-item ${plan.completed ? "completed" : ""}`}
                    >
                        <input
                            type="checkbox"
                            checked={plan.completed}
                            onChange={() => handleToggleComplete(index)}
                            style={{ marginRight: "8px" }}
                        />
                        <span>{plan.text}</span>
                        <button
                            onClick={() => handleDeletePlan(index)}
                            className="delete-button"
                        >
                            삭제
                        </button>
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

            <input
                type="text"
                placeholder="운동 계획 입력"
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
                className="input-plan"
            />
            <button onClick={handleAddPlan} className="add-button">추가</button>

            <div className="calendar-container">
                <p>날짜를 선택하여 계획을 추가하세요:</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                />
            </div>

            <h3>{selectedDate.toLocaleDateString()}의 운동 계획</h3>
            {renderPlansForSelectedDate()}
        </div>
    );
}

export default FitnessPlan;
