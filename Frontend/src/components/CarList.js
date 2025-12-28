import React from 'react';
import Car from './OverviewCar';

// This function creates a list of all cars with only overview information
function CarList({ cars }) {
    return (
        <table id="cars">
            <caption>Car Table</caption>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Car Make</th>
                    <th>Car Model</th>
                    <th>Car Year</th>
                    <th>License#</th>
                    
                </tr>
            </thead>
            <tbody>
                {cars.map((car, i) => 
                    <Car 
                        car={car.data}
                        id={car.itemId} 
                        key={i}
                    />)}
            </tbody>
        </table>
    );
}

export default CarList;