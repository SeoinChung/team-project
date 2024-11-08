// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FitnessEquipList from './pages/FitnessEquipList';
import FitnessEquipInfo from './pages/FitnessEquipInfo';
import FitnessPlan from './pages/FitnessPlan';

function App() {
    return (
        <Router>
            <div>
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
