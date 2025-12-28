import React from 'react';

import { useNavigate } from "react-router-dom";

// This component function is to just show overview information of a car datapoint
function OverviewCar({ car, id }) {
    const navigate = useNavigate();


    return (
        <tr
            onClick={() => navigate(`/cars/${id}`)} 
            style={{ cursor: 'pointer' }}
        >
            

            <td>{car.Owner}</td>
            <td>{car.Car_Make}</td>
            <td>{car.Car_Model}</td>
            <td>{car.Car_Year}</td>
            <td>{car.Car_License}</td>
        </tr>
    );
}

export default OverviewCar;