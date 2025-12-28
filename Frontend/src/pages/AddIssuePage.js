import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AddIssuePage = () => {
    const [message, setMessage] = useState(null);
    const redirect = useNavigate();

 

    const addIssue = async () => {
        const newIssue = { message }
        const response = await fetch('/issues', {
            method: 'post',
            body: JSON.stringify(newIssue),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Success! New entry added to the database`);
            redirect("/HelpPage")
        } else {
            alert(`Error, something went wront, please try again = ${response.status}`);
            redirect("/HelpPage");
        }
      }



    return (
        <section>
      <h2>Submit a New Issue</h2>
        <label>
          Describe your issue:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
  
        <button onClick={addIssue}>
          submit Issue
        </button>
    </section>
    )

}

export default AddIssuePage;