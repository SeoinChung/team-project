import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FitnessPlan.css';
import { equipmentDetails } from './FitnessEquipData';
import { useSearchParams } from 'react-router-dom';

const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : 'http://223.194.154.149:5001/api';

function FitnessPlan() {
    const [searchParams] = useSearchParams();  
    const actualUserId = searchParams.get('userId') || 'default_name'; // URL에서 바로 userId를 받아 설정
    const [plans, setPlans] = useState({});
    const [newPlan, setNewPlan] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [noPlansMessage, setNoPlansMessage] = useState(false);
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

    const fetchPlans = async () => {
        try {
            const response = await fetch(`${API_URL}/plan?userId=${actualUserId}`);
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
    };    

    useEffect(() => {
        fetchPlans();  // 페이지 로드 시 운동 계획 가져오기

        const savedDate = localStorage.getItem("selectedDate");
        if (savedDate) {
            setSelectedDate(new Date(savedDate));
        }
    }, []);

    useEffect(() => {
        fetchPlans();  // selectedDate가 변경될 때마다 계획을 다시 가져옴
    }, [selectedDate]);


    // 실제 FitnessPlan.js 수정 코드
    const handleAddPlan = () => {
        if (newPlan) {
            const kor = new Date(selectedDate);
            kor.setHours(kor.getHours() + 9); // 한국 시간으로 변환
            const formattedDate = kor.toISOString().split('T')[0];

            fetch(`${API_URL}/plan`, {
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
                        console.log("넘기기 직전: " + actualUserId);
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

        fetch(`${API_URL}/plan`, {
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
                const updatedPlans = plans[formattedDate].filter((_, i) => i !== index);
                setPlans((prevPlans) => {
                    const updatedPlansByDate = {
                        ...prevPlans,
                        [formattedDate]: updatedPlans,
                    };
                    if (updatedPlans.length === 0) {
                        setNoPlansMessage(true);
                    } else {
                        setNoPlansMessage(false);
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

        fetch(`${API_URL}/plan"`, {
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
                            style={{ marginRight: "8px" }}
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
            <h3>사용자: {actualUserId}</h3>  {/* 사용자 ID 확인차 표시 */}
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
            {noPlansMessage ? (
                <p>해당 날짜에 등록된 운동 계획이 없습니다.</p>
            ) : (
                renderPlansForSelectedDate()
            )}

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
