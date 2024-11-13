// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipList from './pages/FitnessEquipList';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';
import BMICalculator from './pages/BMICalculator';
import Header from './components/Header';
import FitnessEquipDetail from './pages/FitnessEquipDetail';

function App() {
    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Header />
                <nav>
                    <Link to="/browse">운동기구 살펴보기</Link> | 
                    <Link to="/info">운동기구 상세 정보</Link> | 
                    <Link to="/plan">운동 계획 일정</Link> | 
                    <Link to="/bmi">BMI 계산기</Link>
                </nav>
                <Routes>
                    <Route path="/browse" element={<FitnessEquipList />} />
                    <Route path="/info" element={<FitnessEquipInfo />} />
                    <Route path="/plan" element={<FitnessPlan />} />
                    <Route path="/bmi" element={<BMICalculator />} />
                    <Route path="/equipment/:equipmentName" element={<FitnessEquipDetail />} /> {/* 수정된 페이지로 라우트 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
