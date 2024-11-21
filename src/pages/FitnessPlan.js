import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FitnessPlan.css';
import { equipmentDetails } from './FitnessEquipData';



function FitnessPlan() {
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [recommendedExercises, setRecommendedExercises] = useState({
        상체: null,
        하체: null,
        등: null,
    }); // 상체, 하체, 등 각각의 추천 운동 상태 추가

    // muscle을 기준으로 랜덤 운동을 추천하는 함수
    const getRandomExercise = (muscleGroup) => {
        const filteredExercises = equipmentDetails.filter(
            (exercise) => exercise.muscle === muscleGroup
        );
        const randomIndex = Math.floor(Math.random() * filteredExercises.length);
        return filteredExercises[randomIndex];
    };

    // 날짜 선택 시 랜덤 운동 추천
    useEffect(() => {
        const muscleGroups = ["상체", "하체", "등"]; // 상체, 하체, 등 그룹으로 분류
        const randomExercises = muscleGroups.reduce((acc, group) => {
            acc[group] = getRandomExercise(group);
            return acc;
        }, {});
        setRecommendedExercises(randomExercises);
    }, [selectedDate]); // 날짜가 변경될 때마다 추천 운동 갱신

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
    
        setPlans((prevPlans) => {
            if (updatedPlans.length === 0) {
                // 날짜의 계획이 비어 있다면 삭제
                const { [formattedDate]: _, ...remainingPlans } = prevPlans;
                return remainingPlans;
            } else {
                return {
                    ...prevPlans,
                    [formattedDate]: updatedPlans
                };
            }
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

            {/* 운동 추천 출력 */}
            <div className="notification-box">
                <div className="icon">ℹ️</div>
                <div>
                    <h4>오늘은 이런 운동 어떠세요?</h4>
                    <ul>
                        {recommendedExercises.상체 && (
                            <li>상체: {recommendedExercises.상체.displayName}</li>
                        )}
                        {recommendedExercises.하체 && (
                            <li>하체: {recommendedExercises.하체.displayName}</li>
                        )}
                        {recommendedExercises.등 && (
                            <li>등: {recommendedExercises.등.displayName}</li>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
    
}

export default FitnessPlan;
