import React from 'react';
import HelpList from '../components/HelpList';
import { Link } from 'react-router-dom';

// Generates the contents of the help page
function HelpPage() {
    return (
        <>
            <h2>Welcome to the Help Page</h2>
            <article>
                <p>
                    To add a car, select the "Add Car" link or the "Add Car" button on your Car Page.
                    To view all your cars, navigate to your Car Page and scroll through
                    your cars. To view the maintenance details of a specific car, select a car
                    when on the Car Page. This will take you to the detailed information page of
                    the selected car. To remove a car, select the "Delete Car" button at the bottom
                    of a detailed car page and confirm "Ok" with the alert.
                </p>
                <p>
                    Email us at garagehelp@FakeEmail.com for further assistance, or call us at (360) 111-1111
                </p>
            </article>
            <h3>
            <Link to="/issue">Add New Issue</Link>
            </h3>
            <HelpList />
        </>
    );
}

export default HelpPage;