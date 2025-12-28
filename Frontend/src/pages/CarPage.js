import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CarList from '../components/CarList';
import { Link } from 'react-router-dom';


// Generates the contents of the car page. Uses carlist component to generate a list of
//     all cars in an overview form
function CarPage({ setCar }) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [cars, setCars] = useState([]);
    

    // RETRIEVE the entire list of cars
    const loadCars = async () => {
        const response = await fetch('/cars');
        const cars = await response.json();
        setCars(cars);
    } 
    


    // DELETE a single car  
    const onDeleteCar = async _id => {
        const response = await fetch(`/cars/${_id}`, { method: 'DELETE' });
        if (response.status === 200) {
            const getResponse = await fetch('/cars');
            const cars = await getResponse.json();
            setCars(cars);
        } else {
            console.error(`helpful deletion message = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD all the cars
    useEffect(() => {
        loadCars();
    }, []);

    // DISPLAY the cars
    return (
        <>
            <h2>Cars Currently Tracked</h2>
            <p>
            </p>
            <Link to="/create">Add Car</Link>
            <CarList 
                cars={cars} 
                onDelete={onDeleteCar} 
            />
            <label for="add">
                <button
                type="button"          // ← use "button" so it doesn’t submit anything
                onClick={() => redirect('/create')}   // navigates to your Add Car form
                id="add"
                    >
                    Add Car
                </button>
            </label>
        </>
    );
}

export default CarPage;