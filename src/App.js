// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';
import BMICalculator from './pages/BMICalculator';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Header />
                <nav>
                    <Link to="/info">운동기구 목록</Link> | 
                    <Link to="/plan">운동 계획 일정</Link> | 
                    <Link to="/bmi">BMI 계산기</Link>
                </nav>
                <Routes>
                    {/* 운동기구 목록 */}
                    <Route path="/info" element={<FitnessEquipInfo />} />
                    
                    {/* 운동기구별 상세정보 동적 라우팅 */}
                    <Route path="/info/:equipmentName" element={<FitnessEquipInfo />} />
                    
                    {/* 기타 페이지 */}
                    <Route path="/plan" element={<FitnessPlan />} />
                    <Route path="/bmi" element={<BMICalculator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;