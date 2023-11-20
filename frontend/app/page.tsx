"use client";

import React from 'react';
import GeolocationComponent from './components/WeatherCardComponent';

const Page: React.FC = () => {
    return (
        <div>
            <h1>My Page</h1>
            <GeolocationComponent />
        </div>
    );
};

export default Page;
