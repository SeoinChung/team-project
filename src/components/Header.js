// src/components/Header.js
import React from 'react';

function Header() {
    return (
        <header style={{ textAlign: 'center' }}>
            <img src={require('../images/ui-logo.png')} alt="브랜드 로고" style={{ maxWidth: '20%' }} />
        </header>
    );
}

export default Header;
