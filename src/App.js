import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';
import BMICalculator from './pages/BMICalculator';
import Header from './components/Header';
import './App.css'; // 스타일 파일 추가

function App() {
    const [userId, setUserId] = useState('default_name');  // 기본값을 'default_name'으로 설정

    useEffect(() => {
        // 유니티에서 로그인한 후 userId를 받아오는 코드
        const storedUserId = localStorage.getItem('userId'); // 혹은 유니티에서 전달받은 값으로 설정
        if (storedUserId) {
            setUserId(storedUserId); // 유니티에서 로그인한 후 userId가 있으면 이를 설정
        }
    }, []);

    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Header />
                <nav className="nav-container">
                    <Link to="/info" className="nav-button2">운동기구 목록</Link>
                    <Link to={`/plan?userId=${userId}`} className="nav-button2">운동 계획 일정</Link>
                    <Link to={`/bmi?userId=${userId}`} className="nav-button2">BMI 계산기</Link>
                </nav>
                <Routes>
                    {/* 운동기구 목록 */}
                    <Route path="/info" element={<FitnessEquipInfo />} />
                    
                    {/* 운동기구별 상세정보 동적 라우팅 */}
                    <Route path="/info/:equipmentName" element={<FitnessEquipInfo />} />
                    
                    {/* 운동 계획 일정 페이지 */}
                    <Route path="/plan" element={<FitnessPlan />} />
                    
                    {/* 체중 기록 페이지 */}
                    <Route path="/bmi" element={<BMICalculator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
