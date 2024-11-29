// src/components/Header.js
import React from 'react';

function Header() {
    return (
        <header style={{ textAlign: 'center' }}>
            <img src={require('../images/logo (10).jpg')} alt="브랜드 로고" style={{ maxWidth: '80%' }} />
        </header>
    );
}

export default Header;
