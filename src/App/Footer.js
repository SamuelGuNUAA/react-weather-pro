import React from 'react';
import '../index.css';

import CityConditionRoll from '../weather/QuickViewInFooter';

export default function Footer(props){
    return (
        <footer>
            <p>Fullstack Web Dev 101  Samuel Gu</p>
            <CityConditionRoll />
        </footer>
    );
}
