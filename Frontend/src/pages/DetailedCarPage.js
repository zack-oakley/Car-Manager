// DetailedCar.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Generaets the contents of the detailed car list. SHows all fields for a cars data ponit.
//    uses
function DetailedCar() {
    // grab id from url
  const { id } = useParams();
    // enables navigation to different page after delete
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const[quote, setQuote] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/cars/${id}`);
        if (!res.ok) throw new Error(`GET /cars/${id} ${res.status}`);
        const data = await res.json();
        setCar({
                itemId: data.itemId,
                Owner: data.data.Owner,
                Car_Make: data.data.Car_Make,
                Car_Model: data.data.Car_Model,
                Car_License: data.data.Car_License,
                Car_Mileage: data.data.Car_Mileage,
                Mileage_Last_Oil: data.data.Mileage_Last_Oil,
                Mileage_Last_Batt: data.data.Mileage_Last_Batt,
                Mileage_Last_Tire_Rot: data.data.Mileage_Last_Tire_Rot,
                Car_Notes: data.data.Car_Notes,
                });
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [id]);


  useEffect(() => {
    // Car is null first render, need this check to prevent crash
    if (!car || !car.Owner) return;
    const initial = car.Owner[0].toLowerCase();
    (async () => {
      try {
        const res = await fetch(`/quotes/${initial}`);
        //if (!res.ok) throw new Error(`GET /cars/${id} ${res.status}`);
        const data = await res.json();
        setQuote(data.quote);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [car]);


  async function handleDelete() {
    if (!window.confirm('Delete this car? All related data will be removed and cannot be')) return;
    try {
      setDeleting(true);
      const image_response = await fetch(`/cars/${id}/image`, { method: 'DELETE'})
      const res = await fetch(`/cars/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`DELETE /cars/${id} ${res.status}`);
      navigate('/CarPage');
    } catch (e) {
      setDeleting(false);
      navigate('/CarPage');
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!car)    return <p>Car not found.</p>;

  // displayed contents on detail screen
  return (
    <div>
      <img
        src={`/cars/${id}/image`}
      />
      <h2>{car.Owner} {car.Car_Make} {car.Car_Model}</h2>
      <p><strong>Owner:</strong> {car.Owner}</p>
      <p><strong>License:</strong> {car.Car_License}</p>
      <p><strong>Mileage:</strong> {car.Car_Mileage}</p>
      <p><strong>Last Oil Change:</strong> {car.Mileage_Last_Oil}</p>
      <p><strong>Last Battery Change:</strong> {car.Mileage_Last_Batt}</p>
      <p><strong>Last Tire Rotation:</strong> {car.Mileage_Last_Tire_Rot}</p>
      <p><strong>Notes:</strong> {car.Car_Notes}</p>
      <p><strong>Motivational Quote for {car.Owner}:</strong> {quote}</p>

      <fieldset>
        <button
          type="submit"
          onClick={handleDelete}
          id="delete"
        >
          Delete
        </button>
</fieldset>
    </div>
  );
}

export default DetailedCar