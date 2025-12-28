import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


// This page is the user input form and handles sending the users response
//   to the backend to be routed to the microservices
export const AddCarPageForm = () => {
    // for image microservice
    const [imageFile, setImageFile] = useState(null);

    // for item-storage microservice
    const [Owner, setOwner]       = useState('');
    const [Car_Make, setCar_Make]         = useState('');
    const [Car_Model, setCar_Model] = useState('');
    const [Car_Year, setCar_Year] = useState('');
    const [Car_License, setCar_License] = useState('');
    const [Car_Mileage, setCar_Mileage] = useState('');
    const [Mileage_Last_Oil, setMileage_Last_Oil] = useState('');
    const [Mileage_Last_Batt, setMileage_Last_Batt] = useState('');
    const [Mileage_Last_Tire_Rot, setMileage_Last_Tire_Rot] = useState('');
    const [Car_Notes, setCar_Notes] = useState('');
    
    const redirect = useNavigate();

     // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setImageFile(file);
    };

    const addCar = async () => {
        const newCar = { Owner, Car_Make, Car_Model, Car_Year, Car_License, Car_Mileage, Mileage_Last_Oil, Mileage_Last_Batt, Mileage_Last_Tire_Rot, Car_Notes };
        console.log("Submitting newCar:", newCar); // debug check
        const response = await fetch('/cars', {
            method: 'post',
            body: JSON.stringify(newCar),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Success! New entry added to the database`);
        } else {
            alert(`Error, something went wront, please try again = ${response.status}`);
            redirect("/");
        }

        // check to see if user selected a file to upload with data, and uses fetch 
        //   so the backend can recieve the image file and send it to microservice

        const created = await response.json();
        const itemId = created.itemId;

        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            const imageResponse = await fetch(`/cars/${itemId}/image`, {
                method: 'post',
                body: formData
            })
            if (imageResponse.status == 201) {
                redirect("/CarPage");
            } else {
                redirect("/")
            }
        }
    };


    return (
        <>
        <article>
            <h2>Add a Record to Your Garage</h2>
            <p>Please fill out all information</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Add Entry</legend>
                    
                    <label for="Owner">Owner</label>
                    <input
                        type="text"
                        placeholder="Name of Owner"
                        value={Owner}
                        onChange={e => setOwner(e.target.value)} 
                        id="Owner" />
                    
                    <label for="Car_Make">Car Make</label>
                    <input
                        type="text"
                        value={Car_Make}
                        placeholder="Car Make"
                        onChange={e => setCar_Make(e.target.value)} 
                        id="Car_Make" />

                    <label for="Car_Model">Car Model</label>
                    <input
                        type="text"
                        placeholder="Car Model"
                        value={Car_Model}
                        onChange={e => setCar_Model(e.target.value)} 
                        id="Car_Model" />

                    <label for="Car_Year">Car Year</label>
                    <input
                        type="number"
                        placeholder="Car Year"
                        value={Car_Year}
                        onChange={e => setCar_Year(e.target.value)} 
                        id="Car_Year" />

                    <label for="Car_License">Car License</label>
                    <input
                        type="text"
                        placeholder="Car License"
                        value={Car_License}
                        onChange={e => setCar_License(e.target.value)} 
                        id="Car_License" />

                    <label for="Car_Mileage">Car Mileage</label>
                    <input
                        type="number"
                        placeholder="Car Mileage"
                        value={Car_Mileage}
                        onChange={e => setCar_Mileage(e.target.value)} 
                        id="Car_Mileage" />

                    <label for="Mileage_Last_Oil">Mileage Last Oil</label>
                    <input
                        type="number"
                        placeholder="Mileage Last Oil"
                        value={Mileage_Last_Oil}
                        onChange={e => setMileage_Last_Oil(e.target.value)} 
                        id="Mileage_Last_Oil" />

                    <label for="Mileage_Last_Batt">Mileage Last Batt</label>
                    <input
                        type="number"
                        placeholder="Mileage Last Batt"
                        value={Mileage_Last_Batt}
                        onChange={e => setMileage_Last_Batt(e.target.value)} 
                        id="Mileage_Last_Batt" />

                    <label for="Mileage_Last_Tire_Rot">Mileage Last Tire Rot</label>
                    <input
                        type="number"
                        placeholder="Mileage Last Tire Rot"
                        value={Mileage_Last_Tire_Rot}
                        onChange={e => setMileage_Last_Tire_Rot(e.target.value)} 
                        id="Mileage_Last_Tire_Rot" />

                    <label for="Car_Notes">Car Notes</label>
                    <input
                        type="text"
                        placeholder="Car Notes"
                        value={Car_Notes}
                        onChange={e => setCar_Notes(e.target.value)} 
                        id="Car_Notes" />

                    <label htmlFor="Car_Image">Car Image</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        id="Car_Image" />


                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addCar}
                        id="submit"
                    >Submit</button> </label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddCarPageForm;