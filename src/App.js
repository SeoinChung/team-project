import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';
import BMICalculator from './pages/BMICalculator';
import Header from './components/Header';
import './App.css'; // 스타일 파일 추가

function App() {
    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Header />
                <nav className="nav-container">
                    <Link to="/info" className="nav-button2">운동기구 목록</Link>
                    <Link to="/plan" className="nav-button2">운동 계획 일정</Link>
                    <Link to="/bmi" className="nav-button2">BMI 계산기</Link>
                </nav>
                <Routes>
                    {/* 운동기구 목록 */}
                    <Route path="/info" element={<FitnessEquipInfo />} />
                    
                    {/* 운동기구별 상세정보 동적 라우팅 */}
                    <Route path="/info/:equipmentName" element={<FitnessEquipInfo />} />
                    
                    {/* 운동 계획 일정 페이지 */}
                    <Route path="/plan" element={<FitnessPlan />} />
                    
                    {/* userId가 포함된 URL로 운동 계획 페이지로 이동 */}
                    <Route path="/plan/:userId" element={<FitnessPlan />} />

                    <Route path="/bmi" element={<BMICalculator />} />

                    {/* userId가 포함된 URL로 운동 계획 페이지로 이동 */}
                    <Route path="/bmi/:userId" element={<BMICalculator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
