// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css'// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipList from './pages/FitnessEquipList';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';
import Header from './components/Header'; // Header 컴포넌트 import

function App() {
    return (
        <Router>
            <div style={{ textAlign: 'center' }}> {/* 중앙 정렬을 위한 스타일 추가 */}
                <Header /> {/* Header 컴포넌트를 추가하여 로고 표시 */}
                <nav>
                    <Link to="/browse">운동기구 살펴보기</Link> | 
                    <Link to="/info">운동기구 상세 정보</Link> | 
                    <Link to="/plan">운동 계획 일정</Link>
                </nav>
                <Routes>
                    <Route path="/browse" element={<FitnessEquipList />} />
                    <Route path="/info" element={<FitnessEquipInfo />} />
                    <Route path="/plan" element={<FitnessPlan />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
