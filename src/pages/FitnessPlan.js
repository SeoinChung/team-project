import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FitnessPlan.css';  // CSS 파일을 불러옴
import { equipmentDetails } from './FitnessEquipData';
import { useSearchParams } from 'react-router-dom';

function FitnessPlan() {
    const [searchParams] = useSearchParams();  
    const actualUserId = searchParams.get('userId') || 'default_name'; // URL에서 바로 userId를 받아 설정
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [recommendedExercises, setRecommendedExercises] = useState({
        상체: null,
        하체: null,
        등: null,
    });

    // 운동 추천 함수
    const getRandomExercise = (muscleGroup) => {
        const filteredExercises = equipmentDetails.filter(
            (exercise) => exercise.muscle === muscleGroup
        );
        const randomIndex = Math.floor(Math.random() * filteredExercises.length);
        return filteredExercises[randomIndex];
    };

    useEffect(() => {
        const muscleGroups = ["상체", "하체", "등"];
        const randomExercises = muscleGroups.reduce((acc, group) => {
            acc[group] = getRandomExercise(group);
            return acc;
        }, {});
        setRecommendedExercises(randomExercises);
    }, [selectedDate]);

    const fetchPlans = useCallback(async () => {
        try {
            const response = await fetch(`http://223.194.152.142:5001/api/plan?userId=${actualUserId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            const plansByDate = data.reduce((acc, plan) => {
                const date = new Date(plan.date).toLocaleDateString('ko-KR');
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push({ id: plan.id, text: plan.text, completed: plan.completed });
                return acc;
            }, {});
            setPlans(plansByDate);
        } catch (error) {
            console.error("운동 계획을 가져오는 데 실패했습니다:", error.message);
        }
    }, [actualUserId]);

    useEffect(() => {
        const savedDate = localStorage.getItem("selectedDate");
        if (savedDate) {
            const localDate = new Date(savedDate);
            localDate.setHours(localDate.getHours() + 9); // UTC+9로 시간대 보정
            setSelectedDate(localDate);
        } else {
            const today = new Date();
            today.setHours(today.getHours() + 9); // UTC+9로 시간대 보정
            setSelectedDate(today);
        }
    }, []);

    useEffect(() => {
        fetchPlans();  // 페이지 로드 시 운동 계획 가져오기
    }, [fetchPlans]);

    useEffect(() => {
        fetchPlans();  // selectedDate가 변경될 때마다 계획을 다시 가져옴
    }, [fetchPlans, selectedDate]);

    const handleAddPlan = () => {
        if (newPlan) {
            const kor = new Date(selectedDate);
            kor.setHours(kor.getHours() + 9); // 한국 시간으로 변환
            const formattedDate = kor.toISOString().split('T')[0];

            fetch(`http://223.194.152.142:5001/api/plan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: formattedDate,
                    text: newPlan,
                    completed: false,
                    userId: actualUserId, // userId를 서버에 함께 전송
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("운동 계획 추가 실패");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.message === "운동 계획 추가 성공") {
                        console.log(`운동 계획 추가됨: ${data}`);
                        localStorage.setItem("selectedDate", formattedDate);
                        setNewPlan(""); // 입력 필드 초기화
                        fetchPlans(); // 데이터 갱신
                    }
                })
                .catch((error) => {
                    console.error("운동 계획 추가 요청 오류:", error);
                });
        } else {
            alert("운동 계획을 입력하세요!");
        }
    };

    const handleDeletePlan = (index) => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR');
        const planToDelete = plans[formattedDate][index];

        fetch(`http://223.194.152.142:5001/api/plan`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: planToDelete.id,
                userId: actualUserId,
            }),
        })
        .then((response) => {
            if (response.ok) {
                console.log("운동 계획 삭제됨");
                setPlans((prevPlans) => {
                    const updatedPlansByDate = { ...prevPlans };
                    updatedPlansByDate[formattedDate] = updatedPlansByDate[formattedDate].filter((_, i) => i !== index);
                    if (updatedPlansByDate[formattedDate] && updatedPlansByDate[formattedDate].length === 0) {
                        delete updatedPlansByDate[formattedDate];
                    }
                    return updatedPlansByDate;
                });
            } else {
                console.error("삭제 실패");
            }
        })
        .catch((error) => {
            console.error("삭제 요청 오류:", error);
        });
    };

    const handleToggleComplete = (index) => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR');
        const planToUpdate = plans[formattedDate][index];
        const updatedCompleted = !planToUpdate.completed;

        fetch(`http://223.194.152.142:5001/api/plan`, {
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

    const renderPlansForSelectedDate = () => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR');
        return plans[formattedDate] ? (
            <ul className="plan-list">
                {plans[formattedDate].map((plan, index) => (
                    <li key={plan.id} className={`plan-item ${plan.completed ? "completed" : ""}`}>
                        <input
                            type="checkbox"
                            checked={plan.completed}
                            onChange={() => handleToggleComplete(index)}
                            className="plan-checkbox" // className 추가
                        />
                        <span>{plan.text}</span>
                        <button onClick={() => handleDeletePlan(index)} className="delete-button">삭제</button>
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
            <h3>사용자: {actualUserId}</h3>
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
                    filterDate={(date) => {
                        const currentYear = selectedDate.getFullYear();
                        const currentMonth = selectedDate.getMonth();
                        return (
                            date.getFullYear() === currentYear &&
                            date.getMonth() === currentMonth
                        );
                    }}
                    dateFormat="dd/MM" 
                />
            </div>

            <h3>{selectedDate.toLocaleDateString('ko-KR')}의 운동 계획</h3> {/* 연도 포함한 날짜로 복구 */}
            {renderPlansForSelectedDate()}

            <div className="notification-box">
                <div className="icon">ℹ️</div>
                <div>
                    <h4>오늘은 이런 운동 어떠세요?</h4>
                    <p>상체: {recommendedExercises.상체?.displayName}</p>
                    <p>하체: {recommendedExercises.하체?.displayName}</p>
                    <p>등: {recommendedExercises.등?.displayName}</p>
                </div>
            </div>
        </div>
    );
}

export default FitnessPlan;
