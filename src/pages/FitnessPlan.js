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
    });
    const [noPlansMessage, setNoPlansMessage] = useState(false); // 해당 날짜에 계획이 없다는 메시지를 보여줄지 여부

    const getRandomExercise = (muscleGroup) => {
        const filteredExercises = equipmentDetails.filter(
            (exercise) => exercise.muscle === muscleGroup
        );
        const randomIndex = Math.floor(Math.random() * filteredExercises.length);
        return filteredExercises[randomIndex];
    };

    // 날짜 선택 시 랜덤 운동 추천
    useEffect(() => {
        const muscleGroups = ["상체", "하체", "등"];
        const randomExercises = muscleGroups.reduce((acc, group) => {
            acc[group] = getRandomExercise(group);
            return acc;
        }, {});
        setRecommendedExercises(randomExercises);
    }, [selectedDate]);

    // 서버에서 운동 계획 가져오기
    const fetchPlans = async () => {
        const response = await fetch("http://localhost:5001/api/plan");
        if (response.ok) {
            const data = await response.json();
            const plansByDate = data.reduce((acc, plan) => {
                const date = new Date(plan.date).toLocaleDateString('ko-KR'); // 로컬 날짜 형식 사용
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

    // 페이지 로드 시 plans 초기화
    useEffect(() => {
        fetchPlans(); // 컴포넌트 처음 렌더링 시에도 호출

        // 로컬 스토리지에서 마지막 선택된 날짜 불러오기
        const savedDate = localStorage.getItem("selectedDate");
        if (savedDate) {
            setSelectedDate(new Date(savedDate));
        }
    }, []);

    useEffect(() => {
        fetchPlans(); // selectedDate가 변경될 때마다 fetchPlans 호출
    }, [selectedDate]);

    const handleAddPlan = () => {
        if (newPlan) {
            // selectedDate를 한국 시간(KST)으로 변환
            const kor = new Date(selectedDate);
            kor.setHours(kor.getHours() + 9);  // 한국은 UTC보다 9시간 빠름
            
            // 날짜를 'YYYY-MM-DD' 형식으로 변환
            const formattedDate = kor.toISOString().split('T')[0];  // 한국 시간으로 변환된 날짜 사용
        
            // user_id를 로그인한 사용자의 ID로 설정
            const userId = "seoin";  // 실제 로그인한 사용자의 ID로 설정해야 함
        
            // 서버에 추가 요청
            fetch("http://localhost:5001/api/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: formattedDate, // 한국 시간으로 변환된 날짜
                    text: newPlan,
                    completed: false,
                    user_id: userId,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "운동 계획 추가 성공") {
                    console.log("운동 계획 추가됨");

                    // 마지막 선택된 날짜를 로컬 스토리지에 저장
                    localStorage.setItem("selectedDate", formattedDate);

                    // 페이지 새로 고침
                    window.location.reload();  // 페이지 새로 고침을 통해 새로운 계획을 반영
                }
            })
            .catch((error) => {
                console.error("운동 계획 추가 요청 오류:", error);
            });
        }
    };

    const handleDeletePlan = (index) => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR'); // 로컬 날짜 형식 사용
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
                console.log("운동 계획 삭제됨");
                const updatedPlans = plans[formattedDate].filter((_, i) => i !== index);
                setPlans((prevPlans) => {
                    const updatedPlansByDate = {
                        ...prevPlans,
                        [formattedDate]: updatedPlans,
                    };
                    // 해당 날짜에 계획이 하나도 없으면 "해당 날짜에 등록된 운동 계획이 없습니다." 메시지 표시
                    if (updatedPlans.length === 0) {
                        setNoPlansMessage(true);  // 메시지 표시
                    } else {
                        setNoPlansMessage(false); // 메시지 숨김
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
        const formattedDate = selectedDate.toLocaleDateString('ko-KR'); // 로컬 날짜 형식 사용
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

    const renderPlansForSelectedDate = () => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR'); // 로컬 날짜 형식 사용
        return plans[formattedDate] ? (
            <ul className="plan-list">
                {plans[formattedDate].map((plan, index) => (
                    <li
                        key={plan.id}
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
            {noPlansMessage ? (
                <p>해당 날짜에 등록된 운동 계획이 없습니다.</p>
            ) : (
                renderPlansForSelectedDate()
            )}

            {/* 운동 추천 출력 */}
            <div className="notification-box">
                <div className="icon">ℹ️</div>
                <div>
                    <h4>추천 운동:</h4>
                    <p>상체: {recommendedExercises.상체?.displayName}</p>
                    <p>하체: {recommendedExercises.하체?.displayName}</p>
                    <p>등: {recommendedExercises.등?.displayName}</p>
                </div>
            </div>
        </div>
    );
}

export default FitnessPlan;
